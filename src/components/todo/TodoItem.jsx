import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TodoItem = ({ todoItem, setTodoList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todoItem.title);
  const [newContent, setNewContent] = useState(todoItem.content);
  const token = localStorage.getItem("token");

  const handleOnEditClick = async () => {
    if (isEditing) {
      const newTodo = { title: newTitle, content: newContent };
      const res = await axios.put(
        `http://localhost:8080/todos/${todoItem.id}`,
        newTodo,
        { headers: { Authorization: token } }
      );
      setTodoList((prev) => {
        const newTodoList = [...prev];
        const idx = newTodoList.findIndex((item) => item.id === todoItem.id);
        newTodoList[idx] = res.data.data;
        setTodoList(newTodoList);
      });
    }
    setIsEditing(!isEditing);
  };

  const handleOnTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleOnDeleteClick = async () => {
    if (isEditing) {
      setNewTitle(todoItem.title);
      setNewContent(todoItem.content);
      setIsEditing(!isEditing);
      return;
    }
    const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (deleteConfirm) {
      try {
        await axios.delete(`http://localhost:8080/todos/${todoItem.id}`, {
          headers: { Authorization: token },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <CustomLi>
      {isEditing ? (
        <TodoTitleInput
          value={newTitle}
          onChange={(e) => {
            handleOnTitleChange(e);
          }}
        />
      ) : (
        <Link to={`/${todoItem.id}`}>
          <h3>{todoItem.title}</h3>
        </Link>
      )}
      <CustomHr />
      {isEditing ? (
        <TodoContentInput
          value={newContent}
          onChange={(e) => {
            handleOnContentChange(e);
          }}
        />
      ) : (
        <span>{todoItem.content}</span>
      )}
      <ButtonContainer>
        <CustomButton
          onClick={(e) => {
            handleOnEditClick(e);
          }}
          buttonColor={"#B0DAF7"}
        >
          수정하기
        </CustomButton>
        <CustomButton
          onClick={() => {
            handleOnDeleteClick();
          }}
        >
          {isEditing ? "취소" : "삭제"}
        </CustomButton>
      </ButtonContainer>
    </CustomLi>
  );
};

const CustomLi = styled.li`
  margin: 2rem 0;
  width: 15rem;
`;

const CustomHr = styled.hr`
  background-color: #f7cac9;
  height: 1px;
  border: none;
`;

const CustomButton = styled.button`
  background-color: ${({ buttonColor }) => buttonColor ?? "#f7cac9"};
  border: none;
  height: 2rem;
  width: 4rem;
  border-radius: 0.3rem;
  border: 1px solid #fff;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    border: 1px solid ${({ buttonColor }) => buttonColor ?? "#f7cac9"};
    background-color: #fff;
    scale: 1.05;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
`;

const TodoTitleInput = styled.input`
  border: none;
  border-bottom: 1px solid #f7cac9;
  height: 1.2rem;
  font-size: 1.2rem;
  font-weight: 600;
  width: 98.5%;
  &:focus {
    outline-color: #f7cac9;
  }
`;

const TodoContentInput = styled.textarea`
  border: none;
  border-bottom: 1px solid #f7cac9;
  height: ${({ valueLength }) => (valueLength > 20 ? "2.4rem" : "1.2rem")};
  width: 98.5%;
  font-size: 1rem;
  resize: none;
  &:focus {
    outline-color: #f7cac9;
  }
`;

export default TodoItem;
