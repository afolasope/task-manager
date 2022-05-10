import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from '../reducer';

const AppContext = React.createContext();

let data = [];

let storageData = JSON.parse(localStorage.getItem('storageData'));
if (!storageData) {
  storageData = data;
}

let taskTheme = localStorage.getItem('to-do-theme');
if (!taskTheme) {
  localStorage.setItem('to-do-theme', 'light-theme');
}

const initialState = {
  tasks: storageData,
  total: storageData.filter((item) => item.isCompleted !== true).length,
  filter: 'all',
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState(taskTheme);

  const addTask = (input) => {
    dispatch({ type: 'ADD_TASK', payload: input });
  };
  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };
  const markComplete = (id) => {
    dispatch({ type: 'MARK_COMPLETE', payload: id });
  };
  const undoMarkComplete = (id) => {
    dispatch({ type: 'UNDO_MARK_COMPLETE', payload: id });
  };
  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };
  const submitCompleted = (input) => {
    dispatch({ type: 'SUBMIT_COMPLETED', payload: input });
  };
  const showAll = () => {
    dispatch({ type: 'SHOW_ALL' });
  };
  const showActive = () => {
    dispatch({ type: 'SHOW_ACTIVE' });
  };
  const showCompleted = () => {
    dispatch({ type: 'SHOW_COMPLETED' });
  };

  useEffect(() => {
    localStorage.setItem('storageData', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addTask,
        removeTask,
        markComplete,
        undoMarkComplete,
        clearCompleted,
        submitCompleted,
        showAll,
        showActive,
        showCompleted,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
