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

            {/* Left brand panel */}
            <div
                className="d-none d-md-flex flex-column justify-content-between"
                style={{
                    width: "45%",
                    background: "linear-gradient(160deg, #1B1F3B 0%, #3D2B56 100%)",
                    padding: "60px",
                    color: "#fff",
                    position: "relative",
                    overflow: "hidden"
                }}
            >

                <div>

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
                            marginBottom: "20px"
                        }}
                    >
                        Every punch in, accounted for.
                    </h1>

                    <p style={{ color: "#9AA0C3", fontSize: "15px", lineHeight: "1.7" }}>
                        Employee records, live attendance, and payroll — one dashboard built for HR teams.
                    </p>

                </div>

                {/* Signature: live clock, tied to punch-based attendance */}
                <div>

                    <div
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontSize: "56px",
                            fontWeight: 600,
                            letterSpacing: "1px",
                            color: "#fff",
                            fontVariantNumeric: "tabular-nums",
                            lineHeight: 1
                        }}
                    >
                        {timeString}
                    </div>

                    <p style={{ color: "#9AA0C3", fontSize: "14px", marginTop: "8px", marginBottom: "36px" }}>
                        {dateString}
                    </p>

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <FaUsers color="#E3A857" size={15} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#C4C7D6", fontSize: "14px" }}>Centralized employee records</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <FaChartBar color="#E3A857" size={15} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#C4C7D6", fontSize: "14px" }}>Real-time workforce analytics</span>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <FaCalendarCheck color="#E3A857" size={15} style={{ flexShrink: 0 }} />
                        <span style={{ color: "#C4C7D6", fontSize: "14px" }}>Attendance and payroll, unified</span>
                    </div>

                </div>

            </div>

            {/* Right form panel */}
            <div
                className="d-flex flex-column justify-content-center align-items-center flex-grow-1"
                style={{ background: "#FAFAFA", padding: "40px" }}
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

                    <p style={{ color: "#8B90A8", fontSize: "14px", marginBottom: "28px" }}>
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

                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#5A5E75", marginBottom: "6px", display: "block" }}>
                        Email
                    </label>

                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <FaEnvelope
                            size={14}
                            color="#9AA0C3"
                            style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }}
                        />
                        <input
                            className="form-control"
                            style={{ paddingLeft: "40px", height: "46px" }}
                            placeholder="admin@nexushr.com"
                            name="email"
                            value={login.email}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>

                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#5A5E75", marginBottom: "6px", display: "block" }}>
                        Password
                    </label>

                    <div style={{ position: "relative", marginBottom: "28px" }}>
                        <FaLock
                            size={14}
                            color="#9AA0C3"
                            style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            style={{ paddingLeft: "40px", paddingRight: "40px", height: "46px" }}
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
                                background: "none", border: "none", padding: 0, color: "#9AA0C3", cursor: "pointer"
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
                            color: "#fff",
                            border: "none",
                            opacity: loading ? 0.7 : 1
                        }}
                        onClick={loginUser}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>

                    <p className="text-center mt-4" style={{ fontSize: "12px", color: "#B4B2A9" }}>
                        NexusHR · Enterprise HR Management System
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;