import Logo from "../../assets/images/Logo2.png";
import loginbg from "../../assets/svg/loginbg.svg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "../../components/loader";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://127.0.0.1:8000/api/login";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Login = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post(baseURL, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        navigate("/timesheet");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.userName);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  const login = () => {
    alert("login clicked");
  };
  return (
    <div
      className="container-fluid row m-0 p-0"
      style={{ background: "#808080" }}
    >
      <div className="col-md-6 p-0 m-0 bg-biscuit text-center pt-4 pb-4 d-none d-lg-block">
        <h5 className="text-green font-weight-bold mt-2">
          WELCOME TO KEYPULSE
        </h5>
        <h3 className="mt-3">
          Your Digital Growth Partner <br /> For Manufacturing
        </h3>
        <div className="d-flex justify-content-center">
          <div className="col-md-10">
            <img
              className="img-fluid p-3"
              src="/static/media/loginbg.0f7d45b4d6254a5b014fa62cb77749fe.svg"
              alt="Logo"
            />
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-lg-5 mt-lg-5">
        <div>
          <img
            className="logo1 mb-3"
            src="/static/media/Logo2.cab20aced1fc40454788.png"
            alt="Logo"
            width={300}
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
            <form
              onSubmit={(event) => Login(event)}
              className="pr-lg-5 pl-lg-5"
            >
              <div
                className="form-group d-flex flex-column"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">{"UserName"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  // type="email"
                  className="form-control border"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  // onFocus={() => setMessage("")}
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
                  // maxLength={16}
                  // minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  // onFocus={() => setMessage("")}
                />
                <div className="relative">
                  <img
                    className="eye3"
                    src={toggle2 ? eye2 : eye}
                    onClick={() => setToggle2(!toggle2)}
                    alt="Logo"
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
                  <span className="fs-12 cursor-pointer">Forgot Password</span>
                </Link>
              </div>
              <button
                className="font-weight-bold text-uppercase w-100 text-white border-0 login2"
                style={{
                  background: "#466657",
                  borderRadius: "40px",
                  height: "40px",
                }}
                type={loading ? "button" : "submit"}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sigin"}{" "}
                {loading ? <LoadingIndicator size={"1"} /> : null}
              </button>
            </form>
            <div className="account2 mt-2">{"Don't Have An Account?"}</div>
            <Link to="/register" className="text-decoration-none register2">
              <span> {"Register"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
