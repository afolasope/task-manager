import React from 'react';
import { useGlobalContext } from './context/context';
import { useTabsProvider } from './context/tabsContext';

const Tabs = () => {
  const { tasks, showAll, showActive, showCompleted } = useGlobalContext();
  const { tabs, setActiveTab } = useTabsProvider();

  const handleClick = (e, id) => {
    setActiveTab((prev) => {
      return { ...prev, activeLink: id };
    });
    console.log(tabs);
    if (e.target.textContent === 'All') {
      showAll();
    } else if (e.target.textContent === 'Active') {
      showActive();
    } else if (e.target.textContent === 'Completed') {
      showCompleted();
    }
  };

  return (
    tasks.length === 0 || (
      <div className="tabs-container">
        <ul>
          {tabs.links.map((tab) => {
            return (
              <li
                className=""
                key={tab.id}
                id={tab.id}
                onClick={(e) => handleClick(e, tab.id)}
              >
                <p className={tab.id === tabs.activeLink ? 'active' : ''}>
                  {tab.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default Tabs;
