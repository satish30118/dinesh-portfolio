# 🎨 Portfolio Management Admin Panel

A **full-stack MERN application** that allows an **admin** to manage portfolio content, including **Home, Academics, Achievements, Publications, Conferences, and Gallery**.

🚀 **Live Demo**: [Click Here](https://pdinesh.vercel.app/)  

---

## 🏆 **Features**
✅ **Admin Authentication** (Secure JWT-based login)  
✅ **Home Page Management** (Update About section & upload images)  
✅ **Academics Management** (Add, edit, delete academic records)  
✅ **Achievements Management** (CRUD operations for achievements)  
✅ **Publications & Conferences Management** (Add & edit research work)  
✅ **Gallery Management** (Upload & delete images stored in cloud/local storage)  
✅ **Admin Profile Management** (Change password & update profile)  
✅ **JWT Token Auto-Refresh** (Prevents session expiry issues)  
✅ **Charts & Stats** (Visual analytics in the admin dashboard)  
✅ **Fully Responsive** (Mobile & Web support)  

---

## 🌟 **UI Preview**
### 📸 **Screenshots**
#### 🔐 **Admin Login**
#### 📊 **Admin Dashboard**
[![Admin Dashboard Stats](https://raw.githubusercontent.com/battezy/dinesh-portfolio/main/frontend/public/assets/preview%20(1).png)](https://github.com/battezy/dinesh-portfolio/blob/main/frontend/public/assets/preview%20(1).png)

#### 🖼 **Academics Management**
[![Academics Management](https://raw.githubusercontent.com/battezy/dinesh-portfolio/main/frontend/public/assets/preview%20(2).png)](https://github.com/battezy/dinesh-portfolio/blob/main/frontend/public/assets/preview%20(2).png)

#### 🔐 **Admin Profile**
[![Admin Profile](https://raw.githubusercontent.com/battezy/dinesh-portfolio/main/frontend/public/assets/preview%20(3).png)](https://github.com/battezy/dinesh-portfolio/blob/main/frontend/public/assets/preview%20(3).png)

#### 📸 **Publications Management**
[![Publications Management](https://raw.githubusercontent.com/battezy/dinesh-portfolio/main/frontend/public/assets/preview%20(4).png)](https://github.com/battezy/dinesh-portfolio/blob/main/frontend/public/assets/preview%20(4).png)

#### 🌟 **Achievements Management**
[![Achievements Management](https://raw.githubusercontent.com/battezy/dinesh-portfolio/main/frontend/public/assets/preview%20(5).png)](https://github.com/battezy/dinesh-portfolio/blob/main/frontend/public/assets/preview%20(5).png)

---

## 🛠 **Tech Stack**
### **Frontend (React + Vite)**
- React.js (Component-based UI)  
- React Router (For navigation)  
- Axios (For API requests)  
- Tailwind CSS / Normal CSS (For styling)  
- React Icons (For UI enhancement)  
- Recharts (For analytics charts)  

### **Backend (Node.js + Express)**
- Node.js & Express.js (REST API)  
- MongoDB + Mongoose (Database for storing portfolio content)  
- JSON Web Token (JWT) (Authentication & secure APIs)  
- Multer + Cloudinary (For file uploads)  
- bcrypt.js (For password hashing)  

---

## 🔥 **Setup Instructions**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/satish30118/dinesh-portfolio.git
cd dinesh-portfolio

cd server
npm install


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start

cd client
npm install

VITE_APP_BASE_URL=http://localhost:5000/api

npm run dev

