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
    if (status === "On Leave") return { background: "rgba(224,168,69,0.15)", color: "#A67519" };
    if (status === "Resigned") return { background: "rgba(139,143,163,0.15)", color: "#6B6F82" };
    return { background: "rgba(76,175,125,0.12)", color: "#2F8558" };
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

    <div className="card mt-4" style={{ overflow: "hidden" }}>

      <div
              className="d-flex justify-content-between align-items-center"
              style={{
                background: "#8458B3",
                padding: "18px 24px"
              }}
          >
        <h5 style={{ color: "#fff", margin: 0, fontWeight: 700 }}>Employee Records</h5>
        <small style={{ color: "#C4C7D6" }}>{employees.length} total</small>
      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead style={{ background: "#F8F7FC" }}>

            <tr>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>ID</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Employee ID</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Name</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Email</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Department</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Designation</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Salary</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Status</th>
              <th style={{ color: "#6B6F82", fontSize: "13px", fontWeight: 600 }}>Actions</th>
            </tr>

          </thead>

          <tbody>

            {paginatedEmployees.length > 0 ? (

              paginatedEmployees.map((emp) => (

                <tr key={emp.id}>

                  <td className="font-mono" style={{ color: "#9B9FB0" }}>{emp.id}</td>

                  <td className="font-mono" style={{ fontWeight: 600 }}>{emp.employeeId}</td>

                  <td style={{ fontWeight: 600, color: "#494D5F" }}>{emp.name}</td>

                  <td style={{ color: "#6B6F82" }}>{emp.email}</td>

                  <td>{emp.department}</td>

                  <td>{emp.designation}</td>

                  <td className="font-mono" style={{ fontWeight: 600 }}>₹ {emp.salary}</td>

                  <td>
                    <span className="badge" style={statusStyle(emp.status)}>
                      {emp.status || "Active"}
                    </span>
                  </td>

                  <td>

                    <button
                      style={actionBtn("#EAF4FB", "#3B82A6")}
                      onClick={() => openView(emp)}
                    >
                      <FaEye size={13} />
                    </button>

                    <button
                      style={actionBtn("#F3ECFB", "#8458B3")}
                      onClick={() => openEdit(emp)}
                    >
                      <FaEdit size={13} />
                    </button>

                    <button
                      style={actionBtn("#FBEAEA", "#D14343")}
                      onClick={() => openDelete(emp)}
                    >
                      <FaTrash size={13} />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="9" className="text-center py-4" style={{ color: "#9B9FB0" }}>

                  No Employees Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {totalPages > 1 && (

        <div className="d-flex justify-content-between align-items-center" style={{ padding: "16px 24px", borderTop: "1px solid #EEF0F8" }}>

          <small style={{ color: "#9B9FB0" }}>
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
                        ? { background: "#8458B3", borderColor: "#8458B3", color: "#fff" }
                        : {}
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