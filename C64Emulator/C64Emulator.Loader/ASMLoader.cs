using System;
using System.IO;

namespace C64Emulator.Loader
{
    public class AsmLoader
    {
        private readonly Memory _memory;
        public ushort StartAddress = 0;
        public byte StartPCH = 0;
        public byte StartPCL = 0;

        public AsmLoader(Memory memory)
        {
            _memory = memory;
        }

        public void ReadFile(string path)
        {
            byte[] fileContent = File.ReadAllBytes(path);
            StartPCH = fileContent[0];
            StartPCL = fileContent[1];
            StartAddress = BitConverter.ToUInt16(fileContent, 0);

            var currentAddress = StartAddress;
            for (int i = 2; i < fileContent.Length; i++)
            {
                _memory.WriteAbsolute(currentAddress++, fileContent[i]);
            }
        }
    }
}
