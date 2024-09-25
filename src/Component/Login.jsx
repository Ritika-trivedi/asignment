import { Form, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [inval, setInval] = useState({
    email: "",
    password: "",
  });

  //const [data, setData] = useState([]);
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("userdata");
    console.log(getuserArr);

    const { email, password } = inval;

    if (email === "") {
      alert("Email field is required");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address");
    } else if (password === "") {
      alert("Password field is required");
    } else if (password.length < 6) {
      alert("Password length must be greater than 6 characters");
    } else {
      //localStorage.setItem("userdata", JSON.stringify([data, ...inval]));

      //localStorage.setItem("userdata", JSON.stringify([...data, inval]));

      if (getuserArr) {
        const userdata = JSON.parse(getuserArr);
        console.log(userdata);
        const userlogin = userdata.filter((el) => {
          return el.email === email && el.password === password;
        });

        if (!userlogin) {
          alert("invalid details");
        } else {
          console.log("user login sucessfully");
          localStorage.setItem("loggedInUser", JSON.stringify(userlogin));
          navigate("/account");
        }
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#a7c8fc" }}
      >
        <Card className="p-4" style={{ width: "30rem" }}>
          <h3 className="text-center mb-4">Login Page</h3>
          <Form>
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
            Does not have an account
            <span>
              <Link to="/"> Register</Link>
            </span>
          </p>
        </Card>
      </div>
    </>
  );
};

export default Login;
