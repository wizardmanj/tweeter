//This generates a new tweet element; including all of the formatting for HTML content

function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $('<header>').addClass('flex-daddy');
    const $label = $('<div>').addClass('avatar-user');
        $('<img>').attr('src', tweet.user.avatars.small).appendTo($label);
        $('<span>').addClass('name').text(tweet.user.name).appendTo($label);
        $label.appendTo($header);
        $('<span>').text(tweet.user.handle).appendTo($header);
    const $body = $('<div>').addClass('tweet-body');
        $('<p>').text(tweet.content.text).appendTo($body);
        const $footer = $('<footer>').addClass('flex-daddy');
          $('<span>').text(moment(tweet.created_at).fromNow()).appendTo($footer);
    const $icons= $('<span>').addClass('feelings');
          $('<i>').addClass('fas fa-flag').appendTo($icons);
          $('<i>').addClass("fas fa-retweet").appendTo($icons);
          $('<i>').addClass('fas fa-heart').appendTo($icons);
        $icons.appendTo($footer);
        $tweet.append($header).append($body).append($footer);
        $('.tweet-container').append($tweet);
        return $tweet;
      };     

//This function renders all of the tweets, sorting them beggining with most recent
const renderTweets = tweets => {
  $('.tweet-container').empty();
  const newTweet = tweets.sort((a,b)=> b.created_at - a.created_at);
  
  $.each(tweets, function(index, tweetObj) {
    $('.tweet-container').append(createTweetElement(tweetObj));
  });
};  

//Modular function for handling AJAX requests
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

//This indicates all of the functionality to be run once
//the document has initially loaded.
$(document).ready(function() {
  $('.new-tweet').hide();
  const url = '/tweets/'
  const getOptions = {
    method: 'GET',
    url,
  }
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const postOptions = {
      method: 'POST',
      url,
      data: $(this).serialize()
    };
    if ($('.text-place').val().length > 140) {
     $('.alert-warning').slideDown();
     $('.error-message').text('Your message is a bit too long!');
    } else if ($('.text-place').val().trim() === '') {
      $('.alert-warning').slideDown();
      $('.error-message').text('That doesn\'t count... try again!');
    } else {
      $('.alert-warning').hide();
      request(postOptions, function(response) {
        request(getOptions, function(response) {
          renderTweets(response);
        });
      });
    }});

    request(getOptions, function(response) {
      renderTweets(response);

    $('.compose-button').on('click', function(event) {
      $('.alert-warning').hide();
      $('.new-tweet').slideToggle();
      $('.text-place').focus();
      });
    });
  });