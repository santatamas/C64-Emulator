requirejs.config({
    baseUrl: "scripts/lib",
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        app: '../app',
        jquery: [
            'jquery',
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min'],
        bootstrap: 'bootstrap'
    }
});

require(['app/C64.Memory',
         'app/C64.Processor',
         'app/C64.Instructions',
         'app/C64.ASMLoader',
         'app/C64.Helpers',
         'app/C64.Visuals.Debug',
         'app/C64.Logger',
         'jquery'], function(memory, processor, instructions, loader, helpers, visuals,logger, $){

    $(document).ready(function(){

        $('#memory-contents').hide();
        $('#console').hide();


        $('#memContentHead').click(function() {
          $('#memory-contents').toggle();
        });

        $('#consoleHead').click(function() {
            $('#console').fadeToggle();
        });

        $('#btnExecuteNextStep').click(function(){
            processor.ExecuteNextInstruction();
            visuals.Refresh();
        });

        document.getElementById('file-input')
            .addEventListener('change', loader.Load, false);

        //TODO: implement event handling with pub/sub
    });
});