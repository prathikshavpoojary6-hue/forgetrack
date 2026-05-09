# ForgeTrack

ForgeTrack is a modern, responsive Attendance Tracking System built with React, Vite, Tailwind CSS, and Supabase. It provides dedicated interfaces for both Mentors and Students to manage, track, and review attendance efficiently.

## Features

### For Students:
- **Dashboard:** Overview of personal attendance and academic progress.
- **My Attendance:** Detailed breakdown of past attendance history.
- **Upcoming Sessions:** View scheduled classes and events.
- **Class Materials:** Access resources provided by mentors.
- **Leave Requests:** Submit requests for excused absences directly to mentors.
- **Profile Settings:** Manage personal account information.

### For Mentors (Teachers):
- **Dashboard:** A bird's-eye view of all classes and general attendance stats.
- **Mark Attendance:** Easily mark students present, absent, or late for current sessions.
- **Student History:** Review comprehensive attendance logs for individual students.
- **Materials:** Upload and manage class resources.
- **Leave Approvals:** Review and approve/deny student leave requests.
- **Schedule Classes:** Set up and manage upcoming sessions.
- **Analytics & Reports:** Generate attendance trends and export data via CSV.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router v7
- **Backend / Database:** Supabase, PostgreSQL
- **Icons & UI:** Lucide React, Radix UI
- **Data Processing:** PapaParse (CSV parsing), SheetJS (XLSX parsing)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A Supabase account and project

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `frontend` directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` to see the application running.

## Project Structure

- `src/components/` - Reusable React components (like the Layout and Sidebar).
- `src/pages/` - Individual page views for different routes.
- `src/lib/` - Utility functions and Supabase configuration.

## License

This project is licensed under the MIT License.
