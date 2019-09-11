import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

// Importing images
import map_01 from './assets/maps/building-maps-01.jpg'
import map_02 from './assets/maps/building-maps-02.jpg'
import map_03 from './assets/maps/building-maps-03.jpg'
import map_04 from './assets/maps/building-maps-04.jpg'
import map_05 from './assets/maps/building-maps-05.jpg'
import map_06 from './assets/maps/building-maps-06.jpg'
import map_07 from './assets/maps/building-maps-07.jpg'
import map_08 from './assets/maps/building-maps-08.jpg'
import map_09 from './assets/maps/building-maps-09.jpg'
import map_10 from './assets/maps/building-maps-10.jpg'
import map_11 from './assets/maps/building-maps-11.jpg'

/*
  The Gallery component takes in a collection of images
  By default the gallery will run on an interval (rotating through
  the images), but there will also be arrows in place that can be used
  to navigate it as well
*/

const DEFAULT_IMAGES = [
  map_01,
  map_02,
  map_03,
  map_04,
  map_05,
  map_06,
  map_07,
  map_08,
  map_09,
  map_10,
  map_11
]

export default class Gallery extends Component {

  static propTypes = {
    interval: PropTypes.number,
    images: PropTypes.array,
    includeArrows: PropTypes.bool,
    backgroundColor: PropTypes.string,
  }

  constructor(props) {
    super(props);

    // Set image index by default to point to the first image in the list
    this.state = {
      currentImageIndex: 0
    };

    this.images = this.props.images || DEFAULT_IMAGES;
    this.interval = this.props.interval || 10000;
    this.numImages = this.images.length;

    // Setting background color
    this.backgroundColor = this.props.backgroundColor || 'transparent';

    // Binding next and previous functions
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  componentDidMount() {
    // There's no point in running the interval
    // unless we have more than one image
    if (this.numImages > 1) {
      this.imageInterval = setInterval(() => {
        this.nextImage();
      }, this.interval);
    }
  }

  componentWillUnmount() {
    if (this.numImages > 1) {
      clearInterval(this.imageInterval);
    }
  }

  nextImage() {

    // If we are currently at the last image, then we set the next image to the first one
    // else we increment the current image index
    const nextImage = this.numImages-1 === this.state.currentImageIndex ? 0 : this.state.currentImageIndex + 1;

    // Update the state
    this.setState({
      currentImageIndex: nextImage
    });
  }

  previousImage() {
    // If we are currently at the 'first' image, then we set the next image to the last one
    // else we decrement the current image index
    const nextImage = 0 === this.state.currentImageIndex ? this.numImages-1 : this.state.currentImageIndex - 1;

    // Update the state
    this.setState({
      currentImageIndex: nextImage
    });
  }

  render() {
    const {
      interval,
      images,
      includeArrows,
    } = this.props

    // Allowing for conditional arrow addition
    // We will NOT render arrows if only one image is present
    // or the props value includeArrows is false
    let leftArrow;
    let rightArrow;

    if(this.props.includeArrows && this.numImages !== 1) {
      leftArrow = <div className={styles.leftArrow} onClick={this.previousImage}> &#9664; </div>;
      rightArrow = <div className={styles.rightArrow} onClick={this.nextImage}> &#9654; </div>;
    }

    return (
      <div className={styles.galleryContainer} style={{backgroundColor: this.backgroundColor}}>
        {leftArrow}
        <img className={styles.gallery} src={this.images[this.state.currentImageIndex]} />
        {rightArrow}
      </div>
    )
  }
}
