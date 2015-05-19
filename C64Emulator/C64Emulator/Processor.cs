using Hackaton;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C64Emulator.Processor
{
    public class Processor
    {
        private Memory _memory;

        public byte A { get; set; }
        public byte Y { get; set; }
        public byte X { get; set; }
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
        }

        public void Start(byte PCH, byte PCL)
        {
            PC = ToShort(PCH, PCL);

            while (true)
            {
                var instrCode = _memory.ReadAbsolute(PC);
                var instr = AssemblyInstructions.GetInstruction(instrCode);
                if (instr.InstructionType == AssemblyInstructionType.BRK)
                    break;

                if (instr.InstructionType == AssemblyInstructionType.LDA)
                {
                    if (instr.AddressingMode == AddressingMode.Immidiate)
                    {
                        PC++;
                        A = _memory.ReadAbsolute(PC);
                    }
                } else if (instr.InstructionType == AssemblyInstructionType.STA)
                {
                    if (instr.AddressingMode == AddressingMode.Immidiate)
                    {
                        PC++;
                        A = _memory.ReadAbsolute(PC);
                    }
                }
                //======================================================================================================

                //======================================================================================================
            }
        }
    }
}
