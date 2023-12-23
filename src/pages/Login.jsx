import React, { useEffect, useState } from "react";
import "./login.css";

import axios from "axios";
import springApi from "../api/springApi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Login = () => {

    function login(email) {
        console.log("login");
        const resp = springApi.getAccountByEmail(email);
        resp.then((res) => {
            console.log(res);
            // setDataLogin(res);

            localStorage.setItem("token", JSON.stringify(res));
        });
        // history.replace("/");
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    }

    //use state for input emain
    //use state for input password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mess, setMess] = useState("");

    const [emailS, setEmailS] = useState("");
    const [passwordS, setPasswordS] = useState("");
    const [repasswordS, setRepasswordS] = useState("")
    const [messS, setMessS] = useState("");
    const [checkPass, setcheckPass] = useState("");

    function EmailChange(e) {
        setEmail(e.target.value);
    }
    function PasswordChange(e) {
        setPassword(e.target.value);
    }

    function EmailSChange(e) {
        setEmailS(e.target.value);
    }
    function PasswordSChange(e) {
        setPasswordS(e.target.value);
        setMessS('');
        if (e.target.value == '' && repasswordS == '') {
            setcheckPass('');
        }
        else if (e.target.value == repasswordS) {
            setcheckPass('Password is match');

        }
        else {
            setcheckPass('Password is not match');
        }
    }
    function RepasswordSChange(e) {
        // setEmailS('');
        setRepasswordS(e.target.value);
        if (e.target.value == '' && passwordS == '') {
            setcheckPass('');
        }
        else if (e.target.value == passwordS) {
            setcheckPass('Password is match');
        }
        else {
            setcheckPass('Password is not match');
        }

    }
    function handleSubmitLogin(e) {
        e.preventDefault();

        let data = {};
        if (email == '' || password == '') {
            setMess("Please fill all the field");
        } else {
            axios.post("http://localhost:8080/api/login/signin", {
                email: email,
                password: password,
            }).then((res) => {
                console.log(res);
                data = res.data;
                if (data.status == false) {
                    console.log(data.message);
                    setMess(data.message);
                } else {
                    login(email);

                }
            }).catch((err) => {
                console.log(err);
            })
        }


    }

    async function handleSubmitSignup(e) {
        e.preventDefault();
        let data = {}
        console.log(passwordS)
        console.log(repasswordS)      
          console.log(emailS)

        
        setcheckPass('');
        if (passwordS == '' || repasswordS == '' || emailS == '') {
            setMessS("Please fill all the field");
        }
        else {
            if (passwordS != repasswordS) {
                setMessS("Password and repassword is not match");
            }
            else {
                await axios.post("http://localhost:8080/api/login/signup", {
                    email: emailS,
                    password: passwordS,
                }).then((res) => {
                    data = res.data;
                    console.log(data);
                    if (data == "Email is already exits") {
                        // console.log(data.message);
                        setMessS("Email is already exits");
                    } else {
                        login(emailS);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    return (
        <>
            <div className="section-login">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3 text-white">
                                    <span className="fs-big">Log In </span><span className="fs-big">Sign Up</span>
                                </h6>
                                <input className="checkbox" type="checkbox" id="reg-log"
                                    name="reg-log" /> <label for="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3 text-white">Log In</h4>
                                                    <form id="formLogin" onSubmit={handleSubmitLogin}
                                                    >
                                                        <div className="form-group">
                                                            <input onChange={EmailChange} type="email" value={email} name="email" className="form-style"
                                                                placeholder="Your Email" id="email" autocomplete="off" />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input onChange={PasswordChange} type="password" value={password} name="password" className="form-style"
                                                                placeholder="Your Password" id="pass" autocomplete="off" />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>

                                                        <h4 className="mess text-center text-danger">{mess}</h4>
                                                        <input id="submit" style={{ color: "white;" }} name="submit"
                                                            type="submit" value="submit" className="btn mt-4" />

                                                    </form>
                                                    <p className="mb-0 mt-4 text-center">
                                                        <Link to="forgotPassword.jsp" className="link">Forgot your
                                                            password?</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3 text-white">Sign Up</h4>
                                                    <form id="formSignup" onSubmit={handleSubmitSignup}
                                                    >

                                                        <div className="form-group">
                                                            <input value={emailS} onChange={EmailSChange} type="email" name="emailS" className="form-style"
                                                                placeholder="Your Email" id="logemail" autocomplete="off" />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input onChange={PasswordSChange} type="password" name="passwordS" className="form-style"
                                                                placeholder="Password" id="logpass" autocomplete="off" />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input onChange={RepasswordSChange} type="password" name="re_passS" className="form-style"
                                                                placeholder="Re-Password" id="logrepass"
                                                                autocomplete="off" /> <i
                                                                    className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <div style={{ color: passwordS === repasswordS ? "green" : "red" }}>
                                                            {checkPass}
                                                        </div>

                                                        <h4 className="messS text-center text-danger">{messS}</h4>
                                                        <input style={{ color: "white;" }} name="signup" type="submit"
                                                            value="Signup" className="btn mt-4" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;