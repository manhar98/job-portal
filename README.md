# 🚀 JobSphere - Full Stack Job Portal Web Application

A modern, responsive, and robust **MERN Stack Job Portal** that connects job seekers with recruiters and companies across various industries (IT, Marketing, Finance, Healthcare, Design, HR, and more).

---

🌐 Live Demo

Live Project: https://job-portal-psi-plum.vercel.app/

---

## 🌟 Key Features

### 🧑‍💼 1. Job Seeker Module
- **Search & Filters**: Live search by keyword, category/industry, location, and job type (Full-Time, Part-Time, Remote, Internship).
- **Job Details**: View comprehensive job description, salary range, company info, and experience required.
- **One-Click Apply**: Seamlessly apply for vacancies with uploaded resume.
- **Candidate Dashboard**: Track application status in real-time (`Pending`, `Accepted`, `Rejected`).
- **Profile Management**: Update bio, skills, contact info, and upload latest resume.

### 🏢 2. Recruiter & Employer Module
- **Company Registration**: Create and manage company profile with logo, description, and website.
- **Post Vacancies**: Publish openings across diverse categories with requirements and salary details.
- **Manage Jobs**: View, edit, and delete job listings.
- **Applicant Review**: Review applicants per job, download resumes, and mark status (`Accept` / `Reject`).

### 🛡️ 3. Super Admin Module
- **Analytics Dashboard**: Real-time stats on total users, job seekers, recruiters, active jobs, and applications.
- **User Moderation**: Suspend, reactivate, or delete user accounts violating portal policies.
- **Application Monitoring**: Complete pipeline oversight across all employers.

---

## 💻 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Redux Toolkit, React Router, Lucide Icons, Axios
- **Backend**: Node.js, Express.js (MVC Architecture, RESTful APIs)
- **Database**: MongoDB (Atlas Cloud / Local), Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), Bcrypt password hashing, Role-Based Access Control (RBAC)
- **File Uploads**: Multer (Local storage for resumes and company logos)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local or Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/manhar98/job-portal.git
cd job-portal
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

Seed initial multi-industry demo data (optional):
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👥 Demo Credentials (Password for all: `123456`)
- **Job Seeker**: `seeker@gmail.com`
- **Recruiter**: `recruiter@gmail.com`
- **Admin**: `admin@gmail.com`

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
