import { Rout } from "react-router-dom";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./navBarTest";
import "./interface.css";

function nav() {
  return (
    <BrowserRouter>
      <Nav></Nav>
    </BrowserRouter>
  );
}

export default nav;
