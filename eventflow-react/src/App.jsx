import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import Event1 from './Event1'
import Event2 from './Event2'
import Event3 from './Event3'
import Event4 from './Event4'
import Event5 from './Event5'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bookings" element={<Homepage />} />
        <Route path="/profile" element={<Homepage />} />
        <Route path="/Event1" element={<Event1 />} />
        <Route path="/Event2" element={<Event2 />} />
        <Route path="/Event3" element={<Event3 />} />
        <Route path="/Event4" element={<Event4 />} />
        <Route path="/Event5" element={<Event5 />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;