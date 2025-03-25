import React, { useState } from 'react';

function StatisticQuestions() {
  const [answers, setAnswers] = useState({
    age: '',
    gender: '',
    profession: '',
    politicalOrientation: '',
    religiousBackground: '',
    familyStatus: '',
    politicalRating: '5',
    religiousRating: '5'
  });

  const options = {
    gender: ['גבר', 'אישה', 'א-בינארי', 'מעדיפ/ה לא לומר'],
    profession: ['אקדמיה ומחקר', 'רפואה טיפול ובריאות', 'חינוך', 'אומנות ותרבות', 'עסקים ופיננסים', 'עריכת דין', 'שירות המדינה', 'עבודה פיזית', 'הייטק', 'אחר'],
    familyStatus: ['רווק / רווקה', 'נשוי / נשואה', 'אלמן / אלמנה', 'גרוש / גרושה', 'בזוגיות', 'זה מסובך', 'לא רלוונטי']
  };

  const labels = {
    age: 'גיל',
    gender: 'מגדר',
    profession: 'מקצוע',
    politicalOrientation: 'נטייה פוליטית',
    religiousBackground: 'רקע דתי',
    familyStatus: 'מצב משפחתי'
  };

  const handleChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('תשובות שהוגשו:', answers);
  };

  const renderRatingInput = (field, label) => (
    <div className="question-card">
      <h4>{label}</h4>
      <input
        type="range"
        min="1"
        max="10"
        value={answers[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="form-input"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span>1</span>
        <span>{answers[field]}</span>
        <span>10</span>
      </div>
    </div>
  );

  return (
    <div className="questions-container">
      <h1>שאלון סטטיסטי</h1>
      <p className="question-description">אנא בחר/י את הרקע הדתי שלך</p>
      <form onSubmit={handleSubmit} className="questions-list">
        <div className="question-card">
          <h3>גיל</h3>
          <input
            type="number"
            value={answers.age}
            onChange={(e) => handleChange('age', e.target.value)}
            min="0"
            max="120"
            required
            className="form-input"
          />
        </div>

        {Object.entries(options).map(([field, optionList]) => (
          <div key={field} className="question-card">
            <h3>{labels[field]}</h3>
            <select
              value={answers[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              required
              className="form-select"
            >
              <option value="">בחר/י אפשרות</option>
              {optionList.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="question-card">
          <h3>נטייה פוליטית</h3>
          <p className="question-description">אנא בחר/י את הרקע הדתי שלך</p>
          {renderRatingInput('politicalRating', 'דרג/י את מידת המעורבות הפוליטית שלך (1-10)')}
        </div>

        <div className="question-card">
          <h3>רקע דתי</h3>
          <p className="question-description">אנא בחר/י את הרקע הדתי שלך</p>
          {renderRatingInput('religiousRating', 'דרג/י את מידת הדתיות שלך (1-10)')}
        </div>

        <button type="submit" className="submit-button">שלח/י</button>
      </form>
    </div>
  );
}

export default StatisticQuestions;
