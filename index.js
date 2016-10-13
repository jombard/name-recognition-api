var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 31899;
var {config} = require('./config');

app.use(bodyParser());

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
	api_key: config.apikey
});

app.post('/names', function(req, res){
	//console.log("post", req.body);

	var parameters = {
		text: req.body.text
	};

	alchemy_language.entities(parameters, function(err, resp){
		if(err) {
			//console.log("error", err);
			return res.send(err)
		} else {
			//console.log(resp);
			return res.send(resp);
		}
	});
});

app.listen(PORT, function(){
	console.log('Express server running on port', PORT);
});