import React,{useState, useEffect} from 'react'
import { View } from './components/View';

const getDatafromLS=()=>{
  const data = localStorage.getItem('todos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [todos, setTodos]=useState(getDatafromLS());

  const [id, setId]=useState((Math.random() + 1).toString(36).substring(7));
  const [title, setTitle]=useState('');
  const [desc, setDesc]=useState('');
  const [date, setDate]=useState('');
  const [piority, setpiority]=useState('Normal');
  const [status, setStatus]=useState(false);

  // submit
  const handleAddSubmit=(e)=>{
    e.preventDefault();
    // add
    let todo={
      id,
      title,
      desc,
      date,
      piority,
      status
    }
    setTodos([...todos,todo]);
    setId((Math.random() + 1).toString(36).substring(7));
    setTitle('');
    setDesc('');
    setDate('');
    setpiority('Normal');
    setStatus(false);
  }

  // delete
  
  const deleteTodo=(id)=>{
    if(window.confirm("Are you sure deleted ?")) {
    const filteredTodos=todos.filter((element,index)=>{
      return element.id !== id
    })   
      setTodos(filteredTodos); 
  }
}
 const deleteAll = () => {
  if(window.confirm("Are you sure delete all ?")) {
  setTodos([])
  }
 }

  // lưu local
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  return (
    <div className='wrapper'>
      <div className='main d-flex justify-content-center'>

        <div className='form-container col-3'>
        <h4 className='text-center'>New Task</h4>
          <form autoComplete="off"
 className='form-group'
          onSubmit={handleAddSubmit}>
             <input type="text" hidden className='form-control' required
            onChange={(e)=>setId(e.target.value)} value={id}></input>
            <input  placeholder='Add new task...' type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Desc</label>
            <textarea type="text" className='form-control' required
            onChange={(e)=>setDesc(e.target.value)} value={desc}></textarea>
            <br></br>
            <label>Due Date</label>
            <input type="date" className='form-control' required
            onChange={(e)=>setDate(e.target.value)} value={date}></input>
            <br></br>
            <label>piority</label>
            <select className='form-control' required
            onChange={(e)=>setpiority(e.target.value)} value={piority}>
               <option value={"Normal"} selected>Normal</option>
               <option value={"Medium"}>Medium</option>
               <option value={"High"}>High</option>
            </select>
            <br/>
            
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
        <h4 className='text-center'>To Do List</h4>
          {todos.length>0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Date</th>
                    <th>piority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <View todos={todos} setTodos={setTodos} deleteTodo={deleteTodo}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger'
            onClick={()=>deleteAll()}>Remove All</button>
          </>}
          {todos.length < 1 && <div>No list are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App