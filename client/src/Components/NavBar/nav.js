import { Redirect, Rout } from "react-router-dom";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./navBarTest";
import "./interface.css";

function nav(props) {
  // if (!props.state) {
  //   return <Redirect to="/login"></Redirect>;
  // }
  return (
    <BrowserRouter>
      {/* <Redirect to="/interface/utilisateur"></Redirect> */}
      <Nav></Nav>
    </BrowserRouter>
  );
}

export default nav;
