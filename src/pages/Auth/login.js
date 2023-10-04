import Logo from "../../assets/images/Logo2.png";
import loginbg from "../../assets/svg/loginbg.svg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "../../components/loader";
import './styles.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const baseURL="http://localhost:5000/api/login"

export const Login =()=>{
    const [loading,setLoading] = useState(false)
    const [toggle2,setToggle2] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const navigate=useNavigate()
    const Login=(event)=>{
      setLoading(true)
      event.preventDefault()
      axios
      .post(baseURL, {
        email:email,
        password:password
      })
      .then((response) => {
        console.log(response)
        setLoading(false)
        navigate('/timesheet')
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    return(
        <div className="container-fluid row m-0 p-0 vh-100">
         KNIT Testing
      </div>
    )
}