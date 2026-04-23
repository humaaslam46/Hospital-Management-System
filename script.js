/* --- API MOCK DATA --- */

const DOCTORS = [
  // Male Doctors (Professional Portraits)
  {
    name: "Dr. Abdul Bari Khan",
    dept: "Cardiology",
    cost: "Rs. 3000",
  },
  {
    name: "Dr. Faisal Sultan",
    dept: "Neurology",
    cost: "Rs. 2500",
  },
  {
    name: "Dr. Adeebul Hasan Rizvi",
    dept: "Urology",
    cost: "Rs. 2000",
  },
  {
    name: "Dr. Zulfiqar Bhutta",
    dept: "Pediatrics",
    cost: "Rs. 1500",
  },
  {
    name: "Dr. Mahmood Ayaz",
    dept: "Surgery",
    cost: "Rs. 2200",
  },

  // Female Doctors (Professional Portraits)
  {
    name: "Dr. Sania Nishtar",
    dept: "Cardiology",
    cost: "Rs. 2800",
  },
  {
    name: "Dr. Seemin Jamali",
    dept: "Emergency Medicine",
    cost: "Rs. 1800",
  },
  {
    name: "Dr. Yasmin Rashid",
    dept: "Gynecology",
    cost: "Rs. 2500",
  },
  {
    name: "Dr. Fareeha Talha",
    dept: "Dermatology",
    cost: "Rs. 2000",
  },
  {
    name: "Dr. Shamsa Humayun",
    dept: "Obstetrics",
    cost: "Rs. 2400",
  },
];

/* --- AUTH GATEWAY --- */
function handleAuth(e, type) {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "index.html";
}

function checkAuth() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "auth.html";
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "auth.html";
}

function toggleAuthForms() {
  document.getElementById("loginForm").classList.toggle("d-none");
  document.getElementById("registerForm").classList.toggle("d-none");
}

/* --- THEME LOGIC --- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.onclick = () => {
    const theme =
      document.documentElement.getAttribute("data-bs-theme") === "light"
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.getElementById("themeIcon").className =
      theme === "light" ? "bi bi-moon-stars" : "bi bi-sun-fill";
  };

  // Auto-populate 50 appointments
  if (document.getElementById("apptList")) renderAppts();
  // Populate modal doctor list
  if (document.getElementById("apptDoc")) populateForm();
  // Render Grids
  if (document.getElementById("deptGrid")) renderDepts();
  if (document.getElementById("doctorGrid")) renderDocs();
});

/* --- APPOINTMENT SYSTEM (The "API") --- */
function renderAppts() {
  const table = document.getElementById("apptList");
  let data = JSON.parse(localStorage.getItem("appointments") || "[]");

  if (data.length === 0) {
    for (let i = 1; i <= 50; i++) {
      const d = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
      data.push({
        id: 100 + i,
        doc: d.name,
        dept: d.dept,
        date: `2025-01-${(i % 28) + 1}`,
        status: i % 3 == 0 ? "Done" : "Pending",
      });
    }
    localStorage.setItem("appointments", JSON.stringify(data));
  }

  table.innerHTML = data
    .map(
      (item) => `
        <tr><td>#${item.id}</td><td>${item.doc}</td><td>${item.dept}</td><td>${
        item.date
      }</td>
        <td><span class="badge ${
          item.status == "Done" ? "bg-success" : "bg-primary"
        }">${item.status}</span></td></tr>
    `
    )
    .join("");
}

function saveAppointment(e) {
  e.preventDefault();
  const newA = {
    id: Date.now().toString().slice(-4),
    doc: document.getElementById("apptDoc").value,
    dept: document.getElementById("apptDept").value,
    date: document.getElementById("apptDate").value,
    status: "Pending",
  };
  let list = JSON.parse(localStorage.getItem("appointments") || "[]");
  list.unshift(newA);
  localStorage.setItem("appointments", JSON.stringify(list));
  alert("Booked!");
  window.location.href = "appointments.html";
}

function populateForm() {
  const s = document.getElementById("apptDoc");
  s.innerHTML =
    `<option>Choose Doctor</option>` +
    DOCTORS.map((d) => `<option value="${d.name}">${d.name}</option>`).join("");
  s.onchange = (e) => {
    const d = DOCTORS.find((x) => x.name === e.target.value);
    document.getElementById("apptDept").value = d ? d.dept : "";
  };
}

/* --- DATA CONFIGURATION --- */
const DEPTS = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Oncology",
  "Orthopedics",
  "Dermatology",
  "Radiology",
  "ENT",
  "Ophthalmology",
  "Psychiatry",
];

// Generate 50 Doctors
// const generateDoctors = () => {
//     let docs = [];
//     for(let i=1; i<=50; i++) {
//         docs.push({
//             id: i,
//             name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][i%8]} ${i}`,
//             dept: DEPTS[i % 10],
//             pic: `https://i.pravatar.cc/300?u=doc${i}`,
//             exp: `${(i % 15) + 5} Years`,
//             bio: "Specialist in advanced clinical procedures and patient rehabilitation."
//         });
//     }
//     return docs;
// };
// const ALL_DOCTORS = generateDoctors();

