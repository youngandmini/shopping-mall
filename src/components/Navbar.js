import React from 'react';
import "./Navbar.css";
import {FiLogIn, FiLogOut, FiShoppingCart, FiUser} from "react-icons/fi";
import {useRecoilState, useSetRecoilState} from "recoil";
import {PageAtom} from "../recoil/PageAtom";
import {Page} from "../enums/PageEnum";
import {UserAtom} from "../recoil/UserAtom";
import {AuthAtom} from "../recoil/AuthAtom";


export default function Navbar({setToken}){

    const setPage = useSetRecoilState(PageAtom);
    const [user, setUser] = useRecoilState(UserAtom);
    const [auth, setAuth] = useRecoilState(AuthAtom);


    const logoutHandler = () => {
        setToken("");
        localStorage.removeItem("userToken");
        setAuth(false);
        setUser("");

    };

    if (auth) {
        return (
            <div className="navbar">
                <h1 onClick={() => setPage(Page.PRODUCT)}># YOUNG and MINI</h1>
                <div className="user-hello">{user}님 안녕하세요.</div>
                <button onClick={() => setPage(Page.CART)}>장바구니 <FiShoppingCart/></button>
                <button>회원정보 <FiUser/></button>
                <button onClick={() => logoutHandler()}>로그아웃 <FiLogOut/></button>
            </div>
        );
    } else {
        return (
            <div className="navbar">
                <h1># YOUNG and MINI</h1>
            </div>
        );
    }
};