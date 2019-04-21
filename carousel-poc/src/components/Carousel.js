import React, { Component } from 'react';
import ImageSlide from './ImageSlide';
import Arrow from './Arrow';
import Button from './Button';
import * as Constants from '../constants/index';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgData: [],    // this will store all image data fetched from api
            currentImageIndex: 0,   // this is active index for the image in carousel
            currentImageArray: [],  // this array will hold the images data to be shown in desktop, say in our case 5 images
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0), // this will store client width to check for responsiveness
            loading: false,  // to show loader while api data is being fetched
            error: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);

        this.setState({
            loading: true
        });

        this.fetchImageData();
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) });
    };

    /* 
    * Fetch images data from api call & save in state required properties
    */
    fetchImageData = () => {
        const key = Constants.API_KEY;
        const url = `${Constants.IMAGES_URL}${key}&q=beautiful+landscape&image_type=photo`;

        fetch(url, { mode: 'cors' })
            .then(response => {
                this.setState({
                    loading: false,
                    error: false
                });
                return response.json();
            })
            .then(data => {
                let images = [];
                images = data.hits
                    .filter(item => {
                        return item.userImageURL !== '';
                    }).map((item) => {
                        return {
                            id: item.id,
                            url: item.userImageURL,
                            title: item.user
                        }
                    });
                this.setState({ imgData: images, currentImageArray: images.slice(0, 5), error: false });
            }).catch(error => {
                this.setState({ error: true, loading: false });
            });
    }


    /*
    * Function to show previous slide on click of prev button in mobile devices
    */
    previousSlide = () => {
        const lastIndex = this.state.imgData.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        this.setState({
            currentImageIndex: index
        });
    }


    /*
    * Function to show next slide on click of next button in devices other than mobile
    */
    nextSlide = () => {
        const lastIndex = this.state.imgData.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    /*
    * Function to show previous slide on click of prev button in desktop devices where multiple 
    * images are handled
    * @param slidePanelsPerScreen: no. of slides to be shown per screen in desktop.
    * Default value is given for desktop as defined in constants
    */
    previousSlideForDesktop = (carouselPanelsPerScreen) => {
        const length = this.state.imgData.length;
        carouselPanelsPerScreen = Constants.SLIDES_COUNT_IN_DESKTOP;

        const lastIndex = length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        const shouldResetSlides = currentImageIndex + carouselPanelsPerScreen - length;

        let currentArray = [];
        if (shouldResetSlides > 0) {
            currentArray = [...this.state.imgData.slice(currentImageIndex, length),
            ...this.state.imgData.slice(0, shouldResetSlides)]
        } else {
            currentArray = [...this.state.imgData.slice(currentImageIndex,
                currentImageIndex + carouselPanelsPerScreen)]
        }
        this.setState({
            currentImageIndex: index,
            currentImageArray: currentArray
        });
    }

    /*
    * Function to show next slide on click of next button in desktop devices where multiple 
    * images are handled
    * @param slidePanelsPerScreen: no. of slides to be shown per screen in desktop.
    * Default value is given for desktop as defined in constants
    */
    nextSlideForDesktop = (carouselPanelsPerScreen) => {
        const length = this.state.imgData.length;
        carouselPanelsPerScreen = Constants.SLIDES_COUNT_IN_DESKTOP;

        let { currentImageIndex } = this.state;

        let currentArray = [];
        let lastIndex = currentImageIndex + (carouselPanelsPerScreen - 1);

        if (lastIndex < length) {
            currentArray = [...this.state.imgData.slice(currentImageIndex, lastIndex + 1)];
            currentImageIndex += 1;
        } else {
            let remainingSlots = lastIndex % length;
            lastIndex = (lastIndex - remainingSlots);
            currentArray = [...this.state.imgData.slice(currentImageIndex, lastIndex + 1),
            ...this.state.imgData.slice(0, remainingSlots + 1)];
            currentImageIndex = remainingSlots + 1;
        }
        this.setState({
            currentImageIndex: currentImageIndex,
            currentImageArray: currentArray
        });
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= (Constants.MOBILE_MAX_WIDTH);

        const { loading } = this.state;
        const { error } = this.state;

        if (loading) {
            return (
                // if app is still loading i.e data is being fetched from server
                <div className="loader-container">
                    <h3>Loading... </h3>
                </div>
            );
        } else {
            // if response of the api is some error
            if (error) {
                return (
                    <div className="loader-container">
                        <h3> App is down. Please try again after some time !!!. </h3>
                    </div>
                );
            } else if (isMobile) {
                // if response of api is not error & device is mobile, show carousel with arrow
                return (
                    <section className="carousel" role="banner">
                        <h3> Carousel </h3>
                        <div className="mobile-carousel">
                            <Arrow
                                direction="prev-icon"
                                clickFunction={this.previousSlide}
                            />
                            <ImageSlide showMobileView={true}
                                imgArray={this.state.imgData[this.state.currentImageIndex]} />
                            <Arrow
                                direction="next-icon"
                                clickFunction={this.nextSlide}
                            />
                        </div>
                    </section>
                );
            } else {
                // if response of api is not error & device is not mobile, show carousel with multiple panels at one time
                return (
                    <section className="carousel" role="banner">
                        <ImageSlide showMobileView={false} imgArray={this.state.currentImageArray} />
                        <div className="button-container">
                            <Button
                                direction="prev-button"
                                clickFunction={this.previousSlideForDesktop}
                                label="Prev" />
                            <Button
                                direction="next-button"
                                clickFunction={this.nextSlideForDesktop}
                                label="Next" />
                        </div>
                    </section >
                );
            }
        }
    }
}

export default Carousel;
