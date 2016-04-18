var ddb = require('dynamodb').ddb({
      accessKeyId:'AKIAITVGSV4RKN6IAWZA',
      secretAccessKey: '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',
      endpoint: "dynamodb.us-east-1.amazonaws.com" });

var app = require('express')();

// "        "
var database = { score: 0 };

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/get-score', (req, res) => {
  ddb.getItem('circle-game', 'universal-player', null, {},
    function(err, dynamoResult, cap) {
      res.send(dynamoResult)
  });
});

app.get('/set-score', (req, res) => {
  var newData = {
    "player-id" :"universal-player",
    score: parseInt(req.query.score)
  }
  
  ddb.putItem('circle-game', newData, {},
    function(err, dynamoResult, cap) {
      res.send({score: newData.score});
    });
});

app.listen(process.env.PORT || 3000);