const generateDoctors = () => {
  let docs = [];
  const maleNames = [
    "Ahmad",
    "Faisal",
    "Zubair",
    "Bilal",
    "Usman",
    "Asif",
    "Omar",
    "Nadeem",
    "Kamran",
    "Rizwan",
  ];
  const femaleNames = [
    "Sania",
    "Mariam",
    "Ayesha",
    "Fatima",
    "Zainab",
    "Hina",
    "Saba",
    "Rabia",
    "Nadia",
    "Kiran",
  ];
  const surnames = [
    "Khan",
    "Ahmed",
    "Ali",
    "Sheikh",
    "Malik",
    "Siddiqui",
    "Qureshi",
    "Shah",
    "Farooqi",
    "Iqbal",
  ];
  const DEPTS = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Oncology",
    "Gastroenterology",
    "ENT",
    "Psychiatry",
    "Urology",
  ];

  for (let i = 1; i <= 50; i++) {
    const isFemale = i % 2 === 0;
    const firstName = isFemale ? femaleNames[i % 10] : maleNames[i % 10];
    const lastName = surnames[i % 10];

    // Use Bootstrap Icon classes instead of images
    const genderIcon = isFemale
      ? "bi-person-fill-gear"
      : "bi-person-fill-check";

    docs.push({
      id: i,
      name: `Dr. ${firstName} ${lastName}`,
      dept: DEPTS[i % 10],
      icon: genderIcon, // Store the icon class
      exp: `${(i % 15) + 5} Years`,
      cost: `Rs. ${(Math.floor(Math.random() * 3) + 1) * 1000}`,
      bio: "Experienced specialist committed to providing high-quality healthcare and patient-centered treatment.",
    });
  }
  return docs;
};

const ALL_DOCTORS = generateDoctors();

/* --- GLOBAL RENDERERS --- */
document.addEventListener("DOMContentLoaded", () => {
  // Theme Switcher Logic
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.onclick = () => {
      const current = document.documentElement.getAttribute("data-bs-theme");
      const target = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-bs-theme", target);
      document.getElementById("themeIcon").className =
        target === "light" ? "bi bi-moon-stars" : "bi bi-sun-fill";
    };
  }

  // Render Logic Based on Page
  if (document.getElementById("apptList")) renderAppointments();
  if (document.getElementById("deptGrid")) renderDepartments();
  if (document.getElementById("doctorGrid")) renderDoctors();
  if (document.getElementById("footerPlaceholder")) renderFooter();
});

function renderDepartments() {
  const grid = document.getElementById("deptGrid");
  grid.innerHTML = DEPTS.map(
    (d) => `
        <div class="col-md-4 col-lg-3">
            <div class="card p-4 text-center border-0 shadow-sm h-100 dept-card" onclick="window.location.href='doctors.html?filter=${d}'">
                <i class="bi bi-hospital display-4 text-primary mb-3"></i>
                <h5 class="fw-bold">${d}</h5>
                <p class="small text-muted mb-0">Specialized ${d} services for all patients.</p>
            </div>
        </div>
    `
  ).join("");
}

function renderDoctors() {
  const grid = document.getElementById("doctorGrid");
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");

  let list = ALL_DOCTORS;
  if (filter) {
    list = ALL_DOCTORS.filter((d) => d.dept === filter);
    document.getElementById(
      "docHeading"
    ).innerText = `Specialists in ${filter}`;
  }

  // Inside your renderDoctors() function, change the card HTML to this:
  grid.innerHTML = list
    .map(
      (d) => `
    <div class="col-md-4 col-lg-3 mb-4">
        <div class="card border-0 shadow-sm h-100">
            <div class="d-flex align-items-center justify-content-center bg-light" style="height: 200px;">
                <i class="bi ${d.icon} display-1 text-secondary opacity-50"></i>
            </div>
            
            <div class="card-body">
                <span class="badge bg-primary-subtle text-primary mb-2">${d.dept}</span>
                <h5 class="fw-bold mb-1">${d.name}</h5>
                <p class="text-muted small mb-0">Experience: ${d.exp}</p>
                <p class="text-success fw-bold small mb-3">Fee: ${d.cost}</p>
                <button class="btn btn-outline-primary btn-sm w-100" onclick="showDocDetails(${d.id})">View Profile</button>
            </div>
        </div>
    </div>
`
    )
    .join("");
}

