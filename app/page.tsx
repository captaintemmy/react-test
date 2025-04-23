"use client";

import * as React from "react";
import { List, arrayMove } from "react-movable";

const dummyData = ["Item 1", "Item 2", "Item 3", "Item 4"];

const SuperSimple: React.FC = () => {
  const [items, setItems] = React.useState(dummyData);

  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props }) => (
        <ul {...props} className="list-none p-0">
          {children}
        </ul>
      )}
      renderItem={({ value, props }) => (
        <li
          {...props}
          className="p-2 mb-2 border border-emerald-700 rounded-xl bg-gray-100 max-w-md"
        >
          {value}
        </li>
      )}
    />
  );
};

export default SuperSimple;