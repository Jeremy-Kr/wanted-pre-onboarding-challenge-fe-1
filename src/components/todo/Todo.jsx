import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoContainer from "./TodoContainer";
import TodoInput from "./TodoInput";

const Todo = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const token = localStorage.getItem("token");

  const getTodo = async () => {
    const res = await axios.get("http://localhost:8080/todos", {
      headers: { Authorization: token },
    });
    setTodoList(res.data.data);
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    try {
      getTodo();
    } catch (e) {
      console.log(e);
    }
  }, [todoList]);
  return (
    <>
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <TodoContainer todoList={todoList} setTodoList={setTodoList} />
    </>
  );
};

export default Todo;
