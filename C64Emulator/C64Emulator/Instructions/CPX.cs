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
        private void CPX(AddressingMode mode)
        {
            if (mode == AddressingMode.Immidiate)
            {
                var a = _memory.ReadAbsolute(++PC);
                var b = _memory.ReadAbsolute(++PC);
                var c = _memory.ReadAbsolute(ToShort(a, b));
                Zero = (c == X);
                PC++;
            }
        }
    }
}
