import { useState } from "react";
import API from "../services/api";

function EmployeeForm({ loadEmployees }) {

    const [employee, setEmployee] = useState({

        employeeId: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: ""

    });

    const handleChange = (e) => {

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    const saveEmployee = async () => {

        await API.post("/employees", employee);

        alert("Employee Added Successfully");

        setEmployee({

            employeeId: "",
            name: "",
            email: "",
            department: "",
            designation: "",
            salary: "",
            joiningDate: ""

        });

        loadEmployees();

    };

    return (

        <div className="card shadow mt-4">

            <div className="card-body">

                <h3 className="mb-4 text-center">
                    Add New Employee
                </h3>

                <div className="row">

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            placeholder="Employee ID"
                            name="employeeId"
                            value={employee.employeeId}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            placeholder="Employee Name"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            placeholder="Department"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            placeholder="Designation"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            type="number"
                            placeholder="Salary"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <input
                            className="form-control"
                            type="date"
                            name="joiningDate"
                            value={employee.joiningDate}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={saveEmployee}
                >
                    Save Employee
                </button>

            </div>

        </div>

    );

}

export default EmployeeForm;