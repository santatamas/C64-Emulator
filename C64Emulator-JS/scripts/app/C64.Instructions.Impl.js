define(function(){
    return{
      STA: function(mode){
          if (mode == instructions.AddressingMode.Absolute) /*8D*/
          {
              this.Y = this.Memory.Read(this.PC++);
              this.X = this.Memory.Read(this.PC++);
              this.Memory.Write(helpers.intFromBytes(this.X, this.Y), this.A);
          }
      }
    };
});


