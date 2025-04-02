import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StatisticQuestions from './pages/Statistic_questions'
import OverviewQuestions from "./pages/Overview_questions";
import SelectSubject from './pages/Select_subject';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Statistic_questions" element={<StatisticQuestions />} />
          <Route path="/Overview_questions" element={<OverviewQuestions />} />
          <Route path="/Select_subject" component={SelectSubject} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
