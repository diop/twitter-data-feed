require('dotenv').config()
const fs = require('fs')
var Twit = require('twit')
var results = []
var arr = []
var len
var ticker = 'btc'


var T = new Twit({
  consumer_key:         CONSUMER_KEY,
  consumer_secret:      CONSUMER_SECRET,
  access_token:         ACCESS_TOKEN,
  access_token_secret:  ACCESS_TOKE_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

 T.get('search/tweets', { q:  ticker + ' since:2011-07-11', count: 100}, function(err, data, response) {

  for (var i = 0; i < data.statuses.length; i++) {
    if (data.statuses[i].lang == 'en') {
      results.push({
        ticker: ticker,
        text: data.statuses[i].text,
        handle: data.statuses[i].user.screen_name,
        time: data.statuses[i].created_at,
        language: data.statuses[i].lang
      })
    }
  }

  console.log(results)
})


// ticker, text, handle, time
