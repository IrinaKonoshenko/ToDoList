import React, { useEffect, useState } from "react";
import "./App.css";
import { Item, Title } from "./components";
import { Form } from "./components/form/form";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState<
    {
      id: number;
      text: string;
      checked: boolean;
    }[]
  >([]);

  useEffect(() => {
    const data = localStorage.getItem("task");

    if (data) {
      setItems(JSON.parse(data));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("task", JSON.stringify(items));
    }
  }, [items]);

  function onChange(id: number, text: string, checked: boolean) {
    const newItems = items.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          text,
          checked,
        };
      } else {
        return a;
      }
    });

    setItems(newItems);
  }

  return (
    <div className="max-w-[450px] mx-auto mt-5 border border-gray-600 rounded-lg overflow-hidden">
      <Title />
      <Form
        onSave={(text) =>
          setItems([
            ...items,
            { id: items.length + 1, text: text, checked: false },
          ])
        }
      />
      {isLoaded ? (
        <div>
          {items.map((item) => (
            <Item
              checked={item.checked}
              text={item.text}
              key={item.id}
              onChange={(t, c) => onChange(item.id, t, c)}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
