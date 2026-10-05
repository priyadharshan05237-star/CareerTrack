import { useMemo, useState } from "react";
import "./Companies.css";

function Companies({ goDashboard, goApplications }) {

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [savedCompanies, setSavedCompanies] = useState([]);

  const companies = [
    {
      name: "TCS",
      role: "Software Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, DSA, SQL",
      process: "Online Test → Technical → HR",
      careers: "https://www.tcs.com/careers/india"
    },
    {
      name: "Infosys",
      role: "Systems Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL, DSA",
      process: "Assessment → Technical → HR",
      careers: "https://www.infosys.com/careers/apply.html"
    },
    {
      name: "Accenture",
      role: "Associate Software Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "JavaScript, Java, SQL",
      process: "Assessment → Interview",
      careers: "https://www.accenture.com/in-en/careers/jobsearch"
    },
    {
      name: "Wipro",
      role: "Project Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL, Cloud",
      process: "Assessment → Technical → HR",
      careers: "https://careers.wipro.com/"
    },
    {
      name: "Cognizant",
      role: "Programmer Analyst",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, Python",
      process: "Assessment → Technical → HR",
      careers: "https://careers.cognizant.com/"
    },
    {
      name: "Capgemini",
      role: "Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, DSA",
      process: "Assessment → Technical → HR",
      careers: "https://www.capgemini.com/in-en/careers/"
    },
    {
      name: "HCLTech",
      role: "Graduate Engineer Trainee",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, C++, SQL, DSA",
      process: "Assessment → Technical → HR",
      careers: "https://www.hcltech.com/careers"
    },
    {
      name: "Tech Mahindra",
      role: "Software Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL",
      process: "Assessment → Technical → HR",
      careers: "https://careers.techmahindra.com/"
    },
    {
      name: "IBM",
      role: "Software Developer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, Cloud, SQL",
      process: "Online Assessment → Interview",
      careers: "https://www.ibm.com/careers"
    },
    {
      name: "Amazon",
      role: "Software Development Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, DSA, Algorithms, SQL",
      process: "Online Assessment → Technical Interviews",
      careers: "https://www.amazon.jobs/"
    },
    {
      name: "Microsoft",
      role: "Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "DSA, Java, C++, Problem Solving",
      process: "Assessment → Technical Interviews",
      careers: "https://careers.microsoft.com/"
    },
    {
      name: "Google",
      role: "Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "DSA, Algorithms, Java, Python",
      process: "Assessment → Technical Interviews",
      careers: "https://careers.google.com/"
    },
    {
      name: "Oracle",
      role: "Associate Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, Cloud, DSA",
      process: "Assessment → Technical → HR",
      careers: "https://www.oracle.com/careers/"
    },
    {
      name: "Deloitte",
      role: "Analyst",
      location: "Hyderabad",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "SQL, Python, Java, Communication",
      process: "Assessment → Interview",
      careers: "https://jobs.deloitte.com/"
    },
    {
      name: "EY",
      role: "Technology Analyst",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, Cloud, Communication",
      process: "Assessment → Technical → HR",
      careers: "https://careers.ey.com/"
    },
    {
      name: "KPMG",
      role: "Technology Analyst",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "SQL, Python, Java, Analytics",
      process: "Assessment → Interview",
      careers: "https://kpmg.com/in/en/home/careers.html"
    },
    {
      name: "PwC",
      role: "Associate Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL, Cloud",
      process: "Assessment → Technical → HR",
      careers: "https://www.pwc.in/careers.html"
    },
    {
      name: "Zoho",
      role: "Software Developer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, C++, DSA, Problem Solving",
      process: "Written Test → Programming → Interview",
      careers: "https://www.zoho.com/careers/"
    },
    {
      name: "Freshworks",
      role: "Software Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "JavaScript, React, Node.js, SQL",
      process: "Assessment → Technical → HR",
      careers: "https://www.freshworks.com/company/careers/"
    },
    {
      name: "Mphasis",
      role: "Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, Python",
      process: "Assessment → Technical → HR",
      careers: "https://careers.mphasis.com/"
    },
    {
      name: "LTIMindtree",
      role: "Graduate Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL",
      process: "Assessment → Technical → HR",
      careers: "https://www.ltimindtree.com/careers/"
    },
    {
      name: "Hexaware",
      role: "Trainee Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL, Testing",
      process: "Assessment → Technical → HR",
      careers: "https://hexaware.com/careers/"
    },
    {
      name: "Coforge",
      role: "Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, Cloud",
      process: "Assessment → Technical → HR",
      careers: "https://www.coforge.com/careers"
    },
    {
      name: "Persistent Systems",
      role: "Software Engineer",
      location: "Pune",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, DSA, SQL",
      process: "Assessment → Technical → HR",
      careers: "https://www.persistent.com/careers/"
    },
    {
      name: "UST",
      role: "Software Developer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL, Cloud",
      process: "Assessment → Technical → HR",
      careers: "https://www.ust.com/en/careers"
    },
    {
      name: "Virtusa",
      role: "Associate Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, SQL, JavaScript",
      process: "Assessment → Technical → HR",
      careers: "https://www.virtusa.com/careers"
    },
    {
      name: "Mouritech",
      role: "Software Engineer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, React, SQL",
      process: "Assessment → Technical → HR",
      careers: "https://www.mouritech.com/careers/"
    },
    {
      name: "CitiusTech",
      role: "Software Engineer",
      location: "Bangalore",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, SQL",
      process: "Assessment → Technical → HR",
      careers: "https://www.citiustech.com/careers/"
    },
    {
      name: "Thoughtworks",
      role: "Application Developer",
      location: "Chennai",
      package: "Varies by role/drive",
      eligibility: "Check current job notification",
      skills: "Java, Python, TDD, DSA",
      process: "Assessment → Technical Interviews",
      careers: "https://www.thoughtworks.com/careers"
    }
  ];

  /*
    IMPORTANT:
    Search/filter logic கீழே correct-a handle pannirukku.
    Search:
    - company name
    - role
    - location
    - skills

    Location filter:
    - All
    - Chennai
    - Bangalore
    - Hyderabad
    - Pune

    Role filter:
    - All
    - available roles
  */

  const locations = [
    "All",
    ...Array.from(
      new Set(companies.map((company) => company.location))
    )
  ];

  const roles = [
    "All",
    ...Array.from(
      new Set(companies.map((company) => company.role))
    )
  ];

  const filteredCompanies = useMemo(() => {

    const searchText = search.trim().toLowerCase();

    return companies.filter((company) => {

      const searchableText = [
        company.name,
        company.role,
        company.location,
        company.skills,
        company.package,
        company.eligibility,
        company.process
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchText === "" ||
        searchableText.includes(searchText);

      const matchesLocation =
        locationFilter === "All" ||
        company.location === locationFilter;

      const matchesRole =
        roleFilter === "All" ||
        company.role === roleFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesRole
      );
    });

  }, [search, locationFilter, roleFilter]);


  const clearFilters = () => {
    setSearch("");
    setLocationFilter("All");
    setRoleFilter("All");
  };


  const toggleSave = (companyName) => {

    setSavedCompanies((previous) => {

      if (previous.includes(companyName)) {

        return previous.filter(
          (name) => name !== companyName
        );

      }

      return [...previous, companyName];

    });
  };


  return (

    <div className="companies-page">

      {/* TOP BAR */}

      <div className="companies-topbar">

        <button
          className="back-btn"
          onClick={goDashboard}
        >
          ← Back to Dashboard
        </button>

        <div className="saved-count">
          ⭐ Saved: {savedCompanies.length}
        </div>

      </div>


      {/* HEADER */}

      <div className="companies-heading">

        <div>

          <h1>
            Explore Companies 🏢
          </h1>

          <p>
            Discover companies and explore software
            development opportunities.
          </p>

        </div>

        <div className="company-total">

          <strong>
            {filteredCompanies.length}
          </strong>

          <span>
            Companies Found
          </span>

        </div>

      </div>


      {/* SEARCH + FILTER */}

      <div className="company-search">

        <input
          type="search"
          value={search}
          placeholder="🔎 Search company, role, location or skill..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <select
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
          }}
        >

          {locations.map((location) => (

            <option
              value={location}
              key={location}
            >
              {location === "All"
                ? "All Locations"
                : location}
            </option>

          ))}

        </select>


        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
          }}
        >

          {roles.map((role) => (

            <option
              value={role}
              key={role}
            >
              {role === "All"
                ? "All Roles"
                : role}
            </option>

          ))}

        </select>


        <button
          type="button"
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>


      {/* ACTIVE FILTER INFO */}

      {(search.trim() !== "" ||
        locationFilter !== "All" ||
        roleFilter !== "All") && (

        <div className="filter-info">

          <span>
            🔎 Showing {filteredCompanies.length} of{" "}
            {companies.length} companies
          </span>

          <button
            type="button"
            onClick={clearFilters}
          >
            Reset Filters
          </button>

        </div>

      )}


      {/* COMPANY LIST */}

      <div className="company-list">

        {filteredCompanies.map((company) => {

          const isSaved =
            savedCompanies.includes(company.name);

          return (

            <div
              className="company-card"
              key={company.name}
            >

              <div className="company-card-top">

                <div className="company-logo">
                  {company.name.charAt(0)}
                </div>

                <button
                  type="button"
                  className={`save-btn ${
                    isSaved ? "saved" : ""
                  }`}
                  onClick={() =>
                    toggleSave(company.name)
                  }
                >
                  {isSaved
                    ? "⭐ Saved"
                    : "☆ Save"}
                </button>

              </div>

              <h2>
                {company.name}
              </h2>

              <div className="company-role">
                💼 {company.role}
              </div>

              <p>
                📍 {company.location}
              </p>

              <p>
                🛠️ {company.skills}
              </p>

              <div className="company-card-footer">

                <span>
                  💰 {company.package}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCompany(company)
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

          );

        })}

      </div>


      {/* EMPTY RESULT */}

      {filteredCompanies.length === 0 && (

        <div className="no-company">

          <h2>
            🔍 No companies found
          </h2>

          <p>
            Try another company name, role,
            location or skill.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      )}
      {/* COMPANY DETAILS MODAL */}

      {selectedCompany && (

        <div
          className="company-modal-overlay"
          onClick={(e) => {

            if (
              e.target.className ===
              "company-modal-overlay"
            ) {
              setSelectedCompany(null);
            }

          }}
        >

          <div className="company-details">

            {/* CLOSE */}

            <button
              type="button"
              className="close-btn"
              onClick={() =>
                setSelectedCompany(null)
              }
            >
              ✕
            </button>


            {/* DETAILS HEADER */}

            <div className="details-header">

              <div className="details-logo">
                {selectedCompany.name.charAt(0)}
              </div>

              <div>

                <h2>
                  {selectedCompany.name}
                </h2>

                <p>
                  {selectedCompany.role}
                </p>

              </div>

            </div>


            {/* DETAILS */}

            <div className="details-grid">

              <div>

                <span>
                  📍 Location
                </span>

                <strong>
                  {selectedCompany.location}
                </strong>

              </div>


              <div>

                <span>
                  💰 Package
                </span>

                <strong>
                  {selectedCompany.package}
                </strong>

              </div>


              <div>

                <span>
                  🎓 Eligibility
                </span>

                <strong>
                  {selectedCompany.eligibility}
                </strong>

              </div>


              <div>

                <span>
                  🧠 Required Skills
                </span>

                <strong>
                  {selectedCompany.skills}
                </strong>

              </div>


              <div>

                <span>
                  📋 Selection Process
                </span>

                <strong>
                  {selectedCompany.process}
                </strong>

              </div>

            </div>


            {/* ACTION BUTTONS */}

            <div className="details-actions">

              {/* TRACK APPLICATION */}

              <button
                type="button"
                className="apply-btn"
                onClick={() => {

                  goApplications(
                    selectedCompany
                  );

                }}
              >
                🚀 Track Application
              </button>


              {/* OFFICIAL CAREERS */}

              <a
                href={selectedCompany.careers}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                🌐 Official Careers
              </a>


              {/* SAVE */}

              <button
                type="button"
                className="save-company-btn"
                onClick={() =>
                  toggleSave(
                    selectedCompany.name
                  )
                }
              >

                {savedCompanies.includes(
                  selectedCompany.name
                )
                  ? "⭐ Remove Saved"
                  : "☆ Save Company"}

              </button>


              {/* CLOSE */}

              <button
                type="button"
                className="close-details-btn"
                onClick={() =>
                  setSelectedCompany(null)
                }
              >
                Close
              </button>

            </div>


            {/* NOTE */}

            <div className="company-note">

              ℹ️ Package, eligibility, job location
              and openings can change by role,
              hiring drive and graduation batch.
              Always verify current requirements
              before applying.

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Companies;