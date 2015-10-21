var API         = {};
var rowTemplate = '<tr>{0}</tr>';
var thTemplate  = '<td>{0}</td>';
var tableData   = [];

API.endpoints = {
  MakeRequest: function(url, obj){
    //hide all other tables
    $('table').attr('hidden', '');

    switch (url) {
      case '/get-tweets':
        this.GetTweets(url);
        break;
      case '/get-users':
        this.GetUsers(url);
        break;
      case '/get-external-links':
        this.GetLinks(url);
        break;
      case '/get-tweet-details':
        this.GetTweet(url, obj);
        break;
      case '/get-user-info':
        this.GetUser(url, obj);
        break;
      case '/get-text-info':
        this.GetTweetsDetails(url);

    }
  },
  GetTweets: function(url){
    //show only this table
    $('#all-tweets').removeAttr('hidden');

    //delete all table rows to avoid duplicates
    $("#all-tweets tbody").empty();

    $.getJSON(url,function(data){
      data.forEach(function(tweet){
        tableData.push(thTemplate.replace('{0}', tweet.id));
        tableData.push(thTemplate.replace('{0}', tweet.text));
        tableData.push(thTemplate.replace('{0}', tweet.created_by));
        tableData.push(thTemplate.replace('{0}', tweet.created_at));
        tableData.push(thTemplate.replace('{0}', tweet.language));

        //Appends the data to the corresponding table
        $('#all-tweets tbody').append(rowTemplate.replace('{0}', tableData.join('')));
        tableData = [];
      });
    });
  },
  GetUsers: function(url){
    //show only this table
    $('#all-users').removeAttr('hidden');

    //delete all table rows to avoid duplicates
    $("#all-users tbody").empty();

    $.getJSON(url, function(data){
      data.forEach(function(users){
        tableData.push(thTemplate.replace('{0}', users.id));
        tableData.push(thTemplate.replace('{0}', users.name));
        tableData.push(thTemplate.replace('{0}', users.screen_name));
        tableData.push(thTemplate.replace('{0}', users.location));
        tableData.push(thTemplate.replace('{0}', users.friends_count));
        tableData.push(thTemplate.replace('{0}', users.time_zone));
        tableData.push(thTemplate.replace('{0}', users.description));

        //Appends the data to the corresponding table
        $('#all-users tbody').append(rowTemplate.replace('{0}', tableData.join('')));
        tableData = [];
      });
    });
  },
  GetLinks: function(url){
    //show only this table
    $('#external-links').removeAttr('hidden');

    //delete all table rows to avoid duplicates
    $("#external-links tbody").empty();

    $.getJSON(url,function(data){
      data.forEach(function(urls){
        var tag = "<a href=" + urls.url + " target='_blank'>"+ urls.url+"</a>";
        tableData.push(thTemplate.replace('{0}', tag));

        //Appends the data to the corresponding table
        $('#external-links tbody').append(rowTemplate.replace('{0}', tableData.join('')));
        tableData = [];
      });
    });
  },
  GetTweet: function(url, obj){
    //show only this table
    $('#a-tweet').removeAttr('hidden');

    //delete all table rows to avoid duplicates
    $("#a-tweet tbody").empty();

    $.getJSON(url,obj,function(data){
      data.forEach(function(tweet){
        tableData.push(thTemplate.replace('{0}', tweet.id));
        tableData.push(thTemplate.replace('{0}', tweet.created_by));
        tableData.push(thTemplate.replace('{0}', tweet.tweet_text));
        tableData.push(thTemplate.replace('{0}', tweet.created_at));

        //Appends the data to the corresponding table
        $('#a-tweet tbody').append(rowTemplate.replace('{0}', tableData.join('')));
        tableData = [];
      });
    });
  },
  GetUser: function(url, obj){
    //show only this table
    $('#a-user').removeAttr('hidden');

    //delete all table rows to avoid duplicates
    $("#a-user tbody").empty();

    $.getJSON(url, obj, function(data){
      data.forEach(function(user){
        tableData.push(thTemplate.replace('{0}', user.id));
        tableData.push(thTemplate.replace('{0}', user.name));
        tableData.push(thTemplate.replace('{0}', user.screen_name));
        tableData.push(thTemplate.replace('{0}', user.location));
        tableData.push(thTemplate.replace('{0}', user.friends_count));
        tableData.push(thTemplate.replace('{0}', user.time_zone));
        tableData.push(thTemplate.replace('{0}', user.description));

        //Appends the data to the corresponding table
        $('#a-user tbody').append(rowTemplate.replace('{0}', tableData.join('')));
        tableData = [];
      });
    });
  },
  GetTweetsDetails: function(url){
    //show only this table
    $('#tweets-extras').removeAttr('hidden');

    //delete all table rows to avoid duplicates
    $("#tweets-extras tbody").empty();

    $.getJSON(url, function(data){
      data.forEach(function(tweet){
        var mentions = [];
        var hashtags = [];
        var media = [];
        var cont = 1;
        if(tweet.mentions){
          tweet.mentions.forEach(function(m){
            mentions.push('@' + m.screen_name);
          });
        }
        if(tweet.hashtags){
          tweet.hashtags.forEach(function(h){
            hashtags.push('#'+ h.text);
          });
        }
        if(tweet.media){
          tweet.media.forEach(function(media_item){
            var name = 'image ' + cont.toString();
            media.push("<a href="+media_item.media_url+ " target='_blank'>"+name+"</a>");
            cont++;
          });
        }

        tableData.push(thTemplate.replace('{0}', tweet.tweet_id));
        tableData.push(thTemplate.replace('{0}', mentions.join(',') || 'N/A'));
        tableData.push(thTemplate.replace('{0}', hashtags.join(',') || 'N/A'));
        tableData.push(thTemplate.replace('{0}', media.join(',') || 'N/A'));

        //Appends the data to the corresponding table
        $('#tweets-extras tbody').append(rowTemplate.replace('{0}', tableData.join('')));
        tableData = [];
      });
    });
  }
};
