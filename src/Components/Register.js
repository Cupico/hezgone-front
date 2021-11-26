import { useState } from "react";

import { register } from "../api/api";

function Register() {
  const [userRegister, setUserRegister] = useState({
    name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const sendRegister = () => {
    register(userRegister)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <input
        type="text"
        name={"name"}
        value={userRegister.name}
        onChange={handleRegister}
      />
      <input
        type="text"
        name={"last_name"}
        value={userRegister.last_name}
        onChange={handleRegister}
      />
      <input
        type="text"
        name={"username"}
        value={userRegister.username}
        onChange={handleRegister}
      />
      <input
        type="password"
        name={"password"}
        value={userRegister.password}
        onChange={handleRegister}
      />
      <button onClick={sendRegister}>Register</button>
    </div>
  );
}

export default Register;
