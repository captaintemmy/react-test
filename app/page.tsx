"use client";

import * as React from "react";
import { List, arrayMove } from "react-movable";
import { Switch } from "@/components/ui/switch"; // Adjust the import path based on your project structure
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dummyData = ["Item 1", "Item 2", "Item 3", "Item 4"];
const frameworks1 = [
  { value: "Action button", label: "Action button" },
  { value: "Date picker", label: "Date picker" },
  { value: "Dropdown", label: "Dropdown" },
  { value: "Large text input", label: "Large text input" },
  { value: "Text input", label: "Text input" },
];

const SuperSimple: React.FC = () => {
  const [items, setItems] = React.useState(dummyData);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [dragEnabled, setDragEnabled] = React.useState(false); // Dragging is off by default
  const [selectedFramework1, setSelectedFramework1] = React.useState(""); // State for first combobox
  const [selectedFramework2, setSelectedFramework2] = React.useState(""); // State for second combobox
  const [inputValue, setInputValue] = React.useState(""); // State for input field

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Close if already open, otherwise open
  };

  const toggleDrag = (checked: boolean) => {
    setDragEnabled(checked);
    if (checked) {
      setExpandedIndex(null); // Close all open menus when dragging is enabled
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* Dragging Toggle Switch */}
      <div className="mb-4 flex items-center space-x-2">
        <Switch
          checked={dragEnabled}
          onCheckedChange={toggleDrag}
        />
        <label className="text-gray-700">
          {dragEnabled ? "Dragging Enabled" : "Dragging Disabled"}
        </label>
      </div>

      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <ul {...props} className="list-none p-2 w-full max-w-2xl">
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged }) => (
          <li
            {...props}
            className={`p-2 mb-2 border border-[#225055] rounded-xl flex flex-col ${isDragged ? "bg-gray-200" : "bg-white"
              }`}
          >
            {/* Accordion Header */}
            <div className="flex items-center   ">
              {/* Drag handle (conditionally rendered with fade-in effect) */}
              <div
                className={`mr-4  w-8 h-8 flex items-center justify-center transition-opacity duration-300 ${dragEnabled ? "opacity-100" : "opacity-0"
                  }`}
              >
                <span
                  className="drag-handle cursor-grab text-gray-500 hover:text-gray-700 flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full"
                >
                  ⠿
                </span>
              </div>
              {/* Item text */}
              <span
                className="flex-1 text-[#225055] text-center cursor-pointer "
                onClick={() => toggleAccordion(items.indexOf(value))}
              >
                {value}
              </span>
              {/* Expand/Collapse Icon */}
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => toggleAccordion(items.indexOf(value))}
              >
                {expandedIndex === items.indexOf(value) ? "▲" : "▼"}
              </span>
            </div>


            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${expandedIndex === items.indexOf(value) ? "max-h-60" : "max-h-0"
                }`}
            >
              <div className="mt-2 p-2 bg-gray-100 rounded overflow-y-auto max-h-70 border border-black">
                <p className="text-gray-700">
                  This is the dropdown menu for {value}.
                </p>

                {/* Combobox1 */}
                <div className="flex justify-center mt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={expandedIndex === items.indexOf(value)}
                        className="w-[60%] h-12 justify-between text-lg"
                      >
                        {selectedFramework1
                          ? frameworks1.find(
                            (framework) => framework.value === selectedFramework1
                          )?.label
                          : "Select framework..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%] p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks1.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) =>
                                  setSelectedFramework1(
                                    currentValue === selectedFramework1 ? "" : currentValue
                                  )
                                }
                              >
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Conditionally Render Text Input Field */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${selectedFramework1 === "Text input" ? "max-h-20" : "max-h-0"
                    }`}
                >
                  <div className="mt-4 justify-center items-center flex">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter text..."
                      className="w-full max-w-[60%] p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                {/* Conditionally Render Large Text Input Field */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${selectedFramework1 === "Large text input" ? "max-h-48" : "max-h-0"
                    }`}
                >
                  <div className="mt-4 justify-center items-center flex">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter large text..."
                      className="w-full max-w-[60%] p-4 border border-gray-300 rounded h-27 resize-none" // Fixed size, slightly larger
                    />
                  </div>
                </div>
              </div>
            </div>

          </li>
        )}
        disabled={!dragEnabled} // Disable dragging when dragEnabled is false
      />
    </div>
  );
};

export default SuperSimple;