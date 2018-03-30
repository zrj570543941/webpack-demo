import 'purecss';
import React from "react";
import ReactDom from"react-dom";
import { shake } from "./shake";

shake();

import component from "./component";
import './main.css';
document.body.appendChild(component());

// class A extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             c:{a: 1, b:2}
//         }
//     }
//
//     shouldComponentUpdate(nextProps, nextState, nextContext) {
//         return true;
//     }
//
//     componentWillReceiveProps(nextProps, nextContext) {
//         // console.log(111)
//     }
//
//
//     render() {
//         return (
//             <div>
//                 <div
//                     onClick={() => {
//                         let c = this.state.c;
//                         c.a++;
//                         this.setState({
//                             c: c
//                         })
//                         // console.log(this.state.c)
//                     }
//                 }
//                 >
//                     11111
//                 </div>
//                 <B
//                     // c={this.state.c}
//                 ></B>
//             </div>
//         );
//     }
//
// }
//
// class B extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             a:''
//         }
//     }
//     shouldComponentUpdate(nextProps, nextState, nextContext) {
//         // console.log(111);
//         return false;
//     }
//
//     componentWillReceiveProps(nextProps, nextContext) {
//         console.log(1111)
//     }
//
//     render() {
//
//         // console.log(222222);
//         return (
//             <div
//                 onClick={() => this.setState({a: Math.random()})}
//             >222222222</div>
//         );
//     }
//
// }
//
// var div = document.createElement("div");
// document.body.appendChild(div)
//
// ReactDom.render(<A></A>, div)

