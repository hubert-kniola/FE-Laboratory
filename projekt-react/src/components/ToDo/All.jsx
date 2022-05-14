import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { FaTrash } from "react-icons/fa";
import "../../styles/ToDo.css";
import { Checkbox } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";

export const All = () => {
  const [allToDos, setAllToDos] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");

  const errorText = <span>Text is empty!</span>;

  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
  }, [error]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/todos")
        .then((response) => setAllToDos(response.data))
        .catch(() => console.log("catch"));
    };
    fetchData();
  }, []);

  const handleDelete = (indexToDelete) => {
    const item = allToDos.filter((_, index) => index === indexToDelete);
    console.log(item);
    axios
      .delete("/api/todo/" + item[0]._id)
      .then((response) => setAllToDos(response.data))
      .catch(() => console.log("catch"));
  };

  const handleSubmit = () => {
    if (name === "") setError(true);
    else {
      axios
        .post("/api/todos", {
          text: name,
          done: false,
        })
        .then((response) => {
          setAllToDos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePatch = (indexToPatch) => {
    const item = allToDos.filter((_, index) => index === indexToPatch);
    axios
      .patch("/api/todos/" + item[0]._id, { done: !item[0].done })
      .then((response) => setAllToDos(response.data))
      .catch(() => console.log("catch"));
  };

  return (
    <>
      {allToDos ? (
        allToDos.map((todo, index) => {
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
        })
      ) : (
        <CircularProgress disableShrink />
      )}
      <div className="button--div">
        <input className="button--input" value={name} onChange={handleChange} />
        <Button color="error" onClick={handleSubmit}>
          Create
        </Button>
      </div>
      {error ? errorText : null}
    </>
  );
};
