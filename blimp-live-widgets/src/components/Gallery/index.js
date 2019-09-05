import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
  The Gallery component takes in a collection of images
  By default the gallery will run on an interval (rotating through
  the images), but there will also be arrows in place that can be used
  to navigate it as well
*/
export default class Gallery extends Component {
  static propTypes = {
    interval: PropTypes.number,
    images: PropTypes.array,
  }

  constructor(props) {
    super(props);

    // Set image index by default to point to the first image in the list
    this.state = {
      currentImageIndex: 0
    };

    // Binding next and previous functions
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  componentDidMount() {
    this.imageInterval = setInterval(() => {
      this.nextImage();
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval);
  }

  nextImage() {
    const numImages = this.props.images.length;

    // If we are currently at the last image, then we set the next image to the first one
    // else we increment the current image index
    const nextImage = numImages-1 === this.state.currentImageIndex ? 0 : this.state.currentImageIndex + 1;

    // Update the state
    this.setState({
      currentImageIndex: nextImage
    });
  }

  previousImage() {
    const numImages = this.props.images.length;

    // If we are currently at the 'first' image, then we set the next image to the last one
    // else we decrement the current image index
    const nextImage = 0 === this.state.currentImageIndex ? numImages-1 : this.state.currentImageIndex - 1;

    // Update the state
    this.setState({
      currentImageIndex: nextImage
    });
  }

  render() {
    const {
      interval,
      images
    } = this.props

    return (
      <div>
        <img src={this.props.images[this.state.currentImageIndex]} />
        <
      </div>
    )
  }
}
