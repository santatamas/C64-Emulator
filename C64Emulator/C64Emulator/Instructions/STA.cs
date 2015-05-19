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
                Y = _memory.ReadAbsolute(PC++);
                X = _memory.ReadAbsolute(PC++);
                _memory.WriteAbsolute(ToShort(X, Y), A);
            }
        }
    }
}
