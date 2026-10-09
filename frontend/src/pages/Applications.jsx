import { useEffect, useState, useCallback } from "react";
import "./Applications.css";

const API_URL = "https://careertrack-1rj8.onrender.com/api/applications";
const STATUSES = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const EMPTY_FORM = {
  company: "",
  role: "",
  location: "",
  appliedDate: "",
  status: "Applied",
  notes: "",
};

function Applications({ selectedCompany, goDashboard }) {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("careerTrackToken");
  const userId = localStorage.getItem("careerTrackUserId");

  const getHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        localStorage.getItem("careerTrackToken") || ""
      }`,
    }),
    []
  );

  // Fetch applications from backend
  const fetchApplications = useCallback(async () => {
    const currentToken = localStorage.getItem("careerTrackToken");
    const currentUserId = localStorage.getItem("careerTrackUserId");

    if (!currentToken || !currentUserId) {
      setError("Your session is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${encodeURIComponent(currentUserId)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setError(
          data.message || "Your session expired. Please log in again."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load applications."
        );
      }

      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch applications error:", err);

      setError(
        err.message ||
          "Cannot connect to the backend. Check whether the server is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Receive company details from Companies page
  useEffect(() => {
    if (!selectedCompany) return;

    setForm({
      ...EMPTY_FORM,
      company: selectedCompany.name || "",
      role: selectedCompany.role || "",
      location: selectedCompany.location || "",
      appliedDate: new Date().toLocaleDateString("en-CA"),
      status: "Applied",
      notes: "",
    });

    setError("");
  }, [selectedCompany]);

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add application to database
  const handleAddApplication = async (event) => {
    event.preventDefault();

    const currentToken = localStorage.getItem("careerTrackToken");
    const currentUserId = localStorage.getItem("careerTrackUserId");

    if (!currentToken || !currentUserId) {
      setError("Please log in again before adding an application.");
      return;
    }

    if (!form.company.trim()) {
      setError("Please enter the company name.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          ...form,
          company: form.company.trim(),
          role: form.role.trim(),
          location: form.location.trim(),
          notes: form.notes.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add application."
        );
      }

      const newApplication = data.application || data;

      if (!newApplication?._id) {
        await fetchApplications();
      } else {
        setApplications((previous) => [
          newApplication,
          ...previous,
        ]);
      }

      setForm(EMPTY_FORM);
    } catch (err) {
      console.error("Add application error:", err);
      setError(err.message || "Unable to add application.");
    } finally {
      setSubmitting(false);
    }
  };

  // Update application status
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${applicationId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update application status."
        );
      }

      const updatedApplication = data.application || data;

      setApplications((previous) =>
        previous.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                ...updatedApplication,
                status: newStatus,
              }
            : application
        )
      );
    } catch (err) {
      console.error("Update application error:", err);
      setError(err.message || "Unable to update status.");
      await fetchApplications();
    }
  };

  // Delete application
  const handleDeleteApplication = async (applicationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/${applicationId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete application."
        );
      }

      setApplications((previous) =>
        previous.filter(
          (application) => application._id !== applicationId
        )
      );
    } catch (err) {
      console.error("Delete application error:", err);
      setError(err.message || "Unable to delete application.");
    }
  };

  // Search applications
  const filteredApplications = applications.filter((application) => {
    const query = search.trim().toLowerCase();

    return [
      application.company,
      application.role,
      application.location,
      application.status,
    ].some((value) =>
      value?.toLowerCase().includes(query)
    );
  });

  const countStatus = (status) =>
    applications.filter(
      (application) => application.status === status
    ).length;

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const goToDashboard = () => {
    if (goDashboard) {
      goDashboard();
    }
  };

  if (loading) {
    return (
      <main className="applications-page">
        <div className="applications-loading">
          <div className="applications-spinner" />
          <h2>Loading your applications...</h2>
          <p>Please wait a moment.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="applications-page">
      <div className="applications-container">
        <button
          type="button"
          className="back-dashboard-btn"
          onClick={goToDashboard}
        >
          <span aria-hidden="true">←</span> Back to Dashboard
        </button>

        <header className="applications-hero">
          <div>
            <span className="applications-eyebrow">
              CAREERTRACK · CAREER HUB
            </span>

            <h1>My Applications</h1>

            <p>
              Track your job applications and stay on top of your career goals.
            </p>
          </div>

          <div className="hero-icon" aria-hidden="true">
            📋
          </div>
        </header>

        {error && (
          <div className="applications-alert" role="alert">
            <span>{error}</span>

            <div className="alert-actions">
              <button type="button" onClick={fetchApplications}>
                Retry
              </button>

              {(!token || !userId) && (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Go to Login
                </button>
              )}
            </div>
          </div>
        )}

        <section
          className="application-stats"
          aria-label="Application statistics"
        >
          <div className="stat-card stat-total">
            <span className="stat-icon">📁</span>
            <p>Total Applications</p>
            <strong>{applications.length}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-icon">📨</span>
            <p>Applied</p>
            <strong>{countStatus("Applied")}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <p>Shortlisted</p>
            <strong>{countStatus("Shortlisted")}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🎤</span>
            <p>Interviews</p>
            <strong>{countStatus("Interview")}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🎉</span>
            <p>Selected</p>
            <strong>{countStatus("Selected")}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-icon">↩️</span>
            <p>Rejected</p>
            <strong>{countStatus("Rejected")}</strong>
          </div>
        </section>
        <section className="application-panel">
          <div className="panel-heading">
            <div>
              <span className="section-label">NEW ENTRY</span>
              <h2>Add Application</h2>
              <p>Record the details of a job you applied for.</p>
            </div>

            <span className="panel-heading-icon" aria-hidden="true">
              ＋
            </span>
          </div>

          <form
            className="application-form"
            onSubmit={handleAddApplication}
          >
            <label>
              Company Name <span className="required">*</span>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. TCS, Zoho, Infosys"
                required
              />
            </label>

            <label>
              Job Role
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Software Developer"
              />
            </label>

            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Chennai / Remote"
              />
            </label>

            <label>
              Applied Date
              <input
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Application Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="notes-field">
              Notes
              <input
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Recruiter details, next steps, etc."
              />
            </label>

            <div className="form-actions">
              <button
                className="primary-btn"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "+ Add Application"}
              </button>

              <button
                className="secondary-btn"
                type="button"
                onClick={() => setForm(EMPTY_FORM)}
              >
                Clear Form
              </button>
            </div>
          </form>
        </section>

        <section className="application-panel history-panel">
          <div className="panel-heading history-heading">
            <div>
              <span className="section-label">YOUR PROGRESS</span>
              <h2>Application History</h2>
              <p>Review, search, and update your applications.</p>
            </div>

            <span className="history-count">
              {filteredApplications.length}{" "}
              {filteredApplications.length === 1 ? "record" : "records"}
            </span>
          </div>

          <div className="application-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company, role, location or status..."
              aria-label="Search applications"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>

          {filteredApplications.length === 0 ? (
            <div className="applications-empty">
              <span aria-hidden="true">📂</span>

              <h3>
                {search
                  ? "No matching applications"
                  : "No applications yet"}
              </h3>

              <p>
                {search
                  ? "Try a different company name, role, location or status."
                  : "Add your first application using the form above."}
              </p>
            </div>
          ) : (
            <div className="application-list">
              {filteredApplications.map((application) => (
                <article
                  className="application-card"
                  key={application._id}
                >
                  <div className="application-card-main">
                    <div className="company-avatar" aria-hidden="true">
                      {(application.company || "C")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="application-info">
                      <h3>{application.company}</h3>

                      <p className="application-role">
                        {application.role || "Role not specified"}
                      </p>

                      <div className="application-meta">
                        <span>
                          📍{" "}
                          {application.location ||
                            "Location not specified"}
                        </span>

                        <span>
                          📅 {formatDate(application.appliedDate)}
                        </span>
                      </div>

                      {application.notes && (
                        <p className="application-notes">
                          <strong>Notes:</strong> {application.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="application-card-actions">
                    <label>
                      <span>Status</span>

                      <select
                        value={application.status || "Applied"}
                        onChange={(event) =>
                          handleStatusChange(
                            application._id,
                            event.target.value
                          )
                        }
                        aria-label={`Update status for ${application.company}`}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteApplication(application._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="applications-footer">
          <span>CareerTrack</span>
          <span>One step closer to your career goal.</span>
        </footer>
      </div>
    </main>
  );
}

export default Applications;