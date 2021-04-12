import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class LoginForm extends Component {
    join = () => {
        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPassword.value,
        };
        axios
            .post("http://localhost:8080/member/join", send_param)
            .then(returnData => {
                 if(returnData.data.message) {
                     alert(returnData.data.message);
                 } else {
                     alert("회원가입 실패");
                 }
            })

            .catch(err => {
                console.log(err);
            })
    };

    login = () => {
        const send_param = {
            headers,
            email: this.loginEmail.value,
            password: this.loginPassword.value
        };
        axios
            .post("http://localhost:8080/member/login", send_param)
            .then(returnData => {
                if(returnData.data.message) {
                    $.cookie("login_id", returnData.data._id);
                    alert(returnData.data.message);
                    window.location.reload();
                } else {
                    alert("로그인 실패");
                }
            }) 
            .catch(err => {
                console.log(err);
            })
    };
}