define(function(){

    var AssemblyInstruction = function(type, mode)
    {
        this.Type = type;
        this.Mode = mode;
    }

    var AssemblyInstructions = function()
    {
        this.AddressingMode = {

            Implied:            'implied',
            IndexedIndirectX:   'IndexedIndirectX',
            IndirectIndexedY:   'IndirectIndexedY',
            Indirect:           'indirect',
            Absolute:           'absolute',
            AbsoluteX:          'absolutex',
            AbsoluteY:          'absolutey',
            Immediate:          'immediate',
            ZeroPage:           'zeropage',
            ZeroPageX:          'zeropageX',
            ZeroPageY:          'zeropageY',
            Accumulator:        'accumulator',
            Relative:           'relative'
        };
        this.AssemblyInstructionType = {
            UNDEF: 'undef',
            ADC: 'adc', // Add Memory to Accumulator with Carry
            AND: 'and', // "AND" Memory with Accumulator
            ASL: 'asl', // Shift Left One Bit (Memory or Accumulator)
            BCC: 'bcc', // Branch on Carry Clear
            BCS: 'bcs', // Branch on Carry Set
            BEQ: 'beq', // Branch on Result Zero
            BIT: 'bit', // Test Bits in Memory with Accumulator
            BMI: 'bmi', // Branch on Result Minus
            BNE: 'bne', // Branch on Result not Zero
            BPL: 'bpl', // Branch on Result Plus
            BRK: 'brk', // Force Break
            BVC: 'bvc', // Branch on Overflow Clear
            BVS: 'bvs', // Branch on Overflow Set
            CLC: 'clc', // Clear Carry Flag
            CLD: 'cld', // Clear Decimal Mode
            CLI: 'cli', // Clear interrupt Disable Bit
            CLV: 'clv', // Clear Overflow Flag
            CMP: 'cmp', // Compare Memory and Accumulator
            CPX: 'cpx', // Compare Memory and Index X
            CPY: 'cpy', // Compare Memory and Index Y
            DEC: 'dec', // Decrement Memory by One
            DEX: 'dex', // Decrement Index X by One
            DEY: 'dey', // Decrement Index Y by One
            EOR: 'eor', // "Exclusive-Or" Memory with Accumulator
            INC: 'inc', // Increment Memory by One
            INX: 'inx', // Increment Index X by One
            INY: 'iny', // Increment Index Y by One
            JMP: 'jpm', // Jump to New Location
            JSR: 'jsr', // Jump to New Location Saving Return Address
            LDA: 'lda', // Load Accumulator with Memory
            LDX: 'ldx', // Load Index X with Memory
            LDY: 'ldy', // Load Index Y with Memory
            LSR: 'lsr', // Shift Right One Bit (Memory or Accumulator)
            NOP: 'nop', // No Operation
            ORA: 'ora', // "OR" Memory with Accumulator
            PHA: 'pha', // Push Accumulator on Stack
            PHP: 'php', // Push Processor Status on Stack
            PLA: 'pla', // Pull Accumulator from Stack
            PLP: 'plp', // Pull Processor Status from Stack
            ROL: 'rol', // Rotate One Bit Left (Memory or Accumulator)
            ROR: 'ror', // Rotate One Bit Right (Memory or Accumulator)
            RTI: 'rti', // Return from Interrupt
            RTS: 'rts', // Return from Subroutine
            SBC: 'sbc', // Subtract Memory from Accumulator with Borrow
            SEC: 'sec', // Set Carry Flag
            SED: 'sed', // Set Decimal Mode
            SEI: 'sei', // Set Interrupt Disable Status
            STA: 'sta', // Store Accumulator in Memory
            STX: 'stx', // Store Index X in Memory
            STY: 'sty', // Store Index Y in Memory
            TAX: 'tax', // Transfer Accumulator to Index X
            TAY: 'tay', // Transfer Accumulator to Index Y
            TSX: 'tsx', // Transfer Stack Pointer to Index X
            TXA: 'txa', // Transfer Index X to Accumulator
            TXS: 'txs', // Transfer Index X to Stack Pointer
            TYA: 'tya' // Transfer Index Y to Accumulator
        };

        var _instructions = [
            new AssemblyInstruction(this.AssemblyInstructionType.BRK, this.AddressingMode.Implied),           // 00 - BRK
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.IndexedIndirectX),  // 01 - ORA - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 02 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 03 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 04 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.ZeroPage),          // 05 - ORA - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.ASL, this.AddressingMode.ZeroPage),          // 06 - ASL - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 07 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.PHP, this.AddressingMode.Implied),           // 08 - PHP
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.Immediate),         // 09 - ORA - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.ASL, this.AddressingMode.Accumulator),       // 0A - ASL - Accumulator
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 0B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 0C - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.Absolute),          // 0D - ORA - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.ASL, this.AddressingMode.Absolute),          // 0E - ASL - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 0F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BPL, this.AddressingMode.Relative),          // 10 - BPL
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.IndirectIndexedY),  // 11 - ORA - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 12 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 13 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 14 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.ZeroPageX),         // 15 - ORA - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.ASL, this.AddressingMode.ZeroPageX),         // 16 - ASL - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 17 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CLC, this.AddressingMode.Implied),           // 18 - CLC
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.AbsoluteY),         // 19 - ORA - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 1A - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 1B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 1C - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ORA, this.AddressingMode.AbsoluteX),         // 1D - ORA - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.ASL, this.AddressingMode.AbsoluteX),         // 1E - ASL - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 1F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.JSR, this.AddressingMode.Absolute),          // 20 - JSR
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.IndexedIndirectX),  // 21 - AND - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 22 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 23 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BIT, this.AddressingMode.ZeroPage),          // 24 - BIT - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.ZeroPage),          // 25 - AND - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.ROL, this.AddressingMode.ZeroPage),          // 26 - ROL - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 27 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.PLP, this.AddressingMode.Implied),           // 28 - PLP
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.Immediate),         // 29 - AND - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.ROL, this.AddressingMode.Accumulator),       // 2A - ROL - Accumulator
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 2B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BIT, this.AddressingMode.Absolute),          // 2C - BIT - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.Absolute),          // 2D - AND - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.ROL, this.AddressingMode.Absolute),          // 2E - ROL - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 2F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BMI, this.AddressingMode.Relative),          // 30 - BMI
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.IndirectIndexedY),  // 31 - AND - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 32 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 33 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 34 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.ZeroPageX),         // 35 - AND - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.ROL, this.AddressingMode.ZeroPageX),         // 36 - ROL - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 37 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.SEC, this.AddressingMode.Implied),           // 38 - SEC
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.AbsoluteY),         // 39 - AND - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 3A - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 3B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 3C - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.AND, this.AddressingMode.AbsoluteX),         // 3D - AND - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.ROL, this.AddressingMode.AbsoluteX),         // 3E - ROL - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 3F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.RTI, this.AddressingMode.Implied),           // 40 - RTI
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.IndexedIndirectX),  // 41 - EOR - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 42 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 43 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 44 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.ZeroPage),          // 45 - EOR - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.LSR, this.AddressingMode.ZeroPage),          // 46 - LSR - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 47 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.PHA, this.AddressingMode.Implied),           // 48 - PHA
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.Immediate),         // 49 - EOR - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.LSR, this.AddressingMode.Accumulator),       // 4A - LSR - Accumulator
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 4B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.JMP, this.AddressingMode.Absolute),          // 4C - JMP - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.Absolute),          // 4D - EOR - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.LSR, this.AddressingMode.Absolute),          // 4E - LSR - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 4F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BVC, this.AddressingMode.Relative),          // 50 - BVC
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.IndirectIndexedY),  // 51 - EOR - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 52 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 53 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 54 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.ZeroPageX),         // 55 - EOR - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.LSR, this.AddressingMode.ZeroPageX),         // 56 - LSR - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 57 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CLI, this.AddressingMode.Implied),           // 58 - CLI
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.AbsoluteY),         // 59 - EOR - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 5A - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 5B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 5C - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.EOR, this.AddressingMode.AbsoluteX),         // 50 - EOR - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.LSR, this.AddressingMode.AbsoluteX),         // 5E - LSR - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 5F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.RTS, this.AddressingMode.Implied),           // 60 - RTS
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.IndexedIndirectX),  // 61 - ADC - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 62 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 63 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 64 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.ZeroPage),          // 65 - ADC - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.ROR, this.AddressingMode.ZeroPage),          // 66 - ROR - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 67 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.PLA, this.AddressingMode.Implied),           // 68 - PLA
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.Immediate),         // 69 - ADC - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.ROR, this.AddressingMode.Accumulator),       // 6A - ROR - Accumulator
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 6B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.JMP, this.AddressingMode.Indirect),          // 6C - JMP - Indirect
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.Absolute),          // 6D - ADC - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.ROR, this.AddressingMode.Absolute),          // 6E - ROR - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 6F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BVS, this.AddressingMode.Relative),          // 70 - BVS
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.IndirectIndexedY),  // 71 - ADC - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 72 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 73 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 74 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.ZeroPageX),         // 75 - ADC - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.ROR, this.AddressingMode.ZeroPageX),         // 76 - ROR - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 77 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.SEI, this.AddressingMode.Implied),           // 78 - SEI
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.AbsoluteY),         // 79 - ADC - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 7A - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 7B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 7C - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.ADC, this.AddressingMode.AbsoluteX),         // 7D - ADC - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.ROR, this.AddressingMode.AbsoluteX),         // 7E - ROR - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 7F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 80 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.IndexedIndirectX),  // 81 - STA - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 82 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 83 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.STY, this.AddressingMode.ZeroPage),          // 84 - STY - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.ZeroPage),          // 85 - STA - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.STX, this.AddressingMode.ZeroPage),          // 86 - STX - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 87 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.DEY, this.AddressingMode.Implied),           // 88 - DEY
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 89 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.TXA, this.AddressingMode.Implied),           // 8A - TXA
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 8B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.STY, this.AddressingMode.Absolute),          // 8C - STY - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.Absolute),          // 8D - STA - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.STX, this.AddressingMode.Absolute),          // 8E - STX - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 8F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BCC, this.AddressingMode.Relative),          // 90 - BCC
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.IndirectIndexedY),  // 91 - STA - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 92 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 93 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.STY, this.AddressingMode.ZeroPageX),         // 94 - STY - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.ZeroPageX),         // 95 - STA - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.STX, this.AddressingMode.ZeroPageY),         // 96 - STX - Zero Page,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 97 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.TYA, this.AddressingMode.Implied),           // 98 - TYA
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.AbsoluteY),         // 99 - STA - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.TXS, this.AddressingMode.Implied),           // 9A - TXS
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 9B - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 9C - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.STA, this.AddressingMode.AbsoluteX),         // 90 - STA - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 9E - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // 9F - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.LDY, this.AddressingMode.Immediate),         // A0 - LDY - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.IndexedIndirectX),  // A1 - LDA - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.LDX, this.AddressingMode.Immediate),         // A2 - LDX - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // A3 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.LDY, this.AddressingMode.ZeroPage),          // A4 - LDY - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.ZeroPage),          // A5 - LDA - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.LDX, this.AddressingMode.ZeroPage),          // A6 - LDX - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // A7 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.TAY, this.AddressingMode.Implied),           // A8 - TAY
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.Immediate),         // A9 - LDA - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.TAX, this.AddressingMode.Implied),           // AA - TAX
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // AB - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.LDY, this.AddressingMode.Absolute),          // AC - LDY - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.Absolute),          // AD - LDA - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.LDX, this.AddressingMode.Absolute),          // AE - LDX - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // AF - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BCS, this.AddressingMode.Relative),          // B0 - BCS
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.IndirectIndexedY),  // B1 - LDA - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // B2 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // B3 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.LDY, this.AddressingMode.ZeroPageX),         // B4 - LDY - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.ZeroPageX),         // B5 - LDA - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.LDX, this.AddressingMode.ZeroPageY),         // B6 - LDX - Zero Page,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // B7 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CLV, this.AddressingMode.Implied),           // B8 - CLV
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.AbsoluteY),         // B9 - LDA - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.TSX, this.AddressingMode.Implied),           // BA - TSX
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // BB - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.LDY, this.AddressingMode.AbsoluteX),         // BC - LDY - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.LDA, this.AddressingMode.AbsoluteX),         // BD - LDA - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.LDX, this.AddressingMode.AbsoluteY),         // BE - LDX - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // BF - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CPY, this.AddressingMode.Immediate),         // C0 - Cpy - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.IndexedIndirectX),  // C1 - CMP - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // C2 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // C3 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CPY, this.AddressingMode.ZeroPage),          // C4 - CPY - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.ZeroPage),          // C5 - CMP - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.DEC, this.AddressingMode.ZeroPage),          // C6 - DEC - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // C7 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.INY, this.AddressingMode.Implied),           // C8 - INY
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.Immediate),         // C9 - CMP - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.DEX, this.AddressingMode.Implied),           // CA - DEX
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // CB - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CPY, this.AddressingMode.Absolute),          // CC - CPY - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.Absolute),          // CD - CMP - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.DEC, this.AddressingMode.Absolute),          // CE - DEC - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // CF - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BNE, this.AddressingMode.Relative),          // D0 - BNE
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.IndirectIndexedY),  // D1 - CMP   (Indirect@,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // D2 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // D3 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // D4 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.ZeroPageX),         // D5 - CMP - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.DEC, this.AddressingMode.ZeroPageX),         // D6 - DEC - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // D7 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CLD, this.AddressingMode.Implied),           // D8 - CLD
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.AbsoluteY),         // D9 - CMP - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // DA - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // DB - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // DC - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CMP, this.AddressingMode.AbsoluteX),         // DD - CMP - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.DEC, this.AddressingMode.AbsoluteX),         // DE - DEC - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // DF - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CPX, this.AddressingMode.Immediate),         // E0 - CPX - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.IndexedIndirectX),  // E1 - SBC - (Indirect,X)
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // E2 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // E3 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CPX, this.AddressingMode.ZeroPage),          // E4 - CPX - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.ZeroPage),          // E5 - SBC - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.INC, this.AddressingMode.ZeroPage),          // E6 - INC - Zero Page
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // E7 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.INX, this.AddressingMode.Implied),           // E8 - INX
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.Immediate),         // E9 - SBC - Immediate
            new AssemblyInstruction(this.AssemblyInstructionType.NOP, this.AddressingMode.Implied),           // EA - NOP
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // EB - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.CPX, this.AddressingMode.Absolute),          // EC - CPX - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.Absolute),          // ED - SBC - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.INC, this.AddressingMode.Absolute),          // EE - INC - Absolute
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // EF - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.BEQ, this.AddressingMode.Relative),          // F0 - BEQ
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.IndirectIndexedY),  // F1 - SBC - (Indirect),Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // F2 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // F3 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // F4 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.ZeroPageX),         // F5 - SBC - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.INC, this.AddressingMode.ZeroPageX),         // F6 - INC - Zero Page,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // F7 - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.SED, this.AddressingMode.Implied),           // F8 - SED
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.AbsoluteY),         // F9 - SBC - Absolute,Y
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // FA - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // FB - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // FC - Future Expansion
            new AssemblyInstruction(this.AssemblyInstructionType.SBC, this.AddressingMode.AbsoluteX),         // FD - SBC - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.INC, this.AddressingMode.AbsoluteX),         // FE - INC - Absolute,X
            new AssemblyInstruction(this.AssemblyInstructionType.UNDEF, this.AddressingMode.Implied),         // FF - Future Expansion
        ];

        this.GetAssemblyInstruction = function(bytecode) {
            return _instructions[bytecode];
        };
    };

    return new AssemblyInstructions();
});

