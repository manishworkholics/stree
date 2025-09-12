import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/logo/logo.png";
import SignInImg from "../Images/sign/signin.png";

const SignIn = () => {
    const navigate = useNavigate();

    // form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch("http://206.189.130.102:4545/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Save token in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin));

            // Navigate to dashboard
            navigate("/dashboard");
        } catch (err) {
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="signIn-page">
                <section className="signin__area" style={{ minHeight: "100vh" }}>
                    <div className="sign__main-wrapper my-0">
                        {/* Left Side */}
                        <div className="sign__left">
                            <div className="sign__header text-center justify-content-center">
                                <div className="sign__logo text-center">
                                    <img
                                        className="logo-black"
                                        src={Logo}
                                        style={{ width: "150px", height: "90px", objectFit: "contain" }}
                                        alt="Logo"
                                    />
                                    <img
                                        className="logo-white"
                                        src={Logo}
                                        style={{ width: "150px", height: "90px", objectFit: "contain" }}
                                        alt="Logo"
                                    />
                                </div>
                            </div>

                            <div className="sign__center-wrapper text-center mt-50">
                                <div className="sign__title-wrapper mb-40">
                                    <h3 className="sign__title">Welcome To Rental Dress</h3>
                                    <p>The faster you fill up, the faster you get a new experience</p>
                                </div>

                                <div className="sign__input-form text-center">
                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <form onSubmit={handleLogin}>
                                        {/* Email Input */}
                                        <div className="sign__input">
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <span>
                                                <i className="fa-solid fa-user"></i>
                                            </span>
                                        </div>

                                        {/* Password Input */}
                                        <div className="sign__input">
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <span>
                                                <i className="fa-solid fa-lock"></i>
                                            </span>
                                        </div>

                                        {/* Remember Me */}
                                        <div className="sign__action">
                                            <div className="sign__check">
                                                <input
                                                    className="e-check-input"
                                                    type="checkbox"
                                                    id="remember"
                                                />
                                                <label className="sign__check-text" htmlFor="remember">
                                                    <span>Remember Me</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="sing_button mb-20">
                                            <button type="submit" className="input__btn w-100 mb-20">
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="sign__right">
                            <div
                                className="sign__input-thumb"
                                style={{
                                    backgroundImage: `url(${SignInImg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SignIn;
