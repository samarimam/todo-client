import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

interface IProps{
    key: number;
    id: string;
    title: string;
    content:string;
    onDelete(id:string):void;
}

const Note:React.FC<IProps> = ({title, content, onDelete,id})=> {
  function handleClick() {
    onDelete(id);
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleClick} >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
