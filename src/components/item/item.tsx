import clsx from "clsx";
import { useEffect, useState } from "react";

interface ItemProps {
  checked: boolean;
  onChange?: (text: string, checked: boolean) => void;
  text: string;
}

export function Item({ checked, onChange, text }: ItemProps) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  function onClick() {
    setEdit(!edit);

    if (!edit) {
      return;
    }

    onChange?.(value, checked);
  }

  return (
    <div className="flex justify-between items-center gap-2 px-1 py-2 border border-gray-400 rounded-sm overflow-hidden">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange?.(text, !checked)}
      />
      {edit ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="enter your task here"
          className="text-base font-normal text-black grow p-1 border border-blue-300 rounded-sm"
        />
      ) : (
        <p
          className={clsx("text-base font-normal text-red grow p-1", {
            "line-through": checked,
          })}
        >
          {text}
        </p>
      )}
      <button
        onClick={onClick}
        className="border border-gray-300 rounded-sm overflow-hidden p-2 text-blue-400 text-sm font-medium"
      >
        {edit ? "Ok" : "Edit"}
      </button>
    </div>
  );
}
