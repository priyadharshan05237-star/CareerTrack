import { useEffect, useState } from "react";
import "./Applications.css";

function Applications({
  goDashboard,
  applications,
  setApplications,
  selectedCompany,
  setSelectedCompany
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newApplication, setNewApplication] = useState({
    company: "",
    role: "",
    package: "",
    status: "Applied",
    round: "Application Submitted",
    appliedDate: ""
  });

  // LOAD APPLICATIONS FROM MONGODB

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userId =
          localStorage.getItem("careerTrackUserId");

        if (!userId) {
          console.error("User ID not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:5000/api/applications/${userId}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch applications"
          );
        }

        const data = await response.json();

        const formattedApplications = data.map(
          (application) => ({
            ...application,
            id: application._id
          })
        );

        setApplications(formattedApplications);
      } catch (error) {
        console.error(
          "Failed to load applications:",
          error
        );

        alert(
          "Failed to load applications from server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [setApplications]);

  // COMPANY → APPLICATION

  useEffect(() => {
    if (selectedCompany) {
      setNewApplication({
        company: selectedCompany.name || "",
        role: selectedCompany.role || "",
        package: selectedCompany.package || "",
        status: "Applied",
        round: "Application Submitted",
        appliedDate: new Date()
          .toISOString()
          .split("T")[0]
      });

      setShowForm(true);
      setSelectedCompany(null);
    }
  }, [
    selectedCompany,
    setSelectedCompany
  ]);
  // SEARCH + FILTER

  const filteredApplications = applications.filter(
    (application) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (application.company || "")
          .toLowerCase()
          .includes(searchText) ||
        (application.role || "")
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All" ||
        application.status === filter;

      return matchesSearch && matchesFilter;
    }
  );

  // STATISTICS

  const totalApplications =
    applications.length;

  const appliedCount =
    applications.filter(
      (app) => app.status === "Applied"
    ).length;

  const shortlistedCount =
    applications.filter(
      (app) => app.status === "Shortlisted"
    ).length;

  const interviewCount =
    applications.filter(
      (app) => app.status === "Interview"
    ).length;

  const selectedCount =
    applications.filter(
      (app) => app.status === "Selected"
    ).length;

  const rejectedCount =
    applications.filter(
      (app) => app.status === "Rejected"
    ).length;

  // ADD APPLICATION

  const handleAddApplication = async (e) => {
    e.preventDefault();

    if (
      !newApplication.company.trim() ||
      !newApplication.role.trim()
    ) {
      alert(
        "Please enter company name and job role."
      );
      return;
    }

    try {
      const userId =
        localStorage.getItem(
          "careerTrackUserId"
        );

      if (!userId) {
        alert("Please login again.");
        return;
      }

      const applicationData = {
        userId: userId,
        company:
          newApplication.company.trim(),
        role:
          newApplication.role.trim(),
        package:
          newApplication.package.trim(),
        status:
          newApplication.status,
        round:
          newApplication.round,
        appliedDate:
          newApplication.appliedDate ||
          new Date()
            .toISOString()
            .split("T")[0]
      };

      const response = await fetch(
        "http://127.0.0.1:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            applicationData
          )
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save application"
        );
      }

      const savedApplication = {
        ...data.application,
        id: data.application._id
      };

      setApplications(
        (previous) => [
          ...previous,
          savedApplication
        ]
      );

      setNewApplication({
        company: "",
        role: "",
        package: "",
        status: "Applied",
        round:
          "Application Submitted",
        appliedDate: ""
      });

      setShowForm(false);

      alert(
        "Application saved successfully!"
      );

    } catch (error) {
      console.error(
        "Add application error:",
        error
      );

      alert(
        "Failed to save application."
      );
    }
  };
  // DELETE APPLICATION

  const handleDeleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/applications/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete application"
        );
      }

      setApplications(
        (previous) =>
          previous.filter(
            (application) =>
              application.id !== id
          )
      );

      setSelectedApplication(null);

      alert(
        "Application deleted successfully!"
      );

    } catch (error) {
      console.error(
        "Delete application error:",
        error
      );

      alert(
        "Failed to delete application."
      );
    }
  };


  // UPDATE APPLICATION STATUS

  const handleUpdateStatus = async (
    id,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/applications/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update status"
        );
      }

      setApplications(
        (previous) =>
          previous.map(
            (application) =>
              application.id === id
                ? {
                    ...application,
                    status:
                      data.application.status
                  }
                : application
          )
      );

      setSelectedApplication(
        (previous) =>
          previous &&
          previous.id === id
            ? {
                ...previous,
                status:
                  data.application.status
              }
            : previous
      );

    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        "Failed to update application status."
      );
    }
  };


  // STATUS CLASS

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "status-applied";

      case "Shortlisted":
        return "status-shortlisted";

      case "Interview":
        return "status-interview";

      case "Selected":
        return "status-selected";

      case "Rejected":
        return "status-rejected";

      default:
        return "";
    }
  };
  return (
    <div className="applications-page">

      {/* TOP BAR */}

      <div className="applications-topbar">

        <button
          className="back-btn"
          onClick={goDashboard}
        >
          ← Dashboard
        </button>

        <button
          className="add-application-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Application
        </button>

      </div>


      {/* HEADING */}

      <div className="applications-heading">
        <div>
          <h1>My Applications</h1>
          <p>
            Track and manage your placement
            applications.
          </p>
        </div>

        <div className="application-total">
          {totalApplications} Applications
        </div>
      </div>


      {/* STATISTICS */}

      <div className="application-stats">

        <div className="application-stat-card">
          <h3>{totalApplications}</h3>
          <p>Total</p>
        </div>

        <div className="application-stat-card">
          <h3>{appliedCount}</h3>
          <p>Applied</p>
        </div>

        <div className="application-stat-card">
          <h3>{shortlistedCount}</h3>
          <p>Shortlisted</p>
        </div>

        <div className="application-stat-card">
          <h3>{interviewCount}</h3>
          <p>Interview</p>
        </div>

        <div className="application-stat-card">
          <h3>{selectedCount}</h3>
          <p>Selected</p>
        </div>

        <div className="application-stat-card">
          <h3>{rejectedCount}</h3>
          <p>Rejected</p>
        </div>

      </div>


      {/* SEARCH + FILTER */}

      <div className="application-search">

        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">
            Shortlisted
          </option>
          <option value="Interview">
            Interview
          </option>
          <option value="Selected">
            Selected
          </option>
          <option value="Rejected">
            Rejected
          </option>
        </select>

        {(search || filter !== "All") && (
          <button
            className="clear-application-filter"
            onClick={() => {
              setSearch("");
              setFilter("All");
            }}
          >
            Clear
          </button>
        )}

      </div>


      {/* APPLICATION LIST */}

      {loading ? (
        <div className="no-application">
          Loading applications...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="no-application">
          <h3>No applications found</h3>
          <p>
            Add your first placement application
            to start tracking.
          </p>
        </div>
      ) : (

        <div className="application-list">

          {filteredApplications.map(
            (application) => (

              <div
                className="application-card"
                key={application.id}
              >

                <div className="application-card-header">

                  <div className="application-company-icon">
                    🏢
                  </div>

                  <div className="application-info">

                    <h3>
                      {application.company}
                    </h3>

                    <p>
                      {application.role}
                    </p>

                  </div>

                  <span
                    className={`application-status ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>

                </div>


                <div className="application-card-bottom">

                  <div>
                    <small>Package</small>
                    <p>
                      {application.package ||
                        "Not specified"}
                    </p>
                  </div>

                  <div>
                    <small>Applied Date</small>
                    <p>
                      {application.appliedDate ||
                        "Not specified"}
                    </p>
                  </div>

                  <button
                    className="view-details-btn"
                    onClick={() =>
                      setSelectedApplication(
                        application
                      )
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}
      {/* ADD APPLICATION FORM */}

      {showForm && (
        <div className="application-modal-overlay">

          <div className="application-form">

            <button
              className="close-form-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h2>Add Application</h2>

            <form onSubmit={handleAddApplication}>

              <label>Company Name</label>

              <input
                type="text"
                value={newApplication.company}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    company: e.target.value
                  })
                }
                placeholder="Enter company name"
              />


              <label>Job Role</label>

              <input
                type="text"
                value={newApplication.role}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    role: e.target.value
                  })
                }
                placeholder="Enter job role"
              />


              <label>Package</label>

              <input
                type="text"
                value={newApplication.package}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    package: e.target.value
                  })
                }
                placeholder="Example: 6 LPA"
              />


              <label>Status</label>

              <select
                value={newApplication.status}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    status: e.target.value
                  })
                }
              >
                <option value="Applied">
                  Applied
                </option>

                <option value="Shortlisted">
                  Shortlisted
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Selected">
                  Selected
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>


              <label>Application Round</label>

              <input
                type="text"
                value={newApplication.round}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    round: e.target.value
                  })
                }
                placeholder="Example: Aptitude Round"
              />


              <label>Applied Date</label>

              <input
                type="date"
                value={newApplication.appliedDate}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    appliedDate: e.target.value
                  })
                }
              />


              <button
                type="submit"
                className="save-application-btn"
              >
                Save Application
              </button>

            </form>

          </div>

        </div>
      )}
      {/* APPLICATION DETAILS */}

      {selectedApplication && (
        <div className="application-modal-overlay">

          <div className="application-details">

            <button
              className="close-details-btn-top"
              onClick={() =>
                setSelectedApplication(null)
              }
            >
              ×
            </button>

            <div className="details-company">

              <div className="details-company-icon">
                🏢
              </div>

              <div>
                <h2>
                  {selectedApplication.company}
                </h2>

                <p>
                  {selectedApplication.role}
                </p>
              </div>

            </div>


            {/* DETAILS GRID */}

            <div className="application-detail-grid">

              <div>
                <span>Package</span>
                <strong>
                  {selectedApplication.package ||
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong
                  className={`detail-status ${getStatusClass(
                    selectedApplication.status
                  )}`}
                >
                  {selectedApplication.status}
                </strong>
              </div>

              <div>
                <span>Application Round</span>
                <strong>
                  {selectedApplication.round ||
                    "Application Submitted"}
                </strong>
              </div>

              <div>
                <span>Applied Date</span>
                <strong>
                  {selectedApplication.appliedDate ||
                    "Not specified"}
                </strong>
              </div>

            </div>


            {/* UPDATE STATUS */}

            <div className="status-update-section">

              <h3>Update Application Status</h3>

              <div className="status-buttons">

                <button
                  className="status-applied"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedApplication.id,
                      "Applied"
                    )
                  }
                >
                  Applied
                </button>

                <button
                  className="status-shortlisted"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedApplication.id,
                      "Shortlisted"
                    )
                  }
                >
                  Shortlisted
                </button>

                <button
                  className="status-interview"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedApplication.id,
                      "Interview"
                    )
                  }
                >
                  Interview
                </button>

                <button
                  className="status-selected"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedApplication.id,
                      "Selected"
                    )
                  }
                >
                  Selected
                </button>

                <button
                  className="status-rejected"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedApplication.id,
                      "Rejected"
                    )
                  }
                >
                  Rejected
                </button>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="application-detail-actions">

              <button
                className="delete-application-btn"
                onClick={() =>
                  handleDeleteApplication(
                    selectedApplication.id
                  )
                }
              >
                Delete Application
              </button>

              <button
                className="close-application-btn"
                onClick={() =>
                  setSelectedApplication(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Applications;