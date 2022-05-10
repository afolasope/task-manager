import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context/context';
import { TabsProvider } from './context/tabsContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <TabsProvider>
        <App />
      </TabsProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
