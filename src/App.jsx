import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Component/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Account from "./Component/Account";
import UserList from "./Component/UserList";
const App = () => {
  return (
    <div>
      <HashRouter>
        {" "}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/account" element={<Account></Account>}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
        </Routes>
      </HashRouter>
      </div>
  );
};

export default App;
