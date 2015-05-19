using System;

namespace C64Emulator.Presentation
{
    public class MemoryDisplay
    {
        private Memory _memory;
        public MemoryDisplay(Memory memory)
        {
            _memory = memory;
        }

        public char[,] ReadCurrentState()
        {
            var result = new char[100,100];
            var temp = DateTime.Now.ToString().ToCharArray();

            for (int index = 0; index < temp.Length; index++)
            {
                result[0,index] = temp[index];
            }
            return result;
        }
    }
}
