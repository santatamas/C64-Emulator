﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hackaton;

namespace C64Emulator
{
    partial class Processor
    {
        private void LDX(AddressingMode mode)
        {
            if (mode == AddressingMode.Immidiate)
            {
                X = _memory.ReadAbsolute(++PC);
                StatusZ = X == 0;
                StatusN = X > 127;
            }
        }
    }
}
