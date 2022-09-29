import React from "react";

const TopMenu = ({ menuItems }) => {
  return (
    <div>
      {menuItems &&
        menuItems.map((item, index) => (
          <a key={index} href={"#" + item.tabName} className="tab-item">
            {item.tabName}
          </a>
        ))}
    </div>
  );
};

export default TopMenu;
