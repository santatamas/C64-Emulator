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
        public byte Y { get; set; } // low
        public byte X { get; set; } // high
        public byte S { get; set; }
        public byte P { get; set; }
        public ushort PC { get; set; }

        static ushort ToShort(byte byteL, byte byteH)
        {
            return (ushort)((byteH << 8) | (byteL << 0));
        }

        public Processor (Memory memory)
        {
            _memory = memory;
        }

        public void Start(byte PCH, byte PCL)
        {
            PC = ToShort(PCL, PCH);

            while (true)
            {
                var instrCode = _memory.ReadAbsolute(PC++);
                var instr = AssemblyInstructions.GetInstruction(instrCode);
                if (instr.InstructionType == AssemblyInstructionType.BRK)
                    break;

                if (instr.InstructionType == AssemblyInstructionType.LDA) /*A9*/
                {
                    if (instr.AddressingMode == AddressingMode.Immidiate)
                    {
                        A = _memory.ReadAbsolute(PC++);
                    }
                } else if (instr.InstructionType == AssemblyInstructionType.STA)
                {
                    if (instr.AddressingMode == AddressingMode.Absolute) /*8D*/
                    {
                        Y = _memory.ReadAbsolute(PC++);
                        X = _memory.ReadAbsolute(PC++);
                        _memory.WriteAbsolute(ToShort(Y, X), A);
                    } else if (instr.AddressingMode == AddressingMode.ZeroPageX)
                    {
                    }
                } else if (instr.InstructionType == AssemblyInstructionType.INX)
                {
                    X++;
                    PC++;
                } else if (instr.InstructionType == AssemblyInstructionType.INY)
                {
                    Y++;
                    PC++;
                }
                //======================================================================================================

                //======================================================================================================
            }
        }
    }
}
