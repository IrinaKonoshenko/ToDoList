import { useState } from "react";

interface FormProps {
  onSave: (text: string) => void;
}

export function Form({ onSave }: FormProps) {
  const [value, setValue] = useState("");
  return (
    <div className="flex justify-between items-center gap-2 px-1 py-2 border border-gray-400 rounded-sm overflow-hidden">
      <input
        placeholder="write your tasks here "
        className="text-base font-normal text-black grow p-1 "
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          if (value.trim() === "") {
            return;
          }
          onSave(value);
          setValue("");
        }}
        className="border border-gray-300 rounded-sm overflow-hidden p-2 text-blue-400 text-sm font-medium"
      >
        add
      </button>
    </div>
  );
}
