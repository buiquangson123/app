import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  getVisibleTodos,
} from "./../redux/actions/ActionType";

const TodoList = () => {
  let items = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // console.log(items);

  // useEffect(() => {
  //   fetchTodos();
  // }, []);
  return (
    <>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          // onchange="dispatch('toggleAll', this.checked)"
          // checked
        />
        <label>Mark all as complete</label>
        <ul className="todo-list">
          <TodoItem></TodoItem>
        </ul>
      </section>
    </>
  );
};

export default TodoList;
