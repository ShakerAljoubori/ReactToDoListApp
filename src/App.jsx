import "./App.css"; // needed to center the list and wrao it in div. Then calling the classname of div in app.css to edit
import List from "./List/List.jsx";

function App() {
  return (
    <>
      <div className="app=wrapper">
        <List />
      </div>
    </>
  );
}

export default App;
