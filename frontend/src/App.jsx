import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Public & Candidate Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './components/jobs/Jobs';
import JobDescription from './components/jobs/JobDescription';
import Profile from './components/seeker/Profile';

// Recruiter Pages
import Companies from './components/recruiter/Companies';
import CompanyCreate from './components/recruiter/CompanyCreate';
import CompanySetup from './components/recruiter/CompanySetup';
import AdminJobs from './components/recruiter/AdminJobs';
import PostJob from './components/recruiter/PostJob';
import Applicants from './components/recruiter/Applicants';

// Admin Page
import AdminDashboard from './components/admin/AdminDashboard';

// Guard
import ProtectedRoute from './components/ProtectedRoute';

const appRouter = createBrowserRouter([
    // Public routes
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/jobs', element: <Jobs /> },
    { path: '/description/:id', element: <JobDescription /> },

    // Job Seeker routes
    { 
        path: '/profile', 
        element: (
            <ProtectedRoute allowedRoles={['jobseeker', 'admin']}>
                <Profile />
            </ProtectedRoute>
        ) 
    },

    // Recruiter routes
    { 
        path: '/admin/companies', 
        element: (
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                <Companies />
            </ProtectedRoute>
        ) 
    },
    { 
        path: '/admin/companies/create', 
        element: (
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                <CompanyCreate />
            </ProtectedRoute>
        ) 
    },
    { 
        path: '/admin/companies/:id', 
        element: (
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                <CompanySetup />
            </ProtectedRoute>
        ) 
    },
    { 
        path: '/admin/jobs', 
        element: (
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                <AdminJobs />
            </ProtectedRoute>
        ) 
    },
    { 
        path: '/admin/jobs/create', 
        element: (
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                <PostJob />
            </ProtectedRoute>
        ) 
    },
    { 
        path: '/admin/jobs/:id/applicants', 
        element: (
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                <Applicants />
            </ProtectedRoute>
        ) 
    },

    // Super Admin route
    { 
        path: '/system/admin', 
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
            </ProtectedRoute>
        ) 
    },
]);

function App() {
    return <RouterProvider router={appRouter} />;
}

export default App;
