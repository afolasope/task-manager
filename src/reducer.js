import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    let taskId = uuidv4();
    let tempTasks = [
      ...state.tasks,
      {
        id: taskId,
        desc: action.payload,
        isCompleted: false,
      },
    ];
    return {
      ...state,
      tasks: tempTasks,
      displayedTasks: tempTasks,
      total:
        state.tasks.filter((item) => item.isCompleted === false).length + 1,
    };
  }
  if (action.type === 'REMOVE_TASK') {
    let tempTasks = state.tasks.filter((task) => task.id !== action.payload);

    let check = state.tasks.filter((item) => {
      if (item.id === action.payload) {
        return item;
      }
    });

    let tempTotal = tempTasks.filter((item) => {
      return item.isCompleted === false;
    }).length;

    console.log(check);
    // let count = tempTasks.length;
    return {
      ...state,
      tasks: tempTasks,
      displayedTasks: tempTasks,
      total: tempTotal,
    };
  }
  if (action.type === 'MARK_COMPLETE') {
    let tempTasks = state.tasks.map((task) => {
      if (task.id === action.payload) {
        task.isCompleted = true;
      }
      return task;
    });
    return {
      ...state,
      tasks: tempTasks,
      displayedTasks: tempTasks,
      total: state.tasks.filter((item) => item.isCompleted !== true).length,
    };
  }
  if (action.type === 'UNDO_MARK_COMPLETE') {
    let tempTasks = state.tasks.map((task) => {
      if (task.id === action.payload) {
        task.isCompleted = false;
      }
      return task;
    });
    return {
      ...state,
      tasks: tempTasks,
      total: state.tasks.filter((item) => item.isCompleted !== true).length,
    };
  }
  if (action.type === 'CLEAR_COMPLETED') {
    const tempTasks = state.tasks.filter((item) => item.isCompleted === false);
    return {
      ...state,
      tasks: tempTasks,
      displayedTasks: tempTasks,
    };
  }
  if (action.type === 'SUBMIT_COMPLETED') {
    let taskId = uuidv4();
    let tempTasks = [
      ...state.tasks,
      {
        id: taskId,
        desc: action.payload,
        isCompleted: true,
      },
    ];
    return {
      ...state,
      tasks: tempTasks,
      displayedTasks: tempTasks,
      total: state.tasks.filter((item) => item.isCompleted !== true).length,
    };
  }

  if (action.type === 'SHOW_ALL') {
    return {
      ...state,
      filter: 'all',
    };
  }

  if (action.type === 'SHOW_ACTIVE') {
    return {
      ...state,
      filter: 'active',
    };
  }

  if (action.type === 'SHOW_COMPLETED') {
    return {
      ...state,
      filter: 'completed',
    };
  }
  return state;
};
export default reducer;
