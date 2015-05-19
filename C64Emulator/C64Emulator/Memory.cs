using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C64Emulator
{
    public class Memory
    {
        public const int Size = 65536;

        private readonly byte[] memory = new byte[Size];

        public byte ReadZeroPage(byte zeroPageAddress)
        {
            return memory[zeroPageAddress];
        }

        public byte ReadAbsolute(ushort absoluteAddress)
        {
            return memory[absoluteAddress];
        }

        public void WriteZeroPage(byte zeroPageAddress, byte value)
        {
            memory[zeroPageAddress] = value;
        }

        public void WriteAbsolute(ushort absoluteAddress, byte value)
        {
            memory[absoluteAddress] = value;
        }
    }
}
