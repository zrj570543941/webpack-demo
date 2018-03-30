import "./main.css";
import React from "react";
import ReactDom from"react-dom";

import component from "./component";
const demoComponent = component("Another");
document.body.appendChild(demoComponent);