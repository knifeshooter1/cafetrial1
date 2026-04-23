import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Room from './pages/Room.tsx';
import Showcase from './pages/Showcase.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/modules" element={<Showcase />} />
      </Routes>
    </Router>
  );
}

export default App;
