import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const {user} = useAuthContext();
  console.log('=== user WorkoutForm.jsx [13] ===', user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user)
    {
      setError("You must be logged in")
      return;
    }
    const workout = { title, load, reps };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("new workout added:", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-form-container">
      <form className="workout-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <h3 className="form-header">Add a New Workout</h3>

        <div className="form-item">
          
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Exercise Name"
            value={title}
            className={`workout-input ${emptyFields.includes("title")? "empty-field" : ""}`}
          />
        </div>

        <div className="form-item">
         
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            placeholder="Load (in kgs)"
            value={load}
            className={`workout-input ${emptyFields.includes("load") ? "empty-field" : ""}`}
          />
        </div>

        <div className="form-item">
         
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            placeholder="Reps"
            value={reps}
            className={`workout-input ${emptyFields.includes("reps") ? "empty-field" : ""}`}
          />
        </div>

        <button className="submit-button">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
