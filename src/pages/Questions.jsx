import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { supabase } from "../lib/supabase";

function StatisticQuestions() {
    const navigate = useNavigate(); // Navigation hook

    const [answers, setAnswers] = useState({
        age: "",
        gender: "",
        profession: "",
        f_status: "",
        political_orientation: "5",
        Religious_bkg: "5",
    });

    const options = {
        gender: ["גבר", "אישה", "א-בינארי", "מעדיפ/ה לא לומר"],
        profession: ["אקדמיה ומחקר", "רפואה טיפול ובריאות", "חינוך", "אומנות ותרבות", "עסקים ופיננסים", "עריכת דין", "שירות המדינה", "עבודה פיזית", "הייטק", "אחר"],
        f_status: ["רווק / רווקה", "נשוי / נשואה", "אלמן / אלמנה", "גרוש / גרושה", "בזוגיות", "זה מסובך", "לא רלוונטי"]
    };

    const labels = {
        age: "גיל",
        gender: "מגדר",
        profession: "מקצוע",
        political_orientation: "נטייה פוליטית",
        Religious_bkg: "רקע דתי",
        f_status: "מצב משפחתי"
    };

    const handleChange = (field, value) => {
        setAnswers((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting answers:", answers);

        try {
            const { error } = await supabase.from("Statistic_data").insert([answers]);

            if (error) throw error;

            console.log("Data inserted successfully!");

            // Navigate to "Overview_questions" and pass answers as state
            navigate("/overview_questions", { state: { statistic_data: answers } });

        } catch (error) {
            console.error("Error inserting data:", error.message);
        }
    };

    return (
        <div className="questions-container">
            <h1>נתונים סטטיסטיים</h1>
            <p className="section-description">
                <b>הבהרה: </b>הנתונים משפיעים על לשון הפניה והתאמה של שאלות בהמשך הסקר.
                הם עוברים אנונימיזציה בנפרד מן התשובות ונשמרים לצרכים סטטיסטיים בלבד.
            </p>
            <form onSubmit={handleSubmit} className="questions-list">
                <div className="question-card">
                    <h3>גיל</h3>
                    <input
                        type="number"
                        value={answers.age}
                        onChange={(e) => handleChange("age", e.target.value)}
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
                            {optionList.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className="question-card">
                    <h3>נטייה פוליטית</h3>
                    <p className="question-description">
                        מקם/י את עצמך על הסקאלה הפוליטית (1 - שמאל, 10 - ימין):
                    </p>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={answers.political_orientation}
                        onChange={(e) => handleChange("political_orientation", e.target.value)}
                        className="form-input"
                        style={{ marginTop: "10px" }} // Reduce space
                    />
                </div>

                <div className="question-card">
                    <h3>רקע דתי</h3>
                    <p className="question-description">דרג/י את מידת הדתיות שלך (1-10)</p>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={answers.Religious_bkg}
                        onChange={(e) => handleChange("Religious_bkg", e.target.value)}
                        className="form-input"
                        style={{ marginTop: "10px" }} // Reduce space
                    />
                </div>

                <button type="submit" className="submit-button">שלח/י</button>
            </form>
        </div>
    );
}

export default StatisticQuestions;
