
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./Dashboard.css";

function Dashboard({ user, onSignOut }) {

  // Separate tasks for each logged-in user
  const storageKey = `focusflow_tasks_${user?.id || user?.email}`;

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(storageKey);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Save tasks automatically
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  // Complete or uncomplete task
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  // Start editing
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Save edited task
  const saveEdit = (id) => {
    if (!editTitle.trim()) return;

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: editTitle.trim(),
              description: editDescription.trim(),
            }
          : task
      )
    );

    setEditingId(null);
  };

  // Sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error.message);
      return;
    }

    onSignOut();
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const progress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="user-dashboard">

      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="auth-logo">
          Focus<span>Flow.</span>
        </div>

        <button onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>

      <div className="dashboard-content">

        {/* Welcome */}
        <div className="dashboard-welcome">
          <h1>Welcome to FocusFlow! 🎉</h1>
          <p>Your productivity journey starts here.</p>
        </div>

        {/* Account */}
        <div className="user-card">
          <h2>My Account</h2>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Status:</strong> Logged In
          </p>
        </div>

        {/* Statistics */}
        <div className="dashboard-cards">

          <div className="dashboard-item">
            <h3>My Tasks</h3>
            <h2>{tasks.length}</h2>
            <p>Total tasks</p>
          </div>

          <div className="dashboard-item">
            <h3>Completed</h3>
            <h2>{completedTasks}</h2>
            <p>Tasks completed</p>
          </div>

          <div className="dashboard-item">
            <h3>Pending</h3>
            <h2>{pendingTasks}</h2>
            <p>Tasks remaining</p>
          </div>

        </div>

        {/* Progress */}
        <div className="progress-card">
          <div className="progress-heading">
            <h2>My Progress</h2>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p>
            {completedTasks} out of {tasks.length} tasks completed.
          </p>
        </div>

        {/* Add Task */}
        <div className="task-form-card">
          <h2>➕ Add a New Task</h2>

          <form onSubmit={handleAddTask}>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button type="submit">
              Add Task
            </button>

          </form>
        </div>

        {/* Task List */}
        <div className="task-list-card">

          <h2>📋 My Tasks</h2>

          {tasks.length === 0 ? (
            <p className="empty-message">
              No tasks yet. Add your first task!
            </p>
          ) : (

            <div className="task-list">

              {tasks.map((task) => (

                <div
                  className={`task-item ${
                    task.completed ? "completed-task" : ""
                  }`}
                  key={task.id}
                >

                  {editingId === task.id ? (

                    <div className="edit-task">

                      <input
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        placeholder="Task title"
                      />

                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        placeholder="Task description"
                      />

                      <button onClick={() => saveEdit(task.id)}>
                        Save
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>

                    </div>

                  ) : (

                    <>
                      <div className="task-details">

                        <label className="task-title-row">

                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />

                          <span>{task.title}</span>

                        </label>

                        {task.description && (
                          <p>{task.description}</p>
                        )}

                        {task.dueDate && (
                          <small>
                            Due: {task.dueDate}
                          </small>
                        )}

                        <span className="task-status">
                          {task.completed ? "Completed ✓" : "Pending"}
                        </span>

                      </div>

                      <div className="task-actions">

                        <button
                          className="edit-btn"
                          onClick={() => startEditing(task)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>

                      </div>
                    </>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
