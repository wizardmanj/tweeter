const tweets = [
    {
      user: {
        name: "Newton",
        avatars: {
          small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        handle: "@SirIsaac"
      },
        content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: {
          small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1461113959088
    },
    {
      user: {
        name: "Johann von Goethe",
        avatars: {
          small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        handle: "@johann49"
      },
      content: {
        text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      created_at: 1461113796368
    }
  ];

function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $('<header>').addClass('flex-daddy');
    const $label = $('<div>').addClass('avatar-user');
        $('<img>').attr('src', tweet.user.avatars.small).appendTo($label);
        $('<span>').addClass('name').text(tweet.user.name).appendTo($label);
        $('<span>').text(tweet.user.handle).appendTo($label);
    const $body = $('<div>').addClass('tweet-body');
        $('<p>').text(tweet.content.text).appendTo($body);
    const $footer = $('<footer>').addClass('flex-daddy');
        $('<span>').text(tweet.created_at).appendTo($footer);
        $('<span>').addClass('feelings').text('symbols').appendTo($footer);

    // $tweet.append($header).append($label).append($body).append($footer);
    $header.appendTo($tweet);
    $label.appendTo($tweet);
    $body.appendTo($tweet);
    $footer.appendTo($tweet);
    $('.tweet-container').append($tweet);
    return $tweet;
};

$(document).ready(function() {
    tweets.forEach((tweet)=> {
        createTweetElement(tweet);
    });
});