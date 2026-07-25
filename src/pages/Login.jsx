import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUsers, FaChartBar, FaCalendarCheck } from "react-icons/fa";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = now.toLocaleTimeString("en-US", { hour12: false });
    const dateString = now.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    const handleChange = (e) => {

        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });

        if (error) setError("");

    };

    const loginUser = async () => {

        if (!login.email.trim() || !login.password.trim()) {
            setError("Enter both email and password.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const response = await API.post("/api/login", login);

            console.log("Login Response:", response.data);

            if (response.status === 200 && response.data) {

                // Save logged-in user
                localStorage.setItem("user", JSON.stringify(response.data));

                console.log("User saved:", localStorage.getItem("user"));

                // Redirect to Dashboard
                navigate("/dashboard", { replace: true });

            } else {

                setError("Invalid email or password.");

            }

        } catch (err) {

            console.error(err);

            if (err.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError("Unable to connect to the server.");
            }

        } finally {

            setLoading(false);

        }

    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") loginUser();
    };

    return (

        <div className="d-flex" style={{ height: "100vh", width: "100%", fontFamily: "'Inter', sans-serif" }}>

            <style>{`
                @keyframes floatBlobOne {
                    0%   { transform: translate(0px, 0px) scale(1); }
                    33%  { transform: translate(30px, -40px) scale(1.08); }
                    66%  { transform: translate(-20px, 20px) scale(0.95); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes floatBlobTwo {
                    0%   { transform: translate(0px, 0px) scale(1); }
                    50%  { transform: translate(-35px, 30px) scale(1.12); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes floatBlobThree {
                    0%   { transform: translate(0px, 0px) rotate(0deg); }
                    50%  { transform: translate(20px, -25px) rotate(8deg); }
                    100% { transform: translate(0px, 0px) rotate(0deg); }
                }
                .login-input:focus {
                    border-color: #E3A857 !important;
                    box-shadow: 0 0 0 3px rgba(227, 168, 87, 0.18) !important;
                }
            `}</style>

            {/* Left brand panel */}
            <div
                className="d-none d-md-flex flex-column justify-content-between"
                style={{
                    width: "45%",
                    background: "linear-gradient(160deg, #14172B 0%, #2E2145 100%)",
                    padding: "60px",
                    color: "#fff",
                    position: "relative",
                    overflow: "hidden"
                }}
            >

                {/* Animated background shapes */}
                <div
                    style={{
                        position: "absolute",
                        top: "-80px",
                        right: "-100px",
                        width: "320px",
                        height: "320px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(227,168,87,0.20) 0%, rgba(227,168,87,0) 70%)",
                        animation: "floatBlobOne 14s ease-in-out infinite",
                        pointerEvents: "none"
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-60px",
                        left: "-90px",
                        width: "280px",
                        height: "280px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(160,122,209,0.22) 0%, rgba(160,122,209,0) 70%)",
                        animation: "floatBlobTwo 18s ease-in-out infinite",
                        pointerEvents: "none"
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "40%",
                        right: "10%",
                        width: "140px",
                        height: "140px",
                        borderRadius: "38% 62% 60% 40% / 40% 45% 55% 60%",
                        background: "rgba(255, 249, 230, 0.06)",
                        border: "1px solid rgba(255, 249, 230, 0.10)",
                        animation: "floatBlobThree 20s ease-in-out infinite",
                        pointerEvents: "none"
                    }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>

                    <h2
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontWeight: 600,
                            fontSize: "28px",
                            letterSpacing: "-0.5px"
                        }}
                    >
                        Nexus<span style={{ color: "#E3A857" }}>HR</span>
                    </h2>

                    <div
                        style={{
                            height: "3px",
                            width: "50px",
                            background: "#E3A857",
                            borderRadius: "999px",
                            margin: "16px 0 50px"
                        }}
                    />

                    <h1
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontWeight: 600,
                            fontSize: "32px",
                            lineHeight: "1.3",
                            marginBottom: "20px",
                            color: "#FDF6E3"
                        }}
                    >
                        Every punch in, accounted for.
                    </h1>

                    <p style={{ color: "#D8D2C4", fontSize: "15px", lineHeight: "1.7" }}>
                        Employee records, live attendance, and payroll — one dashboard built for HR teams.
                    </p>

                </div>

                {/* Signature: live clock, tied to punch-based attendance */}
                <div style={{ position: "relative", zIndex: 1 }}>

                    <div
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontSize: "56px",
                            fontWeight: 600,
                            letterSpacing: "1px",
                            color: "#FDF6E3",
                            fontVariantNumeric: "tabular-nums",
                            lineHeight: 1
                        }}
                    >
                        {timeString}
                    </div>

                    <p style={{ color: "#D8D2C4", fontSize: "14px", marginTop: "8px", marginBottom: "36px" }}>
                        {dateString}
                    </p>

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <FaUsers color="#E3A857" size={15} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#E9E4D8", fontSize: "14px" }}>Centralized employee records</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <FaChartBar color="#E3A857" size={15} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#E9E4D8", fontSize: "14px" }}>Real-time workforce analytics</span>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <FaCalendarCheck color="#E3A857" size={15} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#E9E4D8", fontSize: "14px" }}>Attendance and payroll, unified</span>
                    </div>

                </div>

            </div>

            {/* Right form panel */}
            <div
                className="d-flex flex-column justify-content-center align-items-center flex-grow-1"
                style={{ background: "#FFFDF7", padding: "40px" }}
            >

                <div style={{ width: "100%", maxWidth: "380px" }}>

                    <h2
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontWeight: 600,
                            fontSize: "26px",
                            color: "#1B1F3B",
                            marginBottom: "6px"
                        }}
                    >
                        Welcome back
                    </h2>

                    <p style={{ color: "#8A7F63", fontSize: "14px", marginBottom: "28px" }}>
                        Sign in to continue to your dashboard
                    </p>

                    {error && (
                        <div
                            style={{
                                background: "#FCEBEB",
                                color: "#791F1F",
                                fontSize: "13px",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                marginBottom: "20px"
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#5C5440", marginBottom: "6px", display: "block" }}>
                        Email
                    </label>

                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <FaEnvelope
                            size={14}
                            color="#C2A25F"
                            style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }}
                        />
                        <input
                            className="form-control login-input"
                            style={{ paddingLeft: "40px", height: "46px", background: "#FFFCF2", border: "1px solid #EAE2C9" }}
                            placeholder="admin@nexushr.com"
                            name="email"
                            value={login.email}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>

                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#5C5440", marginBottom: "6px", display: "block" }}>
                        Password
                    </label>

                    <div style={{ position: "relative", marginBottom: "28px" }}>
                        <FaLock
                            size={14}
                            color="#C2A25F"
                            style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control login-input"
                            style={{ paddingLeft: "40px", paddingRight: "40px", height: "46px", background: "#FFFCF2", border: "1px solid #EAE2C9" }}
                            placeholder="••••••••"
                            name="password"
                            value={login.password}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            style={{
                                position: "absolute", top: "50%", right: "14px", transform: "translateY(-50%)",
                                background: "none", border: "none", padding: 0, color: "#C2A25F", cursor: "pointer"
                            }}
                        >
                            {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                        </button>
                    </div>

                    <button
                        className="btn w-100 fw-bold"
                        style={{
                            height: "46px",
                            background: "#1B1F3B",
                            color: "#FDF6E3",
                            border: "none",
                            opacity: loading ? 0.7 : 1
                        }}
                        onClick={loginUser}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>

                    <p className="text-center mt-4" style={{ fontSize: "12px", color: "#B8AD8E" }}>
                        NexusHR · Enterprise HR Management System
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;