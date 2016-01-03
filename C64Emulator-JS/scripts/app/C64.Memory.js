define(function() {

    var Memory = function(){
        this.Size = 65536;
        var Storage = new Uint8Array(this.Size);

        this.Read = function(address) {
            return Storage[address];
        };
        this.Write  = function(address, value) {
            Storage[address] = value;
        };
    };

    return new Memory();
});