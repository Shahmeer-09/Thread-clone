
import { atom } from "recoil";

const userAuthState = atom({
  key: "userAuthState",
  default:JSON.parse(localStorage.getItem("user-info"))
});

export default userAuthState;