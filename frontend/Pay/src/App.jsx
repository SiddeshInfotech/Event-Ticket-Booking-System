import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./Payment";
import BookingConfirmed from "./BookingConfirmed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;