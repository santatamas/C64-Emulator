using System;
using Hackaton;

namespace C64Emulator.Presentation
{
    public class MemoryDisplay
    {
        private ushort _screenStartAddress = 0x400;
        private Memory _memory;
        private byte _width = 40;
        private byte _height = 25;

        public MemoryDisplay(Memory memory)
        {
            _memory = memory;
        }

        public char[,] ReadCurrentState()
        {
            var result = new char[_width, _height];
            var currentAdr = _screenStartAddress;
            for (byte x = 0; x < _width; x++)
            {
                for (byte y = 0; y < _height; y++)
                {
                    result[x, y] = C64CharConverter.ConvertToAscii(_memory.ReadAbsolute(currentAdr++));
                }
            }
            return result;
        }
    }
}
