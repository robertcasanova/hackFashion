'use strict';

(function(){
    var socket = io.connect(location.origin);
    var $wall = $('.wall');

      socket.on('new:twit', function (data) {
        console.log(data);
        if(data.text.match(new RegExp('anticonformista','i'))) {
            $wall.removeClass().addClass('wall anticonformista');

        } else if (data.text.match(new RegExp('estroso','i'))) {
            $wall.removeClass().addClass('wall estroso');

        } else if (data.text.match(new RegExp('misterioso','i'))) {
            $wall.removeClass().addClass('wall misterioso');
        } else if (data.text.match(new RegExp('dinamico','i'))) {
            $wall.removeClass().addClass('wall dinamico');
        } else if (data.text.match(new RegExp('attento','i'))) {
            $wall.removeClass().addClass('wall attento');
        }

        $wall.html('<h1>'+data.text+'</h1>');

        //$wall.html('<h1>'+data.text+'</h1><p>'+data.tags+'</p>')

      });
})();
