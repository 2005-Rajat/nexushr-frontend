import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {

  return (

    <div
      style={{
        background: "#FFFFFF",
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        borderBottom: "2px solid #E5E7EB",
        position: "sticky",
        top: 0,
        zIndex: 5
      }}
    >

      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#111827", margin: 0 }}>
        NexusHR Dashboard
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>

        <FaSearch size={18} color="#7C3AED" style={{ cursor: "pointer" }} />

        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={18} color="#7C3AED" />
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "8px",
              height: "8px",
              background: "#F59E0B",
              borderRadius: "50%",
              border: "1px solid #FFFFFF"
            }}
          />
        </div>

        <FaUserCircle size={30} color="#111827" style={{ cursor: "pointer" }} />

      </div>

    </div>

  );

}

export default Navbar;