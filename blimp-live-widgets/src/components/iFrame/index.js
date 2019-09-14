import React, { Component } from 'react'
import styles from './styles.css'

export default class IFrameComponent extends Component {
	render() {
		var sourceUrl = this.props.url ? this.props.url : "https://www.youtube.com/embed/NJbKtYZCk4U?autoplay=1";
		console.log(sourceUrl);
		return (
			<IFrame source={sourceUrl} />
		)
	}
}

const IFrame = ({ source }) => {
  if (!source) {
  	return <div>iFrame not found</div>;
  }
  const src = source;
  return (
  	<div className="embedded-iframe" style ={{width:'100%'}}>
    	<iframe src={src}></iframe>
    </div>
  );
};
