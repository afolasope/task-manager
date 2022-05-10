import React, { useEffect } from 'react';
import { useGlobalContext } from './context/context';
import Form from './Form';
import darkTheme from './images/icon-moon.svg';
import lightTheme from './images/icon-sun.svg';

const Header = () => {
  let { theme, setTheme } = useGlobalContext();

  const handleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
      localStorage.setItem('to-do-theme', 'light-theme');
    } else {
      setTheme('dark-theme');
      localStorage.setItem('to-do-theme', 'dark-theme');
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <header className={theme === 'light-theme' ? '' : 'dark'}>
      <section className="header-section">
        <div>
          <h1 className="header-title">TODO</h1>
        </div>
        <>
          {theme === 'light-theme' ? (
            <img onClick={handleTheme} src={darkTheme} alt="dark theme" />
          ) : (
            <img onClick={handleTheme} src={lightTheme} alt="light-theme"></img>
          )}
        </>
      </section>
      <Form />
    </header>
  );
};

export default Header;
