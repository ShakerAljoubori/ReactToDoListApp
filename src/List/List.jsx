import { useState } from "react";
import styles from "./List.module.css";

function List() {
  const [input, setInput] = useState(""); //input const
  const [list, setList] = useState([]); // list const (Added [] insied usestate to indicate it is a list)

  function InputListener(e) {
    setInput(e.target.value);
  }

  function AddItem(e) {
    //added event (e) needed for the line below
    e.preventDefault();
    // preventDefault means the page won't reload if the list gets updated. Without this, the page will reload and the list will be gone
    if (input.trim() !== "") {
      //if input.trim (trim meaning it deletes any spaces "  Shaker  " becomes "Shaker") is not blank then do the function below:
      setList([...list, { text: input, completed: false }]);
      //Targeted the set list, added brackets since we want to edit inside the list to directly affect the elements. (...list means add a new blank line inside the list),(then we add squirly brackets to add two properyies: text - which is the actual text amd completed - which indicates if the box is checked or not.)
      setInput("");
      // Reset setInput to blank. Without this, each time a user inputs something, it's added (ex. 1.Shaker 2. Aljoubori, it becomes 1.Shaker 2. ShakerAljoubori not 1. Shaker 2. Aljubori)
    }
  }

  function toggleComplete(index) {
    // The (index) here is just a name for the number that tells us which list item was clicked.
    // For example, if we clicked the 1st item, index = 0; if we clicked the 2nd item, index = 1.
    // I can name this anything I want (like "banana") as long as it's the same in the onChange below.

    const newList = [...list];
    // We create a COPY of the current list here.
    // We're not adding a new line or item.
    // This is like photocopying the current list so we can safely edit it.
    // React doesn't like us changing the original list directly, so we work on a copy.

    newList[index].completed = !newList[index].completed;
    // We find the specific item that was clicked using [index].
    // That item has a property called "completed" (which we set to false when it was created in AddItem).
    // The "!" means "opposite of".
    // So if completed was false → it becomes true (checked).
    // If completed was true → it becomes false (unchecked).
    // This is basically like flipping a light switch from off to on, or on to off.

    setList(newList);
    // Here we tell React: "Hey, I made changes to the list. Use this new updated version."
    // React will then re-render the UI using this updated list.
    // This is why the checkbox toggles visually and the text crosses out when we click it.
  }

  return (
    <div className={styles.container}>
      <h1>To-Do List App</h1>
      <form onSubmit={AddItem}>
        {/* added the OnSubmit property so if we click the submit button, the AddItem function will execute */}
        <input
          type="text"
          value={input}
          onChange={InputListener}
          placeholder="Add an item"
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>

      <ol>
        {list.map((item, index) => (
          // Targeted the list(.map means it will loop through or check every item in the list) then we added keys like item and index.
          // Item needs to be added first before index for some reason. It is what it is.
          <li key={index} className={item.completed ? styles.completed : ""}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(index)}
            ></input>
            {item.text}
          </li>
          // then we add the key property on the li, linked index to it, and then print {item}
        ))}
      </ol>
    </div>
  );
}

export default List;
