import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/api";

import { StateStoreContext } from "../context/context";

function Login() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const Context = useContext(StateStoreContext);

  let navigate = useNavigate();

  const pageNavigate = () => {
    navigate("/");
  };

  const handleLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const sendLogin = () => {
    login(userLogin)
      .then((res) => {
        const response = res.data;
        if (response) {
          Context.setGlobalState({
            name: response.user.name,
            last_name: response.user.last_name,
            token: response.token,
            id: response.user._id
          });
          pageNavigate();
        }
        // console.log(response)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        name={"username"}
        value={userLogin.username}
        onChange={handleLogin}
      />
      <input
        type="password"
        name={"password"}
        value={userLogin.password}
        onChange={handleLogin}
      />
      <button onClick={sendLogin}>Login</button>
    </div>
  );
}

export default Login;
