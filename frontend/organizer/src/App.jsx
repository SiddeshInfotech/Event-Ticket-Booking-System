import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyEvents from "./MyEvents";
import CreateEvent from "./CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyEvents />} />
        <Route path="/createevent" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;