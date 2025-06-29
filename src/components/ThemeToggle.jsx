import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Ler preferência de tema do localStorage ao montar
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  // Alternar tema e salvar preferência
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
      aria-label="Alternar tema"
    >
      {isDark ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
    </button>
  );
}