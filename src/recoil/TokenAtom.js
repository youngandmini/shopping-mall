import {atom} from "recoil";

export const TokenAtom = atom({
    key: "TokenAtom",
    default: localStorage.getItem("userToken") ?? null,
});