import {atom} from "recoil";
import {Page} from "../enums/PageEnum";


export const PageAtom = atom({
    key: "PageAtom",
    default: Page.PRODUCT,
});
