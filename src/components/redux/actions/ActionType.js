import { ConstantType } from "../constants/ConstantType";

export const fetchTodos = () => ({ type: ConstantType.FETCH_TODOS });
export const loadTodos = (todos) => ({
  type: ConstantType.TODOS_LOAD,
  payload: todos,
});
export const updateCurrent = (val) => ({
  type: ConstantType.CURRENT_UPDATE,
  payload: val,
});
export const addTodo = (todo) => ({
  type: ConstantType.TODO_ADD,
  payload: todo,
});
export const replaceTodo = (todo) => ({
  type: ConstantType.TODO_REPLACE,
  payload: todo,
});
export const removeTodo = (id) => ({
  type: ConstantType.TODO_REMOVE,
  payload: id,
});
export const saveTodo = (name) => ({
  type: ConstantType.SAVE_TODO,
  payload: name,
});
export const toggleTodo = (id) => ({
  type: ConstantType.TOGGLE_TODO,
  payload: id,
});
export const deleteTodo = (id) => ({
  type: ConstantType.DELETE_TODO,
  payload: id,
});
