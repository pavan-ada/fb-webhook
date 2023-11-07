require('dotenv').config();

var express = require('express')
  , bodyParser = require('body-parser');

var app = express();
const token = process.env.WHATSAPP_TOKEN;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get("/", function (request, response) {
  response.send('Simple WhatsApp Webhook tester</br>There is no front-end, see server.js for implementation!');
});

app.get('/webhook', function(req, res) {
  if (
    req.query['hub.mode'] == 'subscribe') {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", function (request, response) {
  console.log('Incoming webhook: ' + JSON.stringify(request.body));
  response.sendStatus(200);
});

var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});