import React, { Component } from 'react'


const twitter_widget_js = 'https://platform.twitter.com/widgets.js'

export default class TwitterComponent extends Component {
	// componentDidMount() {
	// 	  // twttr.widgets.load()
  //   twttr.ready(() => {
  //     twttr.widgets.createTimeline(widgetId, this.refs.container)
  //   })
  // }

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
		twttr.ready(() => {
				// twttr.widgets.load()
				twttr.widgets.createShareButton(
				  "https:\/\/dev.twitter.com\/web\/tweet-button",
				  document.getElementById("tweet-container"), // <-- set this to your twitter button's id
				  {
				    size: "large",
				    text: "custom share text", // <-- this should be your quote
				    hashtags: "example,demo",
				    via: "twitterdev",
				    related: "twitterapi,twitter"
				  }
				)
			}
		)
  }

  render() {
    return (
			<div>
				<p>HI</p>
				<a href="https://twitter.com/your-twitter-page"
			    className="twitter-follow-button tweetButton tweet-container"
			    data-show-count="false"
			    data-show-screen-name="false"
			  >
				</a>
				<a
				className="twitter-share-button"
				href="https://twitter.com/intent/tweet"
				>
				 Tweet
				</a>
			</div>
		)
  }
};

//THIS IS NOT WORKING
//TRYING TO COMPILE

// <script>window.twttr = (function(d, s, id) {
// 	var js, fjs = d.getElementsByTagName(s)[0],  t = window.twttr || {};
// 	if (d.getElementById(id)) return t;
// 	js = d.createElement(s); js.id = id;
// 	js.src = "https://platform.twitter.com/widgets.js";
// 	fjs.parentNode.insertBefore(js, fjs);
// 	t._e = []; t.ready = function(f) {
// 		t._e.push(f);
// 	};
// 	return t;
// }(document, "script", "twitter-wjs"));
// </script>

// const IFrame = ({ source }) => {
//   if (!source) {
//   	return <div>iFrame not found</div>;
//   }
//   const src = source;
//   return (
//   	<div className="embedded-iframe">
//     	<iframe src={src}></iframe>
//     </div>
//   );
// };
