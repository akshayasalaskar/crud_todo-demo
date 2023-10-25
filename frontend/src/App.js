import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";
import { Routes, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { isLogin, logOut } from "./utils/auth";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Home = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [pageReady, setPageReady] = useState(false);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUi, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
      } else {
        navigate("/login");
      }
    };

    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [updateUi]);

  const addTask = () => {
    axios
      .post(`${baseURL}/save`, { task: input })
      .then((res) => {
        setInput("");
        setUpdateUI((prevState) => !prevState);
      });
  };

  const updateMode = (id, text) => {
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, { task: input })
      .then((res) => {
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setInput("");
      });
  };

  return (
    
      <div>
        <h1 className="title">CRUD Operations</h1>
        <div className="input_holder">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={updateId ? updateTask : addTask}>
            {updateId ? "Update Task" : "Add Task"}
          </button>
          <ul>
            {tasks.map((task) => (
              <List
                key={task._id}
                id={task._id}
                task={task.task}
                setUpdateUI={setUpdateUI}
                updateMode={updateMode}
              />
            ))}
          </ul>
        </div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};


export default App;
