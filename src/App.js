import './App.css';
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Category from "./components/Category";
import {useEffect, useState} from "react";
import Login from "./components/Login";
import Cart from "./components/Cart";
import {useRecoilState, useRecoilValue} from "recoil";
import {PageAtom} from "./recoil/PageAtom";
import {Page} from "./enums/PageEnum";
import {AuthAtom} from "./recoil/AuthAtom";
import {TokenAtom} from "./recoil/TokenAtom";
import {UserAtom} from "./recoil/UserAtom";

// import async from "async";
// import { collection, updateDoc, getDoc, doc } from "firebase/firestore";
// import {db} from './firebase';

function App() {

    const [token, setToken] = useRecoilState(TokenAtom);
    const [auth, setAuth] = useRecoilState(AuthAtom);
    const page = useRecoilValue(PageAtom);
    const user = useRecoilValue(UserAtom);


    // //users db의 {user}_token의 값을 가져옴
    // const getData = async (user) =>{
    //     try {
    //         const docRef = doc(db, "users", `${user}_token`);
    //         const docSnap = await getDoc(docRef);
    //         // console.log(docSnap.data().token);
    //
    //         return docSnap.data().token
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    //
    // //users db의 {user}_token의 값을 현재 토큰 값으로 업데이트하는 함수
    // const updateToken = async (user) =>{
    //     try {
    //         const docRef = doc(db, "users", `${user}_token`);
    //         // const docSnap = await getDoc(docRef);
    //         await updateDoc(docRef, {
    //             token: token
    //         });
    //         // console.log(token);
    //
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // 토큰이 업데이트 되면, updateToken
    // useEffect(() => {
    //     updateToken(user);
    // }, [token]);
    // 처음 렌더링 될때 getData
    // useEffect(() => {
    //     getData(user);
    // }, []);


    //setAuth의 조건은? 1. 토큰이 존재하고, 2. 토큰의 값이 DB에 있는 토큰값과 같아야한다.
    // useEffect(() => {
    //     if (token) {
    //         if (getData(user) === token) {
    //             setAuth(true);
    //         }
    //     }
    // }, []);


    //처음에 토큰이 있으면 바로 로그인
    //우선은 토큰이 있으면 무조건 로그인 하도록 하였음
    useEffect(() => {
        if (token) {
            setAuth(true);
        }
    }, []);

    //인증이 안됐으면
    if (!auth) {
        return (
            <div className="App">
                <Navbar
                    setToken={setToken}
                />
                <Login
                    setToken={setToken}
                />
                <Footer/>
            </div>
        );
    }
    // 카트로 가야하면
    else if (page === Page.CART){
        return (
            <div className="App">
                <Navbar
                    setToken={setToken}
                />
                <Cart/>
                <Footer/>
            </div>
        );
    }
    // 아무것도 아닐때는 본 화면으로 가자
    else {
        return (
            <div className="App">
                <Navbar
                    setToken={setToken}
                />
                <Category/>
                <Products/>
                <Footer/>
            </div>
        );
    }
}

export default App;

