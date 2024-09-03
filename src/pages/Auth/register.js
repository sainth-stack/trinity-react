import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/images/Logo2.png";
import loginbg from "../../assets/svg/loginbg.svg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { LoadingIndicator } from "../../components/loader";
import "./styles.css";

const baseURL = "http://cannatwin.com/api/register/";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(baseURL, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      } else {
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid row m-0 p-0 vh-100">
      <div className="col-md-6 col-xs-12 col-sm-12 text-center  left_side ">
        <img className="logo1" src={Logo} alt="Logo" width={300} />
        <div className="row mt-3">
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto ">
            <h2 className="mb-2">Register</h2>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <form onSubmit={handleRegister} className="pr-lg-5 pl-lg-5">
              {["username", "first_name", "last_name", "email", "password"].map(
                (field, index) => (
                  <div
                    key={index}
                    className="form-group d-flex flex-column"
                    style={{ textAlign: "start" }}
                  >
                    <label className="label2 fs13">{`${
                      field.charAt(0).toUpperCase() +
                      field.slice(1).replace("_", " ")
                    }*`}</label>
                    <input
                      style={{ borderRadius: "40px" }}
                      type={
                        field === "password" && !togglePassword
                          ? "password"
                          : "text"
                      }
                      className="form-control border"
                      id={field}
                      name={field}
                      autoComplete="off"
                      value={formData[field]}
                      required
                      onChange={handleChange}
                      minLength={field === "password" ? 8 : undefined}
                      maxLength={field === "password" ? 16 : undefined}
                    />
                    {field === "password" && (
                      <img
                        className="eye3"
                        src={togglePassword ? eye2 : eye}
                        onClick={() => setTogglePassword(!togglePassword)}
                        alt="Toggle visibility"
                      />
                    )}
                  </div>
                )
              )}

              <button
                className="font-weight-bold text-uppercase w-100 text-white border-0 login2"
                style={{
                  backgroundColor: "#466657",
                  borderRadius: "40px",
                  height: "40px",
                }}
                type={loading ? "button" : "submit"}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}{" "}
                {loading && <LoadingIndicator size={"1"} />}
              </button>
            </form>
            <div className="mt-3">Already Have An Account?</div>
            <Link to="/login" className="text-decoration-none login1">
              <span
                style={{
                  color: "#fffee1",
                  fontSize: "1.2rem",
                  borderBottom: ".2rem solid #000",
                }}
              >
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Register;
