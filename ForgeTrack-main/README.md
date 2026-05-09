<div align="center">
  <div style="background-color: #6366f1; width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
    <span style="color: white; font-size: 32px; font-weight: bold; font-family: sans-serif;">F</span>
  </div>
  <h1>ForgeTrack</h1>
  <p><strong>A Modern, Intelligent Attendance & Academic Tracking System</strong></p>

  [![React](https://img.shields.io/badge/React-19.2.5-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E.svg?style=for-the-badge&logo=supabase)](https://supabase.io/)
</div>

<hr>

## 📖 Overview

ForgeTrack is a state-of-the-art attendance tracking and academic management platform built for modern educational environments. It bridges the gap between Mentors (Teachers) and Students by providing a clean, responsive, and highly intuitive dashboard. 

With ForgeTrack, manual attendance sheets are a thing of the past. Mentors can manage classes, mark attendance in real-time, upload class materials, and analyze attendance trends. Students gain full visibility into their academic progress, upcoming sessions, and can easily submit leave requests.

## ✨ Key Features

### 👨‍🏫 For Mentors (Teachers / Admins)
- **Comprehensive Dashboard:** Get a bird's-eye view of all classes, overall attendance percentages, and pending student requests.
- **Real-Time Attendance Marking:** Quickly mark students as Present, Absent, or Late during active sessions.
- **Student History Tracking:** Dive deep into individual student records to identify attendance trends or issues.
- **Class Material Management:** Upload, organize, and share documents, slides, and study materials with specific classes.
- **Leave Request Approvals:** A dedicated inbox to review, approve, or reject student leave requests with ease.
- **Schedule Classes:** Create and manage upcoming sessions on a centralized calendar.
- **Data Analytics & Export:** Generate detailed attendance reports and bulk-upload student data via CSV.

### 🎓 For Students
- **Personalized Dashboard:** See exactly where you stand with a visual breakdown of your attendance percentage.
- **My Attendance:** View a historical log of every class attended or missed.
- **Upcoming Sessions:** Never miss a class with a clear schedule of upcoming academic sessions.
- **Resource Center (Class Materials):** Directly download materials provided by your mentor for your specific classes.
- **Leave Requests:** Submit requests for excused absences directly through the platform, complete with reasoning and dates.
- **Profile Management:** Manage personal details and account settings.

## 🛠️ Technology Stack

**Frontend Architecture:**
- **React (v19):** Component-based UI development.
- **Vite:** Next-generation frontend tooling for lightning-fast HMR and optimized builds.
- **Tailwind CSS:** Utility-first CSS framework for rapid, responsive, and consistent styling.
- **React Router (v7):** Dynamic client-side routing.
- **Lucide React:** Beautiful, consistent iconography.
- **Radix UI:** Accessible, unstyled UI primitives.

**Backend & Data:**
- **Supabase:** Open-source Firebase alternative providing a PostgreSQL database, Authentication, and real-time subscriptions.
- **PapaParse & SheetJS:** Robust parsing for CSV and XLSX files for bulk data uploads.

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18.0.0 or higher recommended)
- Git
- A [Supabase](https://supabase.com/) account (for database and authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/prathikshavpoojary6-hue/forgetrack.git
cd forgetrack
```

### 2. Frontend Setup
Navigate into the frontend directory and install the necessary dependencies:
```bash
cd frontend
npm install
```

### 3. Environment Configuration
You need to connect the frontend to your Supabase instance. Create a `.env` file in the `frontend` directory:
```bash
touch .env
```

Add your Supabase credentials to the `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*(You can find these in your Supabase Dashboard under Project Settings > API).*

### 4. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```text
ForgeTrack/
├── frontend/                 # React Application
│   ├── public/               # Static assets
│   ├── src/                  # Application source code
│   │   ├── components/       # Reusable UI components (Sidebar, Layout, etc.)
│   │   ├── pages/            # Page-level components for routing
│   │   ├── lib/              # Utility functions and Supabase client
│   │   ├── App.jsx           # Main application entry point
│   │   └── main.jsx          # React DOM rendering
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite bundler configuration
├── backend/                  
│   └── supabase/             # Supabase database schemas and seed files
└── README.md                 # Project documentation
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Designed and built with precision to make academic tracking effortless.*
