# EventFlow

EventFlow is a comprehensive, modern, and highly interactive event management platform built with Next.js and React. It provides specialized, role-based experiences for Organizers, Attendees, and Volunteers, ensuring smooth operations from event planning to real-time check-ins.

## 🚀 Features

### 🎭 Role-Based Dashboards
EventFlow intelligently adapts to the user's role:
- **Organizer Dashboard:** A high-level control center for creating events, managing attendees, monitoring ticket sales, assigning tasks to volunteers, and viewing real-time analytics.
- **Attendee Dashboard:** A personalized hub for users to view their upcoming events, access purchased tickets, browse an event directory, and receive notifications.
- **Volunteer Dashboard:** A specialized terminal equipped with tools for on-the-ground operations, including task lists, shift schedules, and an integrated QR scanner for rapid check-ins.

### 🎟️ Ticketing & Check-In
- **QR Code Integration:** Seamless, built-in QR code scanning using `html5-qrcode` directly from the volunteer dashboard for frictionless entry management.
- **Passes & Tickets Wallet:** Attendees can easily view and manage all their event passes in a unified digital wallet.

### 📋 Volunteer Operations
- **Task Management:** Real-time task assignment and tracking utilizing Zustand for state management.
- **Shift Scheduling:** Dynamic shift rosters to ensure all event stations are adequately staffed.

### 🎨 Modern UI/UX
- **Responsive Design:** Beautiful, fluid interfaces built with Tailwind CSS that adapt perfectly across desktop, tablet, and mobile devices.
- **Fluid Animations:** Smooth transitions and interactions powered by Framer Motion.
- **Sleek Component Library:** Utilizing Lucide React for consistent, crisp iconography.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **QR Scanning:** [html5-qrcode](https://github.com/mebjas/html5-qrcode)

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amogh-agrahari-dev/eventflow.git
```

2. Navigate to the project directory:
```bash
cd eventflow
```

3. Install the dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/pages`: Contains the core routing and pages (Dashboards, Authentication, Event Creation, etc.).
- `/components`: Reusable UI components categorized by feature (e.g., `/dashboard`, `/general`, `/volunteer`).
- `/store`: Zustand stores for managing global state like User Sessions and Task tracking.
- `/styles`: Global CSS and Tailwind configurations.
- `/public`: Static assets such as images and icons.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📄 License
This project is licensed under the MIT License.
