import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/chat");
    }
  }, [isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="row h-100">
      <form
        className="col-md-4 my-auto"
        style={{ margin: "0 auto" }}
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          tyle={{ margin: "10% auto" }}
          className="btn btn-primary btn-block"
          style={{ margin: "10% auto" }}
        />
        <p className="text-center">
          <Link to="/register">Not A User? Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
