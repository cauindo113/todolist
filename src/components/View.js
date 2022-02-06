import React, { useState } from 'react'

export const View = ({ todos, setTodos, deleteTodo }) => {
  const [search, setSearch] = useState(null);
  const [title, setTitle] = useState(todos.title);

  const handleEdittodoSubmit = (e) => {
    e.preventDefault();

  };
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, status: !item.status };
        }
        return item;
      })
    );
  };
  const bySearch = (todo, search) => {
    if (search) {
      return todo.title.toLowerCase().includes(search.toLowerCase())
    } else return todo;
  };
  const filteredList = (todos) => {
    return todos
      .filter(todo => bySearch(todo, search));
  };
  return (
    <>
      <input
        type="search"
        placeholder="search..."
        class="form-control"
        onChange={e => setSearch(e.target.value)}
      />
      {filteredList(todos, search).map(todo => (

        <>
          <tr key={todo.id}>
            <td className='d-flex'>
              <div onClick={() => handleComplete(todo)}>
                {todo.status ? <input type="checkbox" checked /> : <input type="checkbox" />}
              </div>
              &ensp;
              {todo.status ? <div style={{ textDecorationLine: "line-through", color: "#ccc" }}>
                {todo.title}
              </div> : <div>{todo.title}</div>}
            </td>
            <td>{todo.desc}</td>
            <td>{todo.date}</td>
            <td>{todo.piority}</td>
            <td>
              <button className='btn btn-primary' data-toggle="collapse" data-target={`#` + todo.id} aria-expanded="false" aria-controls={todo.id}>Detail</button>
              <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Xóa</button></td>
          </tr>
          <div class="collapse" id={todo.id}>
            <form onSubmit={handleEdittodoSubmit} className='form-group'>
              <label>Title</label>
              <input value={todo.title} type="text" className='form-control' />
              <br></br>
              <label>Desc</label>
              <input value={todo.desc} type="text" className='form-control' />
              <br></br>
              <label>Date</label>
              <input value={todo.date} type="date" className='form-control' />
              <br></br>
              <label>piority</label>
              <select className='form-control' value={todo.piority}>
               <option value={"Normal"}>Normal</option>
               <option value={"Medium"}>Medium</option>
               <option value={"High"}>High</option>
            </select>
              <br></br>
              <button type="submit" className='btn btn-success'>
                Update
              </button>
            </form>
          </div>

        </>
      ))}
    </>
  )
}