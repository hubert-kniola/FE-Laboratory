import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';
import "../../styles/ToDo.css"
import {Checkbox} from "@mui/material";

export const Done = () => {
  const [dones, setDones] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/done")
        .then((response) => setDones(response.data))
        .catch(() => console.log("catch"));
    };
    fetchData();
  }, []);

  const handleDelete = (indexToDelete) => {
    const item = dones.filter((_, index) => index === indexToDelete);
    console.log(item);
    axios
      .delete("/api/todo/" + item[0]._id)
      .then((response) => setDones(response.data))
      .catch(() => console.log("catch"));
  };

  const handlePatch = (indexToPatch) => {
    const item = dones.filter((_, index) => index === indexToPatch);
    console.log(item);
    axios
    .patch("/api/todos/" + item[0]._id, { done: !item[0].done })
    .then((response) => setAllToDos(response.data))
    .catch(() => console.log("catch"));
  };

  return (
    <>
      {dones.map((todo, index) => {
        return (
          <div key={index} className="tile">
            <input className="tile--checkbox" type="checkbox" checked={todo.done} onChange={() => handlePatch(index)}/>
            <span className="tile--text">{todo.text}</span>
            <FaTrash size={22} onClick={() => handleDelete(index)} />
          </div>
        );
      })}
    </>
  );
};