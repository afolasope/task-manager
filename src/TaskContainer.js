import React, { useRef } from 'react';
import { useGlobalContext } from './context/context';
import { TabsProvider } from './context/tabsContext';
import cancelImg from './images/icon-cross.svg';
import Tabs from './Tabs';

const TaskContainer = () => {
  const {
    tasks,
    removeTask,
    markComplete,
    undoMarkComplete,
    total,
    clearCompleted,
    filter,
  } = useGlobalContext();

  const displayedTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }

    return filter === 'active' ? !task.isCompleted : task.isCompleted;
  });

  const radioRef = useRef();

  const handleChange = (id) => {
    const check = tasks.filter((task) => {
      return task.id === id;
    });
    if (check[0].isCompleted === false) {
      markComplete(id);
    } else {
      undoMarkComplete(id);
    }
  };

  return (
    <section className="main-section">
      {tasks.length === 0 ? (
        <div className="quote-container animate-reveal animate">
          <h3 className="qoute">
            "STARTING IS HALF THE TASK."
            <br />
            <span>- Korean Proverb</span>
          </h3>
          <p>Manage your tasks here</p>
        </div>
      ) : (
        <ul className="tasks-container">
          {displayedTasks.map((task, index) => {
            const { id, desc, isCompleted } = task;
            return (
              <li className="task-item">
                <label htmlFor={id} className="radio ">
                  <input
                    className="radio-input"
                    type="checkbox"
                    value={desc}
                    ref={radioRef}
                    id={id}
                    onChange={(e) => handleChange(id, e)}
                    checked={isCompleted ? 'checked' : ''}
                  />
                  <div className="radio-div "></div>
                  <p className={task.isCompleted ? 'completed' : ''}>{desc}</p>
                </label>
                <img
                  onClick={() => removeTask(id)}
                  className="cancel-btn"
                  src={cancelImg}
                  alt="cancel"
                />
              </li>
            );
          })}
        </ul>
      )}
      {tasks.length ? (
        <div className="bottom-info">
          <span>
            {total} item{total > 1 ? 's' : ''} left
          </span>
          <span onClick={clearCompleted}>Clear Completed</span>
        </div>
      ) : (
        ''
      )}
      <TabsProvider>
        <Tabs></Tabs>
      </TabsProvider>
    </section>
  );
};

export default TaskContainer;
