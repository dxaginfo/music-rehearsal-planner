# Music Rehearsal Planner

A comprehensive web application for bands and musical groups to efficiently schedule and manage rehearsals. The application automates scheduling, sends reminders, tracks attendance, and suggests optimal rehearsal times based on members' availability.

## 🎵 Features

### User Authentication & Profiles
- Create accounts and set up profiles with instruments, availability, and contact info
- Band profile creation with member management

### Rehearsal Scheduling
- Create and manage rehearsal events with date, time, location, and agenda
- View upcoming rehearsals in a calendar interface
- Indicate availability for proposed rehearsal times

### Smart Scheduling Algorithm
- Get intelligent suggestions for optimal rehearsal times based on all members' availability
- View availability heat maps to find the best times for everyone

### Attendance Tracking
- Confirm attendance for rehearsals
- Track attendance history for all band members

### Reminders & Notifications
- Receive email/push notifications about upcoming rehearsals
- Send automated reminders to all members before rehearsals

### Rehearsal Notes & Resources
- Attach sheet music and reference recordings to rehearsal events
- Add and share notes during or after rehearsals

### External Calendar Integration
- Sync rehearsal events with Google/Apple calendars

### Mobile Responsive Design
- Access the application seamlessly across devices

## 🚀 Technology Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Material-UI for UI components
- Vite for fast builds
- Jest and React Testing Library for testing

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Redis for caching and real-time data
- JWT with Auth.js for authentication
- WebSockets for real-time updates

### DevOps
- Docker for containerization
- GitHub Actions for CI/CD
- Vercel/Heroku/AWS for hosting

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB
- Redis (optional, for production)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/music-rehearsal-planner.git
cd music-rehearsal-planner
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# Create .env file in the server directory
cp server/.env.example server/.env
# Edit the .env file with your MongoDB connection string and other settings
```

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# In a new terminal, start frontend server
cd client
npm run dev
```

5. Access the application at `http://localhost:5173`

## 📝 Project Structure

```
music-rehearsal-planner/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux state management
│   │   ├── services/       # API service calls
│   │   ├── styles/         # CSS/SCSS styles
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Entry point
│   ├── .eslintrc.js        # ESLint configuration
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.ts      # Vite configuration
│
├── server/                 # Backend Node.js/Express application
│   ├── src/                # Source code
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB schema models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express application setup
│   ├── .env.example        # Example environment variables
│   ├── package.json        # Dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
│
├── .github/                # GitHub workflows
├── .gitignore              # Git ignore file
├── docker-compose.yml      # Docker Compose configuration
├── README.md               # Project documentation
└── package.json            # Root scripts and dependencies
```

## 🌟 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Project Plan Document](https://docs.google.com/document/d/14i2XtDNa4FqyRCVFPtuH2ZAEf8JAZtGzRhSrVsZ1Ivs/edit?usp=sharing)
- [GitHub Repository](https://github.com/dxaginfo/music-rehearsal-planner)
- [Issue Tracker](https://github.com/dxaginfo/music-rehearsal-planner/issues)

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the project maintainers.

---

Made with ❤️ for musicians by musicians