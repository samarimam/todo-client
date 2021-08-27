import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
    key: number;
    id: string;
    title: string;
    content: string;
    count: number;
    setCount: (cnt: number) => void;
    onDelete(id: string): void;
}

const Note: React.FC<IProps> = ({
    title,
    content,
    onDelete,
    id,
    count,
    setCount,
}) => {
    const [edit, setEdit] = useState(false);
    const [editValue, setEditValue] = useState({
        title: title,
        content: content,
    });
    function handleClick() {
        onDelete(id);
    }

    function justClick(id: string) {
        setEdit(true);
    }

    const onChangeHandler = (e: any) => {
        setEditValue((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const onCancelHandler = () => {
        setEdit(false);
        setEditValue((prev) => {
            return {
                title: title,
                content: content,
            };
        });
    };

    const onSaveHandler = (id: string) => {
        axios
            .post(`http://localhost:5000/todo/${id}`, {
                ...editValue,
                token: localStorage.getItem("token"),
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setEdit(false);
                    setCount(count + 1);
                }
            })
            .catch((e) => {
                toast.error("Something went very wrong");
                console.log(e);
            });
    };

    if (edit) {
        return (
            <div className='edit-note note'>
                <input
                    type='text'
                    name='title'
                    value={editValue.title}
                    onChange={(e) => onChangeHandler(e)}
                />
                <textarea
                    name='content'
                    rows={2}
                    value={editValue.content}
                    onChange={(e) => onChangeHandler(e)}
                />
                <button onClick={onCancelHandler}>
                    <CancelIcon />
                </button>
                <button onClick={() => onSaveHandler(id)}>
                    <SaveIcon />
                </button>
            </div>
        );
    }
    return (
        <div className='note'>
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={handleClick}>
                <DeleteIcon />
            </button>
            <button onClick={() => justClick(id)}>
                <EditIcon />
            </button>
        </div>
    );
};

export default Note;
