define(function() {

    return {
        setbit: function(bitstring, bitposition) {
            return bitstring | (1 << bitposition);
        },
        clearbit: function(bitstring, bitposition) {
            return bitstring & ~(1<<bitposition);
        },
        decToBin: function(dec) {
            return (dec >>> 0).toString(2);
        },
        intFromBytes: function(bytearray) {
            var val = 0;
            for (var i = 0; i < bytearray.length; ++i) {
                val += bytearray[i];
                if (i < bytearray.length-1) {
                    val = val << 8;
                }
            }
            return val;
        }
    };
});
