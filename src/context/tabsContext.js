import React, { useContext, useState } from "react";

const TabsContext = React.createContext();


export const TabsProvider = ({ children }) => {
    
  const [tabs, setActiveTab] = useState({
    links: [
      { id: 1, name: 'All', className: '' },
      { id: 2, name: 'Active', className: '' },
      { id: 3, name: 'Completed', className: '' },
    ],
    activeLink: 1,
  });


    return <TabsContext.Provider value={{tabs, setActiveTab}}>
        {children}
    </TabsContext.Provider>
};

export const useTabsProvider = () => {
    return useContext(TabsContext)
}