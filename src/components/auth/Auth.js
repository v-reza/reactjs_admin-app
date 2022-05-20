import React, { useEffect, useState } from 'react'
import '../../assets/log/style.css'
import axios from 'axios'
import { setUserSession, getToken, getUser } from '../../config/Api'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const navigate = useNavigate()
    const urlApi = "https://bursakerjasmk4.skom.id/api"
    const [showAlert, setShowAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const clickShowPassword = () => {
        showPassword ? setShowPassword(false) : setShowPassword(true)
    }

    const closeAlert = () => {
        setShowAlert(false)
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        setErrorAlert(null)
        setLoading(true)
        await axios.post(urlApi + '/login', {
            nis: 1261892,
            email: email,
            password: password,
            role: "guest"
        }).then(response => {
            setLoading(false)
            setUserSession(response.data.data.access_token, response.data.data.user)
            navigate("/")
        }).catch(error => {
            setLoading(false)
            setShowAlert(true)
            if (error.response.status === 422) {
                var arrObject = error.response.data.message;
                if (arrObject.hasOwnProperty("nis")) {
                    setErrorAlert(error.response.data.message["nis"][0])
                }
            } else if (error.response.status === 404 || error.response.status === 401) {
                setErrorAlert("Error Kredential")
            }
        });
    }

    useEffect(() => {
        if (getToken() !== null && getUser() !== null) {
            navigate("/")
        }
    })

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div class="container">
                <div class="forms">
                    <div class="form login">
                        <div class={
                            showAlert ? 'alert' : 'alert-hide'
                        }>
                            <span class="closebtn" onClick={closeAlert}>&times;</span>
                            {errorAlert}
                        </div>
                        <span class="title">Login Admin</span>

                        <form onSubmit={handleLogin}>
                            <div class="input-field">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required></input>
                                <i class="uil uil-envelope icon"></i>
                            </div>
                            <div class="input-field">
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} class="password" placeholder="Enter your password" required></input>
                                <i class="uil uil-lock icon"></i>
                                <i class= {showPassword ? "uil uil-eye showHidePw" : "uil uil-eye-slash showHidePw"} onClick={clickShowPassword}></i>
                            </div>

                            <div class="input-field button">
                                <input type="submit" value={loading ? "Loading" : "Login"} disabled={loading}></input>
                            </div>
                        </form>

                        <div class="login-signup">
                        </div>
                    </div>

                    {/* <!-- Registration Form --> */}
                    <div class="form signup">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth