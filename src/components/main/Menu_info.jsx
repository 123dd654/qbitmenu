"use client"
import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./Menu_item";

const Menu = React.forwardRef(({ title, items, isLast }, ref) => {
   const visibleItems = items.slice(0, 6);
  return (
    <div className={`container ${isLast ? "last-menu" : ""}`} ref={ref}>
      <div className="menu">
        <h2 className="menu-title">{title}</h2>
        <div className="menu-items">
           {visibleItems.map((item) => (
            <MenuItem key={item.id ?? item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
});

// display name 추가
Menu.displayName = 'Menu';

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLast: PropTypes.bool,
};

export default Menu;
