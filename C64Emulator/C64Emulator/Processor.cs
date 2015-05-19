using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C64Emulator.Processor
{
    class Processor
    {
        private Memory _memory;

        public byte A { get; set; }
        public byte Y { get; set; }
        public byte X { get; set; }
        public byte PCH { get; set; }
        public byte PCL { get; set; }
        public byte S { get; set; }
        public byte P { get; set; }

        public Processor (Memory memory)
        {
            _memory = memory;
        }

        public void Start(byte PCH, byte PCL)
        {

        }
    }
}
