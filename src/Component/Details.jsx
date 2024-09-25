import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const user_login = localStorage.getItem("user_login");
    if (user_login) {
      setLoggedInUser(JSON.parse(user_login));
    } else {
      alert("No user is logged in. Please login.");
      history("/login");
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("user_login");
    alert("Logged out successfully");
    history("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#a7c8fc" }}
    >
      {loggedInUser ? (
        <Card className="p-4" style={{ width: "30rem" }}>
          <h3 className="text-center mb-4">User Details</h3>
          <p><strong>Name:</strong> {loggedInUser.name}</p>
          <p><strong>Email:</strong> {loggedInUser.email}</p>
          <p><strong>Password:</strong> {loggedInUser.password}</p>
          <Button
            variant="danger"
            className="w-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Details;
