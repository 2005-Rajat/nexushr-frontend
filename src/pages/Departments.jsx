import { useEffect, useState } from "react";
import { FaBuilding, FaUserTie, FaMapMarkerAlt, FaEdit, FaTrash, FaUsers } from "react-icons/fa";

import Sidebar, { SIDEBAR_WIDTH } from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DepartmentModal from "../components/modals/DepartmentModal";
import EditDepartmentModal from "../components/modals/EditDepartmentModal";
import DeleteDepartmentModal from "../components/modals/DeleteDepartmentModal";

import API from "../services/api";

function Departments() {

    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedDept, setSelectedDept] = useState(null);

    useEffect(() => {
        loadDepartments();
        loadEmployees();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await API.get("/departments");
            setDepartments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadEmployees = async () => {
        try {
            const response = await API.get("/employees");
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const employeeCountFor = (deptName) =>
        employees.filter((emp) => emp.department === deptName).length;

    const openEdit = (dept) => {
        setSelectedDept(dept);
        setShowEdit(true);
    };

    const openDelete = (dept) => {
        setSelectedDept(dept);
        setShowDelete(true);
    };

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

                <Navbar title="Departments" />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h3 className="fw-bold mb-1" style={{ color: "#1B1F3B" }}>
                                Departments
                            </h3>
                            <p className="mb-0" style={{ color: "#8A7F63", fontSize: "14px" }}>
                                {departments.length} department{departments.length !== 1 ? "s" : ""} across your organization
                            </p>
                        </div>

                        <button
                            className="btn fw-bold px-4"
                            style={{ background: "#1B1F3B", color: "#FFFDF7", border: "none" }}
                            onClick={() => setShowAdd(true)}
                        >
                            + Add Department
                        </button>

                    </div>

                    {departments.length === 0 ? (

                        <div
                            className="card text-center p-5"
                            style={{ border: "1px solid #EAE2C9" }}
                        >
                            <FaBuilding size={40} color="#C2A25F" style={{ margin: "0 auto 16px" }} />
                            <h5 style={{ color: "#1B1F3B" }}>No departments yet</h5>
                            <p style={{ color: "#8A7F63" }}>Click "+ Add Department" to create your first one.</p>
                        </div>

                    ) : (

                        <div className="row g-4">

                            {departments.map((dept) => (

                                <div className="col-md-6 col-lg-4" key={dept.id}>

                                    <div
                                        className="card h-100"
                                        style={{
                                            border: "1px solid #EAE2C9",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            boxShadow: "0 2px 10px rgba(27,31,59,0.06)"
                                        }}
                                    >

                                        <div style={{ height: "5px", background: "#C2A25F" }} />

                                        <div style={{ padding: "22px" }}>

                                            <div className="d-flex justify-content-between align-items-start mb-3">

                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "46px",
                                                        height: "46px",
                                                        borderRadius: "12px",
                                                        background: "#1B1F3B"
                                                    }}
                                                >
                                                    <FaBuilding size={18} color="#FFFDF7" />
                                                </div>

                                                <div className="d-flex gap-2">

                                                    <button
                                                        onClick={() => openEdit(dept)}
                                                        style={{
                                                            background: "#F3ECFB",
                                                            color: "#8458B3",
                                                            border: "none",
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius: "8px",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        <FaEdit size={13} />
                                                    </button>

                                                    <button
                                                        onClick={() => openDelete(dept)}
                                                        style={{
                                                            background: "#FBEAEA",
                                                            color: "#D14343",
                                                            border: "none",
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius: "8px",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        <FaTrash size={13} />
                                                    </button>

                                                </div>

                                            </div>

                                            <h5 className="fw-bold mb-2" style={{ color: "#1B1F3B" }}>
                                                {dept.name}
                                            </h5>

                                            {dept.description && (
                                                <p style={{ color: "#8A7F63", fontSize: "13px", marginBottom: "14px" }}>
                                                    {dept.description}
                                                </p>
                                            )}

                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <FaUserTie size={13} color="#C2A25F" />
                                                <small style={{ color: "#5C5440" }}>
                                                    {dept.headOfDepartment || "No head assigned"}
                                                </small>
                                            </div>

                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <FaMapMarkerAlt size={13} color="#C2A25F" />
                                                <small style={{ color: "#5C5440" }}>
                                                    {dept.location || "Location not set"}
                                                </small>
                                            </div>

                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <FaUsers size={13} color="#C2A25F" />
                                                <small style={{ color: "#5C5440" }}>
                                                    {employeeCountFor(dept.name)} employee{employeeCountFor(dept.name) !== 1 ? "s" : ""}
                                                </small>
                                            </div>

                                            {dept.budget != null && (
                                                <div
                                                    style={{
                                                        borderTop: "1px solid #EAE2C9",
                                                        paddingTop: "12px",
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        fontWeight: 700,
                                                        color: "#1B1F3B"
                                                    }}
                                                >
                                                    ₹ {Number(dept.budget).toLocaleString()}
                                                    <span style={{ fontWeight: 400, fontSize: "12px", color: "#8A7F63" }}>
                                                        {" "}/ annual budget
                                                    </span>
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                    <DepartmentModal
                        show={showAdd}
                        handleClose={() => setShowAdd(false)}
                        loadDepartments={loadDepartments}
                    />

                    <EditDepartmentModal
                        show={showEdit}
                        handleClose={() => setShowEdit(false)}
                        department={selectedDept}
                        loadDepartments={loadDepartments}
                    />

                    <DeleteDepartmentModal
                        show={showDelete}
                        handleClose={() => setShowDelete(false)}
                        department={selectedDept}
                        loadDepartments={loadDepartments}
                    />

                </div>

            </div>

        </>
    );
}

export default Departments;
