// components/custom-theme-toggle.tsx
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

export function CustomThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder atau null di server untuk menghindari hydration mismatch
    return <div style={{ width: '70px', height: '34px' }} />;
  }

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    // Tambahkan class `cursor-pointer` di sini
    <label htmlFor="theme-toggle" className="custom-theme-toggle cursor-pointer">
      <input
        id="theme-toggle"
        type="checkbox"
        className="sr-only"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <div className="toggle-track">
        <div className="sun"></div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="bird bird-1"></div>
        <div className="bird bird-2"></div>
        <div className="bird bird-3"></div>
        <div className="moon"></div>
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
      </div>
      <div className="toggle-thumb"></div>
    </label>
  );
}