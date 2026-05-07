# 🏥 MediCare+ — Hospital Management System

<div align="center">

![MediCare+](https://img.shields.io/badge/MediCare+-Hospital%20Management-06b6d4?style=for-the-badge&logo=heart&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

A full-stack, commercial-grade hospital management system with role-based dashboards for **Admins**, **Doctors**, and **Patients**.

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Run the Project](#4-run-the-project)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [User Roles & Access](#-user-roles--access)
- [Default Ports](#-default-ports)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Role-Based Auth** | Separate dashboards for Admin, Doctor, and Patient |
| 📅 **Appointments** | Book, filter, update status, delete appointments |
| 👨‍⚕️ **Doctor Management** | Search by name/specialization, full CRUD |
| 🧑‍🤝‍🧑 **Patient Management** | Search, view medical history, blood group, contacts |
| 💊 **Prescriptions** | Add medicines with dosage/duration, view records |
| 📧 **Email Notifications** | Auto email on appointment booking via Nodemailer |
| 📊 **Analytics Dashboard** | Charts for appointment trends and doctor distribution |
| 🌙 **Dark Mode** | System-wide dark/light mode toggle |
| 📱 **Responsive** | Mobile-friendly with hamburger navigation |
| 🔔 **Toast Notifications** | Premium toast system replacing all `alert()` calls |
| 🔒 **Protected Routes** | JWT + role-based frontend and backend route guards |

---

## 🛠 Tech Stack

### Backend
| Package | Version | Purpose |
|---|---|---|
| Express.js | ^5.x | REST API server |
| Mongoose | ^9.x | MongoDB ODM |
| bcryptjs | ^3.x | Password hashing |
| jsonwebtoken | ^9.x | JWT authentication |
| nodemailer | ^8.x | Email notifications |
| multer | ^2.x | File uploads |
| cloudinary | ^2.x | Cloud image storage |
| dotenv | ^17.x | Environment variables |
| cors | ^2.x | Cross-origin requests |
| nodemon | ^3.x | Dev auto-restart |

### Frontend
| Package | Version | Purpose |
|---|---|---|
| React | ^19.x | UI framework |
| Vite | ^8.x | Build tool & dev server |
| React Router DOM | ^7.x | Client-side routing |
| Tailwind CSS | ^4.x | Utility-first styling |
| Axios | ^1.x | HTTP client |
| Framer Motion | ^11.x | Page & element animations |
| React Hook Form | ^7.x | Form validation |
| React Hot Toast | ^2.x | Toast notifications |
| Recharts | ^2.x | Analytics charts |
| React Icons | ^5.x | SVG icon library |

---

## 📁 Project Structure

```
group project/
├── backend/
│   ├── APIs/
│   │   ├── AdminAPI.js          # Admin routes (register, dashboard)
│   │   ├── AppointmentAPI.js    # Full appointment CRUD + calendar
│   │   ├── CommonAPI.js         # Login + token verify
│   │   ├── DoctorAPI.js         # Doctor CRUD + search
│   │   ├── PatientAPI.js        # Patient CRUD + search
│   │   └── PrescriptionAPI.js   # Prescription add + fetch
│   ├── config/
│   │   ├── cloudinary.js        # Cloudinary setup
│   │   ├── multer.js            # File upload config
│   │   └── nodemailer.js        # Email transporter
│   ├── middlewares/
│   │   └── VerifyToken.js       # JWT middleware
│   ├── models/
│   │   ├── AdminModel.js
│   │   ├── AppointmentModel.js
│   │   ├── DoctorModel.js
│   │   ├── PatientModel.js
│   │   └── PrescriptionModel.js
│   ├── .env                     # ⚠️ NOT in git — create from .env.example
│   ├── .env.example             # ✅ Template — copy this
│   ├── package.json
│   └── server.js                # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js  # Centralized axios with JWT interceptors
│   │   ├── components/
│   │   │   ├── admin/            # AdminDashboard (charts + stats)
│   │   │   ├── appointment/      # Appointments, AppointmentForm, CalendarView
│   │   │   ├── common/           # Header, Footer, Sidebar, Loader, ErrorBoundary…
│   │   │   ├── doctor/           # Doctors, DoctorDashboard
│   │   │   ├── patient/          # PatientList, PatientDashboard
│   │   │   └── prescription/     # Prescription (add + view)
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state (token, role, user)
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx    # Header + Footer wrapper (public pages)
│   │   │   └── DashboardLayout.jsx # Sidebar + main content wrapper
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Role-aware dashboard router
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx       # Edit profile + appointments + prescriptions
│   │   │   ├── Register.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx # JWT + role guard
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                      # ⚠️ NOT in git — create from .env.example
│   ├── .env.example              # ✅ Template — copy this
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md                     # ← You are here
```

---

## ✅ Prerequisites

Make sure the following are installed on your machine before starting:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | v9 or higher | Comes with Node.js |
| **MongoDB** | v6 or higher | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git** | Any | [git-scm.com](https://git-scm.com) |

> **Optional:** [MongoDB Compass](https://www.mongodb.com/products/compass) — GUI to view your database.

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

cd "group project"
```

---

### 2. Backend Setup

```bash
# Navigate into backend
cd backend

# Install dependencies
npm install

# Copy the environment template
# Windows (Command Prompt):
copy .env.example .env

# Windows (PowerShell):
Copy-Item .env.example .env

# Mac / Linux:
cp .env.example .env
```

Now **open `backend/.env`** in any text editor and fill in your values:

```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/hospital
JWT_SECRET=replace_with_a_long_random_secret_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ **Gmail App Password**: Regular Gmail password won't work. You need to generate an **App Password**:
> 1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 2. Select **Mail** → **Other (Custom name)** → Generate
> 3. Use the 16-character password in `EMAIL_PASS`

> 💡 **Cloudinary is optional** — only needed if you add image upload features. Leave the values as `xxxx` to skip it for now.

---

### 3. Frontend Setup

```bash
# Go back to the root, then into frontend
cd ../frontend

# Install dependencies
npm install

# Copy the environment template
# Windows (Command Prompt):
copy .env.example .env

# Windows (PowerShell):
Copy-Item .env.example .env

# Mac / Linux:
cp .env.example .env
```

The frontend `.env` only needs one value — leave it as-is if backend runs on port 5000:

```env
VITE_API_URL=http://localhost:5000
```

---

### 4. Run the Project

You need **two terminals open** simultaneously.

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```
> You should see:
> ```
> MongoDB connected successfully
> Server running on port 5000
> ```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
> You should see:
> ```
> VITE ready in XXXms
> ➜ Local: http://localhost:5173/
> ```

Now open your browser and go to: **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 Creating Your First Admin Account

The admin registration endpoint is not exposed on the frontend UI (for security). Use a tool like **Postman** or **Thunder Client** (VS Code extension):

```
POST http://localhost:5000/admin-api/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@hospital.com",
  "password": "Admin@1234"
}
```

Then log in at [http://localhost:5173/login](http://localhost:5173/login) using those credentials.

---

## 🌍 Environment Variables

### Backend — `backend/.env`

| Variable | Required | Description |
|---|---|---|
| `PORT` | ✅ | Port the backend server runs on (default: `5000`) |
| `DB_URL` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens — make it long and random |
| `EMAIL_USER` | ⚠️ Optional | Gmail address for appointment email notifications |
| `EMAIL_PASS` | ⚠️ Optional | Gmail **App Password** (not your regular password) |
| `CLOUDINARY_CLOUD_NAME` | ⚠️ Optional | Cloudinary cloud name (for image uploads) |
| `CLOUDINARY_API_KEY` | ⚠️ Optional | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ⚠️ Optional | Cloudinary API secret |

### Frontend — `frontend/.env`

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ | Full URL of your backend (e.g. `http://localhost:5000`) |

---

## 📡 API Reference

### Auth — `/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | No | Login for admin, doctor, or patient |
| `GET` | `/auth/verify` | No | Verify a JWT token |

### Admin — `/admin-api`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/admin-api/register` | No | Create admin account |
| `GET` | `/admin-api/dashboard` | No | Get counts (doctors, patients, appointments) |

### Doctor — `/doctor-api`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/doctor-api/register` | No | Register a new doctor |
| `GET` | `/doctor-api/doctors` | No | Get all doctors |
| `GET` | `/doctor-api/doctor/:id` | No | Get single doctor |
| `PUT` | `/doctor-api/update-doctor/:id` | No | Update doctor profile |
| `DELETE` | `/doctor-api/delete-doctor/:id` | No | Delete a doctor |
| `GET` | `/doctor-api/search/:key` | No | Search by name or specialization |

### Patient — `/patient-api`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/patient-api/register` | No | Register a new patient |
| `GET` | `/patient-api/patients` | No | Get all patients |
| `GET` | `/patient-api/patient/:id` | No | Get single patient |
| `PUT` | `/patient-api/update-patient/:id` | No | Update patient profile |
| `DELETE` | `/patient-api/delete-patient/:id` | No | Delete a patient |
| `GET` | `/patient-api/search/:key` | No | Search by name |

### Appointment — `/appointment-api`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/appointment-api/book` | ✅ JWT | Book a new appointment |
| `GET` | `/appointment-api/` | ✅ JWT | Get all appointments (populated) |
| `GET` | `/appointment-api/:id` | ✅ JWT | Get single appointment |
| `PUT` | `/appointment-api/update-status/:id` | ✅ JWT | Update appointment status |
| `DELETE` | `/appointment-api/delete/:id` | ✅ JWT | Delete appointment |
| `GET` | `/appointment-api/search/:status` | ✅ JWT | Filter by status |
| `GET` | `/appointment-api/doctor/:doctorId` | ✅ JWT | Doctor's appointments |
| `GET` | `/appointment-api/patient/:patientId` | ✅ JWT | Patient's appointments |
| `GET` | `/appointment-api/calendar/events` | ✅ JWT | Calendar view events |

### Prescription — `/prescription-api`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/prescription-api/add` | No | Add a prescription |
| `GET` | `/prescription-api/patient/:patientId` | No | Get patient's prescriptions |

---

## 👥 User Roles & Access

| Feature | Admin | Doctor | Patient |
|---|:---:|:---:|:---:|
| Admin Dashboard (charts) | ✅ | ❌ | ❌ |
| Doctor Dashboard (own appointments) | ❌ | ✅ | ❌ |
| Patient Dashboard (own data) | ❌ | ❌ | ✅ |
| View All Doctors | ✅ | ✅ | ✅ |
| View All Patients | ✅ | ✅ | ❌ |
| Delete Patients/Doctors | ✅ | ❌ | ❌ |
| View All Appointments | ✅ | ✅ | ✅ |
| Update Appointment Status | ✅ | ✅ | ❌ |
| Delete Appointments | ✅ | ✅ | ❌ |
| Book Appointments | ❌ | ❌ | ✅ |
| Add Prescriptions | ✅ | ✅ | ❌ |
| View Prescriptions | ✅ | ✅ | ✅ |
| Edit Own Profile | ✅ | ✅ | ✅ |

---

## 🔌 Default Ports

| Service | URL |
|---|---|
| **Backend API** | `http://localhost:5000` |
| **Frontend App** | `http://localhost:5173` |
| **MongoDB** | `mongodb://127.0.0.1:27017` |

---

## 🐛 Troubleshooting

### ❌ `MongoDB connection error`
- Make sure MongoDB is **running** on your machine.
- **Windows:** Search for "Services" → find "MongoDB" → Start it.
- Or run in terminal: `mongod`
- Check your `DB_URL` in `backend/.env` is correct.

### ❌ `Cannot GET /appointment-api` (CORS error in browser)
- Make sure the backend is running on port `5000`.
- Check `frontend/.env` has `VITE_API_URL=http://localhost:5000` (no trailing slash).
- The backend CORS config only allows `http://localhost:5173` — do not change the frontend port.

### ❌ `401 Unauthorized` on API calls
- Your JWT token may have expired (tokens last 1 day).
- Log out and log in again.
- Make sure `JWT_SECRET` in `.env` is set and not empty.

### ❌ `Email sending failed` in backend logs
- This is non-fatal — appointments still get saved.
- To fix: set a valid Gmail address and App Password in `backend/.env`.
- Make sure **2-Factor Authentication** is enabled on your Google account before generating an App Password.

### ❌ `react-icons` or `framer-motion` not found
```bash
cd frontend
npm install
```

### ❌ `nodemon: command not found`
```bash
cd backend
npm install
# Then use:
npm start
# or for dev with auto-restart:
npx nodemon server.js
```

### ❌ Frontend shows blank page / components not loading
- Open DevTools (F12) → Console — check for errors.
- Make sure backend is running before opening the frontend.
- Hard refresh: `Ctrl + Shift + R`.

---

## 🤝 Contributing

1. **Fork** the repository on GitHub
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/REPO.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** and commit: `git commit -m "feat: describe your change"`
5. **Push** to your fork: `git push origin feature/your-feature-name`
6. Open a **Pull Request** on GitHub

### Commit Message Convention
```
feat:     New feature
fix:      Bug fix
style:    UI/CSS changes (no logic change)
refactor: Code restructure
docs:     Documentation update
chore:    Dependency updates, config changes
```

---

## 📸 Screenshots

> _Add screenshots of your app here after deployment_

| Home Page | Admin Dashboard | Doctor Dashboard |
|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ |

---

## 📄 License

This project is for educational purposes as part of a group project.

---

<div align="center">
Built with ❤️ by the MediCare+ Team
</div>
