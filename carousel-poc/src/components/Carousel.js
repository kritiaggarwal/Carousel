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
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) // this will store client width to check for responsiveness
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);

        const key = Constants.API_KEY;
        const url = `${Constants.IMAGES_URL}${key}&q=beautiful+landscape&image_type=photo`;

        // Fetch images data from api call & save in state required properties
        fetch(url, { mode: 'cors' })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('Api results', data);
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
                    })
                this.setState({ imgData: images, currentImageArray: images.slice(0, 5) });
            });
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

    // Function to show previous slide on click of prev button in mobile devices
    previousSlide = () => {
        const lastIndex = this.state.imgData.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        this.setState({
            currentImageIndex: index
        });
    }

    // Function to show next slide on click of next button in devices other than mobile
    nextSlide = () => {
        const lastIndex = this.state.imgData.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    // Function to show previous slide on click of prev button in desktop devices where multiple images are handled
    previousSlideForDesktop = () => {
        const length = this.state.imgData.length;
        const lastIndex = length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        const shouldResetSlides = currentImageIndex + 5 - length;

        let currentArray = [];

        if (shouldResetSlides > 0) {
            currentArray = [...this.state.imgData.slice(currentImageIndex, length), ...this.state.imgData.slice(0, shouldResetSlides)]
        } else {
            currentArray = [...this.state.imgData.slice(currentImageIndex, currentImageIndex + 5)]
        }

        this.setState({
            currentImageIndex: index,
            currentImageArray: currentArray
        });
    }

    // Function to show next slide on click of next button in desktop devices where multiple images are handled
    nextSlideForDesktop = () => {
        const length = this.state.imgData.length;
        const lastIndex = length - 1;

        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        const shouldResetSlides = currentImageIndex + 5 - length;

        let currentArray = [];

        if (shouldResetSlides > 0) {
            currentArray = [...this.state.imgData.slice(index, length), ...this.state.imgData.slice(0, shouldResetSlides)]
        } else {
            currentArray = [...this.state.imgData.slice(index, index + 5)]
        }

        this.setState({
            currentImageIndex: index,
            currentImageArray: currentArray
        });
        console.log('State', this.state.currentImageArray);
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= (Constants.MOBILE_MAX_WIDTH);

        if (isMobile) {
            // if device is mobile, show carousel with arrow
            return (
                <section className="carousel" role="banner">
                    <h3> Carousel </h3>
                    <Arrow
                        direction="prev-icon"
                        clickFunction={this.previousSlide}
                    />
                    <ImageSlide showMobileView={true} url={this.state.imgData[this.state.currentImageIndex]} />
                    <Arrow
                        direction="next-icon"
                        clickFunction={this.nextSlide}
                    />
                </section>
            );

        } else {
            // if device is not mobile, show carousel with multiple images at one time
            return (
                <section className="carousel" role="banner">
                    <ImageSlide showMobileView={false} url={this.state.currentImageArray} />
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

export default Carousel;
