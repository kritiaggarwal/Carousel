import React, { Component } from 'react';

class ImageSlide extends Component {

    render() {
        const isMobile = this.props.device === 'mobile' ? true : false;
        console.log(isMobile);

        if (isMobile) {
            return (
                <div >
                    <img className="image-slide" src={this.props.url.url} alt="1"></img>
                    <div className="image-title"> {this.props.url.title} </div>
                </div>
            );
        } else {
            return (
                <div className="image-container">
                    <div className="image-matrix">
                        {this.props.url.map((item, index) => (
                            <div key={index} className="image-slide-container">
                                <img className="desktop-image-slide" src={item.url} alt={item.title}></img>
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
