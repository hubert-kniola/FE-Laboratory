import { FaTrash } from "react-icons/fa";
import "../../styles/ToDo.css";
import { Checkbox, CircularProgress } from "@mui/material";

export const Tiles = ({ items, handleClick }) => {
  return (
    <>
      {items ? (
        items.map((todo, index) => {
          return (
            <div key={index} className="tile">
              <Checkbox checked={todo.done} color="error" onChange={() => handleClick(index, "patch")}/>
              <span className="tile--text">{todo.text}</span>
              <FaTrash className="tile--trash" size={20} onClick={() => handleClick(index, "delete")} />
            </div>
          );
        })
      ) : (
        <CircularProgress disableShrink style={{ color: "red" }} />
      )}
    </>
  );
};
