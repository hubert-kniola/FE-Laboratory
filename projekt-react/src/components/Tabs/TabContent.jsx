import "../../styles/Tabs.css"

export const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? <div className="tab-content">{children}</div> : null;
};
