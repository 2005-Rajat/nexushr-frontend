import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaTools } from "react-icons/fa";

import Sidebar, { SIDEBAR_WIDTH } from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ComingSoon() {

    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const pageName = location.pathname.replace("/", "");
    const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div
                style={{
                    marginLeft: isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px",
                    background: "#FFFDF7",
                    minHeight: "100vh",
                    transition: "margin-left 0.25s ease"
                }}
            >

                <Navbar title={title} />

                <div
                    className="d-flex flex-column align-items-center justify-content-center text-center"
                    style={{ height: "calc(100vh - 72px)" }}
                >
                    <FaTools size={60} color="#C2A25F" />
                    <h3 className="mt-4" style={{ color: "#1B1F3B" }}>{title} Module</h3>
                    <p style={{ color: "#8A7F63" }}>Coming soon — this module is under active development.</p>
                </div>

            </div>
        </>
    );
}

export default ComingSoon;
