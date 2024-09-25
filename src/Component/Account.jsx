import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);
//set input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };
//update 
  const updateAccount = () => {
    const users = JSON.parse(localStorage.getItem("userdata")) || [];
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );
    localStorage.setItem("userdata", JSON.stringify(updatedUsers));
    alert("Account updated successfully!");
  };
  //delete

  const deleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("userdata")) || [];
    const updatedUsers = users.filter(
      (user) => user.email !== currentUser.email
    );
    localStorage.setItem("userdata", JSON.stringify(updatedUsers));
    localStorage.removeItem("loggedInUser");
    alert("Account deleted!");
    navigate("/register");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#a7c8fc" }}
    >
      <Card className="p-4" style={{ width: "30rem" }}>
        <h3 className="text-center mb-4">Manage Account</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={currentUser.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={currentUser.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={currentUser.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" className="w-100" onClick={updateAccount}>
            Update Account
          </Button>
          <Button
            variant="danger"
            className="w-100 mt-3"
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Account;
