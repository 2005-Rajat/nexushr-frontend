import { useState } from "react";
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
  FaBuilding,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const SIDEBAR_WIDTH = 260;

function Sidebar({ isOpen, setIsOpen }) {

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

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar panel */}
      <div
        style={{
          width: `${SIDEBAR_WIDTH}px`,
          height: "100vh",
          background: "#14172B",
          position: "fixed",
          top: 0,
          left: 0,
          color: "#FFFDF7",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "5px 0 30px rgba(0,0,0,0.4)",
          zIndex: 10,
          borderRight: "1px solid rgba(255,253,247,0.06)",
          transform: isOpen ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: "transform 0.25s ease"
        }}
      >
        <div>

          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "24px",
              marginBottom: "10px",
              color: "#FFFDF7",
              letterSpacing: "-0.5px"
            }}
          >
            Nexus<span style={{ color: "#E3A857" }}>HR</span>
          </h2>

          <div
            style={{
              height: "4px",
              width: "60px",
              background: "#E3A857",
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
              background: "#20243D",
              padding: "12px",
              borderRadius: "16px",
              border: "1px solid rgba(255,253,247,0.08)"
            }}
          >
            <FaUserCircle size={40} color="#E3A857" />

            <div>
              <h6 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#FFFDF7" }}>
                {user ? user.name : "Administrator"}
              </h6>

              <small style={{ color: "#B8AD8E", fontSize: "12px", letterSpacing: "0.5px", fontWeight: 600 }}>
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
                  transition: "0.15s ease",
                  fontSize: "15px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isActive ? 700 : 600,
                  background: isActive ? "#C2A25F" : "transparent",
                  color: isActive ? "#1B1F3B" : "#FFFDF7",
                  boxShadow: isActive ? "0 6px 18px rgba(194, 162, 95, 0.35)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#C2A25F";
                    e.currentTarget.style.color = "#1B1F3B";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#FFFDF7";
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

      {/* Floating toggle tab — stays visible whether sidebar is open or closed */}
      <div
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "32px",
          left: isOpen ? `${SIDEBAR_WIDTH}px` : "0px",
          width: "28px",
          height: "44px",
          background: "#C2A25F",
          borderRadius: "0 10px 10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 11,
          boxShadow: "3px 0 10px rgba(0,0,0,0.25)",
          transition: "left 0.25s ease"
        }}
        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <FaChevronLeft size={13} color="#1B1F3B" />
        ) : (
          <FaChevronRight size={13} color="#1B1F3B" />
        )}
      </div>
    </>
  );
}

export default Sidebar;
export { SIDEBAR_WIDTH };