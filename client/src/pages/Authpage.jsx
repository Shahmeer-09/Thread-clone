
import SignupCard from "../components/SignupForm";
import Loginpage from "../components/Loginpage";
import authScreen from "../Atom/authAtoms";
import { useRecoilValue } from "recoil";


const Authpage = () => {
  const authScreenState = useRecoilValue(authScreen)
  return <>
       {
      authScreenState === true ? <Loginpage /> : <SignupCard /> 
       }

  </>;
};

export default Authpage;
