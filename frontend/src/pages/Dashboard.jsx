import { useEffect, useState } from "react";
import "./Dashboard.css";
function Dashboard({
  goProfile,
  goCompanies,
  goApplications,
  goPreparation,
  goHome
}) {

  // ==========================================
  // PREPARATION PROGRESS STATE
  // ==========================================

  const [preparationProgress, setPreparationProgress] =
    useState({
      Aptitude: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      Java: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      DSA: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      Python: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      SQL: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      OS: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      CN: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      Coding: {
        attempted: 0,
        correct: 0,
        wrong: 0
      },
      Interview: {
        attempted: 0,
        correct: 0,
        wrong: 0
      }
    });

  // ==========================================
  // APPLICATIONS
  // ==========================================

  const [applications, setApplications] =
    useState([]);

  // ==========================================
  // PROFILE
  // ==========================================

  const [profile, setProfile] =
    useState(null);

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {

    const loadDashboardData = async () => {

      try {

        const userId =
          localStorage.getItem(
            "careerTrackUserId"
          );

        if (!userId) {

          console.error(
            "CareerTrack user ID not found"
          );

          setLoading(false);

          return;
        }


        // ======================================
        // LOAD PREPARATION PROGRESS
        // ======================================

        try {

          const response =
            await fetch(
              `http://127.0.0.1:5000/api/preparation/progress/${userId}`
            );

          if (response.ok) {

            const data =
              await response.json();

            if (
              data &&
              data.progress
            ) {

              setPreparationProgress(
                (previous) => ({
                  ...previous,
                  ...data.progress
                })
              );

            }

          }

        } catch (error) {

          console.error(
            "Preparation progress error:",
            error
          );

        }


        // ======================================
        // LOAD APPLICATIONS
        // ======================================

        try {

          const response =
            await fetch(
              `http://127.0.0.1:5000/api/applications/${userId}`
            );

          if (response.ok) {

            const data =
              await response.json();

            if (
              Array.isArray(data)
            ) {

              setApplications(data);

            } else {

              setApplications([]);

            }

          }

        } catch (error) {

          console.error(
            "Applications loading error:",
            error
          );

          setApplications([]);

        }


        // ======================================
        // LOAD PROFILE
        // ======================================

        try {

          const response =
            await fetch(
              `http://127.0.0.1:5000/api/student-profile/${userId}`
            );

          if (response.ok) {

            const data =
              await response.json();

            if (data) {

              setProfile(data);

            } else {

              setProfile(null);

            }

          }

        } catch (error) {

          console.error(
            "Profile loading error:",
            error
          );

          setProfile(null);

        }

      } catch (error) {

        console.error(
          "Dashboard loading error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboardData();

  }, []);


  // ==========================================
  // PART 2 STARTS HERE
  // ==========================================
  // ==========================================
  // TOPIC PROGRESS
  // ==========================================

  const TOTAL_QUESTIONS_PER_TOPIC = 50;


  const getTopicProgress = (topic) => {

    const attempted =
      preparationProgress[topic]?.attempted || 0;

    return Math.min(
      Math.round(
        (attempted / TOTAL_QUESTIONS_PER_TOPIC) * 100
      ),
      100
    );

  };


  // ==========================================
  // OVERALL PREPARATION PROGRESS
  // ==========================================

  const calculateOverallProgress = () => {

    const topics = [
      "Aptitude",
      "Java",
      "DSA",
      "Python",
      "SQL",
      "OS",
      "CN",
      "Coding",
      "Interview"
    ];

    let totalAttempted = 0;
    let totalQuestions = 0;


    topics.forEach((topic) => {

      totalAttempted +=
        preparationProgress[topic]?.attempted || 0;

      totalQuestions +=
        TOTAL_QUESTIONS_PER_TOPIC;

    });


    if (totalQuestions === 0) {
      return 0;
    }


    return Math.min(
      Math.round(
        (totalAttempted / totalQuestions) * 100
      ),
      100
    );

  };


  const overallPreparation =
    calculateOverallProgress();


  // ==========================================
  // APPLICATION STATISTICS
  // ==========================================

  const totalApplications =
    applications.length;


  const appliedApplications =
    applications.filter(
      (application) =>
        application.status === "Applied"
    ).length;


  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status === "Shortlisted"
    ).length;


  const interviewApplications =
    applications.filter(
      (application) =>
        application.status === "Interview"
    ).length;


  const selectedApplications =
    applications.filter(
      (application) =>
        application.status === "Selected"
    ).length;


  const rejectedApplications =
    applications.filter(
      (application) =>
        application.status === "Rejected"
    ).length;


  // ==========================================
  // PROFILE COMPLETION
  // ==========================================

  const calculateProfileCompletion = () => {

    if (!profile) {
      return 0;
    }


    const fields = [

      profile.name,

      profile.email,

      profile.phone,

      profile.location,

      profile.department,

      profile.year,

      profile.college,

      profile.skills &&
      profile.skills.length > 0
        ? "completed"
        : "",

      profile.github,

      profile.linkedin,

      profile.projects,

      profile.certifications,

      profile.resume

    ];


    const completedFields =
      fields.filter(
        (field) =>
          field !== undefined &&
          field !== null &&
          String(field).trim() !== ""
      ).length;


    return Math.round(
      (completedFields / fields.length) * 100
    );

  };


  const profileCompletion =
    calculateProfileCompletion();


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="dashboard">

        <div className="dashboard-header">

          <div>

            <h1>
              Loading CareerTrack...
            </h1>

            <p>
              Preparing your dashboard.
            </p>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // DASHBOARD UI START
  // ==========================================

  return (

    <div className="dashboard">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome to CareerTrack 👋
          </h1>

          <p>
            Your personal placement and
            career management platform.
          </p>

        </div>


        <button
          className="logout-btn"
          onClick={goHome}
        >
          Logout
        </button>

      </div>


      {/* =====================================
          QUICK STATS
      ===================================== */}

      <div className="stats-container">


        {/* COMPANIES */}

        <div className="stat-card">

          <h3>
            🏢
          </h3>

          <h2>
            30+
          </h2>

          <p>
            Companies
          </p>

          <span>
            Available opportunities
          </span>

        </div>


        {/* APPLICATIONS */}

        <div className="stat-card">

          <h3>
            📝
          </h3>

          <h2>
            {totalApplications}
          </h2>

          <p>
            Applications
          </p>

          <span>
            Your tracked applications
          </span>

        </div>


        {/* SHORTLISTED */}

        <div className="stat-card">

          <h3>
            🎯
          </h3>

          <h2>
            {shortlistedApplications}
          </h2>

          <p>
            Shortlisted
          </p>

          <span>
            Active opportunities
          </span>

        </div>


        {/* PREPARATION */}

        <div className="stat-card">

          <h3>
            📚
          </h3>

          <h2>
            {overallPreparation}%
          </h2>

          <p>
            Preparation
          </p>

          <span>
            Overall progress
          </span>

        </div>

      </div>


      {/* =====================================
          MAIN CAREER CARDS
      ===================================== */}

      <div className="dashboard-cards">


        {/* PROFILE */}

        <div className="dashboard-card">

          <div className="card-icon">
            👤
          </div>

          <h2>
            My Profile
          </h2>

          <p>
            Manage your education, skills,
            projects, certifications and resume.
          </p>


          <div className="mini-progress">

            <div
              className="mini-progress-bar"
              style={{
                width:
                  `${profileCompletion}%`
              }}
            ></div>

          </div>


          <span className="progress-text">
            Profile Completion:{" "}
            {profileCompletion}%
          </span>


          <button
            onClick={goProfile}
          >
            View Profile
          </button>

        </div>


        {/* COMPANIES */}

        {/* COMPANIES */}

<div className="dashboard-card">

  <div className="card-icon">
    🏢
  </div>

  <h2>
    Companies
  </h2>

  <p>
    Explore companies, job roles,
    eligibility, packages and
    placement opportunities.
  </p>

  <div
    style={{
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "18px",
      marginBottom: "12px"
    }}
  >

    <button
      type="button"
      onClick={goCompanies}
      style={{
        width: "auto",
        minWidth: "120px",
        margin: "0",
        padding: "10px 18px",
        borderRadius: "10px"
      }}
    >
      🔎 Search
    </button>

    <button
      type="button"
      onClick={goCompanies}
      style={{
        width: "auto",
        minWidth: "120px",
        margin: "0",
        padding: "10px 18px",
        borderRadius: "10px"
      }}
    >
      🎯 Filter
    </button>

  </div>

      <button
        type="button"
        onClick={goCompanies}
        style={{
        width: "100%",
        margin: "0",
        padding: "12px 18px",
        borderRadius: "10px"
        }}
        >
        Explore Companies →
      </button>

       </div>
        {/* APPLICATIONS */}

        <div className="dashboard-card">

          <div className="card-icon">
            📝
          </div>

          <h2>
            Applications
          </h2>

          <p>
            Track your applications from
            Applied to Interview and Selection.
          </p>


          <div className="application-status">

            <span>
              Applied
            </span>

            <span>
              →
            </span>

            <span>
              Interview
            </span>

            <span>
              →
            </span>

            <span>
              Selected
            </span>

          </div>


          <button
            onClick={goApplications}
          >
            Track Applications
          </button>

        </div>


        {/* PREPARATION */}

        <div className="dashboard-card">

          <div className="card-icon">
            📚
          </div>

          <h2>
            Placement Preparation
          </h2>

          <p>
            Practice aptitude, Java, DSA,
            SQL, technical and interview
            questions.
          </p>


          <div className="mini-progress">

            <div
              className="mini-progress-bar"
              style={{
                width:
                  `${overallPreparation}%`
              }}
            ></div>

          </div>


          <span className="progress-text">
            Preparation:{" "}
            {overallPreparation}%
          </span>


          <button
            onClick={goPreparation}
          >
            Start Preparation
          </button>

        </div>

      </div>


      {/* =====================================
          PART 3 CONTINUES
      ===================================== */}
      {/* =====================================
          PREPARATION PROGRESS
      ===================================== */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>
              Preparation Progress
            </h2>

            <p>
              Track your placement preparation
              topic by topic.
            </p>

          </div>


          <button
            onClick={goPreparation}
          >
            Practice Questions
          </button>

        </div>


        <div className="progress-grid">


          {/* JAVA */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                ☕ Java
              </span>

              <strong>
                {getTopicProgress("Java")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("Java")}%`
                }}
              ></div>

            </div>

          </div>


          {/* DSA */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                🧠 DSA
              </span>

              <strong>
                {getTopicProgress("DSA")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("DSA")}%`
                }}
              ></div>

            </div>

          </div>


          {/* APTITUDE */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                🔢 Aptitude
              </span>

              <strong>
                {getTopicProgress("Aptitude")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("Aptitude")}%`
                }}
              ></div>

            </div>

          </div>


          {/* PYTHON */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                🐍 Python
              </span>

              <strong>
                {getTopicProgress("Python")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("Python")}%`
                }}
              ></div>

            </div>

          </div>


          {/* SQL */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                🗄️ SQL
              </span>

              <strong>
                {getTopicProgress("SQL")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("SQL")}%`
                }}
              ></div>

            </div>

          </div>


          {/* OS */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                💻 OS
              </span>

              <strong>
                {getTopicProgress("OS")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("OS")}%`
                }}
              ></div>

            </div>

          </div>


          {/* CN */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                🌐 CN
              </span>

              <strong>
                {getTopicProgress("CN")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("CN")}%`
                }}
              ></div>

            </div>

          </div>


          {/* CODING */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                👨‍💻 Coding
              </span>

              <strong>
                {getTopicProgress("Coding")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("Coding")}%`
                }}
              ></div>

            </div>

          </div>


          {/* INTERVIEW */}

          <div className="progress-item">

            <div className="progress-item-header">

              <span>
                🎤 Interview
              </span>

              <strong>
                {getTopicProgress("Interview")}%
              </strong>

            </div>


            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${getTopicProgress("Interview")}%`
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          APPLICATION OVERVIEW
      ===================================== */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>
              Application Overview
            </h2>

            <p>
              Monitor the current status
              of your applications.
            </p>

          </div>


          <button
            onClick={goApplications}
          >
            View Applications
          </button>

        </div>


        <div className="application-overview">


          {/* TOTAL */}

          <div className="overview-card">

            <div className="overview-icon">
              📋
            </div>

            <div>

              <h3>
                {totalApplications}
              </h3>

              <p>
                Total Applications
              </p>

            </div>

          </div>


          {/* APPLIED */}

          <div className="overview-card">

            <div className="overview-icon">
              📤
            </div>

            <div>

              <h3>
                {appliedApplications}
              </h3>

              <p>
                Applied
              </p>

            </div>

          </div>


          {/* SHORTLISTED */}

          <div className="overview-card">

            <div className="overview-icon">
              ⭐
            </div>

            <div>

              <h3>
                {shortlistedApplications}
              </h3>

              <p>
                Shortlisted
              </p>

            </div>

          </div>


          {/* INTERVIEW */}

          <div className="overview-card">

            <div className="overview-icon">
              🎤
            </div>

            <div>

              <h3>
                {interviewApplications}
              </h3>

              <p>
                Interview
              </p>

            </div>

          </div>


          {/* SELECTED */}

          <div className="overview-card">

            <div className="overview-icon">
              🎉
            </div>

            <div>

              <h3>
                {selectedApplications}
              </h3>

              <p>
                Selected
              </p>

            </div>

          </div>


          {/* REJECTED */}

          <div className="overview-card">

            <div className="overview-icon">
              ❌
            </div>

            <div>

              <h3>
                {rejectedApplications}
              </h3>

              <p>
                Rejected
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          RECENT ACTIVITY
      ===================================== */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>
              Recent Activity
            </h2>

            <p>
              Keep track of your recent
              career activities.
            </p>

          </div>

        </div>


        <div className="activity-list">


          {/* PREPARATION */}

          <div className="activity-item">

            <div className="activity-icon">
              📚
            </div>

            <div>

              <h4>
                Placement Preparation
              </h4>

              <p>
                Continue practicing Java,
                DSA, Aptitude, Coding and
                Interview questions.
              </p>

            </div>

          </div>


          {/* COMPANIES */}

          <div className="activity-item">

            <div className="activity-icon">
              🏢
            </div>

            <div>

              <h4>
                Explore Companies
              </h4>

              <p>
                Check available companies
                and explore their official
                career pages.
              </p>

            </div>

          </div>


          {/* APPLICATIONS */}

          <div className="activity-item">

            <div className="activity-icon">
              📝
            </div>

            <div>

              <h4>
                Track Applications
              </h4>

              <p>
                Keep your application status
                updated from Applied to Selected.
              </p>

            </div>

          </div>


          {/* PROFILE */}

          <div className="activity-item">

            <div className="activity-icon">
              👤
            </div>

            <div>

              <h4>
                Complete Your Profile
              </h4>

              <p>
                Add your skills, projects,
                certifications, GitHub and LinkedIn.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>
              Quick Actions
            </h2>

            <p>
              Quickly access the important
              sections of CareerTrack.
            </p>

          </div>

        </div>


        <div className="quick-actions">


          {/* PROFILE */}

          <button
            className="quick-action"
            onClick={goProfile}
          >

            <span className="quick-action-icon">
              👤
            </span>

            <span>
              Update Profile
            </span>

          </button>


          {/* COMPANIES */}

          <button
            className="quick-action"
            onClick={goCompanies}
          >

            <span className="quick-action-icon">
              🏢
            </span>

            <span>
              Explore Companies
            </span>

          </button>


          {/* APPLICATIONS */}

          <button
            className="quick-action"
            onClick={goApplications}
          >

            <span className="quick-action-icon">
              📝
            </span>

            <span>
              Track Applications
            </span>

          </button>


          {/* PREPARATION */}

          <button
            className="quick-action"
            onClick={goPreparation}
          >

            <span className="quick-action-icon">
              📚
            </span>

            <span>
              Practice Questions
            </span>

          </button>

        </div>

      </div>


    </div>

  );

}

export default Dashboard;