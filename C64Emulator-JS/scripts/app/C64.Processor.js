define(['app/C64.Memory','app/C64.Instructions', 'app/C64.Helpers'],function(memory,instructions, helpers){

    function Processor()
    {
        /* Registers */
        this.A = 0x00;          // Accumulator
        this.Y = 0x00;          // Index register
        this.X = 0x00;          // Index register
        var PCH = 0x00;         // Program Counter (High)
        var PCL = 0x00;         // Program Counter (Low)
        this.PC = 0x00;         // Program Counter
        this.S = 0x00;          // Stack Pointer
        this.Status = 0x00;     // Processor Status Register
                                // (Carry, Zero, IRQ, DEC, BRK, " ", Overflow, NEG)

        this.Memory = memory;

        this.Start = function(pch, pcl) {
            PCH = pch;
            PCL = pcl;
            this.PC = helpers.intFromBytes([pch, pcl]);

            while (true)
            {
                // Getting the next instruction byte code from memory
                var instrCode = this.Memory.Read(this.PC++);
                // Get instruction details from byte code
                var instruction = instructions.GetAssemblyInstruction(instrCode);

                // Get implementation function based on instruction type
                var implementation = this.GetImplementation(instruction.Type);

                // Execute function on this object
                implementation(instruction.Mode);
            }
        };

        this.GetImplementation = function(implementationType) {
            if(implementationType == instructions.AssemblyInstructionType.STA)
                return STA;

            //TODO: implement and add other instructions

            return function(mode){console.log('Unimplemented method: ' + implementationType);}
        };

        var STA = function(mode){
            if (mode == instructions.AddressingMode.Absolute) /*8D*/
            {
                this.Y = this.Memory.Read(this.PC++);
                this.X = this.Memory.Read(this.PC++);
                this.Memory.Write(helpers.intFromBytes(this.X, this.Y), this.A);
            }
        };
    };

    /* Status Register Flags */
    Object.defineProperty(Processor.prototype, 'StatusCarry', {
        get: function() { return (this.Status & 0x01) == 0x01; },
        set: function(value) {
            if (value)
                this.Status |= 0x01;
            else
                this.Status &= ~0x01;
        }
    });

    Object.defineProperty(Processor.prototype, 'StatusZero', {
        get: function() { return (this.Status & 0x02) == 0x02; },
        set: function(value) {
            if (value)
                this.Status |= 0x02;
            else
                this.Status &= ~0x02;
        }
    });

    Object.defineProperty(Processor.prototype, 'StatusNegative', {
        get: function() { return (this.Status & 0x80) == 0x80; },
        set: function(value) {
            if (value)
                this.Status |= 0x80;
            else
                this.Status &= ~0x80;
        }
    });

    return new Processor();
});