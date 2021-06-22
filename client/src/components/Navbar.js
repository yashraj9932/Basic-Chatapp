import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ marginBottom: "2%" }}>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Chat App</span>
      </nav>
    </div>
  );
};

export default Navbar;
