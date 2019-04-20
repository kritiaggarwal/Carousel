import React, { Component } from 'react';

class ImageSlide extends Component {

    render() {
        const isMobile = this.props.showMobileView;
        if (isMobile) {
            return (
                <div role="img" aria-label="container for carousel images">
                    <img
                        className="image-slide"
                        src={this.props.url.url}
                        alt={this.props.url.title}
                        title={this.props.url.title}
                        aria-label={`image for ${this.props.url.title}`}
                        aria-hidden="false">
                    </img>
                    <div className="image-title"> {this.props.url.title} </div>
                </div>
            );
        } else {
            return (
                <div className="image-container">
                    <div className="image-matrix" role="img" aria-label="carousel images">
                        {this.props.url.map( (item, index) => (
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
