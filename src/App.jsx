import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StatisticQuestions from './pages/Questions'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<StatisticQuestions />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App