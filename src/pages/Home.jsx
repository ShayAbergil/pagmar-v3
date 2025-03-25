import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>שלום</h1>
      <p>ברוכים הבאים לאפליקציה שלנו! אנחנו שמחים שאתם כאן ומצפים להראות לכם את כל התכונות המדהימות שהכנו.</p>
      <button onClick={() => navigate('/questions')}>בואו נתחיל</button>
    </div>
  );
}

export default Home;