"use client";

import * as React from "react";
import { List, arrayMove } from "react-movable";

const dummyData = ["Item 1 ergh ergh etgb ertgh etg 3445345 345  2435 2345 245 245 h", "Item 2", "Item 3", "Item 4"]

const SuperSimple: React.FC = () => {
  const [items, setItems] = React.useState(dummyData);

  return (
    <div className="w-full h-screen">
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <ul {...props} className="list-none p-2">
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged }) => (
          <li
            {...props}
            className={`p-2 mb-2 border border-[#225055] rounded-xl max-w-sm flex justify-center items-center  ${
              isDragged ? "bg-gray-200" : "bg-white"
            }`}
          >
            {/* Drag handle */}
            <span
              className="mr-4 cursor-grab text-gray-500 hover:text-gray-700 flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full"
            >
              ⠿
            </span>
            {/* Item text */}
            <span className="flex-1 text-[#225055]">{value}</span>
          </li>
        )}
      />
    </div>
  );
};

export default SuperSimple;