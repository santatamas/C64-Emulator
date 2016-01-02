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
         'app/C64.Helpers',
         'jquery'], function(memory, processor, instructions, helpers, $){

    $(document).ready(function(){
        //console.dir(memory);
        //console.dir(typeof memory.Read(0));

        //console.dir(instructions);

        //console.log(memory === processor.Memory);
        //console.dir(instructions.GetAssemblyInstruction(15));

        var address = helpers.intFromBytes([1,255]);
        console.log(helpers.decToBin(address));
    });
});