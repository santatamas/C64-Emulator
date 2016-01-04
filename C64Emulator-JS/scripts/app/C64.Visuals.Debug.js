define(['app/C64.Memory',
        'app/C64.Processor',
        'app/C64.Instructions',
        'app/C64.ASMLoader',
        'app/C64.Helpers',
        'app/C64.Logger',
        'jquery'], function(memory, processor, instructions, loader, helpers, logger, $) {

    var refreshMemoryMap = function() {
        var memoryContent = $('#memory-contents');
        memoryContent.empty();

        var result = '<span>';
        var memorySize = memory.Size;

        for(var i = 0;i < memorySize; i++)
        {
            if (i == processor.PC) {
                result += '<span style="background-color: green;color:white;">';
            }
            result += memory.Read(i);
            if (i == processor.PC) {
                result += '</span>';
            }
            result += ' ';
        }

        result += '</span>';
        memoryContent.append(result);
    };

    var refreshProcRegisters = function() {
        $('#cpu-reg-A').empty();
        $('#cpu-reg-A').append(processor.A);

        $('#cpu-reg-Y').empty();
        $('#cpu-reg-Y').append(processor.Y);

        $('#cpu-reg-X').empty();
        $('#cpu-reg-X').append(processor.X);

        $('#cpu-reg-PC').empty();
        $('#cpu-reg-PC').append(processor.PC);

        $('#cpu-reg-S').empty();
        $('#cpu-reg-S').append(processor.S);

        // update status flags
        $('#cpu-reg-flag-N').css('background-color', boolToFlagColor(processor.StatusNegative));
        $('#cpu-reg-flag-C').css('background-color', boolToFlagColor(processor.StatusCarry));
        $('#cpu-reg-flag-Z').css('background-color', boolToFlagColor(processor.StatusZero));

        $('#cpu-last-instruction').empty();

        if(typeof processor.CurrentInstruction != 'undefined')
            $('#cpu-last-instruction').append(processor.CurrentInstruction.Type);
    };

    var refreshROMContents = function(file) {
        var fileContent = $('#file-content');
        fileContent.empty();

        file.forEach(function(byte) {
            fileContent.append(helpers.decToBin(byte));
            fileContent.append(' ');
        });
    };

    var boolToFlagColor = function(value) {
      if(value) {
          return 'green';
       }
        return 'red';
    };

    return {
        Refresh: function(){
            refreshMemoryMap();
            logger.Log('...Memory refreshed.');

            refreshProcRegisters();
            logger.Log('...Processor Registers refreshed.');
        },
        RefreshROMContents: function(file) {
            refreshROMContents(file);
            logger.Log('...ROM content refreshed.');
        }
    }

});
