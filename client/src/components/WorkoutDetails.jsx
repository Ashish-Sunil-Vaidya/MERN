/* eslint-disable react/prop-types */
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";


export default function WorkoutDetails({ workout }) {
  // console.log(workout.title, workout.load, workout.reps, workout.createdAt);
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext()
  

  const handleDelete = async () => {
   
    if(!user)
    {
      return;
    }
    const res = await fetch(
      "/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      );
    
    
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };
  return (
    <div className="workout-card">
      <div className="card-col-1">
        <h2 className="workout-title">{workout.title}</h2>
        <p>
          <strong style={{ fontWeight: "900" }}>Load:</strong>{" "}
          <span style={{ marginLeft: ".5rem" }}>{workout.load}</span>(in kgs)
        </p>
        <p>
          <strong style={{ fontWeight: "900" }}>Reps:</strong>
          <span style={{ marginLeft: ".5rem" }}>{workout.reps}</span>
        </p>
        <p style={{ opacity: "0.7" ,marginTop:"1rem"}}>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="card-col-2">
        <button className="delete-button" onClick={handleDelete}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
}
