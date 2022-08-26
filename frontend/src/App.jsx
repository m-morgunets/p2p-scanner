import "./scss/style.scss";
import Аuthorization from "./components/Аuthorization/Аuthorization";
import Main from "./components/Main/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import Registration from "./components/Registration/Registration";

export const Axios = axios.create({
  baseURL: "../../php/php-auth-api/",
});

function App() {
  const [theUser, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const [waitLogin, setWaitLogin] = useState(false);
  const [waitSignup, setWaitSignup] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [errMsgLogin, setErrMsgLogin] = useState(false);
  const [errMsgSignup, setErrMsgSignup] = useState(false);

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const [formDataSignup, setFormDataSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loggedInCheck = async () => {
    const loginToken = localStorage.getItem("loginToken");
    Axios.defaults.headers.common["Authorization"] = "Bearer " + loginToken;
    if (loginToken) {
      const { data } = await Axios.get("getUser.php");
      if (data.success && data.user) {
        setUser(data.user);
        return;
      }
      setUser(null);
    }
  };

  const loginUser = async ({ email, password }) => {
    setWaitLogin(true);
    try {
      const { data } = await Axios.post("login.php", {
        email,
        password,
      });
      if (data.success && data.token) {
        localStorage.setItem("loginToken", data.token);
        setWaitLogin(false);
        return { success: 1 };
      }
      setWaitLogin(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setWaitLogin(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const registerUser = async ({ name, email, password }) => {
    setWaitSignup(true);
    try {
      const { data } = await Axios.post("register.php", {
        name,
        email,
        password,
      });
      setWaitSignup(false);
      return data;
    } catch (err) {
      setWaitSignup(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const onChangeInputLogin = (e) => {
    setFormDataLogin({
      ...formDataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputSignup = (e) => {
    setFormDataSignup({
      ...formDataSignup,
      [e.target.name]:e.target.value
  })
  };

  const submitFormLogin = async (e) => {
    e.preventDefault();

    if (!Object.values(formDataLogin).every((val) => val.trim() !== "")) {
      setErrMsgLogin("Пожалуйста, заполните все обязательные поля!");
      setTimeout(() => {
        setErrMsgLogin(false);
      }, 5000);
      return;
    }

    const data = await loginUser(formDataLogin);
    if (data.success) {
      e.target.reset();
      setRedirect("Перенаправление...");
      setTimeout(() => {
        setRedirect(false);
      }, 5000);
      await loggedInCheck();
      return;
    }
    setErrMsgLogin(data.message);
    setTimeout(() => {
      setErrMsgLogin(false);
    }, 5000);
  };

  const submitFormSignup = async (e) => {
    e.preventDefault();

    if (!Object.values(formDataSignup).every((val) => val.trim() !== "")) {
      setSuccessMsg(false);
      setErrMsgSignup("Пожалуйста, заполните все обязательные поля!");
      return;
    }

    const data = await registerUser(formDataSignup);
    if (data.success) {
      e.target.reset();
      setSuccessMsg("Вы успешно зарегистрировались");
      setErrMsgSignup(false);
    } else if (!data.success && data.message) {
      setSuccessMsg(false);
      setErrMsgSignup(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {theUser && <Route path="/" element={<Main user={theUser} logout={logout} />} />}
          {!theUser && (
            <>
              <Route
                path="/login"
                element={
                  <Аuthorization
                    submitForm={submitFormLogin}
                    onChangeInput={onChangeInputLogin}
                    formData={formDataLogin}
                    errMsg={errMsgLogin}
                    redirect={redirect}
                    wait={waitLogin}
                  />
                }
              />

              <Route
                path="/signup"
                element={
                  <Registration
                    submitForm={submitFormSignup}
                    onChangeInput={onChangeInputSignup}
                    formData={formDataSignup}
                    errMsg={errMsgSignup}
                    successMsg={successMsg}
                    wait={waitSignup}
                  />
                }
              />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={theUser ? "/" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
