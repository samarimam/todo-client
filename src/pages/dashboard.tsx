import React,{useState} from "react";
import axios from "axios";
import Header from "../components/Header";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { toast } from "react-toastify";

const Dashboard = () => {
  interface Todo {
    title: string;
    content: string;
    _id: string;
    isCompleted: boolean;
  }

  const [notes, setNotes] = React.useState<Todo[]>([]);


  React.useEffect(() => {
    axios.get('http://localhost:5000/todos', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        if (res.status === 200) {
          setNotes(res.data.todos);
        }
      }).catch(e=>{
        console.log(e)
      })
  }, [notes])

  function deleteNote(_id:string) {
    axios.delete(`http://localhost:5000/todo/${_id}`, { headers: { token: localStorage.getItem('token')}})
      .then(res=>{
        if(res.status===200){
          toast.success(res.data.message)
        }
      }).catch(e=>{
        toast.error('Something went wrong')
      })
  }

  return(
    <>
      <Header />
      <div className="pt-12">
        <h1 className="font-bold text-black-300 text-center text-xl mb-12">My Todos Dashboard</h1>
        <CreateArea  />
          {notes.map((noteItem, index) => {
            return (
            <Note 
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    </>
  )
}

export default Dashboard;