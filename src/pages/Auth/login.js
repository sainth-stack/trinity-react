import Logo from "../../assets/images/Logo2.png";
import loginbg from "../../assets/svg/loginbg.svg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "../../components/loader";
import { GoogleLogin } from "@react-oauth/google";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://cannatwin.com/api/login";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    await axios
      .post(baseURL, {
        username: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        navigate("/timesheet");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
      })
      .catch((error) => {
        setLoading(false);
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/googlelogin`, {
        token: credentialResponse.credential,
      });
      setLoading(false);
      navigate("/timesheet");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          "An error occurred with Google login. Please try again."
      );
    }
  };

  const handleGoogleFailure = () => {
    setError("Google login failed. Please try again.");
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
            <img className="img-fluid p-3" src={loginbg} alt="Background" />
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-lg-2 mt-lg-2 left_side">
        <div>
          <img className="logo1 mb-3" src={Logo} alt="Logo" width={300} />
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
            <div
              style={{ width: "100% !important" }}
              className="d-flex justify-content-center"
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
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
                <label className="label2 fs13 ">{"username"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type="email"
                  className="form-control border"
                  id="email"
                  name="username"
                  autoComplete="off"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
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
                className="font-weight-bold text-uppercase w-100 text-white border-0 login2"
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
