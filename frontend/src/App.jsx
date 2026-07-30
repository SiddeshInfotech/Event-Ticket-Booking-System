import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import Login from './Login'
import EventDetail from './EventDetail'
import EventForm from './EventForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Homepage />} />
        <Route path="/profile" element={<Homepage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/edit/:id" element={<EventForm />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
