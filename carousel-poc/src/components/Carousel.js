import React, { Component } from 'react';
import ImageSlide from './ImageSlide';
import Arrow from './Arrow';
import Button from './Button';


class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgData: [],
            currentImageIndex: 0,
            currentImageArray: [],
            width: window.innerWidth
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);

        this.nextSlideForDesktop = this.nextSlideForDesktop.bind(this);
        this.previousSlideForDesktop = this.previousSlideForDesktop.bind(this);
    }

    componentDidMount() {
        const key = `9656065-a4094594c34f9ac14c7fc4c39`;
        const url = `https://pixabay.com/api/?key=${key}&q=beautiful+landscape&image_type=photo`;

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
        this.setState({ width: window.innerWidth });
    };

    // Function to show previous slide on click of prev button in mobile devices
    previousSlide() {
        const lastIndex = this.state.imgData.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        this.setState({
            currentImageIndex: index
        });
    }

    // Function to show next slide on click of next button in devices other than mobile
    nextSlide() {
        const lastIndex = this.state.imgData.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    // Function to show previous slide on click of prev button in desktop devices where multiple images are handled
    previousSlideForDesktop() {
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

    // Function to show previous slide on click of prev button in desktop devices where multiple images are handled
    nextSlideForDesktop() {
        const length = this.state.imgData.length;
        const lastIndex = length - 1;

        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

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
        console.log('State', this.state.currentImageArray)
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= 500;

        if (isMobile) {
            // if device is mobile, show carousel with arrow
            return (
                <section className="carousel">
                    <h3> Carousel </h3>
                    <Arrow
                        direction="prev-icon"
                        clickFunction={this.previousSlide}
                    />
                    <ImageSlide device='mobile' url={this.state.imgData[this.state.currentImageIndex]} />
                    <Arrow
                        direction="next-icon"
                        clickFunction={this.nextSlide}
                    />
                </section>
            );

        } else {
            // if device is not mobile, show carousel with multiple images at once time
            return (
                <section className="carousel">
                    <ImageSlide device='desktop' url={this.state.currentImageArray} />
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
