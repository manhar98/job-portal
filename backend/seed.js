import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for multi-industry seeding...");

        // Clean existing
        await User.deleteMany();
        await Company.deleteMany();
        await Job.deleteMany();
        await Application.deleteMany();

        // 1. Create Users
        const hashedPassword = await bcrypt.hash("123456", 10);

        const seeker = await User.create({
            fullname: "Rahul Sharma",
            email: "seeker@gmail.com",
            phoneNumber: "9876543210",
            password: hashedPassword,
            role: "jobseeker",
            profile: {
                bio: "Experienced professional seeking new growth opportunities in tech, marketing or operations.",
                skills: ["React", "JavaScript", "Digital Marketing", "Accounting", "Customer Support"],
                resumeOriginalName: "Rahul_Sharma_Resume.pdf"
            }
        });

        const recruiter = await User.create({
            fullname: "Priya Patel (HR & Recruitment)",
            email: "recruiter@gmail.com",
            phoneNumber: "9123456780",
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "Head of Talent Acquisition across multiple business sectors."
            }
        });

        const admin = await User.create({
            fullname: "System Administrator",
            email: "admin@gmail.com",
            phoneNumber: "9998887770",
            password: hashedPassword,
            role: "admin",
            profile: {
                bio: "Master administrator for JobSphere Portal."
            }
        });

        console.log("Users created successfully!");

        // 2. Create Companies across industries
        const company1 = await Company.create({
            name: "Apex Global Infotech",
            description: "Leading software engineering and cloud consulting company.",
            website: "https://apexinfotech.io",
            location: "Ahmedabad, Gujarat",
            userId: recruiter._id
        });

        const company2 = await Company.create({
            name: "Zenith Marketing & Media",
            description: "Award-winning digital marketing, branding and performance advertising agency.",
            website: "https://zenithmedia.com",
            location: "Mumbai, Maharashtra",
            userId: recruiter._id
        });

        const company3 = await Company.create({
            name: "FinSecure Capital & Accounts",
            description: "Premier financial auditing, tax management, and wealth consulting firm.",
            website: "https://finsecure.org",
            location: "Ahmedabad, Gujarat",
            userId: recruiter._id
        });

        const company4 = await Company.create({
            name: "MediCare Health Solutions",
            description: "Healthcare network providing clinical services and health tech solutions.",
            website: "https://medicarehealth.in",
            location: "Bangalore, Karnataka",
            userId: recruiter._id
        });

        console.log("Companies created successfully!");

        // 3. Create Diverse Jobs (IT, Marketing, Finance, HR, Design, Healthcare, Customer Care)
        const jobsToInsert = [
            // IT & Software
            {
                title: "Frontend React Developer",
                description: "Build modern, responsive web applications using React, Tailwind CSS, and REST APIs. Experience with state management is a plus.",
                requirements: ["React.js", "JavaScript", "Tailwind CSS", "HTML/CSS"],
                salary: 7,
                experienceLevel: "1-3 Years",
                location: "Ahmedabad",
                category: "IT & Software",
                jobType: "Full-Time",
                position: 2,
                company: company1._id,
                created_by: recruiter._id
            },
            {
                title: "Python & AI Backend Developer",
                description: "Develop scalable backend services and integrate AI/ML APIs into enterprise platforms. Knowledge of Django/FastAPI and MongoDB required.",
                requirements: ["Python", "FastAPI", "MongoDB", "REST APIs", "Machine Learning"],
                salary: 10,
                experienceLevel: "2-4 Years",
                location: "Remote",
                category: "IT & Software",
                jobType: "Full-Time",
                position: 1,
                company: company1._id,
                created_by: recruiter._id
            },
            // Marketing & Sales
            {
                title: "Digital Marketing Specialist",
                description: "Lead SEO, Google Ads, and social media campaigns to drive organic and paid growth. Analyze ROI and optimize conversion funnels.",
                requirements: ["SEO", "Google Ads", "Social Media Marketing", "Content Strategy", "Analytics"],
                salary: 5,
                experienceLevel: "1-2 Years",
                location: "Mumbai",
                category: "Marketing & Sales",
                jobType: "Full-Time",
                position: 2,
                company: company2._id,
                created_by: recruiter._id
            },
            {
                title: "Business Development Executive (BDE)",
                description: "Identify new client prospects, build B2B relationships, schedule sales calls, and close service deals across regional markets.",
                requirements: ["B2B Sales", "Client Communication", "Negotiation", "Lead Generation"],
                salary: 4.5,
                experienceLevel: "0-2 Years",
                location: "Ahmedabad",
                category: "Marketing & Sales",
                jobType: "Full-Time",
                position: 3,
                company: company2._id,
                created_by: recruiter._id
            },
            // Finance & Accounts
            {
                title: "Senior Accountant & Tax Consultant",
                description: "Manage GST filings, balance sheets, payroll processing, and internal audits. Proficiency in Tally Prime, Excel and financial compliance is required.",
                requirements: ["Tally Prime", "GST & TDS", "Financial Auditing", "Advanced Excel"],
                salary: 6,
                experienceLevel: "2-5 Years",
                location: "Ahmedabad",
                category: "Finance & Accounts",
                jobType: "Full-Time",
                position: 1,
                company: company3._id,
                created_by: recruiter._id
            },
            // Human Resources
            {
                title: "HR Executive / Talent Acquisition",
                description: "Handle end-to-end recruitment, candidate screening, scheduling interviews, employee onboarding, and culture engagement initiatives.",
                requirements: ["Recruitment", "Interviewing", "Communication", "HR Policies", "LinkedIn Sourcing"],
                salary: 4,
                experienceLevel: "1-2 Years",
                location: "Ahmedabad",
                category: "Human Resources",
                jobType: "Full-Time",
                position: 1,
                company: company1._id,
                created_by: recruiter._id
            },
            // Design & Creative
            {
                title: "Graphic & UI/UX Designer",
                description: "Create stunning social media creatives, branding assets, wireframes, and mobile/web app prototypes using Figma, Photoshop, and Illustrator.",
                requirements: ["Figma", "Adobe Photoshop", "Illustrator", "UI/UX Principles", "Creativity"],
                salary: 5.5,
                experienceLevel: "1-3 Years",
                location: "Remote",
                category: "Design & Creative",
                jobType: "Full-Time",
                position: 2,
                company: company2._id,
                created_by: recruiter._id
            },
            // Healthcare & Medical
            {
                title: "Medical Representative & Health Associate",
                description: "Meet healthcare practitioners, introduce new diagnostic and pharmaceutical products, and organize clinical presentation seminars.",
                requirements: ["Pharma Knowledge", "Client Relations", "Field Sales", "Presentation Skills"],
                salary: 4.2,
                experienceLevel: "0-2 Years",
                location: "Bangalore",
                category: "Healthcare",
                jobType: "Full-Time",
                position: 2,
                company: company4._id,
                created_by: recruiter._id
            },
            // Customer Service & Operations
            {
                title: "Customer Success & Operations Lead",
                description: "Manage client queries via email, phone, and chat. Ensure smooth resolution of customer issues and maintain exceptional satisfaction ratings.",
                requirements: ["Customer Support", "CRM Tools", "Problem Solving", "Fluent English & Hindi"],
                salary: 3.8,
                experienceLevel: "0-1 Year",
                location: "Ahmedabad",
                category: "Customer Support",
                jobType: "Full-Time",
                position: 3,
                company: company3._id,
                created_by: recruiter._id
            }
        ];

        const createdJobs = await Job.insertMany(jobsToInsert);
        console.log(`Inserted ${createdJobs.length} diverse jobs across all industries!`);

        // Create initial application for demo
        const app1 = await Application.create({
            job: createdJobs[0]._id,
            applicant: seeker._id,
            status: "pending",
            resume: ""
        });
        createdJobs[0].applications.push(app1._id);
        await createdJobs[0].save();

        console.log("Seeding finished successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
