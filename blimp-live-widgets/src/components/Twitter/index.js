import React, { Component } from 'react'

export default class TwitterComponent extends Component {

	componentDidMount() {
		window.twttr = (function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0],  t = window.twttr || {};
			if (d.getElementById(id)) return t;
			js = d.createElement(s); js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);
			t._e = []; t.ready = function(f) {
				t._e.push(f);
			};
			return t;
		}(document, "script", "twitter-wjs"));
  }
	
  render() {
    return (
			<div>
				<a class="twitter-timeline"
				  href="https://twitter.com/TwitterDev"
				  data-width="400"
				  data-height="400">
				Tweets by @TwitterDev
				</a>
			</div>
		)
  }
};
