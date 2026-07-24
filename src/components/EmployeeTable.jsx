import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import ViewEmployeeModal from "./modals/ViewEmployeeModal";
import EditEmployeeModal from "./modals/EditEmployeeModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

const PAGE_SIZE = 10;

function EmployeeTable({ employees = [], loadEmployees }) {

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [employees]);

  const openView = (emp) => {
    setSelectedEmployee(emp);
    setShowView(true);
  };

  const openEdit = (emp) => {
    setSelectedEmployee(emp);
    setShowEdit(true);
  };

  const openDelete = (emp) => {
    setSelectedEmployee(emp);
    setShowDelete(true);
  };

  const statusStyle = (status) => {
    if (status === "On Leave") return { background: "#F59E0B", color: "#FFFFFF" };
    if (status === "Resigned") return { background: "#6B7280", color: "#FFFFFF" };
    return { background: "#15803D", color: "#FFFFFF" };
  };

  const actionBtn = (bg, color) => ({
    background: bg,
    color: color,
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "6px",
    cursor: "pointer",
    transition: "transform 0.15s ease"
  });

  const totalPages = Math.max(1, Math.ceil(employees.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEmployees = employees.slice(startIndex, startIndex + PAGE_SIZE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (

    <div className="card mt-4" style={{ overflow: "hidden", border: "1px solid #E5E7EB" }}>

      <div
              className="d-flex justify-content-between align-items-center"
              style={{
                background: "#7C3AED",
                padding: "18px 24px"
              }}
          >
        <h5 style={{ color: "#fff", margin: 0, fontWeight: 800 }}>Employee Records</h5>
        <small style={{ color: "#FFFFFF", fontWeight: 600 }}>{employees.length} total</small>
      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead style={{ background: "#111827" }}>

            <tr>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>ID</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Employee ID</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Name</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Email</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Department</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Designation</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Salary</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Status</th>
              <th style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>Actions</th>
            </tr>

          </thead>

          <tbody>

            {paginatedEmployees.length > 0 ? (

              paginatedEmployees.map((emp) => (

                <tr key={emp.id}>

                  <td className="font-mono" style={{ color: "#374151", fontWeight: 600 }}>{emp.id}</td>

                  <td className="font-mono" style={{ fontWeight: 700, color: "#111827" }}>{emp.employeeId}</td>

                  <td style={{ fontWeight: 700, color: "#111827" }}>{emp.name}</td>

                  <td style={{ color: "#374151", fontWeight: 500 }}>{emp.email}</td>

                  <td style={{ color: "#111827", fontWeight: 500 }}>{emp.department}</td>

                  <td style={{ color: "#111827", fontWeight: 500 }}>{emp.designation}</td>

                  <td className="font-mono" style={{ fontWeight: 700, color: "#111827" }}>₹ {emp.salary}</td>

                  <td>
                    <span className="badge" style={statusStyle(emp.status)}>
                      {emp.status || "Active"}
                    </span>
                  </td>

                  <td>

                    <button
                      style={actionBtn("#2563EB", "#FFFFFF")}
                      onClick={() => openView(emp)}
                    >
                      <FaEye size={13} />
                    </button>

                    <button
                      style={actionBtn("#7C3AED", "#FFFFFF")}
                      onClick={() => openEdit(emp)}
                    >
                      <FaEdit size={13} />
                    </button>

                    <button
                      style={actionBtn("#DC2626", "#FFFFFF")}
                      onClick={() => openDelete(emp)}
                    >
                      <FaTrash size={13} />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="9" className="text-center py-4" style={{ color: "#374151", fontWeight: 600 }}>

                  No Employees Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {totalPages > 1 && (

        <div className="d-flex justify-content-between align-items-center" style={{ padding: "16px 24px", borderTop: "2px solid #E5E7EB" }}>

          <small style={{ color: "#374151", fontWeight: 600 }}>
            Page {currentPage} of {totalPages}
          </small>

          <nav>
            <ul className="pagination pagination-sm mb-0">

              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className="page-item">
                  <button
                    className="page-link"
                    onClick={() => goToPage(page)}
                    style={
                      currentPage === page
                        ? { background: "#7C3AED", borderColor: "#7C3AED", color: "#fff", fontWeight: 700 }
                        : { color: "#111827", fontWeight: 600 }
                    }
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                  Next
                </button>
              </li>

            </ul>
          </nav>

        </div>

      )}

      <ViewEmployeeModal
        show={showView}
        handleClose={() => setShowView(false)}
        employee={selectedEmployee}
      />

      <EditEmployeeModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        employee={selectedEmployee}
        loadEmployees={loadEmployees}
      />

      <DeleteConfirmModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        employee={selectedEmployee}
        loadEmployees={loadEmployees}
      />

    </div>

  );

}

export default EmployeeTable;