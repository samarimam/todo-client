import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { toast } from "react-toastify";
import axios from "axios";

interface IProps {
    count: number;
    setCount: (cnt: number) => void;
}

const CreateArea: React.FC<IProps> = ({ count, setCount }) => {
    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    function handleChange(event: any) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    const submitNote = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "https://mymerntodolist.herokuapp.com/todo",
                {
                    ...note,
                    token: localStorage.getItem("token"),
                }
            );
            toast.success("Successfull");
            setCount(count + 1);
            console.log(response.data);
        } catch (e) {
            toast.error("Fails to add note");
            console.log(e);
        }
        setExpanded(false);
        setNote({
            title: "",
            content: "",
        });
    };

    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <form className='create-note'>
                {isExpanded && (
                    <input
                        name='title'
                        onChange={handleChange}
                        value={note.title}
                        placeholder='Title'
                    />
                )}

                <textarea
                    name='content'
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder='Take a note...'
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
};

export default CreateArea;