function showDocDetails(id) {
  const d = ALL_DOCTORS.find((x) => x.id === id);
  const modal = new bootstrap.Modal(document.getElementById("detailModal"));
  document.getElementById("detailContent").innerHTML = `
        <div class="modal-body text-center p-5">
            <img src="${d.pic}" class="rounded-circle mb-4 border border-5 border-primary-subtle" style="width:120px; height:120px; object-fit:cover;">
            <h3 class="fw-bold">${d.name}</h3>
            <p class="text-primary fw-bold mb-3">${d.dept} Senior Specialist</p>
            <p class="text-muted mb-4">${d.bio}</p>
            <div class="row g-2">
                <div class="col-6"><div class="bg-light p-3 rounded"><strong>Exp</strong><br>${d.exp}</div></div>
                <div class="col-6"><div class="bg-light p-3 rounded"><strong>Patients</strong><br>1.2k+</div></div>
            </div>
            <button class="btn btn-primary w-100 mt-4 py-2" onclick="location.href='index.html#book'">Book Consultation</button>
        </div>
    `;
  modal.show();
}

function renderAppointments() {
  const list = document.getElementById("apptList");
  let appts = JSON.parse(localStorage.getItem("appointments") || "[]");

  if (appts.length === 0) {
    for (let i = 1; i <= 50; i++) {
      appts.push({
        id: 5000 + i,
        doc: ALL_DOCTORS[Math.floor(Math.random() * 50)].name,
        dept: DEPTS[Math.floor(Math.random() * 10)],
        date: `2025-01-${(i % 28) + 1} 10:30 AM`,
        status: i % 4 === 0 ? "Completed" : "Scheduled",
      });
    }
    localStorage.setItem("appointments", JSON.stringify(appts));
  }

  list.innerHTML = appts
    .map(
      (a) => `
        <tr>
            <td class="text-muted">#${a.id}</td>
            <td class="fw-bold">${a.doc}</td>
            <td><span class="badge bg-light text-dark border">${
              a.dept
            }</span></td>
            <td>${a.date}</td>
            <td><span class="badge ${
              a.status === "Completed" ? "bg-success" : "bg-primary"
            }">${a.status}</span></td>
        </tr>
    `
    )
    .join("");
}

function renderFooter() {
  document.getElementById("footerPlaceholder").innerHTML = `
        <div class="container pb-5">
            <div class="row g-5">
                <div class="col-lg-4">
                    <h4 class="text-primary fw-bold mb-4">MEDICARE</h4>
                    <p class="opacity-75">Leading the way in medical excellence since 1999. Our global network of 50+ specialists is here for you.</p>
                </div>
                <div class="col-lg-2">
                    <h6 class="mb-4">Sitemap</h6>
                    <ul class="list-unstyled opacity-75 small">
                        <li class="mb-2"><a href="index.html" class="text-white text-decoration-none">Home</a></li>
                        <li class="mb-2"><a href="doctors.html" class="text-white text-decoration-none">Doctors</a></li>
                        <li class="mb-2"><a href="departments.html" class="text-white text-decoration-none">Departments</a></li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <h6 class="mb-4">Send Us Feedback</h6>
                    <div class="input-group"><input type="text" class="form-control bg-dark border-secondary text-white" placeholder="Message..."><button class="btn btn-primary">Send</button></div>
                </div>
            </div>
        </div>
    `;
}

/* --- AUTH GATE --- */
function checkAuth() {
  if (localStorage.getItem("isLoggedIn") !== "true")
    window.location.href = "auth.html";
}
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "auth.html";
}

// --- NEW SECURE AUTHENTICATION SYSTEM ---

// 1. Check if user is logged in immediately on page load
function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentPage = window.location.pathname;

  // If not logged in and not on the auth page, kick them to login
  if (isLoggedIn !== "true" && !currentPage.includes("auth.html")) {
    window.location.href = "auth.html";
  }
}

// 2. Handle Registration and Login
function handleAuth(e, type) {
  e.preventDefault();

  // Get all registered users from "database"
  let users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

  if (type === "register") {
    const name = e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const pass = e.target.elements[2].value;

    // Check if user already exists
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("This email is already registered. Please login.");
      toggleAuthForms();
      return;
    }

    // Save new user
    users.push({ name, email, pass });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    alert("Registration Successful! Now you can Login.");
    toggleAuthForms(); // Switch to login form automatically
  } else if (type === "login") {
    const email = e.target.elements[0].value;
    const pass = e.target.elements[1].value;

    // Verify credentials
    const user = users.find((u) => u.email === email && u.pass === pass);

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Invalid Email or Password. Please try again or register.");
    }
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}

function toggleAuthForms() {
  const login = document.getElementById("loginForm");
  const register = document.getElementById("registerForm");
  login.classList.toggle("d-none");
  register.classList.toggle("d-none");
}

// --- Feedback Form Alert ---
document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("footerFeedback");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault(); // This stops the page from refreshing

      // Get the name from the input to make it personal
      const name = feedbackForm.querySelector('input[type="text"]').value;

      // Show the professional alert
      alert(
        "Thank you, " +
          name +
          "! Your feedback has been submitted successfully."
      );

      // Clear the form so it's ready for next time
      feedbackForm.reset();
    });
  }
});
