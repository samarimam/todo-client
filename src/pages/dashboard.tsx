import React, { useState } from "react";
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

    const [notes, setNotes] = useState<Todo[]>([]);
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        axios
            .get("https://mymerntodolist.herokuapp.com/todos", {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                if (res.status === 200) {
                    setNotes((prev) => {
                        return res.data.todos;
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [count]);

    function deleteNote(_id: string) {
        axios
            .delete(`https://mymerntodolist.herokuapp.com/todo/${_id}`, {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setCount(count - 1);
                }
            })
            .catch((e) => {
                toast.error("Something went wrong");
            });
    }

    return (
        <>
            <Header />
            <div className='pt-12'>
                <h1 className='font-bold text-black-300 text-center text-xl mb-12'>
                    My Todos Dashboard
                </h1>
                <CreateArea count={count} setCount={setCount} />
                {notes.map((noteItem, index) => {
                    return (
                        <Note
                            key={index}
                            id={noteItem._id}
                            title={noteItem.title}
                            content={noteItem.content}
                            onDelete={deleteNote}
                            count={count}
                            setCount={setCount}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Dashboard;
