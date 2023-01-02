import styled from "styled-components";
import TodoList from "./TodoList";

const TodoContainer = ({ todoList, setTodoList }) => {
  return (
    <TodoFlexBox>
      <TodoList todoList={todoList} setTodoList={setTodoList}>
        🔥 Todo 🔥
      </TodoList>
    </TodoFlexBox>
  );
};

const TodoFlexBox = styled.article`
  display: flex;
  justify-content: space-around;
`;

export default TodoContainer;
