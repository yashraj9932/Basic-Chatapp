import "./App.css";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Chat from "./components/Chat/Chat";
import PrivateRoute from "./routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import Navbar from "./components/Navbar";
import ChatState from "./context/chat/ChatState";

const App = () => {
  return (
    <AuthState>
      <ChatState>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/chat" component={Chat} />
            </Switch>
          </div>
        </Router>
      </ChatState>
    </AuthState>
  );
};

export default App;
