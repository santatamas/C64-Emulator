define(['app/C64.Helpers', 'app/C64.Memory','app/C64.Visuals.Debug','app/C64.Processor',],function(helpers, memory, visuals, processor){

    var reader = new FileReader();

    return {
        Load: function (e) {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            reader.onload = function (e) {
                var contents = e.target.result;
                var byteArray = new Uint8Array(contents); // contents will be an untyped ArrayBuffer
                var cnt = 0;

                var startPCH = 0;
                var startPCL = 0;

                var startAddress = helpers.intFromBytes([startPCH, startPCL]);

                byteArray.forEach(function(byte) {
                    if(cnt == 0) {
                        startPCH = byte;
                    }
                    if(cnt == 1) {
                        startPCL = byte;
                        startAddress = helpers.intFromBytes([startPCH, startPCL]);
                    }
                    else {
                        memory.Write(startAddress + (cnt - 2), byte);
                    }
                    cnt++;
                });

                processor.Start(startPCH, startPCL);
                visuals.Refresh();
                visuals.RefreshROMContents(byteArray);
            };
            reader.readAsArrayBuffer(file);
        },
        StartPCH: 0x00,
        StartPCL: 0x00
    }
});
