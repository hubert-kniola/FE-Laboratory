import "../../styles/Tabs.css"

export const TabHeader = ({ id, title, activeTab, setActiveTab }) => {
  return (
    <li
      onClick={() => setActiveTab(id)}
      className={activeTab === id ? "active tab-header" : "tab-header"}
    >
      {title}
    </li>
  );
};
