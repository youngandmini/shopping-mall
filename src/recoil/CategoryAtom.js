import {atom} from "recoil";
import {Categories} from "../enums/CategoryEnum";

export const CategoryAtom = atom({
    key: "CategoryAtom",
    default: Categories.ALL,
});