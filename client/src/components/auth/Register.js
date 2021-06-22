import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: " ",
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/chat");
    }
  }, [isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { name, email, password, password2, phone } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      name,
      email,
      password,
      phone,
    });
  };

  return (
    <div className="row h-100">
      <form
        className="col-md-4 col-sm-12 my-auto"
        style={{ margin: "0 auto" }}
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            value={phone}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="btn btn-primary btn-block"
          style={{ margin: "10% auto" }}
        />
        <p className="text-center">
          <Link to="/login">Already A User? Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
