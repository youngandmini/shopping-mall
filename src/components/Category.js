import React from 'react';
import "./Category.css"
import {useRecoilState} from "recoil";
import {CategoryAtom} from "../recoil/CategoryAtom";
import {Categories} from "../enums/CategoryEnum";

export default function Category() {

    const [category, setCategory] = useRecoilState(CategoryAtom);

    return (
        <div className="category-container">
            Products

            <div className="category-button-container">
                <button className={`${category===Categories.ALL ? 'selected-category' : 'unselected-category'}`}
                        onClick={()=>{
                    setCategory(Categories.ALL);
                }}>전체</button>

                <button className={`${category===Categories.ELECTRONICS ? 'selected-category' : 'unselected-category'}`}
                    onClick={()=>{
                    setCategory(Categories.ELECTRONICS);
                }}>전자기기</button>

                <button className={`${category===Categories.JEWEL ? 'selected-category' : 'unselected-category'}`}
                        onClick={()=>{
                    setCategory(Categories.JEWEL);
                }}>액세서리</button>

                <button className={`${category===Categories.MEN ? 'selected-category' : 'unselected-category'}`}
                        onClick={()=>{
                    setCategory(Categories.MEN);
                }}>남성의류</button>

                <button className={`${category===Categories.WOMEN ? 'selected-category' : 'unselected-category'}`}
                        onClick={()=>{
                    setCategory(Categories.WOMEN);
                }}>여성의류</button>

            </div>
        </div>
    );
};