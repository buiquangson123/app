import "./App.css";
import Footer from "./components/views/Footer";
import TodoList from "./components/views/TodoList";

function App() {
  return (
    <div className="App">
      <header classname="header">
        <h1>Todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          // autofocus
          // onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())"
        />
      </header>
      <TodoList></TodoList>
      <Footer></Footer>
    </div>
  );
}

export default App;
