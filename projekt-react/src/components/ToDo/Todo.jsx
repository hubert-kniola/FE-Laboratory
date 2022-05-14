import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { FaTrash } from "react-icons/fa";
import "../../styles/ToDo.css";
import { Checkbox } from "@mui/material";

export const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/todo")
        .then((response) => setTodos(response.data))
        .catch(() => console.log("catch"));
    };
    fetchData();
  }, []);

  const handleDelete = (indexToDelete) => {
    const item = todos.filter((_, index) => index === indexToDelete);
    axios
      .delete("/api/todo/" + item[0]._id)
      .then((response) => setTodos(response.data))
      .catch(() => console.log("catch"));
  };

  const handlePatch = (indexToPatch) => {
    const item = todos.filter((_, index) => index === indexToPatch);
    axios
      .patch("/api/todo/" + item[0]._id, {})
      .then((response) => setTodos(response.data))
      .catch(() => console.log("catch"));
  };

  return (
    <>
      {todos.map((todo, index) => {
        return (
          <div key={index} className="tile">
            <input
              className="tile--checkbox"
              type="checkbox"
              checked={todo.done}
              onChange={() => handlePatch(index)}
            />
            <span className="tile--text">{todo.text}</span>
            <FaTrash size={22} onClick={() => handleDelete(index)} />
          </div>
        );
      })}
    </>
  );
};
