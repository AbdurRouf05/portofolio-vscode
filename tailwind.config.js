/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',          // Background editor utama
          sidebar: '#252526',     // Sidebar explorer
          activityBar: '#333333', // Bar ikon paling kiri
          header: '#1e1e1e',      // Header tab
          text: '#d4d4d4',        // Warna teks umum
          comment: '#6a9955',     // Warna komentar hijau
          keyword: '#569cd6',     // Warna keyword biru (const, let)
          string: '#ce9178',      // Warna string oranye
          function: '#dcdcaa',    // Warna fungsi kuning
          number: '#b5cea8',      // Warna angka
          accent: '#007acc',      // Warna biru VS Code (status bar)
        }
      },
      fontFamily: {
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}