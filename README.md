# Employee Manager

A modern and minimal **full-stack Employee Management Application** built with **MERN stack** and **ShadCN UI**.  
It allows an **admin** to register, log in, and manage employees securely with JWT-based authentication.

## 🚀 Features
- Admin Registration & Login
- JWT Authentication & Protected Routes
- Add, Edit, View, and Delete Employees
- Role-based Access (Only logged-in admins can manage employees)
- Beautiful UI with **ShadCN components**
- Responsive and mobile-friendly design

## 🛠 Tech Stack
**Frontend:** React (Vite), React Router, React Hook Form, ShadCN UI, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT, bcryptjs

## 📂 Project Structure
```
Backend/
  models/
  routes/
  main.js
Frontend/
  src/
    components/
    pages/
    main.jsx
```

## ⚙️ Setup & Installation
1. Clone the repository
   ```bash
   git clone https://github.com/Mohd-Nabeel-git/Employee_manager.git
   ```
2. Install dependencies for backend & frontend
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```
3. Create `.env` in the **Backend** folder:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Run the backend:
   ```bash
   cd Backend
   npm run dev
   ```
5. Run the frontend:
   ```bash
   cd Frontend
   npm run dev
   ```
