import React, { useState, useRef, useEffect } from 'react';
// import image from './images/bg-mobile-light.jpg';
import { useGlobalContext } from './context/context';
import { useTabsProvider } from './context/tabsContext';

const Form = () => {
  const [disable, setDisable] = useState(true);
  const { setActiveTab } = useTabsProvider();

  const [input, setInput] = useState('');
  const radioRef = useRef();
  const inputRef = useRef();
  const { addTask, submitCompleted } = useGlobalContext();

  const handleSubmit = (e) => {
    setActiveTab(1);
    setInput('')
    e.preventDefault();
    if (input) {
      addTask(input);
    }
    inputRef.current.value = '';
  };
  const handleChange = (input) => {
    if (input) {
      submitCompleted(input);
    }
    inputRef.current.value = '';

    setTimeout(() => {
      radioRef.current.checked = false;
    }, 200);

    console.log(radioRef);
  };

  // if input is empty, disable radio button
  useEffect(() => {
    if (disable) {
      radioRef.current.disabled = true;
    } else {
      radioRef.current.disabled = false;
    }
  }, [input, disable]);

  return (
    <form onSubmit={handleSubmit} className="form-wrapper ">
      <div className="form-control">
        <label htmlFor="radio" className="radio">
          <input
            placeholder="Create a new todo"
            className="radio-input"
            type="checkbox"
            ref={radioRef}
            id="radio"
            onChange={() => handleChange(input)}
          />
          <div className="radio-div"></div>
          {/* create a new todo */}
          <input
            type="text"
            ref={inputRef}
            className="todo-input"
            placeholder="Create a new todo..."
            onChange={(e) => {
              setInput(e.target.value);
              setDisable(false);
            }}
          />
        </label>
      </div>
    </form>
  );
};

export default Form;
