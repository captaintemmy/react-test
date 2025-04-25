"use client";

import * as React from "react";
import { List, arrayMove } from "react-movable";
import { Switch } from "@/components/ui/switch"; // Adjust the import path based on your project structure
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox";
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
  const [dropdownData, setDropdownData] = React.useState<string[]>([""]); // State for dropdown options
  const [items, setItems] = React.useState(dummyData);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [dragEnabled, setDragEnabled] = React.useState(false); // Dragging is off by default
  const [selectedFramework1, setSelectedFramework1] = React.useState(""); // State for first combobox
  const [inputValue, setInputValue] = React.useState<string[]>([""]); // State for dynamic input fields
  const [smallText, setSmallText] = React.useState({
    min: "",
    max: "",
    checked: false,
    dropdown: "number", // Default dropdown value
  }); // State for small text input
  const [largeText, setLargeText] = React.useState(""); // State for large text input
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(); // State for selected date

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
        <Switch checked={dragEnabled} onCheckedChange={toggleDrag} />
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
            <div className="flex items-center">
              <div
                className={`mr-4 w-8 h-8 flex items-center justify-center transition-opacity duration-300 ${dragEnabled ? "opacity-100" : "opacity-0"
                  }`}
              >
                <span className="drag-handle cursor-grab text-gray-500 hover:text-gray-700 flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  ⠿
                </span>
              </div>
              <span
                className="flex-1 text-[#225055] text-center cursor-pointer"
                onClick={() => toggleAccordion(items.indexOf(value))}
              >
                {value}
              </span>
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => toggleAccordion(items.indexOf(value))}
              >
                {expandedIndex === items.indexOf(value) ? "▲" : "▼"}
              </span>
            </div>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden duration-300 ${expandedIndex === items.indexOf(value) ? "max-h-70" : "max-h-0"
                }`}
            >
              <div className="mt-2 p-2 bg-gray-100 rounded overflow-y-auto max-h-70 border border-black">
                <p className="text-gray-700">
                  This is the dropdown menu for {value}.
                </p>

                {/* Combobox1 */}
                <div className="flex justify-center mt-4 items-center space-x-4">
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

                {/* Conditionally Render Date Picker */}
                {selectedFramework1 === "Date picker" && (
                  <div className="mt-4">
                    {/* Checkbox */}
                    <div className="flex justify-center items-center">
                      <Checkbox
                        checked={smallText.checked}
                        onCheckedChange={(checked) =>
                          setSmallText((prev) => ({ ...prev, checked: Boolean(checked) }))
                        }
                      />
                      <label className="ml-2 flex justify-center items-center text-gray-700">
                        Read only
                      </label>
                    </div>
                  </div>
                )}

                {/* Conditionally Render Small Text Input */}
                {selectedFramework1 === "Text input" && (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedFramework1 === "Text input" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-[100%]">
                      {/* Min Field */}
                      <input
                        type="number"
                        value={smallText.min}
                        onChange={(e) =>
                          setSmallText((prev) => ({ ...prev, min: e.target.value }))
                        }
                        placeholder="Min value"
                        className="p-2 border border-gray-300 rounded"
                      />

                      {/* Checkbox */}
                      <div className="flex justify-center items-center">
                        <Checkbox
                          checked={smallText.checked}
                          onCheckedChange={(checked) =>
                            setSmallText((prev) => ({ ...prev, checked: Boolean(checked) }))
                          }
                        />
                        <label className="ml-2 flex justify-center items-center text-gray-700">
                          Read only
                        </label>
                      </div>

                      {/* Max Field */}
                      <input
                        type="number"
                        value={smallText.max}
                        onChange={(e) =>
                          setSmallText((prev) => ({ ...prev, max: e.target.value }))
                        }
                        placeholder="Max value"
                        className="p-2 border border-gray-300 rounded"
                      />

                      {/* Dropdown */}
                      <select
                        value={smallText.dropdown}
                        onChange={(e) =>
                          setSmallText((prev) => ({ ...prev, dropdown: e.target.value }))
                        }
                        className="p-2 border border-gray-300 rounded"
                      >
                        <option value="number">Number</option>
                        <option value="text">Text</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Conditionally Render Action Button Input Fields */}
                {selectedFramework1 === "Action button" && (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedFramework1 === "Action button" ? " opacity-100" : "opacity-0"
                      }`}
                  >
                    <div
                      className={`mt-4 grid ${inputValue.length > 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-2"
                        } gap-4 w-full max-w-[150%]`}
                      ref={(el) => {
                        if (el) {
                          setTimeout(() => {
                            el.scrollTop = el.scrollHeight; // Scroll to the bottom when a new input is added
                          }, 0); // Ensure this happens after the DOM updates
                        }
                      }}
                    >
                      {inputValue.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            value={value}
                            onChange={(e) => {
                              const newInputValue = [...inputValue];
                              newInputValue[index] = e.target.value;
                              setInputValue(newInputValue);

                              // Add a new input field if the user is typing in the last one
                              if (
                                index === inputValue.length - 1 &&
                                e.target.value !== ""
                              ) {
                                setInputValue([...newInputValue, ""]);
                              }
                            }}
                            placeholder="Enter text"
                            className="p-2 border border-gray-300 rounded flex-1"
                          />
                          {index >= 2 && ( // Prevent removing the first two inputs
                            <button
                              onClick={() => {
                                const newInputValue = inputValue.filter((_, i) => i !== index);
                                setInputValue(newInputValue);
                              }}
                              className="p-2 bg-black text-white  text-lg rounded-full hover:bg-red-600 hover:scale-110 transition-transform"
                              style={{
                                width: "25px",
                                height: "25px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="h-10"></div> {/* Add some padding at the bottom */}
                    </div>
                  </div>
                )}

                {/* Conditionally Render Dropdown Input Fields */}
                {selectedFramework1 === "Dropdown" && (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedFramework1 === "Dropdown" ? "opacity-100 " : "opacity-0 "
                      }`}
                  >
                    <div
                      className={`mt-4 grid ${dropdownData.length > 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-2"
                        } gap-4 w-full max-w-[150%] overflow-y-auto`}// Set a max height for the container
                      ref={(el) => {
                        if (el) {
                          setTimeout(() => {
                            el.scrollTop = el.scrollHeight; // Scroll to the bottom when a new option is added
                          }, 0); // Ensure this happens after the DOM updates
                        }
                      }}
                    >
                      {dropdownData.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            value={value}
                            onChange={(e) => {
                              const newDropdownData = [...dropdownData];
                              newDropdownData[index] = e.target.value;
                              setDropdownData(newDropdownData);

                              // Add a new dropdown option if the user is typing in the last one
                              if (
                                index === dropdownData.length - 1 &&
                                e.target.value !== ""
                              ) {
                                setDropdownData([...newDropdownData, ""]);
                              }
                            }}
                            placeholder="Enter dropdown option"
                            className="p-2 border border-gray-300 rounded flex-1"
                          />
                          {index >= 2 && ( // Prevent removing the first two options
                            <button
                              onClick={() => {
                                const newDropdownData = dropdownData.filter((_, i) => i !== index);
                                setDropdownData(newDropdownData);
                              }}
                              className="p-2 bg-black text-white font-bold text-lg rounded-full hover:bg-red-600 hover:scale-110 transition-transform"
                              style={{
                                width: "25px",
                                height: "25px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="h-10"></div> {/* Add some padding at the bottom */}
                    </div>
                  </div>
                )}

                {/* Conditionally Render Large Text Input */}
                {selectedFramework1 === "Large text input" && (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedFramework1 === "Large text input" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-[100%]">
                      {/* Min Field */}
                      <input
                        type="number"
                        value={smallText.min}
                        onChange={(e) =>
                          setSmallText((prev) => ({ ...prev, min: e.target.value }))
                        }
                        placeholder="Min value"
                        className="p-2 border border-gray-300 rounded"
                      />

                      {/* Checkbox */}
                      <div className="flex justify-center items-center">
                        <Checkbox
                          checked={smallText.checked}
                          onCheckedChange={(checked) =>
                            setSmallText((prev) => ({ ...prev, checked: Boolean(checked) }))
                          }
                        />
                        <label className="ml-2 flex justify-center items-center text-gray-700">
                          Read only
                        </label>
                      </div>

                      {/* Max Field */}
                      <input
                        type="number"
                        value={smallText.max}
                        onChange={(e) =>
                          setSmallText((prev) => ({ ...prev, max: e.target.value }))
                        }
                        placeholder="Max value"
                        className="p-2 border border-gray-300 rounded"
                      />

                      {/* Dropdown */}
                      <select
                        value={smallText.dropdown}
                        onChange={(e) =>
                          setSmallText((prev) => ({ ...prev, dropdown: e.target.value }))
                        }
                        className="p-2 border border-gray-300 rounded"
                      >
                        <option value="number">Number</option>
                        <option value="text">Text</option>
                      </select>
                    </div>
                  </div>
                )}
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