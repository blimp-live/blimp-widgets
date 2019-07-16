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
  }

  render() {
		var account = this.props.account ? this.props.account : "TwitterDev";

    return (
			<div className={styles.twitterContainer}>
				<div className="panel-heading">
					 <h3 className="panel-title">
							{account}
					 </h3>
				</div>
				<div>
					<a className="twitter-timeline"
					  href={ "https://twitter.com/" + account }
						data-chrome="nofooter">
					</a>
				</div>
			</div>
		)
  }
};
