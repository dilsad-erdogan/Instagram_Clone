import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="bg-gray-800 text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
