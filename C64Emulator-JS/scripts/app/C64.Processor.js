define(['app/C64.Memory', 'app/C64.Instructions', 'app/C64.Instructions.Impl', 'app/C64.Helpers', 'app/C64.Logger'],
    function(memory, instructions, impl, helpers, logger){

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

        };

        this.ExecuteNextInstruction = function(){
            // Getting the next instruction byte code from memory
            var instrCode = this.Memory.Read(this.PC++);
            // Get instruction details from byte code
            var instruction = instructions.GetAssemblyInstruction(instrCode);

            // for debug purposes
            this.CurrentInstruction = instruction;

            // Get implementation function based on instruction type
            this.tempImpl = this.GetImplementation(instruction.Type);
            this.tempImpl(instruction.Mode);
        };

        this.GetImplementation = function (implementationType) {

            switch (implementationType) {

                case instructions.AssemblyInstructionType.STA:
                    return impl.STA;
                case instructions.AssemblyInstructionType.LDA:
                    return impl.LDA;
                case instructions.AssemblyInstructionType.BNE:
                    return impl.BNE;
                case instructions.AssemblyInstructionType.BRK:
                    return impl.BRK;
                case instructions.AssemblyInstructionType.CPX:
                    return impl.CPX;
                case instructions.AssemblyInstructionType.INX:
                    return impl.INX;
                case instructions.AssemblyInstructionType.INY:
                    return impl.INY;
                case instructions.AssemblyInstructionType.LDX:
                    return impl.LDX;
                case instructions.AssemblyInstructionType.TAY:
                    return impl.TAY;
                case instructions.AssemblyInstructionType.TYA:
                    return impl.TYA;
                default:
                    return function (mode) { logger.Log('Unimplemented method: ' + implementationType); }
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
