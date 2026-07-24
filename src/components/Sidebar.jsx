import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBuilding
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    { icon: <FaTachometerAlt />, name: "Dashboard", path: "/dashboard" },
    { icon: <FaUsers />, name: "Employees", path: "/dashboard" },
    { icon: <FaCalendarAlt />, name: "Attendance", path: "/attendance" },
    { icon: <FaMoneyCheckAlt />, name: "Payroll", path: "/payroll" },
    { icon: <FaChartLine />, name: "Analytics", path: "/analytics" },
    { icon: <FaBuilding />, name: "Departments", path: "/departments" },
    { icon: <FaCog />, name: "Settings", path: "/settings" }
  ];

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#494D5F",
        position: "fixed",
        color: "#E5EAF5",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "5px 0 30px rgba(0,0,0,0.2)",
        zIndex: 10
      }}
    >
      <div>

        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "24px",
            marginBottom: "10px",
            color: "#FFFFFF",
            letterSpacing: "-0.5px"
          }}
        >
          Nexus<span style={{ color: "#A0D2EB" }}>HR</span>
        </h2>

        <div
          style={{
            height: "4px",
            width: "60px",
            background: "linear-gradient(90deg, #A0D2EB, #D0BDF4, #8458B3)",
            borderRadius: "999px",
            marginBottom: "35px"
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "35px",
            background: "#3B3F52",
            padding: "12px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <FaUserCircle size={40} color="#A0D2EB" />

          <div>
            <h6 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#FFFFFF" }}>
              {user ? user.name : "Administrator"}
            </h6>

            <small style={{ color: "#C4C7D6", fontSize: "12px", letterSpacing: "0.5px" }}>
              {user ? user.role : "ADMIN"}
            </small>
          </div>
        </div>

        {menu.map((item, index) => {

          const isActive = location.pathname === item.path;

          return (

            <div
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "13px 14px",
                borderRadius: "12px",
                marginBottom: "8px",
                cursor: "pointer",
                transition: "0.2s ease",
                fontSize: "15px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: isActive ? 700 : 500,
                background: isActive ? "#8458B3" : "transparent",
                color: isActive ? "#FFFFFF" : "#C4C7D6",
                boxShadow: isActive ? "0 6px 16px rgba(132, 88, 179, 0.4)" : "none"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#3B3F52";
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C4C7D6";
                }
              }}
            >
              {item.icon}

              {item.name}

            </div>

          );

        })}

      </div>

      <div
        onClick={logout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px",
          background: "#DC2626",
          borderRadius: "12px",
          cursor: "pointer",
          justifyContent: "center",
          fontWeight: "700",
          color: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          transition: "0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#B91C1C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#DC2626";
        }}
      >
        <FaSignOutAlt />

        Logout

      </div>

    </div>
  );
}

export default Sidebar;