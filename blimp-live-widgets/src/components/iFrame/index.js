import React, { Component } from 'react'

export default class IFrameComponent extends Component {
	render() {
		return (
			<IFrame source={this.props.url} />
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
