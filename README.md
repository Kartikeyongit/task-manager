# 🚀 TaskFlow - Modern Task Management App

Modern task management app with MERN stack & Next.js

## ✨ Features

### ✅ **Core Features**
- **User Authentication** - Secure registration/login with JWT tokens
- **Task Management** - Create, read, update, delete tasks with due dates
- **Advanced Filtering** - Filter by category, priority, status, and search
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark/Light Mode** - Automatic theme detection with system preferences
- **Real Database** - MongoDB Atlas with Mongoose ODM
- **Form Validation** - Client & server-side validation for all forms
- **Toast Notifications** - Instant feedback for user actions

### 🎨 **UI/UX Features**
- Modern, clean interface with Tailwind CSS
- Interactive sidebar navigation
- Drag-and-drop ready task components
- Loading states & skeleton screens
- Error boundaries & graceful error handling
- Accessibility focused design

## 🏗️ **Tech Stack**

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon library

### **Backend**
- **Node.js** & **Express.js** - REST API server
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (free tier available)

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Kartikeyongit/task-manager.git
cd task-manager
```

2. **Backend Setup**
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
npm run dev
```
3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
## **Access the application**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 📁 **Project Structure**
```text
task-manager/
├── backend/                 # Express.js REST API
│   ├── src/
│   │   ├── models/         # MongoDB schemas (User, Task)
│   │   ├── routes/         # API routes (auth, tasks)
│   │   ├── middleware/     # Authentication middleware
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Express server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Next.js 14 Application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   │   ├── (auth)/    # Authentication pages
│   │   │   ├── dashboard/ # Dashboard & subpages
│   │   │   ├── layout.tsx # Root layout
│   │   │   └── page.tsx   # Homepage
│   │   ├── components/    # React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   ├── tasks/     # Task-related components
│   │   │   ├── layout/    # Layout components
│   │   │   └── shared/    # Shared components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities & API client
│   │   ├── providers/     # Context providers
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   ├── package.json
│   └── tailwind.config.ts
│
└── README.md              # This file
```

## 🔧 **Environment Variables**
### **Backend (.env)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```
### **Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📸 **Screenshots**
### **Login Screen**
<img width="1850" height="1009" alt="Screenshot 2025-12-03 173658" src="https://github.com/user-attachments/assets/cbb98965-7f2a-4329-881b-2969b4b13c01" />

### **Dashboard**	
<img width="1832" height="1004" alt="Screenshot 2025-12-03 173728" src="https://github.com/user-attachments/assets/13183595-e137-40b7-b64e-e1b215f60671" />

### **Task Creation**
<img width="1825" height="1006" alt="Screenshot 2025-12-03 173755" src="https://github.com/user-attachments/assets/47e2108b-1219-4766-a750-5e625d48b439" />


## 📊 **API Documentation**
### **Authentication**
- **POST** /api/auth/register - Register new user
- **POST** /api/auth/login - Login user
- **GET** /api/auth/me - Get current user (protected)

### **Tasks (Protected Routes)**
- **GET** /api/tasks - Get all tasks for user (with filters)
- **POST** /api/tasks - Create new task
- **PUT** /api/tasks/:id - Update task
- **DELETE** /api/tasks/:id - Delete task
- **GET** /api/tasks/stats - Get task statistics

### **Health Check**
- **GET** /health - API health status

## 🚢 **Deployment**
### **Backend Deployment (Render/Railway)**
- Push code to GitHub
- Create new Web Service on Render
- Set root directory to backend
- Build command: npm install && npm run build
- Start command: npm start
- Add environment variables

### **Frontend Deployment (Vercel)**
- Import repository to Vercel
- Set root directory to frontend
- Set build command: npm run build
- Add environment variable: NEXT_PUBLIC_API_URL
- Deploy!

🧪 Testing
```bash
# Test backend API
cd backend
npm run dev
# Test endpoints with Postman or curl

# Test frontend
cd frontend
npm run dev
# Open http://localhost:3000
```

## 🚧 **Future Enhancements**
- Real-time updates with WebSockets
- File attachments for tasks
- Email notifications for due dates
- Calendar view integration
- Team collaboration features
- Mobile app with React Native
- Export/Import tasks (CSV, PDF)
- Advanced analytics dashboard
- Recurring tasks functionality
- Task templates for quick creation

## 🤝 **Contributing**
- Fork the repository
- Create a feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## 📄 **License**
Distributed under the MIT License. See LICENSE file for more information.

## 👨‍💻 **Author**
- Kartikey Gautam
- GitHub: @kartikey-gautam
- LinkedIn: Kartikey Gautam
- Portfolio: [Coming Soon]

## 🙏 **Acknowledgments**
- Next.js Documentation
- Tailwind CSS
- MongoDB Atlas
- React Query
- Lucide Icons
- React Hook Form

## ⭐ **Show Your Support**
Give a ⭐️ if this project helped you!

### **Built with ❤️ using the MERN stack & Next.js**
