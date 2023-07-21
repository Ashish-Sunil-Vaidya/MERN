import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick =  () => {
      logout();
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" className="workouts-main-header">
          Workout Companion
        </Link>
      </div>
      {user && (
        <div className="authentication">
          <span className="profile-name">{user.email}</span>
          <button className="logout-button" onClick={handleClick}>Logout</button>
        </div>
      )}
      {!user && (
        <nav className="authentication">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      )}
    </header>
  );
}
