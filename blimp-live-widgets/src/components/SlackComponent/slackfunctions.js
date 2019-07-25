// var express = require('express')
// var app = express()

const querystring = require('querystring');

export function requestAuthorize() {
  // this.setState(state => ({
  //   isToggleOn: !state.isToggleOn
  // }));

  // console.log("Bhavika Shaarma");

  var queryParams = querystring.stringify({
    client_id: "703442889253.697119810961",
    scope: "channels:history",
  });

  var queryURL = "https://slack.com/oauth/authorize" + queryParams

  fetch(queryURL, {
    method: 'GET',
  }).then(
      (response) => {
        response.json();
        console.log(response.json());
      }
  ).catch(
    (err: any) => {
      console.error(`NETWORK ERROR in oauth authorize: ${err.message}`)
    }
  )
}


// app.get('/auth/redirect', (req, res) =>{
//     var options = {
//         uri: 'https://slack.com/api/oauth.access?code='
//             +req.query.code+
//             '&client_id='+process.env.CLIENT_ID+
//             '&client_secret='+process.env.CLIENT_SECRET+
//             '&redirect_uri='+process.env.REDIRECT_URI,
//         method: 'GET'
//     }
//     request(options, (error, response, body) => {
//         var JSONresponse = JSON.parse(body)
//         if (!JSONresponse.ok){
//             console.log(JSONresponse)
//             res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
//         }else{
//             console.log(JSONresponse)
//             res.send("Success!")
//         }
//     })
// })

export function requestAccessToken(state, clientId, code, redirectURL) {
  console.log("requestAccessToken");

  var queryParams = querystring.stringify({
    client_id: clientId,
    client_secret: "9f6a89c785eed458924f00d1e89933b3",
    code: code,
    redirect_uri: redirectURL,
  });

  var queryURL = "https://slack.com/api/oauth.access";

  // fetch(queryURL, {
  //   method: 'PUT',
  //   headers: {
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     // 'Access-Control-Allow-Credentials' : true,
  //     // 'Access-Control-Allow-Origin':'*',
  //     // 'Access-Control-Allow-Methods':'PUT',
  //   },
  //   body: queryParams
  // }).then(
  //     (response: any) => {
  //       var responseJSON = response.json()
  //       console.error(`responseJSON: ${responseJSON}`);
  //     }
  // ).catch(
  //     (err: any) => {
  //       console.error(`NETWORK ERROR: ${err.message}`);
  //     }
  // )

  var authToken = null;

  const token = fetch(queryURL, {
    method: 'POST',
    headers: {
      // 'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // 'Access-Control-Allow-Headers': 'Authorization',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': 'Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3', // this is to encrypt the client id and client secret
    },
    //mode: 'no-cors',
    body: queryParams,
  }).then( (response) =>
    response.json().then(data => ({
        data: data,
        status: response.status
    }))
    ).then( res => {
      console.log(`No ERROR: ${res.status}`);
      console.log(res.data);
      authToken = res.data["access_token"];
      console.log("Access Token 1: " + authToken);
      state.setState({token: authToken});
    }).catch(
      (err) => {
        console.error(`NETWORK ERROR: ${err.message}`);
      }
    )


    /* State of code rn:
      https://stackoverflow.com/questions/45752537/slack-incoming-webhook-request-header-field-content-type-is-not-allowed-by-acce  states

      That Slack API endpoint unfortunately appears to be broken in its handling of cross-origin requests from frontend JavaScript code—
      in that it doesn’t handle the CORS preflight OPTIONS request as it should—so the only solution seems to be omit the Content-Type header

      Similar situation with the Authorization header. BUT, this header is needed to encrypt client secret and client id.

      https://api.slack.com/docs/oauth - on step 3 right now

      Going forward, could either try continuing and sending clients plain text, or somehow create an endpoint, which does the redirecting (look for examples online/on Slack documentation).

    */

  // fetch(queryURL, {
  //   method: 'POST',
  // }).then(
  //     (response) => {
  //       response.json();
  //       console.log(response.json());
  //     }
  // ).catch(
  //   (err: any) => {
  //     console.error(`NETWORK ERROR in oauth authorize: ${err.message}`)
  //   }
  // )
}

export function readChat(state, authToken) {
  console.log("readChat " + authToken);

  var queryParams = querystring.stringify({
    token: authToken,
    channel: "CLH2JRSRX",
  });

  var queryURL = "https://slack.com/api/conversations.history";

  const token = fetch(queryURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryParams,
  }).then( (response) =>
    response.json().then(data => ({
        data: data,
        status: response.status
    }))
    ).then( res => {
      console.log(res.data);
      state.setState({
        conversationList: res.data.messages
        });
    }).catch(
      (err) => {
        console.error(`NETWORK ERROR: ${err.message}`);
      }
    )
}

//https://stackoverflow.com/questions/45696999/fetch-unexpected-end-of-input
