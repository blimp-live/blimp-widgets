import React, { Component } from 'react'

export default class IFrameComponent extends Component {
	render() {
		var sourceUrl = this.props.url ? this.props.url : "https://www.youtube.com/embed/h_m-BjrxmgI";
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
  	<div className="embedded-iframe">
    	<iframe src={src}></iframe>
    </div>
  );
};
