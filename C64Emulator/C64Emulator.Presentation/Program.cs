using System;
using C64Emulator.Loader;

namespace C64Emulator.Presentation
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length != 0)
            {
                var programPath = args[0];
                var memory = new Memory();
                var processor = new Processor.Processor(memory);
                var loader = new AsmLoader(memory);

                loader.ReadFile(programPath);
                processor.Start(loader.StartPCH, loader.StartPCL);
            }
            else
            {
                Console.WriteLine("Please specify an asm file!");
            }
        }
    }
}