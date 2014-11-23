(function($){

    // $.get('/api/twits', function(data){
    //     console.log(data);
    // });
    var socket = io.connect('http://localhost:3000');

    $('form').submit(function(e){
        e.preventDefault();

        var twit = $(this).serializeArray();

        $.ajax({url:'/api/twits',method:'POST', data: twit}).done(function(data){

            if(data.id) {
                location.href = '/msg/'+data.id;
            }

        });

    });


})(jQuery);
