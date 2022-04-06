import React from "react";

const TodoItem = ({ id, name, isComplete, toggleTodo, deleteTodo }) => {
  return (
    <>
      <li className="completed">
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            // checked
            // onchange="dispatch('toggle', ${index})"
          />
          {/* ondblclick="dispatch('startEdit', ${index})"   */}
          <label>HHHHHHHHH</label>
          <button
            className="destroy"
            // onclick="dispatch('destroy', ${index})"
          ></button>
        </div>
        <input
          className="edit"
          // value="${todo.title}"
          // onkeyup={event.keyCode === 13 && dispatch('endEdit', this.value.trim()) ||
          // event.keyCode === 27 && dispatch('cancelEdit')}
          // onblur="dispatch('endEdit', this.value.trim())"
        />
      </li>
    </>
  );
};

export default TodoItem;
