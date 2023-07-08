import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register.js";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ChatList from "./components/ChatList";
import ServiceProvider from "./components/ServiceProvider";
import User from "./components/User";
import AllUsers from "./components/AllUsers";
import AllServices from "./components/AllServices";
import UserServices from "./components/UserServices";
import ViewServices from "./components/ViewServices";
import AllAdminServices from "./components/AllAdminServices";
import Services from "./components/Services";
import Chat from "./components/Chat";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT , POS_TOP } from "butter-toast";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/chat_list" component={ChatList}></Route>
          <Route path="/servicers" component={Services}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/chat/:id" component={Chat}></Route>
          <Route path="/service_provider" component={ServiceProvider}></Route>
          <Route path="/allusers" component={AllUsers}></Route>
          <Route path="/allservices" component={AllServices}></Route>
          <Route path="/userservices" component={UserServices}></Route>
          <Route path="/selected_service/:id" component={ViewServices}></Route>
          <Route path="/alladminservices" component={AllAdminServices}></Route>
          <Route path="/" component={Register}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
