import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoList = ({ todoList, setTodoList, children }) => {
  return (
    <ul>
      <CustomH2>{children}</CustomH2>
      {todoList?.map((todoItem) => {
        return (
          <TodoItem
            todoItem={todoItem}
            setTodoList={setTodoList}
            key={todoItem.id}
          />
        );
      })}
    </ul>
  );
};

const CustomH2 = styled.h2`
  font-size: 2.3rem;
  font-weight: 500;
  text-align: center;
`;

export default TodoList;
