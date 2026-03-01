import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu App de Gerenciamento de Tarefas",
  description: "Gerenciador de Tarefas por Pomodoros feito com Next.js e Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>        
        <header className="w-full p-4 border-b bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-bold text-xl text-blue-600">TagManager</span>
            <div className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
            </div>
          </nav>
        </header>

        {children}

        <footer className="w-full p-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} - Criado com Next.js
        </footer>
      </body>
    </html>
  );
}