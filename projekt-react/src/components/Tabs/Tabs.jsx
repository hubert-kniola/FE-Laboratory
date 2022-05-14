import { TabHeader } from "./TabHeader";
import { TabContent } from "./TabContent";
import { useEffect, useState } from "react";
import { All } from "../ToDo/All";
import { Todo } from "../ToDo/Todo";
import { Done } from "../ToDo/Done";
import "../../styles/Tabs.css";

export const Tabs = ({}) => {
  const [activeTab, setActiveTab] = useState(1);

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
          <All/>
        </TabContent>
        <TabContent id={2} activeTab={activeTab}>
          <Todo />
        </TabContent>
        <TabContent id={3} activeTab={activeTab}>
          <Done />
        </TabContent>
      </div>
    </div>
  );
};
