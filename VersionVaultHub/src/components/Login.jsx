import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

const Login = ({ setUserInfo }) => {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUserInfo(response);
      // Make sure it is handled by the backend server
      Cookies.set("userInfo", JSON.stringify(response));
    },
    onError: (error) => {
      console.log(`Login Failed: ${error}`);
      alert("Login failed. Please try again.");
    },
  });

  return (
    <>
      <button onClick={() => login()}>Sign in</button>
    </>
  );
};

export default Login;
