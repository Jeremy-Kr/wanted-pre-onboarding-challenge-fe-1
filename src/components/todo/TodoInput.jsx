import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const TodoInput = ({ todoList, setTodoList }) => {
  const [todoTitle, setTodoTitle] = useState();
  const [todoContent, setTodoContent] = useState();

  const handleOnTitleChange = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleOnTextChange = (e) => {
    setTodoContent(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newTodoItem = { title: todoTitle, content: todoContent };
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:8080/todos", newTodoItem, {
      headers: { Authorization: token },
    });

    setTodoList([...todoList, res.data.data]);
    setTodoTitle("");
    setTodoContent("");
  };

  return (
    <TodoInputContainer
      onSubmit={(e) => {
        handleOnSubmit(e);
      }}
    >
      <label htmlFor="todo-title">제목</label>
      <TodoInputBox
        id="todo-title"
        value={todoTitle}
        onChange={handleOnTitleChange}
        placeholder="제목을 입력 해 주세요. (최대 22자)"
        maxLength="22"
      />
      <label htmlFor="todo-content">내용</label>
      <TodoInputBox
        id="todo-content"
        value={todoContent}
        onChange={handleOnTextChange}
        placeholder="할 일을 입력 해 주세요. (최대 35자)"
        maxLength="35"
      />
      <TodoSubmitButton type="submit"> 추가하기 </TodoSubmitButton>
    </TodoInputContainer>
  );
};

const TodoInputContainer = styled.form`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-anchor: 50%;
  color: #2e050a;
`;

const TodoInputBox = styled.input`
  width: 20rem;
  height: 2rem;
  margin: 1rem;
  border-radius: 0.3rem;
  border: 1px solid #2e050a;
  padding: 0 1rem;
  color: #2e050a;
  &:focus {
    outline-color: #f7cac9;
  }
`;

const TodoSubmitButton = styled.button`
  background-color: #f7cac9;
  color: #2e050a;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 0.3rem;
  border: 1px solid #fff;
  transition: 0.3s;
  height: 2.4rem;
  &:hover {
    cursor: pointer;
    border: 1px solid #f7cac9;
    background-color: #fff;
    scale: 1.03;
  }
`;

export default TodoInput;
