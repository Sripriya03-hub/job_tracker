# 🎯 Job Tracker

A full stack job tracking application with AI integration, built to help job seekers manage and track their applications efficiently.

![Job Tracker](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)

---

## 🚀 Features

- **Track Applications** — Add, edit and delete job applications
- **Status Management** — Track status (Applied, Interview, Accepted, Rejected)
- **AI Job Advisor** — Get personalized AI advice for each application using Groq LLaMA
- **Dashboard Stats** — Real time stats showing total applications, interviews, accepted and rejected
- **Quick Tips** — Job search tips displayed on the dashboard
- **Quote of the Day** — Daily motivational quotes with auto rotation
- **Responsive Design** — Works on desktop, tablet and mobile

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Responsive design with CSS Grid and Flexbox

**Backend:**
- Node.js
- Express.js
- REST API (GET, POST, PUT, DELETE)

**Database:**
- MongoDB Atlas (Cloud)
- Mongoose ODM

**AI Integration:**
- Groq API
- LLaMA 3.1 8B Model

**DevOps:**
- Docker
- GitHub Actions (CI/CD)

---

## 📸 Screenshots

### Dashboard Overview

<img width="1904" height="863" alt="Screenshot 2026-04-09 124341" src="https://github.com/user-attachments/assets/14a8ead0-1178-4db5-80fd-8d51e5e188e8" />

### Stats Bar

<img width="1903" height="204" alt="Screenshot 2026-04-09 124355" src="https://github.com/user-attachments/assets/64cffbce-9e3a-496d-bb17-de6a0f0011bc" />

### Application List

<img width="1892" height="337" alt="Screenshot 2026-04-09 124414" src="https://github.com/user-attachments/assets/67a6071d-4daa-4c5c-b626-8e23d53469c8" />

### AI Job Advisor

<img width="1879" height="432" alt="Screenshot 2026-04-09 124432" src="https://github.com/user-attachments/assets/14e9a8aa-4c0f-4962-b25b-46dcd31db2ce" />
---


## ⚙️ Installation and Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key
- Docker (optional)

### Local Setup

**1. Clone the repository:**
```bash
git clone https://github.com/Sripriya03-hub/job_tracker.git
cd job_tracker
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file:**
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key

**4. Run the application:**
```bash
node server.js
```

**5. Open your browser:**
http://localhost:3000

---

### 🐳 Docker Setup

**1. Build the Docker image:**
```bash
docker build -t job-tracker .
```

**2. Run the container:**
```bash
docker run -p 3000:3000 --env-file .env job-tracker
```

**3. Open your browser:**
http://localhost:3000

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | Fetch all job applications |
| POST | `/jobs` | Add a new job application |
| PUT | `/jobs/:id` | Update an existing application |
| DELETE | `/jobs/:id` | Delete an application |
| POST | `/ai/advice` | Get AI advice for an application |

---

## 🗂️ Project Structure
job_tracker/
├── models/
│   └── Job.js          # MongoDB Job Schema
├── routes/
│   └── ai.js           # AI advice route
├── public/
│   ├── index.html      # Frontend HTML
│   ├── style.css       # Styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server
├── Dockerfile          # Docker configuration
├── .dockerignore       # Docker ignore file
├── .gitignore          # Git ignore file
└── README.md           # Project documentation

---

## 🤖 AI Feature

The AI Job Status Advisor uses **Groq's LLaMA 3.1 8B model** to provide personalized advice based on:
- Company name
- Job title
- Application status
- Date applied

Simply click the **"AI 🤖"** button on any job row to get instant actionable advice!

---

## 👩‍💻 Author

**Sripriya Srikanth**
- GitHub: [@Sripriya03-hub](https://github.com/Sripriya03-hub)
- LinkedIn: [Sripriya Srikanth](https://www.linkedin.com/in/sripriya-srikanth-)
- Email: ss5632@nau.edu

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


