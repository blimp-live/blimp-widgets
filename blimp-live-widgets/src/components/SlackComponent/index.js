import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as slackfunctions from "./slackfunctions.js";

export default class SlackComponent extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      token: null,
      conversationList: null,
    };
  }

  // requestAuthorize() {
  //   // this.setState(state => ({
  //   //   isToggleOn: !state.isToggleOn
  //   // }));
  //   // console.log("Bhavika");
  //   fetch("https://slack.com/oauth/authorize", {
  //     method: 'GET',
  //     body: querystring.stringify({name: name, contents: contents})
  //   }).then(
  //       (response) => response.json()
  //   ).catch(
  //     // DEAL WITH ERROR CASE
  //   )
  // }

  render() {
    //NOTE TO SELF - change format of href
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log("code: " + code);

    console.log("Token:" + this.state.token);

    const clientId = "703442889253.697119810961";
    const redirectURL = "http://localhost:3000/"; // TODO when we change this, need to change redirect URL on slack app (https://api.slack.com/apps/ALH3HPUU9/oauth?set_up_redirect_urls=1&)
    const scope = "channels:read";
    //TODO: Pro tip: Slack recommends using the state parameter to avoid forgery attacks.
    var authorizeURL = "https://slack.com/oauth/authorize?scope=" + scope + "&client_id=" + clientId + "&redirect_uri=" + redirectURL;

    if (code == null) {
      return (
        <a href={authorizeURL}>
          <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png"/>
        </a>
      )
    }
    else if (this.state.token == null) {
      slackfunctions.requestAccessToken(this, clientId, code, redirectURL);
      return (
        // <button type="button" onClick={slackfunctions.requestAuthorize} >Authorize Blimp Access!</button>
  			<div className="container">
          <div className="col-xs-12">
          <h1>My Todos</h1>
          </div>
        </div>
		  )
    } else if (this.state.conversationList == null) {
      slackfunctions.readChat(this, this.state.token);
      return (
        // <button type="button" onClick={slackfunctions.requestAuthorize} >Authorize Blimp Access!</button>
  			<div className="container">
          <div className="col-xs-12">
          <h1>Todos</h1>
          </div>
        </div>
		  )
    } else {
      return (
        // <button type="button" onClick={slackfunctions.requestAuthorize} >Authorize Blimp Access!</button>
        <div className="container">
          <div className="col-xs-12">
          <h1> {this.state.conversationList[0].text} </h1>
          </div>
        </div>
      )
    }
  }
};

//https://api.slack.com/tutorials/app-creation-and-oauth --> steps


//https://restdb.io/blog/react-in-realtime
//https://api.slack.com/events-api
//https://slack.dev/python-slackclient/real_time_messaging.html


//https://api.slack.com/rtm --> this says use websockets
//https://api.slack.com/docs/oauth --> how to authenticate

//https://www.drupal.org/project/slack_to_drupal/issues/2756919 --> keep this link --> has to do with redirect URL
