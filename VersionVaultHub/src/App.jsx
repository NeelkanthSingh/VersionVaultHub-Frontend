import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  // Declaring states
  const [userInfo, setUserInfo] = useState(
    Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : undefined
  );
  const [profileInfo, setProfileInfo] = useState(
    Cookies.get("profileInfo")
      ? JSON.parse(Cookies.get("profileInfo"))
      : undefined
  );

  // Make sure the cookies are sent securely, only via http and same site is also handled.

  // Declaring hooks
  useEffect(() => {
    if (userInfo && userInfo.access_token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          const profileInfoString = JSON.stringify(response.data);
          setProfileInfo(response.data);
          // Make sure it is handled by the backend server
          Cookies.set("profileInfo", profileInfoString);
        })
        .catch((error) => console.log(error));
    }
  }, [userInfo]);

  // Returning JSX(Javascript in {} with html)
  return (
    <>
      <div>
        <h1>Home</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        {profileInfo ? (
          <div>
            <img src={profileInfo.picture} alt="Profile Image" />
            <h3>Currently logged in user</h3>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <br />
            <Logout setUserInfo={setUserInfo} setProfileInfo={setProfileInfo} />
          </div>
        ) : (
          <Login setUserInfo={setUserInfo} />
        )}
      </div>
    </>
  );
}

export default App;
