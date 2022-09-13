import "./scss/style.scss";
import Аuthorization from "./components/Аuthorization/Аuthorization";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import Registration from "./components/Registration/Registration";
import NoAccess from "./components/NoAccess/NoAccess";
import Plug from "./components/Plug/Plug";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import Support from "./components/Support/Support";
import Community from "./components/Community/Community";
import Confirmation from "./components/Registration/Confirmation";
import RecoveryPass from "./components/RecoveryPass/RecoveryPass";
import SetNewPass from "./components/RecoveryPass/SetNewPass";

export const Axios = axios.create({ baseURL: "../../php/php-auth-api/" });
// export const Axios = axios.create({
//   baseURL: "http://p2p-backend:8080/php-auth-api/",
// });

function App() {
  const navigate = useNavigate();

  const [timerLogout, setTimerLogout] = useState(undefined);

  const [idConfirmation, setIdConfirmation] = useState(undefined);
  const [codeConfirmation, setCodeConfirmation] = useState("");

  const [answerConfirmation, setAnswerConfirmation] = useState(undefined);

  const [recoveryPassData, setRecoveryPassData] = useState("");
  const [passData, setPassData] = useState("");

  // Данный стейт используется в функциях изменения пароля на странцие Profile
  const [passProfile, setPassProfile] = useState({
    oldPass: "",
    newPass1: "",
    newPass2: "",
  });
  const [errMsgPassProfile, setErrMsgPassProfile] = useState(false);
  const [succesMsgPassProfile, setSuccesMsgPassProfile] = useState(false);
  const [waitProfile, setWaitProfile] = useState(false);

  const [theUser, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const [waitLogin, setWaitLogin] = useState(false);
  const [waitSignup, setWaitSignup] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [errMsgLogin, setErrMsgLogin] = useState(false);
  const [errMsgSignup, setErrMsgSignup] = useState(false);
  const [errMsgConfirmation, setErrMsgConfirmation] = useState(false);

  const [indicatorLogin, setIndicatorLogin] = useState(false);

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
    // console.log(loginToken);
    Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    Axios.defaults.headers.common['X-CSRF-TOKEN'] = "Bearer " + loginToken;
    // Axios.defaults.headers.common["Authorization"] = "Bearer " + loginToken;
    if (loginToken) {
      const { data } = await Axios.get("getUser.php");
      if (data.success && data.user) {
        const optionsData = new FormData();
        optionsData.set("token", loginToken);
        optionsData.set("id", data.user.id);

        let answer = await Axios.post("getToken.php", optionsData);

        if (Number(answer.data)) {
          setUser(data.user);
        } else {
          logout();
        }

        setIndicatorLogin(true);

        return;
      }
      setUser(null);
    }
    setIndicatorLogin(true);
  };

  const loggedInCheckLogin = async () => {
    const loginToken = localStorage.getItem("loginToken");
    Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    Axios.defaults.headers.common['X-CSRF-TOKEN'] = "Bearer " + loginToken;
    // Axios.defaults.headers.common["Authorization"] = "Bearer " + loginToken;
    if (loginToken) {
      const { data } = await Axios.get("getUser.php");
      if (data.success && data.user) {
        setUser(data.user);
        setIndicatorLogin(true);
        return data.user;
      }
      setUser(null);
    }
    setIndicatorLogin(true);
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
        return { success: 1 };
      }
      setWaitLogin(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setWaitLogin(false);
      return { success: 0, message: "Ошибка сервера!" };
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
      return data;
    } catch (err) {
      setWaitSignup(false);
      return { success: 0, message: "Ошибка сервера!" };
    }
  };

  const registerUserFinal = async ({ name, email, password }) => {
    setWaitSignup(true);
    try {
      const { data } = await Axios.post("insertRegister.php", {
        name,
        email,
        password,
      });
      return data;
    } catch (err) {
      setWaitSignup(false);
      return { success: 0, message: "Ошибка сервера!" };
    }
  };

  const onChangeInputLogin = (e) => {
    setFormDataLogin({
      ...formDataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputCode = (e) => {
    if (e.target.value.length <= 6 && !isNaN(e.target.value)) {
      setCodeConfirmation(e.target.value.replace(/ /g, "").replace(/^0+/, ""));
    }
  };

  const onChangeInputSignup = (e) => {
    setFormDataSignup({
      ...formDataSignup,
      [e.target.name]: e.target.value,
    });
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
      let dataCheck = await loggedInCheckLogin();

      const optionsData = new FormData();
      optionsData.set("token", localStorage.getItem("loginToken"));
      optionsData.set("id", dataCheck.id);
      let answer = await Axios.post("setToken.php", optionsData);

      setWaitLogin(false);
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
      setTimeout(() => {
        setErrMsgSignup(false);
      }, 5000);
      return;
    }

    const data = await registerUser(formDataSignup);
    if (data.success) {
      e.target.reset();
      // setSuccessMsg("Вы успешно зарегистрировались");
      const optionsData = new FormData();
      optionsData.set("email", formDataSignup.email);
      let answer = await Axios.post("confirmation.php", optionsData);
      console.log(answer);
      setIdConfirmation(answer.data);
      setWaitSignup(false);
    } else if (!data.success && data.message) {
      setWaitSignup(false);
      setSuccessMsg(false);
      setErrMsgSignup(data.message);
      setTimeout(() => {
        setErrMsgSignup(false);
      }, 5000);
    }
  };

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
    console.log("Logout");
  };

  function resetCode() {
    setCodeConfirmation("");
    setIdConfirmation(undefined);
  }

  const sendCode = async (e) => {
    e.preventDefault();

    if (codeConfirmation.length < 6) {
      setErrMsgConfirmation("Пожалуйста введите код!");
      setTimeout(() => {
        setErrMsgConfirmation(false);
      }, 5000);
      return;
    }
    setWaitSignup(true);

    const optionsData = new FormData();
    optionsData.set("code", codeConfirmation);
    optionsData.set("id", idConfirmation);
    let answer = await Axios.post("confirmation.php", optionsData);

    console.log(answer.data);

    if (answer.data) {
      const dataReg = await registerUserFinal(formDataSignup);
      if (dataReg.success) {
        let formData = {
          email: formDataSignup.email,
          password: formDataSignup.password,
        };
        const data = await loginUser(formData);
        if (data.success) {
          e.target.reset();
          setSuccessMsg(false);
          setRedirect("Перенаправление...");
          setTimeout(() => {
            setRedirect(false);
          }, 5000);
          let dataCheck = await loggedInCheckLogin();

          const optionsData = new FormData();
          optionsData.set("token", localStorage.getItem("loginToken"));
          optionsData.set("id", dataCheck.id);
          let answer = await Axios.post("setToken.php", optionsData);

          setWaitSignup(false);
          return;
        }
        setWaitSignup(false);
        setCodeConfirmation(undefined);
        setIdConfirmation(undefined);
      } else if (!dataReg.success && dataReg.message) {
        setWaitSignup(false);
        setSuccessMsg(false);
        setErrMsgSignup(dataReg.message);
        setTimeout(() => {
          setErrMsgSignup(false);
        }, 5000);
      }
    } else {
      setWaitSignup(false);
      setErrMsgConfirmation("Введён не верный код!");
      setTimeout(() => {
        setErrMsgConfirmation(false);
      }, 5000);
    }
  };

  const onChangeRecoveryPass = (e) => {
    setRecoveryPassData(e.target.value.replace(/ /g, "").replace(/^0+/, ""));
  };

  const onChangePassData = (e) => {
    setPassData(e.target.value.replace(/ /g, "").replace(/^0+/, ""));
  };

  const recPassGetCode = async (e) => {
    e.preventDefault();

    if (recoveryPassData.trim() === "") {
      setErrMsgLogin("Пожалуйста, заполните все обязательные поля!");
      setTimeout(() => {
        setErrMsgLogin(false);
      }, 5000);
      return;
    }

    setWaitLogin(true);
    const optionsData = new FormData();
    optionsData.set("email", recoveryPassData);
    let answer = await Axios.post("confirmation.php", optionsData);

    console.log(answer);
    setIdConfirmation(answer.data);
    setWaitLogin(false);
    setWaitSignup(false);
  };

  const recPassSendCode = async (e) => {
    e.preventDefault();

    if (codeConfirmation.length < 6) {
      setErrMsgConfirmation("Пожалуйста введите код!");
      setTimeout(() => {
        setErrMsgConfirmation(false);
      }, 5000);
      return;
    }
    setWaitSignup(true);

    const optionsData = new FormData();
    optionsData.set("code", codeConfirmation);
    optionsData.set("id", idConfirmation);
    try {
      let answer = await Axios.post("confirmation.php", optionsData);
      setAnswerConfirmation(answer.data);

      if (answer.data) {
        setCodeConfirmation("");
        setIdConfirmation(undefined);
      } else {
        setWaitSignup(false);
        setErrMsgConfirmation("Введён не верный код!");
        setTimeout(() => {
          setErrMsgConfirmation(false);
        }, 5000);
        return;
      }
    } catch (error) {
      console.error(error);
      setWaitSignup(false);
    }
  };

  const setNewPassFunc = async (e) => {
    e.preventDefault();

    if (passData.trim() === "") {
      setErrMsgLogin("Пожалуйста, заполните все обязательные поля!");
      setTimeout(() => {
        setErrMsgLogin(false);
      }, 5000);
      return;
    }

    setWaitLogin(true);
    const result = await Axios.post("setNewPass.php", {
      email: recoveryPassData,
      password: passData,
    });

    console.log(result);

    if (result.data.success) {
      console.log(result);
      setSuccessMsg("Пароль успешно изменён");
      setTimeout(() => {
        setWaitLogin(false);
        setAnswerConfirmation(undefined);
        navigate("/login");
      }, 1000);
    } else {
      setWaitLogin(false);
      setSuccessMsg(false);
      setErrMsgLogin(result.data.message);
      setTimeout(() => {
        setErrMsgLogin(false);
      }, 5000);
    }
  };

  useEffect(() => {
    clearInterval(timerLogout);

    async function asyncCall() {
      await loggedInCheck();
    }

    let timer = setInterval(() => {
      asyncCall();
    }, 30000);

    setTimerLogout(timer);

    return () => clearInterval(timer);
  }, [theUser]);

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
    let timer = setInterval(() => {
      asyncCall();
    }, 30000);
    setTimerLogout(timer);

    return () => clearInterval(timer);
  }, []);

  const onChangeInputPassProfile = (e) => {
    setPassProfile({
      ...passProfile,
      [e.target.name]: e.target.value,
    });
  };

  const editPassProfile = async (e) => {
    e.preventDefault();

    if (!Object.values(passProfile).every((val) => val.trim() !== "")) {
      setErrMsgPassProfile("Пожалуйста, заполните все обязательные поля!");
      setTimeout(() => {
        setErrMsgPassProfile(false);
      }, 5000);
      return;
    }

    if (passProfile.newPass1 !== passProfile.newPass2) {
      setErrMsgPassProfile("Пароли не совпадают!");
      setTimeout(() => {
        setErrMsgPassProfile(false);
      }, 5000);
      return;
    }

    if (passProfile.oldPass === passProfile.newPass1) {
      setErrMsgPassProfile("Новый пароль не должен совпадать с новым!");
      setTimeout(() => {
        setErrMsgPassProfile(false);
      }, 5000);
      return;
    }

    setWaitProfile(true);

    const result = await Axios.post("editPassProfile.php", {
      id: theUser.id,
      oldPass: passProfile.oldPass,
      newPass: passProfile.newPass1,
    });

    console.log(result);

    if (result.data.success) {
      setPassProfile({
        oldPass: "",
        newPass1: "",
        newPass2: "",
      });
      setWaitProfile(false);
      setSuccesMsgPassProfile("Пароль успешно изменён");
      setTimeout(() => {
        setSuccesMsgPassProfile(false);
      }, 5000);
    } else {
      setWaitProfile(false);
      setSuccesMsgPassProfile(false);
      setErrMsgPassProfile(result.data.message);
      setTimeout(() => {
        setErrMsgPassProfile(false);
      }, 5000);
    }
  };

  // console.log(theUser);
  return (
    <div className="App">
      <Routes>
        {theUser && theUser.access && indicatorLogin && (
          <Route
            path="/scanner/*"
            element={<Main user={theUser} logout={logout} />}
          />
        )}

        {theUser && (
          <Route path="/support" element={<Support user={theUser} />} />
        )}

        {theUser && (
          <Route path="/community" element={<Community user={theUser} />} />
        )}

        {theUser && (
          <Route
            path="/profile"
            element={
              <Profile
                submitForm={editPassProfile}
                onChangeInput={onChangeInputPassProfile}
                passProfile={passProfile}
                errMsg={errMsgPassProfile}
                wait={waitProfile}
                succesMsg={succesMsgPassProfile}
                user={theUser}
                logout={logout}
              />
            }
          />
        )}

        {!theUser && !indicatorLogin && <Route path="/*" element={<Plug />} />}

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

            {!idConfirmation && (
              <Route
                path="/signup"
                element={
                  <Registration
                    submitForm={submitFormSignup}
                    onChangeInput={onChangeInputSignup}
                    formData={formDataSignup}
                    errMsg={errMsgSignup}
                    successMsg={successMsg}
                    redirect={redirect}
                    wait={waitSignup}
                  />
                }
              />
            )}

            {idConfirmation && (
              <Route
                path="/signup"
                element={
                  <Confirmation
                    submitForm={sendCode}
                    onChangeInput={onChangeInputSignup}
                    onChangeInputCode={onChangeInputCode}
                    errMsg={errMsgConfirmation}
                    successMsg={successMsg}
                    redirect={redirect}
                    code={codeConfirmation}
                    resetCode={resetCode}
                    wait={waitSignup}
                    textBtn={"final--->"}
                  />
                }
              />
            )}

            {!idConfirmation && !answerConfirmation && (
              <Route
                path="/password-recovery"
                element={
                  <RecoveryPass
                    submitForm={recPassGetCode}
                    onChangeInput={onChangeRecoveryPass}
                    formData={recoveryPassData}
                    errMsg={errMsgLogin}
                    redirect={redirect}
                    wait={waitLogin}
                  />
                }
              />
            )}
            {!idConfirmation && answerConfirmation && (
              <Route
                path="/password-recovery"
                element={
                  <SetNewPass
                    submitForm={setNewPassFunc}
                    onChangeInput={onChangePassData}
                    formData={passData}
                    successMsg={successMsg}
                    errMsg={errMsgLogin}
                    redirect={redirect}
                    resetCode={resetCode}
                    wait={waitLogin}
                  />
                }
              />
            )}
            {idConfirmation && (
              <Route
                path="/password-recovery"
                element={
                  <Confirmation
                    submitForm={recPassSendCode}
                    onChangeInput={onChangeInputSignup}
                    onChangeInputCode={onChangeInputCode}
                    errMsg={errMsgConfirmation}
                    successMsg={successMsg}
                    redirect={redirect}
                    code={codeConfirmation}
                    resetCode={resetCode}
                    wait={waitSignup}
                    textBtn={"next--->"}
                  />
                }
              />
            )}
          </>
        )}

        {indicatorLogin && (
          <Route
            path="*"
            element={<Navigate to={theUser ? "/profile" : "/login"} />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
