using Hackaton;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C64Emulator
{
    public partial class Processor
    {
        private Memory _memory;

        public byte A { get; set; }
        public byte Y { get; set; } // low
        public byte X { get; set; } // high
        public byte S { get; set; }
        public byte P { get; set; }
        public ushort PC { get; set; }

        static ushort ToShort(byte byte1, byte byte2)
        {
            return (ushort)((byte2 << 8) | (byte1 << 0));
        }

        public Processor (Memory memory)
        {
            _memory = memory;
            Initialize();
        }

        public void Start(byte PCH, byte PCL)
        {
            PC = ToShort(PCH, PCL);

            while (true)
            {
                var instrCode = _memory.ReadAbsolute(PC);
                var instr = AssemblyInstructions.GetInstruction(instrCode);
                Action<AddressingMode> instrAction;
                instructions.TryGetValue(instr.InstructionType, out instrAction);
                if (instrAction == null)
                    throw new NotImplementedException();

                instrAction(instr.AddressingMode);

            }
        }

        private readonly Dictionary<AssemblyInstructionType, Action<AddressingMode>> instructions =
            new Dictionary<AssemblyInstructionType, Action<AddressingMode>>();

        private void Initialize()
        {
            instructions[AssemblyInstructionType.UNDEF] = null;
            instructions[AssemblyInstructionType.ADC] = null;
            instructions[AssemblyInstructionType.AND] = null;
            instructions[AssemblyInstructionType.ASL] = null;
            instructions[AssemblyInstructionType.BCC] = null;
            instructions[AssemblyInstructionType.BCS] = null;
            instructions[AssemblyInstructionType.BEQ] = null;
            instructions[AssemblyInstructionType.BIT] = null;
            instructions[AssemblyInstructionType.BMI] = null;
            instructions[AssemblyInstructionType.BNE] = null;
            instructions[AssemblyInstructionType.BPL] = null;
            instructions[AssemblyInstructionType.BRK] = BRK;
            instructions[AssemblyInstructionType.BVC] = null;
            instructions[AssemblyInstructionType.BVS] = null;
            instructions[AssemblyInstructionType.CLC] = null;
            instructions[AssemblyInstructionType.CLD] = null;
            instructions[AssemblyInstructionType.CLI] = null;
            instructions[AssemblyInstructionType.CLV] = null;
            instructions[AssemblyInstructionType.CMP] = null;
            instructions[AssemblyInstructionType.CPX] = null;
            instructions[AssemblyInstructionType.CPY] = null;
            instructions[AssemblyInstructionType.DEC] = null;
            instructions[AssemblyInstructionType.DEX] = null;
            instructions[AssemblyInstructionType.DEY] = null;
            instructions[AssemblyInstructionType.EOR] = null;
            instructions[AssemblyInstructionType.INC] = null;
            instructions[AssemblyInstructionType.INX] = null;
            instructions[AssemblyInstructionType.INY] = null;
            instructions[AssemblyInstructionType.JMP] = null;
            instructions[AssemblyInstructionType.JSR] = null;
            instructions[AssemblyInstructionType.LDA] = LDA;
            instructions[AssemblyInstructionType.LDX] = LDX;
            instructions[AssemblyInstructionType.LDY] = null;
            instructions[AssemblyInstructionType.LSR] = null;
            instructions[AssemblyInstructionType.NOP] = null;
            instructions[AssemblyInstructionType.ORA] = null;
            instructions[AssemblyInstructionType.PHA] = null;
            instructions[AssemblyInstructionType.PHP] = null;
            instructions[AssemblyInstructionType.PLA] = null;
            instructions[AssemblyInstructionType.PLP] = null;
            instructions[AssemblyInstructionType.ROL] = null;
            instructions[AssemblyInstructionType.ROR] = null;
            instructions[AssemblyInstructionType.RTI] = null;
            instructions[AssemblyInstructionType.RTS] = null;
            instructions[AssemblyInstructionType.SBC] = null;
            instructions[AssemblyInstructionType.SEC] = null;
            instructions[AssemblyInstructionType.SED] = null;
            instructions[AssemblyInstructionType.SEI] = null;
            instructions[AssemblyInstructionType.STA] = STA;
            instructions[AssemblyInstructionType.STX] = null;
            instructions[AssemblyInstructionType.STY] = null;
            instructions[AssemblyInstructionType.TAX] = null;
            instructions[AssemblyInstructionType.TAY] = null;
            instructions[AssemblyInstructionType.TSX] = null;
            instructions[AssemblyInstructionType.TXA] = null;
            instructions[AssemblyInstructionType.TXS] = null;
            instructions[AssemblyInstructionType.TYA] = null;
        }
    }
}
