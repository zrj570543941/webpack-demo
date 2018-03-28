import 'purecss';
import "react";
import "react-dom";
import { shake } from "./shake";

shake();

import component from "./component";
import './main.css';
document.body.appendChild(component());