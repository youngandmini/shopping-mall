import React, {useEffect, useState} from 'react';
import "./Products.css";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {ItemAtom} from "../recoil/ItemAtom";
import {LoadingAtom} from "../recoil/LoadingAtom";
import {CartAtom} from "../recoil/CartAtom";
import {CategoryAtom} from "../recoil/CategoryAtom";
import {Categories} from "../enums/CategoryEnum";

export default function Products(){

    const [item, setItem] = useRecoilState(ItemAtom);
    const [loading, setLoading] = useRecoilState(LoadingAtom);
    const [cart, setCart] = useRecoilState(CartAtom);
    const category = useRecoilValue(CategoryAtom);


    useEffect(() => {
        setLoading(true);

        const url = "https://fakestoreapi.com/products";

        axios({
            method: "GET",
            url: url
        }).then(response => {
            // console.log(response.data);
            setItem(response.data);
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            setLoading(false);
        });

    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n - 1) + "..." : str;
    };

    if (loading) {
        return (
            <div className="product-container">
                {loading && (
                    <div>
                        <h1>Please wait for Loading...</h1>
                    </div>
                )}
            </div>
        );
    }

    //전체 표시
    if (category === Categories.ALL) {
        return (
            <div className="product-container">
                {item.map((product) => (
                    <div key={product.id} className="product">
                        <div><img src={product.image} alt={product.title}/></div>
                        <div className="product-description">
                            <div className="product-title">{truncate(product.title, 16)}</div>
                            <div className="product-detail-row">
                                <button className="cart-button"
                                        onClick={() => setCart([...cart, product.id])}
                                >장바구니에 담기</button>
                                <div>{`$${product.price}`}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    // 특정 카테고리 필터링
    else {
        const filteredItem = item.filter(product => product.category === category);

        return (
            <div className="product-container">
                {filteredItem.map((product) => (
                    <div key={product.id} className="product">
                        <div><img src={product.image} alt={product.title}/></div>
                        <div className="product-description">
                            <div className="product-title">{truncate(product.title, 16)}</div>
                            <div className="product-detail-row">
                                <button className="cart-button"
                                        onClick={() => setCart([...cart, product.id])}
                                >장바구니에 담기</button>
                                <div>{`$${product.price}`}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }


};