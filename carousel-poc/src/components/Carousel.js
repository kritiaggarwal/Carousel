import React, { Component } from 'react';
import ImageSlide from './ImageSlide';
import Arrow from './Arrow';
import Button from './Button';

const imgUrls = [
    { url: "https://via.placeholder.com/140/50C9A1/FFFFFF?text=Image+1", title: 'Image 1' },
    { url: "https://via.placeholder.com/150/50C9A1/FFFFFF?text=Image+2", title: 'Image 2' },
    { url: "https://via.placeholder.com/150/50C9A1/FFFFFF?text=Image+3", title: 'Image 3' },
    { url: "https://via.placeholder.com/150/50C9A1/FFFFFF?text=Image+4", title: 'Image 4' },
    { url: "https://via.placeholder.com/150/50C9A1/FFFFFF?text=Image+5", title: 'Image 5' },
    { url: "https://via.placeholder.com/150/50C9A1/FFFFFF?text=Image+6", title: 'Image 6' }
];

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImageIndex: 0,
            currentImageArray: imgUrls.slice(0,5),
            width: window.innerWidth
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);

        this.nextSlideForDesktop = this.nextSlideForDesktop.bind(this);
        this.previousSlideForDesktop = this.previousSlideForDesktop.bind(this);
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
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        this.setState({
            currentImageIndex: index
        });
    }

    // Function to show next slide on click of next button in devices other than mobile
    nextSlide() {
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    // Function to show previous slide on click of prev button in desktop devices where multiple images are handled
    previousSlideForDesktop() {
        const length = imgUrls.length;
        const lastIndex = length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        const shouldResetSlides = currentImageIndex + 5 - length;

        let currentArray = [];

        if (shouldResetSlides > 0) {
            currentArray = [...imgUrls.slice(currentImageIndex, length), ...imgUrls.slice(0, shouldResetSlides)]
        } else {
            currentArray = [...imgUrls.slice(currentImageIndex, currentImageIndex + 5)]
        }

        this.setState({
            currentImageIndex: index,
            currentImageArray: currentArray
        });
    }

    // Function to show previous slide on click of prev button in desktop devices where multiple images are handled
    nextSlideForDesktop() {
        const length = imgUrls.length;
        const lastIndex = length - 1;

        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        const shouldResetSlides = currentImageIndex + 5 - length;

        let currentArray = [];

        if (shouldResetSlides > 0) {
            currentArray = [...imgUrls.slice(currentImageIndex, length), ...imgUrls.slice(0, shouldResetSlides)]
        } else {
            currentArray = [...imgUrls.slice(currentImageIndex, currentImageIndex + 5)]
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
                    <ImageSlide device='mobile' url={imgUrls[this.state.currentImageIndex]} />
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
