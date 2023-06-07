import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getallTasks, updateTask, createTask, deleteTask, Task } from '../store/taskSlice';

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Task>({
    id: '',
    _id: '',
    title: '',
    description: '',
  });
  const [newTask, setNewTask] = useState<Task>({
    id: '',
    _id: '',
    title: '',
    description: '',
  });
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    dispatch<any>(getallTasks());
  }, [dispatch]);

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleUpdateTask = () => {
    dispatch<any>(updateTask(editedTask));
    setEditingTaskId(null);
    setEditedTask({
      id: '',
      _id: '',
      title: '',
      description: '',
    });
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch<any>(deleteTask(taskId));
    setEditingTaskId(null);
    setEditedTask((prevState) => ({
      ...prevState,
      id: '',
      _id: '',
      title: '',
      description: '',
    }));
  };
  
  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleSaveTask = () => {
    dispatch<any>(createTask(newTask));
    setIsAddingTask(false);
    setNewTask({
      id: '',
      _id: '',
      title: '',
      description: '',
    });
  };

  return (
    <div>
      <h1>Task Management App</h1>
      {tasks.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {tasks.error ? (
            <p>Error: {tasks.error}</p>
          ) : (
            <>
              {isAddingTask ? (
                <div>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Description"
                  />
                  <button onClick={() => handleSaveTask()}>Save</button>
                </div>
              ) : (
                <button onClick={() => handleAddTask()}>Add Task</button>
              )}
              {tasks.tasks.map((task) => (
                <div key={task.id}>
                  {editingTaskId === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                      />
                      <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      />
                      <button onClick={() => handleUpdateTask()}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <button onClick={() => handleEditTask(task)}>Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
