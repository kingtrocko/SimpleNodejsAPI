var http    = require('http'), //To create the HTTP server this modulue shoulbe be loaded
    fs      = require('fs'), //load this module to read files in the file system
    router  = require('./routes.js'),
    jsonObj = require('./data.json'),
    path    = require('path');

var jsonUrl = "http://www.cs.toronto.edu/~mashiyat/csc309/Assignments/favs.json";

//Get all tweets available in the archive.
router.registerRoute('get-tweets', function(req, res, data){
  var tweets = [];
  jsonObj.forEach(function(tweet){
    tweets.push({
      id: tweet.id,
      text: tweet.text,
      created_by: '@' + tweet.user.screen_name,
      created_at: tweet.created_at,
      language: tweet.lang
    });
  });

  res.end(JSON.stringify(tweets));
});

//Get all known Twitter users included in the archive.
router.registerRoute('get-users', function(req, res, data){
  var users = [];
  jsonObj.forEach(function(tweet){
    users.push({
      id: tweet.user.id,
      name: tweet.user.name,
      screen_name: '@' + tweet.user.screen_name,
      location: tweet.user.location,
      friends_count: tweet.user.friends_count,
      time_zone: tweet.user.time_zone,
      description: tweet.user.description
    });
  });
  res.end(JSON.stringify(users));
});

//Get a list of all external links included in tweets from the archive.
router.registerRoute('get-external-links', function(req, res, data){
  var urls = [];
  jsonObj.forEach(function(item){
    item.entities.urls.forEach(function(urlItem){
      urls.push({
        url: urlItem.url
      });
    })
  });
  res.end(JSON.stringify(urls));
});

//Get the details about a given tweet (given the tweet’s id).
router.registerRoute('get-tweet-details', function(req, res, data){
  var tweetDetails = [];
  if(data.get.id){
    jsonObj.forEach(function(tweet){
        if(tweet.id.toString() === data.get.id){
          tweetDetails.push({
            id: tweet.id,
            created_at: tweet.created_at,
            tweet_text: tweet.text,
            created_by: '@' + tweet.user.screen_name
          });
        }
    });
  }
  res.end(JSON.stringify(tweetDetails));
});

//Get detailed profile information about a given Twitter user (given the user’s screen name).
router.registerRoute('get-user-info', function(req, res, data){
  var user = [];
  if(data.get.screen_name){
    jsonObj.forEach(function(tweet){
      if(tweet.user.screen_name === data.get.screen_name)
      user.push({
        id: tweet.user.id,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        location: tweet.user.location,
        friends_count: tweet.user.friends_count,
        time_zone: tweet.user.time_zone,
        description: tweet.user.description
      });
    });
  }
  res.end(JSON.stringify(user));
});

//Gets detail information about all the tweets text
router.registerRoute('get-text-info', function(req, res, data){
  var tweets = [];
  jsonObj.forEach(function(tweet){
    tweets.push({
      tweet_id: tweet.id,
      mentions: tweet.entities.user_mentions,
      hashtags: tweet.entities.hashtags,
      media: tweet.entities.media
    });
  });
  res.end(JSON.stringify(tweets));
});

router.registerRoute('', function(req, res, info){
  var filePath = './public/index.html';
  var contentType = 'text/html';

  if(path.extname(req.url) === '.js') {
    filePath = './public/js/app.js';
    contentType = 'text/javascript';
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
        console.log('Error while reading the' + filePath + 'file: ' + err);
        res.writeHead(500);
				res.end();
      }
      res.writeHeader(200, {"Content-Type": contentType});
      res.write(data);
      res.end();
  });
});


// Configuring the HTTP server to respond to requests.
var server = http.createServer(router.process);

//Listen to HTTP request on port 3000
server.listen(process.env.PORT || '3000');

//Print a message to the console to make sure whe have reached here without any error
console.log("Server running at http://127.0.0.1:3000/");
