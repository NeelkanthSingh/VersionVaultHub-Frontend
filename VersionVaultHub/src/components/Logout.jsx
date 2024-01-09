import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

const Logout = ({ setUserInfo, setProfileInfo }) => {
  const logOut = () => {
    googleLogout();
    Cookies.remove("userInfo");
    Cookies.remove("profileInfo");
    setProfileInfo(undefined);
    setUserInfo(undefined);
  };

  return (
    <>
      <button onClick={logOut}>Log out</button>
    </>
  );
};

export default Logout;
