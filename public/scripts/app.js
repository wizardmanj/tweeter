// const tweets = [
//     {
//       user: {
//         name: "Newton",
//         avatars: {
//           small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//           regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//           large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         handle: "@SirIsaac"
//       },
//         content: {
//         text:
//           "If I have seen further it is by standing on the shoulders of giants"
//       },
//       created_at: 1461116232227
//     },
//     {
//       user: {
//         name: "Descartes",
//         avatars: {
//           small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//           regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//           large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         handle: "@rd"
//       },
//       content: {
//         text: "Je pense , donc je suis"
//       },
//       created_at: 1461113959088
//     },
//     {
//       user: {
//         name: "Johann von Goethe",
//         avatars: {
//           small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//           regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//           large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         handle: "@johann49"
//       },
//       content: {
//         text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//       },
//       created_at: 1461113796368
//     }
//   ];

function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $('<header>').addClass('flex-daddy');
    const $label = $('<div>').addClass('avatar-user')
        $('<img>').attr('src', tweet.user.avatars.small).appendTo($label);
        $('<span>').addClass('name').text(tweet.user.name).appendTo($label);
        $label.appendTo($header)
        $('<span>').text(tweet.user.handle).appendTo($header);
    const $body = $('<div>').addClass('tweet-body');
        $('<p>').text(tweet.content.text).appendTo($body);
        const $footer = $('<footer>').addClass('flex-daddy');
        $('<span>').text(tweet.created_at).appendTo($footer);
        $('<span>').addClass('feelings').text('symbols').appendTo($footer);
        
        $tweet.append($header).append($body).append($footer);
        $('.tweet-container').append($tweet);
        return $tweet;
      };
      
const renderTweets = tweets => {
  $.each(tweets, function(index, tweetObj) {
    $('.new-tweet').append(createTweetElement(tweetObj));
  });
};  
  
//creates the AJAX request
const request = (requestOptions, cb) => {
  $.ajax(requestOptions)
 
  .done(response => {
    cb(response);
  })
  .fail(err => {
    console.log(`Error: ${err}`);
  })
  .always(() => {
    console.log('Request completed');
  });
};

$(document).ready(function() {
  const url = '/tweets/'
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const postOptions = {
      method: 'POST',
      url,
      data: $(this).serialize()
    };
    request(postOptions, function(response) {
      renderTweets();
    });
  });

    const getOptions = {
      method: 'GET',
      url,
      dataType: 'json'
    }
  request(getOptions, function(response) {
    renderTweets(response);
  });;
});