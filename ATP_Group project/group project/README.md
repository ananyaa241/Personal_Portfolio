# 🏥 MediCare+ — Hospital Management System

<div align="center">

![MediCare+](https://img.shields.io/badge/MediCare+-Hospital%20Management-06b6d4?style=for-the-badge&logo=heart&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A full-stack, commercial-grade hospital management system** with role-based dashboards for Admins, Doctors, and Patients. Features secure JWT authentication, appointment management, prescription handling, analytics, and responsive design.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [✨ Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [Default Ports](#-default-ports)
- [Troubleshooting](#-troubleshooting)
- [Development Notes](#-development-notes)
- [Contributing](#-contributing)

---

## 📌 Overview

**MediCare+** is a comprehensive hospital management solution designed to streamline medical operations and improve patient care. The system supports three main roles:

- **👨‍💼 Admins**: System management, user registration, analytics, and reporting
- **👨‍⚕️ Doctors**: Profile management, appointment scheduling, and prescription issuance  
- **🧑‍🤝 Patients**: Appointment booking, health record access, and medical history tracking

Built with modern web technologies, the application ensures secure authentication, responsive design, and an intuitive user interface across all roles.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Role-Based Authentication** | Separate secure dashboards for Admin, Doctor, and Patient with JWT tokens |
| 📅 **Appointment Management** | Book, filter, update status, delete appointments with calendar view |
| 👨‍⚕️ **Doctor Management** | Search by name/specialization, full CRUD, profile management |
| 🧑‍🤝‍🧑 **Patient Management** | Search, view medical history, blood group, contacts, vitals tracking |
| 💊 **Prescription Management** | Add medicines with dosage/duration, view/manage records, PDF export |
| 📧 **Email Notifications** | Automated email on appointment booking via Nodemailer |
| 📊 **Analytics Dashboard** | Charts for appointment trends, doctor distribution, system analytics |
| 🌙 **Dark/Light Mode** | System-wide theme toggle with persistent user preference |
| 📱 **Responsive Design** | Mobile-friendly with hamburger navigation, optimized for all devices |
| 🔔 **Toast Notifications** | Premium toast system for all user feedback |
| 🔒 **Protected Routes** | JWT + role-based frontend and backend route guards |
| 📸 **Image Upload** | Cloudinary integration for doctor/patient profile photos |
| 🔍 **Advanced Search** | Filter appointments, doctors, patients with multiple criteria |
| ⏰ **Reminder Service** | Automated appointment reminders via Node-Cron scheduler |

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | ^5.x | REST API server & middleware framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | ^9.x | MongoDB ODM & schema validation |
| **bcryptjs** | ^3.x | Secure password hashing |
| **jsonwebtoken** | ^9.x | JWT authentication & token management |
| **nodemailer** | ^8.x | Email notification service |
| **multer** | ^2.x | File upload & form-data handling |
| **cloudinary** | ^2.x | Cloud image storage & CDN |
| **node-cron** | ^4.x | Scheduled appointment reminders |
| **dotenv** | ^17.x | Environment variable management |
| **cors** | ^2.x | Cross-origin request handling |
| **cookie-parser** | ^1.x | Cookie parsing middleware |
| **nodemon** | ^3.x | Dev auto-restart on file changes |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | ^19.x | UI library & component framework |
| **Vite** | ^8.x | Lightning-fast build tool & dev server |
| **React Router DOM** | ^7.x | Client-side routing & navigation |
| **Tailwind CSS** | ^4.x | Utility-first CSS framework |
| **Axios** | ^1.x | HTTP client (centralized instance) |
| **Framer Motion** | ^12.x | Page & element animations |
| **React Hook Form** | ^7.x | Form validation & state management |
| **React Hot Toast** | ^2.x | Toast notifications |
| **Recharts** | ^3.x | Data visualization & analytics |
| **React Icons** | ^5.x | SVG icon library |
| **jsPDF** | ^4.x | PDF generation for prescriptions |
| **jsPDF AutoTable** | ^5.x | PDF table formatting |

---

## 📁 Project Structure

```
group-project/
├── backend/                    # Node.js + Express REST API
│   ├── APIs/
│   │   ├── AdminAPI.js        # Admin registration, dashboard stats
│   │   ├── AppointmentAPI.js  # Full appointment CRUD + calendar
│   │   ├── CommonAPI.js       # Login, logout, token verification
│   │   ├── DoctorAPI.js       # Doctor CRUD, search, profile
│   │   ├── PatientAPI.js      # Patient CRUD, search, medical history
│   │   ├── PrescriptionAPI.js # Prescription management
│   │   └── VitalsAPI.js       # Vitals tracking (heart rate, BP, etc)
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary API configuration
│   │   ├── cloudinaryUpload.js# Multer + Cloudinary integration
│   │   ├── multer.js          # File upload middleware
│   │   └── nodemailer.js      # Email service configuration
│   ├── middlewares/
│   │   └── VerifyToken.js     # JWT token verification middleware
│   ├── models/
│   │   ├── AdminModel.js      # Admin schema
│   │   ├── DoctorModel.js     # Doctor schema with specialization
│   │   ├── PatientModel.js    # Patient schema with medical history
│   │   ├── AppointmentModel.js# Appointment schema
│   │   ├── PrescriptionModel.js # Prescription schema
│   │   └── VitalsModel.js     # Vitals schema
│   ├── services/
│   │   └── reminderService.js # Node-Cron scheduled reminders
│   ├── server.js              # Express app setup & entry point
│   ├── package.json           # Backend dependencies
│   ├── .env                   # ⚠️ Environment variables (NEVER commit)
│   ├── .env.example           # ✅ Environment template
│   ├── admin.http             # REST client test file
│   ├── appointment.http       # REST client test file
│   ├── auth.http              # REST client test file
│   ├── doctor.http            # REST client test file
│   ├── patient.http           # REST client test file
│   ├── prescription.http      # REST client test file
│   └── README.md              # Backend-specific documentation
│
├── frontend/                  # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js  # Centralized Axios with JWT interceptors
│   │   ├── assets/               # Images, fonts, static files
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminDashboard.jsx    # Stats & management
│   │   │   ├── appointment/
│   │   │   │   ├── AppointmentForm.jsx   # Book/edit appointments
│   │   │   │   ├── Appointments.jsx      # List & manage
│   │   │   │   └── CalendarView.jsx      # Calendar visualization
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx            # Navigation & auth
│   │   │   │   ├── Footer.jsx            # Footer
│   │   │   │   ├── Sidebar.jsx           # Navigation sidebar
│   │   │   │   ├── Loader.jsx            # Loading spinner
│   │   │   │   ├── SkeletonCard.jsx      # Skeleton loading
│   │   │   │   ├── EmptyState.jsx        # Empty state UI
│   │   │   │   ├── ErrorBoundary.jsx     # Error handling
│   │   │   │   ├── Hero.jsx              # Home hero section
│   │   │   │   └── SymptomChecker.jsx    # Symptom checker
│   │   │   ├── doctor/
│   │   │   │   ├── Doctors.jsx           # Doctor list & search
│   │   │   │   ├── DoctorDashboard.jsx   # Doctor dashboard
│   │   │   │   └── DoctorProfile.jsx     # Doctor profile view/edit
│   │   │   ├── patient/
│   │   │   │   ├── PatientList.jsx       # Patient search & list
│   │   │   │   ├── PatientDashboard.jsx  # Patient dashboard
│   │   │   │   ├── VitalsTracker.jsx     # Vitals tracking
│   │   │   │   └── SymptomChecker.jsx    # Symptom analysis
│   │   │   └── prescription/
│   │   │       └── Prescription.jsx      # Prescription management
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Global auth state
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx            # Public layout
│   │   │   └── DashboardLayout.jsx       # Protected layout
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx             # Role-aware dashboard
│   │   │   ├── Home.jsx                  # Landing page
│   │   │   ├── Login.jsx                 # Login form
│   │   │   ├── Register.jsx              # Registration form
│   │   │   ├── Profile.jsx               # User profile
│   │   │   ├── InfoPage.jsx              # About/Info page
│   │   │   └── Unauthorized.jsx          # 403 error page
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx        # JWT + role guard
│   │   ├── App.jsx                       # Main app & routes
│   │   ├── main.jsx                      # Entry point
│   │   ├── index.css                     # Global styles
│   │   └── App.css                       # App styles
│   ├── public/                           # Static assets
│   ├── tailwind.config.js                # Tailwind config
│   ├── vite.config.js                    # Vite config
│   ├── eslint.config.js                  # ESLint rules
│   ├── index.html                        # HTML entry point
│   ├── package.json                      # Frontend dependencies
│   ├── .env                              # ⚠️ Environment variables
│   ├── .env.example                      # ✅ Environment template
│   └── README.md                         # Frontend documentation
│
├── .gitignore                            # Git ignore rules
└── README.md                             # Main project documentation
```

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Minimum Version | Installation |
|---|---|---|
| **Node.js** | v18.0.0 | https://nodejs.org/ |
| **npm** | v9.0.0 | Comes with Node.js |
| **MongoDB** | v6.0.0 | https://www.mongodb.com/try/download/community |
| **Git** | Latest | https://git-scm.com/ |

**Optional:**
- **MongoDB Compass** - GUI for viewing database: https://www.mongodb.com/products/compass
- **Postman** or **Thunder Client** - API testing tools

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ananyaa241/atp_group_project.git

cd "group project"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
# Windows CMD:
copy .env.example .env

# Windows PowerShell:
Copy-Item .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Edit `.env` file with your configuration:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medicare
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Email Configuration (Nodemailer)
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_specific_password

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Start the backend:**

```bash
npm start
```

✅ Backend runs at **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal and navigate to frontend:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
# Windows CMD:
copy .env.example .env

# Windows PowerShell:
Copy-Item .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Edit `.env` file:**

```env
VITE_API_URL=http://localhost:5000
```

**Start the frontend:**

```bash
npm run dev
```

✅ Frontend runs at **http://localhost:5173**

### 4. Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Required | Example | Notes |
|---|---|---|---|
| `PORT` | ✅ | `5000` | Server port |
| `MONGODB_URI` | ✅ | `mongodb://localhost:27017/medicare` | Local or Atlas connection |
| `JWT_SECRET` | ✅ | `long_random_string_here` | Use strong random value |
| `SENDER_EMAIL` | ⚠️ | `your_email@gmail.com` | For email notifications |
| `SENDER_PASSWORD` | ⚠️ | `app_specific_password` | Gmail app password (not regular) |
| `CLOUDINARY_CLOUD_NAME` | ❌ | `your_cloud` | Optional - for images |
| `CLOUDINARY_API_KEY` | ❌ | `api_key` | Optional |
| `CLOUDINARY_API_SECRET` | ❌ | `api_secret` | Optional |

**Note:** ⚠️ = Recommended | ❌ = Optional

### Frontend (.env)

| Variable | Required | Example |
|---|---|---|
| `VITE_API_URL` | ✅ | `http://localhost:5000` |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

### Public Endpoints

#### Authentication
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/common/login` | Login (Admin/Doctor/Patient) |
| `POST` | `/common/logout` | Logout |
| `POST` | `/common/verifyToken` | Verify JWT token |

#### Admin
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/admin/register` | Register new admin |
| `GET` | `/admin/dashboard` | Get dashboard stats |

#### Doctor
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/doctor/all` | List all doctors |
| `GET` | `/doctor/:id` | Get doctor by ID |
| `POST` | `/doctor/add` | Add new doctor |
| `PUT` | `/doctor/:id` | Update doctor |
| `DELETE` | `/doctor/:id` | Delete doctor |
| `GET` | `/doctor/search?name=&specialization=` | Search doctors |

#### Patient
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/patient/all` | List all patients |
| `GET` | `/patient/:id` | Get patient by ID |
| `POST` | `/patient/add` | Add new patient |
| `PUT` | `/patient/:id` | Update patient |
| `DELETE` | `/patient/:id` | Delete patient |
| `GET` | `/patient/search?name=&bloodGroup=` | Search patients |

### Protected Endpoints

#### Appointment (requires JWT)
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/appointment/all` | List all appointments |
| `GET` | `/appointment/:id` | Get appointment by ID |
| `POST` | `/appointment/add` | Book new appointment |
| `PUT` | `/appointment/:id` | Update appointment |
| `DELETE` | `/appointment/:id` | Cancel appointment |
| `GET` | `/appointment/calendar?date=` | Calendar events |

#### Prescription (requires JWT)
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/prescription/all` | List prescriptions |
| `POST` | `/prescription/add` | Add prescription |
| `GET` | `/prescription/:id` | Get prescription by ID |
| `PUT` | `/prescription/:id` | Update prescription |

#### Vitals (requires JWT)
| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/vitals/add` | Add vital signs |
| `GET` | `/vitals/patient/:id` | Get patient vitals history |

---

## 👥 User Roles & Permissions

### Admin
- ✅ Register new admins
- ✅ View system dashboard with analytics
- ✅ Manage doctors (add, edit, delete)
- ✅ Manage patients (add, edit, delete)
- ✅ View all appointments
- ✅ View all prescriptions
- ✅ Access system statistics

### Doctor
- ✅ View and edit own profile
- ✅ Manage appointments (view, update status)
- ✅ Add and manage prescriptions
- ✅ View patient information
- ✅ Track patient vitals
- ✅ Upload profile photo
- ✅ View dashboard with appointments

### Patient
- ✅ View and edit own profile
- ✅ Book appointments with doctors
- ✅ View appointment history
- ✅ View prescriptions
- ✅ Track health vitals
- ✅ Upload profile photo
- ✅ Search and filter doctors
- ✅ View personal medical history

---

## 🔌 Default Ports

| Service | Port | URL |
|---|---|---|
| **Frontend** | 5173 | http://localhost:5173 |
| **Backend API** | 5000 | http://localhost:5000 |
| **MongoDB** | 27017 | mongodb://localhost:27017 |

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Start MongoDB: `mongod`
- Check connection string in `.env`
- Or use MongoDB Atlas cloud

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure frontend URL is in backend CORS whitelist
- Check backend is running on port 5000
- Restart both servers

### JWT Token Error
```
Error: jwt malformed / jwt expired
```
**Solution:**
- Clear browser cookies and local storage
- Log out and log back in
- Check JWT_SECRET matches in backend

### Email Not Sending
```
Error: Invalid login or authentication credentials
```
**Solution:**
- Use Gmail app-specific password (not regular password)
- Enable 2FA on Gmail account
- For setup: https://myaccount.google.com/apppasswords

### Installation Issues
```
npm ERR! code ERESOLVE
```
**Solution:**
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

---

## 👨‍💻 Development Guidelines

### Frontend Best Practices

1. **Always use centralized Axios:**
   ```javascript
   import axiosInstance from '../api/axiosInstance'
   ```

2. **Use React Hook Form for forms:**
   ```javascript
   import { useForm } from 'react-hook-form'
   ```

3. **Use Toast Notifications:**
   ```javascript
   import toast from 'react-hot-toast'
   toast.success('Success!')
   ```

4. **Protected Routes:**
   - Use `ProtectedRoute` component
   - Check `AuthContext` for user role

### Backend Best Practices

1. **Never hardcode sensitive data** - use `.env`
2. **Always hash passwords** - use bcryptjs
3. **Validate all inputs** - prevent SQL injection
4. **Use proper HTTP methods** - GET, POST, PUT, DELETE
5. **Log errors for debugging**
6. **Return consistent JSON responses**

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to repository
git push origin feature/your-feature

# Create pull request on GitHub
```

---

## 📝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "Add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Submit** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📞 Support

For issues and questions:
- Create an **Issue** on GitHub
- Check existing **Documentation**
- Review **Backend** and **Frontend** README files

---

## 🙏 Acknowledgments

**Built with ❤️ by the ATP Group Project Team**

Special thanks to:
- MongoDB for database
- React & Vite for amazing tools
- All contributors and team members

---

<div align="center">

**Made with ❤️ for better healthcare management**

[⬆ Back to Top](#-medicare--hospital-management-system)

</div>
