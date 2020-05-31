const functions = require("firebase-functions");
require("dotenv").config();
const Twit = require("twit");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const cors = require("cors")({ origin: true });

exports.tweep = functions.region("asia-east2").https.onRequest((req, res) => {
  cors(req, res, () => {
    const T = new Twit({
      consumer_key: process.env.consumer_key,
      consumer_secret: process.env.consumer_secret,
      access_token: process.env.access_token,
      access_token_secret: process.env.access_token_secret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });
    T.get("search/tweets", req.body, (err, data, response) => {
      if (err) {
        res.status(500);
        res.send(err);
      }
      d = data.statuses.map((t) => {
        return { text: t.text, sentiment: sentiment.analyze(t.text) };
      });
      res.json(d);
    });
  });
});
