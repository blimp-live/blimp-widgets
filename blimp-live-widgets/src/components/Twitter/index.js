import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './twitter-feed.module.css'

export default class TwitterComponent extends Component {
	static propTypes = {
		account: PropTypes.string
	}

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
		window.twttr.ready(function (twttr) {
			window.twttr.events.bind('rendered',function(){
				[].slice.call(document.querySelectorAll('iframe.twitter-timeline')).forEach(function(e,i,a){

				  var tweetText = e.contentDocument.getElementsByClassName('timeline-Tweet-text');
				  if(tweetText.length){
					for (var i = 0; i < tweetText.length; i++) {
						tweetText[i].style.fontSize='20px'; //This is a backup in case vw doesn't work (e.g. old browser)
						tweetText[i].style.lineHeight='20px'; //This is a backup in case vw doesn't work (e.g. old browser)
						tweetText[i].style.fontSize='1.5vw';
						tweetText[i].style.lineHeight='1.5vw';
					}
				  }
				  var tweetHeader = e.contentDocument.getElementsByClassName('timeline-Header');
				  if(tweetHeader.length){
					for (var i = 0; i < tweetHeader.length; i++) {
						tweetHeader[i].style.display='none';
					}
				  }
				  var timelineWidget = e.contentDocument.getElementsByClassName('timeline-Widget');
				  if(timelineWidget.length){
					for (var i = 0; i < timelineWidget.length; i++) {
						timelineWidget[i].style.borderRadius='0px';
					}
				  }
				});
			  });
		});

  }

  render() {
		var account = this.props.account ? this.props.account : "HackTheNorth";

    return (
			<div className={styles.twitterContainer}>
				{/* <div className="panel-heading">
					 <h3 className="panel-title">
							{account}
					 </h3>
				</div> */}
				<div>
					<a className="twitter-timeline"
					  href={ "https://twitter.com/" + account }
						data-chrome="nofooter"
						data-tweet-limit="3"
						>
					</a>
				</div>
			</div>
		)
  }
};
