$(document).ready(function(){
	// It decodes html element into plain text. Had to use is, due to input format.
	var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();
	// I don't use some functionality right now, but I'll probably use it in future
	function getQuote() { $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
     //   $('#author').text(post.title);
        $('#quote').html(post.content);
				let plainText = decodeEntities(post.content)
				$("#twitter-share").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURI(plainText) + "&hashtags=freeCodeCamp,quotes");

        // If the Source is available, use it. Otherwise hide it.
				/*
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        } */
      },
      cache: false
    }); }
	getQuote();
	$('#reset-btn').on('click', function(e) {
    e.preventDefault();
    getQuote();
  });
});