import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getRelevantQuestions } from '../utils/oq_picker';  // Assuming the function is in utils/oq_picker.js

const OverviewQuestions = ({ statistic_data }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  
  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getRelevantQuestions(statistic_data);
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, [statistic_data]);

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userAnswers = Object.keys(answers).map(key => ({
      user_id: statistic_data.id,  // Assuming 'statistic_data' has 'id'
      oq_id: key,
      answer_content: answers[key] || ''  // Store empty string if no answer provided
    }));

    try {
      const { data, error } = await supabase
        .from('Overview_answers')
        .insert(userAnswers)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      console.log('Answers submitted:', data);
      // Redirect or notify user upon successful submission if needed
    } catch (error) {
      console.error('Error submitting answers:', error.message);
    }
  };

  const renderInputField = (question) => {
    if (question.oq_type === 'text') {
      return (
        <input
          type="text"
          placeholder="Type your answer..."
          value={answers[question.id] || ''}
          onChange={(e) => handleInputChange(question.id, e.target.value)}
        />
      );
    } else if (question.oq_type === 'number') {
      return (
        <input
          type="number"
          placeholder="Type your answer..."
          value={answers[question.id] || ''}
          onChange={(e) => handleInputChange(question.id, e.target.value)}
        />
      );
    }
    return null;
  };

  return (
    <div className="overview-questions-container">
      <h1>שאלות נוספות</h1>
      <form onSubmit={handleSubmit} className="questions-form">
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <h3>{question.oq_text}</h3>
            {renderInputField(question)}
          </div>
        ))}
        <button type="submit" className="submit-button">שלח/י</button>
      </form>
    </div>
  );
};

export default OverviewQuestions;
