import { FaTrash } from "react-icons/fa";
import "../../styles/ToDo.css";
import { CircularProgress } from "@mui/material";

export const Tile = ({todo, index, handlePatch, handleDelete }) => {
  return (
    <>
      <div key={index} className="tile">
        <input className="tile--checkbox" type="checkbox" checked={todo.done} onChange={handlePatch}/>
        <span className="tile--text">{todo.text}</span>
        <FaTrash size={22} onClick={handleDelete}/>
      </div>
    </>
  );
};
