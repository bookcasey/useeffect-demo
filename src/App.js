import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getTodos() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();

      setTodos(data);
    }

    getTodos();
  }, []);

  useEffect(() => { 
    document.title = `Current todo draft: ${title}`;
  }, [title]);

  async function handleSubmit(event) {
    event.preventDefault();

    async function postTodo() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "POST",
        body: JSON.stringify({
          title: title,
        })
      });
      
      console.log(response);
    }

    await postTodo();
    setTitle("");

  }
  
  
  console.log('Inside component body');

  return (
    <div className="App">
      <h1>Hello World!</h1>

      <form onSubmit={handleSubmit}>
        <label> New todo title:
          <input name='title' value={title} onChange={(event) => setTitle(event.target.value)}></input>
        </label>
        <button>Submit</button>
      </form>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </div>
  );
}

export default App;
