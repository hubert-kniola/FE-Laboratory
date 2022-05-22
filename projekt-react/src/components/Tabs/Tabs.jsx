import { TabHeader } from "./TabHeader";
import { TabContent } from "./TabContent";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { Button } from "@mui/material";
import "../../styles/Tabs.css";
import { Tiles } from "../ToDo/Tiles";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [activeItems, setActiveItems] = useState([]);

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
        .then((response) => setActiveItems(response.data))
        .catch(() => console.log("catch"));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      let axiosElement = "";
      switch (activeTab) {
        case 1:
          axiosElement = "api/todos/";
          break;
        case 2:
          axiosElement = "api/todo/";
          break;
        case 3:
          axiosElement = "api/done/";
          break;
        default:
          break;
      }
      axios
        .get(axiosElement)
        .then((response) => setActiveItems(response.data))
        .catch(() => console.log("catch"));
    };
    fetchData();
  }, [activeTab]);

  const handleSubmit = () => {
    if (name !== "") {
      let axiosElement = "";
      switch (activeTab) {
        case 3:
        case 2:
        case 1:
          axiosElement = "api/todos/";
          break;
        default:
          break;
      }
      axios
        .post(axiosElement, { text: name, done: false })
        .then((response) => {
          switch (activeTab) {
            case 1:
              setActiveItems(response.data);
              break;
            case 2:
              setActiveItems(response.data.filter((item) => item.done === false));
              break;
            case 3:
              setActiveItems(response.data.filter((item) => item.done === true));
              break;
            default:
              break;
          }
        })
        .catch(() => console.log("catch"));
    } else setError(true);
  };

  const handleClickTile = (indexToOperate, axiosMethod) => {
    let axiosElement = "";
    const item = activeItems.filter((_, index) => index === indexToOperate);
    switch (activeTab) {
      case 1:
        axiosElement = "api/todos/";
        break;
      case 2:
        axiosElement = "api/todo/";
        break;
      case 3:
        axiosElement = "api/done/";
        break;
      default:
        break;
    }
    switch (axiosMethod) {
      case "patch":
        axios
          .patch(axiosElement + item[0]._id, { done: !item[0].done })
          .then((response) => setActiveItems(response.data))
          .catch(() => console.log("catch"));
        break;
      case "delete":
        axios
          .delete(axiosElement + item[0]._id)
          .then((response) => setActiveItems(response.data))
          .catch(() => console.log("catch"));
        break;
      default:
        break;
    }
  };

  return (
    <div className="tabs">
      <ul className="nav">
        <TabHeader
          title="All"
          id={1}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabHeader
          title="ToDo"
          id={2}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabHeader
          title="Done"
          id={3}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>

      <div className="content">
        <TabContent id={1} activeTab={activeTab}>
          <h4>All Elements of TODO List:</h4>
          <Tiles items={activeItems} handleClick={handleClickTile} />
        </TabContent>
        <TabContent id={2} activeTab={activeTab}>
          <h4>Elements to do:</h4>
          <Tiles items={activeItems} handleClick={handleClickTile} />
        </TabContent>
        <TabContent id={3} activeTab={activeTab}>
          <h4>Elements which are done:</h4>
          <Tiles items={activeItems} handleClick={handleClickTile} />
        </TabContent>
      </div>

      <div className="button--div">
        <input className="button--input" value={name} onChange={handleChange} />
        <Button color="error" onClick={handleSubmit}>
          Create
        </Button>
      </div>
      {error ? errorText : null}
    </div>
  );
};
