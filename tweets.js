require('dotenv').config()

const fs = require('fs')
var Twit = require('twit')
var results = []
var arr = []
var len
var ticker = 'btc'


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKE_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

 T.get('search/tweets', { q:  ticker, count: 100, lang: 'en'}, function(err, data, response) {

  for (var i = 0; i < data.statuses.length; i++) {
    if (data.statuses[i].lang == 'en') {
      results.push({
        twitter_id: data.statuses[i].id,
        ticker: ticker,
        text: data.statuses[i].text,
        handle: data.statuses[i].user.screen_name,
        time: data.statuses[i].created_at,
        language: data.statuses[i].lang
      })
    }
  }

  console.log(data)
  console.log(data.statuses.length)
  // console.log(data.statuses[0])
})

const getTweetsByInterval = (ticker, minutesInterval) => {
  T.get('search/tweets', { q:  ticker + ' since:2011-07-11', count: 100}, function(err, data, response) {
    for (var i = 0; i < data.statuses.length; i++) {
      if (data.statuses[i].lang == 'en') {
        results.push({
          twitter_id: data.statuses[i].id,
          ticker: ticker,
          text: data.statuses[i].text,
          handle: data.statuses[i].user.screen_name,
          time: data.statuses[i].created_at,
          language: data.statuses[i].lang
        })
      }
    }
  })
}

const getInitialTweet = () => {
  T.get('search/tweets', { q:  ticker + ' since:2011-07-11', count: 10}, function(err, data, response) {
    for (var i = 0; i < data.statuses.length; i++) {
      if (data.statuses[i].lang == 'en') {
        results.push({
          twitter_id: data.statuses[i].id,
          ticker: ticker,
          text: data.statuses[i].text,
          handle: data.statuses[i].user.screen_name,
          time: data.statuses[i].created_at,
          language: data.statuses[i].lang
        })
      }
    }
  })
}

module.exports = { getTweetsByInterval, getInitialTweet }
