import React from 'react';
import "./Cart.css";
import {MdDeleteForever} from "react-icons/md";
import {FiTruck} from "react-icons/fi";
import {useRecoilState, useRecoilValue} from "recoil";
import {CartAtom} from "../recoil/CartAtom";
import {ItemAtom} from "../recoil/ItemAtom";

export default function Cart() {

    const item = useRecoilValue(ItemAtom);
    const [cart, setCart] = useRecoilState(CartAtom);


    const filteredItem = item.filter(product => cart.includes(product.id));

    function removeCartItem(itemId) {
        const cartCopy = [...cart]
        const idx = cartCopy.indexOf(itemId);
        cartCopy.splice(idx, 1);
        setCart(cartCopy);
    }

    return (
        <div className="cart-container">
            <div className="cart">
                {filteredItem.map((product) => (
                    <div key={product.id} className="cart-product">
                        <div><img src={product.image} alt={product.title}/></div>
                        <div className="cart-product-description">
                            <div className="cart-product-title">{product.title}</div>
                            <div className="cart-product-detail-row">
                                <div>{`$${product.price}`}</div>
                                <button className="remove-cart"
                                        onClick={()=>{
                                            removeCartItem(product.id)
                                        }}
                                ><MdDeleteForever/></button>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="order-button" onClick={() => {
                    setCart([]);
                }}>주문하기 <FiTruck/></button>
            </div>
        </div>
    );
}