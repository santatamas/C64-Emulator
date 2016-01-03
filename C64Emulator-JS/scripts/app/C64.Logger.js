define(['jquery'],function($){

    return {
        Log: function(message){
            $('#console').append('<li>' + message + '</li>');
            console.log(message);
        }
    };
});
