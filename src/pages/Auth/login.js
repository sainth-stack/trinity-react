import Logo from "../../assets/images/Logo2.jpg";
import loginbg from "../../assets/images/right_side_image.jpg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "../../components/loader";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, googleLoginURL } from "../const";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(`${baseURL}login/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("login response", formData.get("username"));
      console.log("login response data", response);

      //here data === "Success" is important to validate the response
      if (response.status === 200 && response.data.status === "success") {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);

        localStorage.setItem("email", response.data.user.email);
        navigate("/data-source");
      } else {
        setLoading(false);
        setError(
          response.data?.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      GoogleLogin(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const GoogleLogin = (data) => {
    var formData = new FormData();
    formData.append("username", `${data.name.replaceAll(" ", "_")}`);
    formData.append("id", data.id);
    formData.append("email", data.email);

    axios
      .post(googleLoginURL, formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.status == 200) {
          navigate("/");
          console.log(data);
          localStorage.setItem("username", data?.name);
          localStorage.setItem("email", data?.email);
          localStorage.setItem("token", `${response?.data}`);
        } else {
          setError(response.data);
          console.log("Login Failed");
          // window.alert("Incorrect Password")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserInfo(tokenResponse.access_token);
    },
  });

  return (
    <div
      className="container-fluid row m-0 p-0"
      style={{ background: "#808080", height: "100vh" }}
    >
      <div className="col-md-6 p-0 m-0 bg-white text-center d-none d-lg-block">
        {/* <h5 className="text-green font-weight-bold mt-2 text-uppercase">
          WELCOME TO cannatwin
        </h5> */}

        <div className="d-flex justify-content-center">
          <img
            className="img-fluid"
            src={loginbg}
            alt="Background"
            style={{
              width: "100%",
              height: "90%",
            }}
          />
        </div>
      </div>

      <div
        className="col-md-6 col-xs-12 col-sm-12 text-center  left_side"
        style={{ background: "#fff" }}
      >
        <div>
          <img
            className="logo1 mb-2 mt-2"
            src={Logo}
            alt="Logo"
            style={{ width: "160px" }}
          />
        </div>

        <div
          className="row mt-3"
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
            {/* <div className="d-flex justify-content-center google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
              
            </div> */}
            <div style={{ width: "100% !important" }}>
              <button
                className="custom-google-login-button"
                onClick={() => {
                  login();
                }}
              >
                <img
                  src={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAORSURBVHgBtZfNbxNHGMaf2d0EB/qxLpUsLIduLlVUqWXTSlUvldakPVZF6qGoF5JzVSXtpZeoWdo/oEY99FQ5qEItEohEHDgQ4eWCICDiXIgFElk+JGQg8oaIxCHxvLzjiChOduOv5JHW9s6M5zfzzjvPzgo0qDnbMvWO2DEBYUPgAy6y+DJB8Pk+kKAZKeH13Cp4jfQn6gK/6HUMqQ0xwIEgE/WlBpIxVmjiUL7go1nw+gy7RoXAMFqTL0BuaqpwumHwnN1rGZ0ih/VwtiU9kcgkL3o/by03thY8tj+yqQMMbSisdVUpFp2w8hqwmil10gWopNkd5df2L6fDKrSaUdQJr5E67OuEYUOjnu6pWaEu7jgOSWkCateSyFPQHs8PwvraWONHn/eO8q0bSiQRCI1Opm7MZrCDeAdYvAP+JNDC4anZgZ3aVsHLOVhLE4nc0rX3rFAokE7dvJPHLmo91BLOgW+K1oH+Z9saCCGHdxta7Vd9lCcxzb9s9Xv1/n4snkuiUupgKI2lbhQGsQcSKsxCYm5zoYK++LcbKHb2HLoe7T7tyJAV2PoWG9Hjq4j/dN+LfcX2t4O+H5nMCKEdQbOSlZOGIN4+4cY5U+//AgpKDpqUBCY0EWEWRAiwR+KMNrXI2piFvZTGjhPuLCv+btlmBFhEJJCG5pOmYarmi1IOZpdEaXP5k7Uu/Pr8E9x99U5ffvByy+ZxfORKjg8PzrYKKdNaPM2hFvDelN0um/jx6ae49+otnrQcQos67uasUCir/NLIV5OLKriqvs++6GboZzzjWLUBr/+Ane0/hla0VnHDK8gbz6SDKrhsIDMy/3GQCT7c1oy3W9bOfm2jCf3wW26I/fZEWJ0Q+pj6roJVuCcXE6ci+jEF5LT9z9GGzl7OX7+MSpJRj0//v9/T1ed2jWf1ZY9OQx1fo+WzsbgQlZn8oFdNOjvrqG1nadC+JQg1OPP90pc4yNdWsb0OhIK5E4ttUMHb3sOxlQSSxe/QsbbR1dj/f/RvPOlqnItn4RMkn5Gobbss7yviUfIMlmIP1K1f1rWak+Y2y1QhZHgfw320qVVjAQ+TZzyG9o276ZrJRB7o/57OWucLl9z58vwJtCQKCNqp/OCkG1Zb9xVGrTtId/mNosEBMJDEaU7AjFq6qFZ1wZsGwFmiO+odKt5lHimVA7y7721rYWXRPxiLB/PLpQectuPsHHkG1s2R17KaTnlOqfV9AAAAAElFTkSuQmCC"
                  }
                  alt=""
                />
                Sign in with Google
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div style={{ width: "100%" }}>OR CONTINUE WITH</div>
              <div className="border-top"></div>
            </div>
            <h2 className="mb-1">{"Login"}</h2>
            <form onSubmit={handleLogin} className="pr-lg-5 pl-lg-5">
              <div
                className="form-group d-flex flex-column"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 text-capitalize">
                  {"username"}*
                </label>
                <input
                  style={{ borderRadius: "40px" }}
                  //type="email"
                  className="form-control border"
                  id="username"
                  name="username"
                  autoComplete="off"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div
                className="form-group d-flex flex-column mt-3"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">{"Password"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type={toggle2 ? "text" : "password"}
                  className="form-control border"
                  id="password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="relative">
                  <img
                    className="eye3"
                    src={toggle2 ? eye2 : eye}
                    onClick={() => setToggle2(!toggle2)}
                    alt="Toggle Password Visibility"
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "red",
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "4px",
                }}
              >
                {error}
              </div>
              <div className="d-flex flex-row-reverse mb-4">
                <Link to="#">
                  <span
                    className="fs-12 cursor-pointer "
                    style={{
                      color: "#fffee1",
                      fontSize: "1.2rem",
                      borderBottom: ".2rem solid #000",
                      textDecoration: "none",
                    }}
                  >
                    Forgot Password
                  </span>
                </Link>
              </div>
              <button
                className="font-weight-bold text-uppercase w-100 auth text-white border-0 login2"
                style={{
                  background: "#466657",
                  borderRadius: "40px",
                  height: "40px",
                }}
                type={loading ? "button" : "submit"}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}{" "}
                {loading ? <LoadingIndicator size={"1"} /> : null}
              </button>
            </form>
            <div className="account2 mt-2">{"Don't Have An Account?"}</div>
            <Link to="/register" className=" register2">
              <span
                style={{
                  color: "#fffee1",
                  fontSize: "1.2rem",
                  borderBottom: ".2rem solid #000",
                }}
              >
                {" "}
                {"Register"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
