import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageSlide extends Component {

    render() {
        const isMobile = this.props.showMobileView;
        if (isMobile) {
            return (
                <div role="img" aria-label="container for carousel images">
                    <img
                        className="image-slide"
                        src={this.props.imgArray ? this.props.imgArray.url : ''}
                        alt={this.props.imgArray ? this.props.imgArray.title : ''}
                        title={this.props.imgArray ? this.props.imgArray.title : ''}
                        aria-label={`image for ${this.props.imgArray ? this.props.imgArray.title : ''}`}
                        aria-hidden="false">
                    </img>
                    <div className="image-title"> {this.props.imgArray ? this.props.imgArray.title : ''} </div>
                </div>
            );
        } else {
            return (
                <div className="image-container">
                    <div className="image-matrix" role="img" aria-label="carousel images">
                        {this.props.imgArray.map((item, index) => (
                            <div key={index} className="image-slide-container">
                                <img
                                    className="desktop-image-slide"
                                    src={item.url} alt={item.title}
                                    title={item.title}
                                    aria-label={`${item.title}`}
                                    aria-hidden="false">
                                </img>
                                <div className="image-title"> {item.title} </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default ImageSlide;

ImageSlide.propTypes = {
    showMobileView: PropTypes.bool,     // boolean to decide if the current view is mobile or not
    imgArray: PropTypes.oneOfType([PropTypes.array,PropTypes.object])   // image array containing data about images to be shown
};
