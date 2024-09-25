import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [inval, setInval] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target;
    //console.log(name, value);

    setInval(() => {
      return {
        ...inval,
        [name]: value,
      };
    });
    console.log(inval);
  };
  useEffect(() => {
    const savedData = localStorage.getItem("userdata");
    if (savedData) {
      setData(JSON.parse(savedData)); // Parse and set the existing data
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    //validation
    const { name, email, password, confirmpassword } = inval;

    if (name === "") {
      alert("Name field is required");
    } else if (email === "") {
      alert("Email field is required");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address");
    } else if (password === "") {
      alert("Password field is required");
    } else if (password.length < 6) {
      alert("Password length must be greater than 6 characters");
    } else if (confirmpassword === "") {
      alert("Confirm password field is required");
    } else if (password !== confirmpassword) {
      alert("Passwords do not match");
    } else {
      //console.log("Data submitted successfully:");

      //localStorage.setItem("userdata", JSON.stringify([data, ...inval]));
      const updatedData = [...data, inval];

      // Update the data state and save it to localStorage
      setData(updatedData);
      localStorage.setItem("userdata", JSON.stringify(updatedData));
      localStorage.setItem("loggedInUser", JSON.stringify(inval));
      alert("registration sucessfull");
      navigate("/account");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "#a7c8fc" }}
    >
      <Card className="p-4" style={{ width: "30rem" }}>
        <h3 className="text-center mb-4">Registration Form</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={getData}
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={getData}
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={getData}
              name="password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={getData}
              name="confirmpassword"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="button w-100 col-lg-4"
            onClick={handleSubmit}
          >
            Submit
          </Button>
         
        </Form>
        <p>
          Already Have n Account
          <span>
            <Link to="/login">login in</Link>
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Home;
