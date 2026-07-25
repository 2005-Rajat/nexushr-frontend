import { useEffect, useState } from "react";

import Sidebar, { SIDEBAR_WIDTH } from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import EmployeeTable from "../components/EmployeeTable";
import Charts from "../components/Charts";
import EmployeeModal from "../components/modals/EmployeeModal";

import API from "../services/api";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    useEffect(() => {

        let result = employees.filter((emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase())
        );

        if (departmentFilter !== "All") {
            result = result.filter((emp) => emp.department === departmentFilter);
        }

        if (statusFilter !== "All") {
            result = result.filter((emp) => (emp.status || "Active") === statusFilter);
        }

        setFilteredEmployees(result);

    }, [search, departmentFilter, statusFilter, employees]);

    const loadEmployees = async () => {

        try {

            const response = await API.get("/employees");

            setEmployees(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const departments = ["All", ...new Set(employees.map((emp) => emp.department).filter(Boolean))];

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

                <Navbar />

                <div className="container-fluid p-4">

                    <DashboardCards employees={employees} />

                    <div className="d-flex justify-content-between align-items-center mt-4 mb-4">

                        <h3 className="fw-bold">
                            Employee Management
                        </h3>

                        <button
                            className="btn btn-primary px-4"
                            onClick={() => setShowModal(true)}
                        >
                            + Add Employee
                        </button>

                    </div>

                    <div className="row g-3 mb-4">

                        <div className="col-md-6">
                            <input
                                className="form-control"
                                placeholder="🔍 Search by Name, Employee ID or Email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                            >
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept === "All" ? "All Departments" : dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>

                    </div>

                    <EmployeeTable
                        employees={filteredEmployees}
                        loadEmployees={loadEmployees}
                    />

                    <div className="mt-5">

                        <Charts employees={employees} />

                    </div>

                    <EmployeeModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        loadEmployees={loadEmployees}
                    />

                </div>

            </div>

        </>
    );

}

export default Dashboard;