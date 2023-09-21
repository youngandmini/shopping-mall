import React, {useState} from 'react';
import "./Login.css";

import axios from "axios";
import {useRecoilState} from "recoil";
import {AuthAtom} from "../recoil/AuthAtom";
import {UserAtom} from "../recoil/UserAtom";
import {TokenAtom} from "../recoil/TokenAtom";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failedMessage, setFailedMessage] = useState("");

    const [auth, setAuth] = useRecoilState(AuthAtom);
    const [user, setUser] = useRecoilState(UserAtom);
    const [token, setToken] = useRecoilState(TokenAtom);

    const loginHandler = () => {
        axios({
            url: "https://fakestoreapi.com/auth/login",
            method: "POST",
            data: {
                username: username,
                password: password,
            }
        }).then(response => {
            console.log(response.data.token);
            setToken(response.data.token);
            localStorage.setItem("userToken", response.data.token);
            setFailedMessage("");
            setAuth(true);
            setUser(username);
        }).catch(error => {
            console.log(error.response);
            setFailedMessage("아이디 혹은 비밀번호가 일치하지 않습니다.");
        })
    };

    return (
        <div className="login">
            <div className="login-failed">{failedMessage}</div>

            <div className="login-form">
                <label htmlFor="user-id">아이디</label>
                <input id="user-id"
                       className="login-input"
                       type="text"
                       value={username}
                       placeholder="username"
                       onChange={(e)=>setUsername(e.target.value)}/>

                <label htmlFor="user-password">비밀번호</label>
                <input id="user-password"
                       className="login-input"
                       type="password"
                       value={password}
                       placeholder="password"
                       onChange={(e)=>setPassword(e.target.value)}/>

                <button onClick={loginHandler} className="login-button">로그인</button>
            </div>
            <span>username1: "mor_2314" password1: "83r5^_"</span>
            <span>username2: "johnd" password2: "m38rmF$"</span>

        </div>
    );
};