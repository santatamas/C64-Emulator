using System;
using System.Threading;
using C64Emulator.Loader;
using Hackaton;

namespace C64Emulator.Presentation
{
    class Program
    {
        private static short ConsoleWidth = 40;
        private static short ConsoleHeight = 25;

        static void Main(string[] args)
        {
            if (args.Length != 0)
            {
                var programPath = args[0];
                var memory = new Memory();
                var processor = new Processor(memory);
                var loader = new AsmLoader(memory);
                var display = new MemoryDisplay(memory);
                var fastConsole = new FastConsole(ConsoleWidth, ConsoleHeight);

                loader.ReadFile(programPath);
                var processorThread = new Thread(() => processor.Start(loader.StartPCH, loader.StartPCL))
                {
                    IsBackground = true
                };
                processorThread.Start();

                while (true)
                {
                    var current = display.ReadCurrentState();
                    for (byte x = 0; x < current.GetLength(0); x += 1)
                    {
                        for (byte y = 0; y < current.GetLength(1); y += 1)
                        {
                            if (x >= ConsoleWidth || y >= ConsoleHeight) continue;

                            fastConsole.SetForeColor(x,y, display.ReadColor(x,y));
                            fastConsole.SetChar(x, y, current[x, y]);
                        }
                    }
                    Thread.Sleep(50);
                }
            }
            else
            {
                Console.WriteLine("Please specify an asm file!");
            }
        }
    }
}