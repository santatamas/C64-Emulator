define(['app/C64.Instructions', 'app/C64.Helpers'], function (instructions, helpers) {
    return{
        STA: function(mode){
          if (mode == instructions.AddressingMode.Absolute) /*8D*/
          {
              this.Y = this.Memory.Read(this.PC++);
              this.X = this.Memory.Read(this.PC++);
              this.Memory.Write(helpers.intFromBytes(this.X, this.Y), this.A);
          }
        },
        LDA: function(mode) {
            this.A = this.Memory.Read(this.PC++);
        },


        BNE: function(mode) {
            this.PC++;
        },
        BRK: function(mode) {
            // do nothing
        },
        CPX: function(mode) {
            if (mode == instructions.AddressingMode.Immediate) {
                var a = this.Memory.Read(this.PC++);
                var b = this.Memory.Read(this.PC++);
                var c = this.Memory.Read(helpers.intFromBytes(a, b));
                this.StatusZero = (c == this.X);
                this.PC++;
            }
        },
        INX: function(mode) {
            this.X++;
            this.PC++;
        },
        INY: function (mode) {
            this.Y++;
            this.PC++;
        },
        LDX: function (mode) {
            this.X = this.Memory.Read(this.PC++);
        },
        TAY: function(mode) {
            this.Y = this.A;
            this.PC++;
        },
        TYA: function (mode) {
            this.A = this.Y;
            this.PC++;
        }
    };
});


