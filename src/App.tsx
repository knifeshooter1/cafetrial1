import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Room from './pages/Room.tsx';
import ModulesShowcase from './pages/ModulesShowcase.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/modules" element={<ModulesShowcase />} />
      </Routes>
    </Router>
  );
}

export default App;
