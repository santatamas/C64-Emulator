using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hackaton;

namespace C64Emulator
{
    partial class Processor
    {
        private void STA(AddressingMode mode)
        {
            if (mode == AddressingMode.Absolute) /*8D*/
            {
                _memory.WriteAbsolute(ToShort(_memory.ReadAbsolute(++PC), _memory.ReadAbsolute(++PC)), A);
            }
            else if (mode == AddressingMode.AbsoluteX)
            {
                _memory.WriteAbsolute((ushort)(ToShort(_memory.ReadAbsolute(++PC), _memory.ReadAbsolute(++PC)) + X), A);
            }
        }
    }
}
