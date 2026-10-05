import { useEffect, useState } from "react";
import "./Profile.css";

function Profile({ goDashboard }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    department: "",
    year: "",
    college: "",
    skills: "",
    github: "",
    linkedin: "",
    projects: "",
    certifications: ""
  });

  const [resume, setResume] = useState(() => {
    return localStorage.getItem("careerTrackResume") || "";
  });

  /* =========================
     LOAD PROFILE FROM BACKEND
  ========================== */

  useEffect(() => {
    const userId = localStorage.getItem("careerTrackUserId");

    if (!userId) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/student-profile/${userId}`
        );

        const text = await response.text();

        let data;

        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error("PROFILE LOAD RESPONSE:", text);
          throw new Error("Backend returned an invalid response.");
        }

        if (data) {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            department: data.department || "",
            year: data.year || "",
            college: data.college || "",
            skills: Array.isArray(data.skills)
              ? data.skills.join(", ")
              : data.skills || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            projects: data.projects || "",
            certifications: data.certifications || ""
          });

          if (data.resume) {
            setResume(data.resume);
            localStorage.setItem("careerTrackResume", data.resume);
          }
        }
      } catch (error) {
        console.error("PROFILE LOAD ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================== */

  const handleChange = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  /* =========================
     SAVE PROFILE TO MONGODB
  ========================== */

  const saveProfile = async () => {
    const userId = localStorage.getItem("careerTrackUserId");

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/student-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            department: profile.department,
            year: profile.year,
            college: profile.college,

            skills: profile.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill !== ""),

            github: profile.github,
            linkedin: profile.linkedin,
            projects: profile.projects,
            certifications: profile.certifications,
            resume: resume
          })
        }
      );

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error("SERVER RESPONSE:", responseText);

        alert(
          "Backend returned an invalid response. Check that the backend is running on port 5000."
        );

        return;
      }

      console.log("PROFILE SAVE STATUS:", response.status);
      console.log("PROFILE SAVE RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Profile update failed.");
        return;
      }

      setEditing(false);

      alert("Profile saved successfully!");

    } catch (error) {
      console.error("PROFILE SAVE ERROR:", error);

      alert(
        "Backend connection failed. Please make sure the backend is running on port 5000."
      );
    }
  };

  /* =========================
     RESUME UPLOAD
  ========================== */

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC or DOCX file.");
      return;
    }

    setResume(file.name);

    localStorage.setItem("careerTrackResume", file.name);

    alert("Resume uploaded successfully!");
  };

  /* =========================
     REMOVE RESUME
  ========================== */

  const removeResume = () => {
    setResume("");

    localStorage.removeItem("careerTrackResume");
  };

  /* =========================
     PROFILE COMPLETION
  ========================== */

  const fields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.location,
    profile.department,
    profile.year,
    profile.college,
    profile.skills,
    profile.github,
    profile.linkedin,
    profile.projects,
    profile.certifications,
    resume
  ];

  const completedFields = fields.filter(
    (field) => field && field.toString().trim() !== ""
  ).length;

  const profileCompletion = Math.round(
    (completedFields / fields.length) * 100
  );

  /* =========================
     LOADING SCREEN
  ========================== */

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-topbar">
          <button onClick={goDashboard}>
            ← Back to Dashboard
          </button>
        </div>

        <div className="profile-loading">
          <h2>Loading Profile...</h2>
          <p>Please wait while we load your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* TOP BAR */}

      <div className="profile-topbar">
        <button onClick={goDashboard}>
          ← Back to Dashboard
        </button>
      </div>

      {/* HEADER */}

      <div className="profile-header">
        <div>
          <h1>My Profile 👤</h1>

          <p>
            Manage your personal information, education,
            skills and career details.
          </p>
        </div>

        <div className="profile-percentage">
          <strong>{profileCompletion}%</strong>
          <span>Profile Complete</span>
        </div>
      </div>

      {/* PROFILE PROGRESS */}

      <div className="profile-progress-section">

        <div className="progress-header">
          <span>Profile Completion</span>
          <strong>{profileCompletion}%</strong>
        </div>

        <div className="profile-progress-bar">
          <div
            className="profile-progress-fill"
            style={{
              width: `${profileCompletion}%`
            }}
          ></div>
        </div>

        <p>
          Complete your profile to improve your placement readiness.
        </p>

      </div>

      {/* PERSONAL INFORMATION */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Personal Information</h2>
            <p>Your basic personal details</p>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>

        </div>

        <div className="profile-grid">

          <div className="profile-field">
            <label>Full Name</label>

            {editing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            ) : (
              <p>{profile.name || "Not added"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>

            {editing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
              />
            ) : (
              <p>{profile.email || "Not added"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Phone</label>

            {editing ? (
              <input
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
              />
            ) : (
              <p>{profile.phone || "Not added"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Location</label>

            {editing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
              />
            ) : (
              <p>{profile.location || "Not added"}</p>
            )}
          </div>

        </div>
      </div>

      {/* EDUCATION */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Education</h2>
            <p>Your academic information</p>
          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-field">
            <label>College</label>

            {editing ? (
              <input
                type="text"
                value={profile.college}
                onChange={(e) =>
                  handleChange("college", e.target.value)
                }
              />
            ) : (
              <p>{profile.college || "Not added"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Department</label>

            {editing ? (
              <input
                type="text"
                value={profile.department}
                onChange={(e) =>
                  handleChange("department", e.target.value)
                }
              />
            ) : (
              <p>{profile.department || "Not added"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Year</label>

            {editing ? (
              <input
                type="text"
                value={profile.year}
                onChange={(e) =>
                  handleChange("year", e.target.value)
                }
              />
            ) : (
              <p>{profile.year || "Not added"}</p>
            )}
          </div>

        </div>
      </div>

      {/* SKILLS */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Skills</h2>
            <p>Technical skills and programming knowledge</p>
          </div>

        </div>

        <div className="profile-field full-width">

          <label>Technical Skills</label>

          {editing ? (
            <textarea
              value={profile.skills}
              onChange={(e) =>
                handleChange("skills", e.target.value)
              }
              placeholder="Example: Java, Python, DSA, React, SQL"
            />
          ) : (
            <div className="skills-display">

              {profile.skills ? (
                profile.skills.split(",").map((skill, index) => (
                  <span key={index}>
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p>Not added</p>
              )}

            </div>
          )}

        </div>
      </div>

      {/* PROFESSIONAL LINKS */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Professional Links</h2>
            <p>Connect your professional profiles</p>
          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-field">

            <label>GitHub</label>

            {editing ? (
              <input
                type="text"
                value={profile.github}
                onChange={(e) =>
                  handleChange("github", e.target.value)
                }
                placeholder="GitHub link (optional)"
              />
            ) : (
              <p>{profile.github || "Not added"}</p>
            )}

          </div>

          <div className="profile-field">

            <label>LinkedIn</label>

            {editing ? (
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) =>
                  handleChange("linkedin", e.target.value)
                }
                placeholder="LinkedIn link"
              />
            ) : (
              <p>{profile.linkedin || "Not added"}</p>
            )}

          </div>

        </div>
      </div>

      {/* PROJECTS */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Projects</h2>
            <p>
              Projects you have completed or are working on
            </p>
          </div>

        </div>

        <div className="profile-field full-width">

          <label>Project Details</label>

          {editing ? (
            <textarea
              value={profile.projects}
              onChange={(e) =>
                handleChange("projects", e.target.value)
              }
              placeholder="Example: CareerTrack - Full Stack Placement Management Platform"
            />
          ) : (
            <p>
              {profile.projects || "No projects added yet."}
            </p>
          )}

        </div>
      </div>

      {/* CERTIFICATIONS */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Certifications</h2>
            <p>
              Professional certificates and achievements
            </p>
          </div>

        </div>

        <div className="profile-field full-width">

          <label>Certifications</label>

          {editing ? (
            <textarea
              value={profile.certifications}
              onChange={(e) =>
                handleChange(
                  "certifications",
                  e.target.value
                )
              }
              placeholder="Example: Google Cloud, NPTEL, MERN Stack Internship"
            />
          ) : (
            <p>
              {profile.certifications ||
                "No certifications added yet."}
            </p>
          )}

        </div>
      </div>

      {/* RESUME */}

      <div className="profile-section">

        <div className="section-header">

          <div>
            <h2>Resume</h2>
            <p>Upload your latest resume</p>
          </div>

        </div>

        <div className="resume-section">

          {resume ? (
            <div className="resume-card">

              <div>
                <strong>📄 {resume}</strong>
                <p>Resume uploaded</p>
              </div>

              <button onClick={removeResume}>
                Remove
              </button>

            </div>
          ) : (
            <div className="resume-upload">

              <label htmlFor="resume-upload">
                📤 Upload Resume
              </label>

              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResume}
              />

              <p>
                Accepted formats: PDF, DOC, DOCX
              </p>

            </div>
          )}

        </div>
      </div>

      {/* SAVE BUTTON */}

      {editing && (
        <div className="profile-save-section">

          <button
            className="save-profile-btn"
            onClick={saveProfile}
          >
            Save Profile
          </button>

        </div>
      )}

    </div>
  );
}

export default Profile;