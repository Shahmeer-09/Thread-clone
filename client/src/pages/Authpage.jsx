import React from "react";
import SignupCard from "../components/SignupForm";
import Loginpage from "../components/Loginpage";
import authScreen from "../Atom/authAtoms";
import { useRecoilValue } from "recoil";
import customFetch from "../utils/CustomFetch";
import { redirect } from "react-router-dom";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const objectdata = Object.fromEntries(formData);
  try {
    const data = await customFetch.post("/user/signup", objectdata);
    console.log(data);
    return redirect('')
  } catch (error) {
    console.log(error);
  }
  return objectdata;
};
const Authpage = () => {
  const authScreenState = useRecoilValue(authScreen);
  return <>{authScreenState === true ? <Loginpage /> : <SignupCard />}</>;
};

export default Authpage;
