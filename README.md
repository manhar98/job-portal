# 🚀 JobSphere - Full Stack MERN Job Portal

આ Full Stack Job Portal Web Application છે જેમાં ત્રણ મુખ્ય યુઝર્સ (**Job Seeker**, **Recruiter**, અને **Admin**) માટે અલગ-અલગ ડેશબોર્ડ અને સુવિધાઓ આપવામાં આવી છે.

---

## 💻 Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Redux Toolkit, React Router, Lucide Icons, Axios
- **Backend:** Node.js, Express.js, MVC Architecture, REST APIs
- **Database:** MongoDB, Mongoose
- **Security:** JWT (JSON Web Token), Bcrypt Password Hashing, Role-Based Access Control
- **File Uploads:** Multer (Resume & Logo storage in `backend/public/uploads`)

---

## 👥 Demo Login Credentials (પાસવર્ડ બધા માટે: `123456`)

1. **Job Seeker (ઉમેદવાર):**
   - **Email:** `seeker@gmail.com`
   - **Password:** `123456`
   - **Role:** `jobseeker`
   - **સુવિધાઓ:** જોબ સર્ચ & ફિલ્ટર, જોબ ડિટેલ્સ જોવી, One-Click Apply, પોતાના ડેશબોર્ડમાં Applied Jobs નું લાઈવ સ્ટેટસ ચેક કરવું (Pending / Accepted / Rejected).

2. **Recruiter (કંપની/HR):**
   - **Email:** `recruiter@gmail.com`
   - **Password:** `123456`
   - **Role:** `recruiter`
   - **સુવિધાઓ:** કંપની પ્રોફાઇલ બનાવવી, નવી જોબ પોસ્ટ કરવી, મુકેલી જોબ્સ મેનેજ કરવી, આવેલી ઉમેદવારોની અરજીઓ જોવી, ઉમેદવારનો રિઝ્યુમ ચેક કરવો, અને સ્ટેટસ Accept/Reject કરવું.

3. **Admin (સિસ્ટમ એડમિન):**
   - **Email:** `admin@gmail.com`
   - **Password:** `123456`
   - **Role:** `admin`
   - **સુવિધાઓ:** પૂરી સિસ્ટમના લાઇવ આંકડા (Total Users, Seekers, Recruiters, Jobs, Applications), યુઝર્સને Suspend/Block અથવા Delete કરવા, બધી એપ્લિકેશન્સ મોનિટર કરવી.

---

## 🏃‍♂️ પ્રોજેક્ટ કેવી રીતે ચલાવવો (How to Run)

### ૧. Backend શરૂ કરવા:
ટર્મિનલમાં:
```bash
cd backend
npm run dev
```
*(Backend સર્વર `http://localhost:8000` પર શરૂ થશે)*

### ૨. Frontend શરૂ કરવા:
બીજા ટર્મિનલમાં:
```bash
cd frontend
npm run dev
```
*(Frontend `http://localhost:5173` પર ખૂલશે)*
# job-portal
