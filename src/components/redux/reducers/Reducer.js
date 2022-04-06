import { combineReducers } from "redux";
import { ConstantType } from "../constants/ConstantType";
import { combineEpics, ofType } from "redux-observable";
import { of, from, merge } from "rxjs";
import {
  map,
  switchMap,
  withLatestFrom,
  delay,
  takeUntil,
} from "rxjs/operators";

import {
  getTodos,
  createTodo,
  updateTodo,
  destroyTodo,
} from "../../service/TodoService";

import { showMessage } from "./MesReducer";

import {
  loadTodos,
  fetchTodos,
  addTodo,
  replaceTodo,
  removeTodo,
} from "../actions/ActionType";

const initState = {
  todos: [],
  currentTodo: "",
};

const {
  FETCH_TODOS,
  TODOS_LOAD,
  SAVE_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  TODO_ADD,
  CURRENT_UPDATE,
  TODO_REPLACE,
  TODO_REMOVE,
} = ConstantType;

export const fetchTodosEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_TODOS),
    switchMap(() => {
      // define the load$ - delay is for demo purposes
      const load$ = from(getTodos()).pipe(map(loadTodos), delay(2000));
      // define message display - delay to avoid flash, takeUntil to cancel if ajax finishes first
      const message$ = of(showMessage("Loading Todos - Rx style")).pipe(
        delay(1000),
        takeUntil(load$)
      );

      console.log(load$);
      // send actions for both load$ & message$ as they come in
      return merge(message$, load$);
    })
  );

export const saveTodoEpic = (action$) =>
  action$.pipe(
    ofType(SAVE_TODO),
    switchMap(({ payload }) => {
      const create$ = from(createTodo(payload)).pipe(
        map((res) => addTodo(res))
      );
      const message$ = of(showMessage("Saving todo")).pipe(
        delay(300),
        takeUntil(create$)
      );
      return merge(message$, create$);
    })
  );

export const toggleTodoEpic = (action$, state$) =>
  action$.pipe(
    ofType(TOGGLE_TODO),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const id = action.payload;
      const { todos } = state.todo;
      const todo = todos.find((t) => t.id === id);
      const toggled = { ...todo, isComplete: !todo.isComplete };
      const update$ = from(updateTodo(toggled)).pipe(map(replaceTodo));
      const message$ = of(showMessage("Saving todo update")).pipe(
        delay(300),
        takeUntil(update$)
      );
      return merge(update$, message$);
    })
  );

export const deleteTodoEpic = (action$) =>
  action$.pipe(
    ofType(DELETE_TODO),
    switchMap(({ payload }) => {
      const id = payload;
      const delete$ = from(destroyTodo(id)).pipe(map(() => removeTodo(id)));
      const message$ = of(showMessage("Removing Todo")).pipe(
        delay(300),
        takeUntil(delete$)
      );
      return merge(delete$, message$);
    })
  );

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.isComplete);
    case "completed":
      return todos.filter((t) => t.isComplete);
    default:
      return todos;
  }
};

export const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        currentTodo: "",
        todos: state.todos.concat(action.payload),
      };
    case TODOS_LOAD:
      return { ...state, todos: action.payload };
    case CURRENT_UPDATE:
      return { ...state, currentTodo: action.payload };
    case TODO_REPLACE:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case TODO_REMOVE:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};

export const rootEpic = combineEpics(
  fetchTodosEpic,
  saveTodoEpic,
  toggleTodoEpic,
  deleteTodoEpic
);

const Reducer = combineReducers({
  allItems: itemsReducer,
  // itemFilter: getVisibleTodos,
});

export default Reducer;
