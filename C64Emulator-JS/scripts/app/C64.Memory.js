define(function() {

    var Memory = function(){
        var Size = 65536;
        var Storage = new Uint8Array(Size);

        this.Read = function(address) {
            return Storage[address];
        };
        this.Write  = function(address, value) {
            Storage[address] = value;
        };
    };

    return new Memory();
});