import React, { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import HeroSection from '../components/home/HeroSection';
import CategoryCarousel from '../components/home/CategoryCarousel';
import LatestJobs from '../components/home/LatestJobs';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    // If logged in as recruiter or admin, optionally route or show banner
    useEffect(() => {
        if (user?.role === 'admin') {
            navigate("/system/admin");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <CategoryCarousel />
                <LatestJobs />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
