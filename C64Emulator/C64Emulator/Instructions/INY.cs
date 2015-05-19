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
        private void INY(AddressingMode mode)
        {
            Y++;
            PC++;
        }
    }
}
