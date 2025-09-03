# 🛍️ MERN Stack E‑Commerce App

A full‑stack e‑commerce web application built with the **MERN** stack — **MongoDB**, **Express.js**, **React**, and **Node.js** — featuring user authentication, product browsing, product details and cart management

---

## 🚀 Features

### **Frontend (React)**
- Responsive UI built with **Tailwind CSS**
- Product listing with pagination
- Product search with debounced input
- Product detail pages with image sliders
- Add to cart, update quantity, remove items
- User profile management
- Mobile‑friendly navigation

### **Backend (Node.js + Express)**
- RESTful API endpoints
- JWT‑based authentication & authorization
- Secure password hashing with bcrypt
- CRUD operations for products and users
- MongoDB database with Mongoose ODM
- Environment‑based configuration

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt

---

## 🖼️ UI Preview

### 🖥 Desktop Views
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/0241057e-191c-4018-8884-f57f2c1b301a" alt="Home Page" width="400"/>
        <br/><sub>Home Page</sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/094513e0-04d1-4675-bd0d-f1a5f534afa4" alt="Profile Page" width="400"/>
        <br/><sub>Profile Page</sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/6856d618-a742-4540-84ee-00c33b6730bc" alt="About Page" width="400"/>
        <br/><sub>About Page</sub>
      </td>
    </tr>
  </table>
</div>

---

### 📱 Mobile Views
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/008ab956-b343-48cb-9029-5a5c804522f0" alt="Mobile View 1" width="200"/>
        <br/><sub>Mobile View 1</sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/2416c5c5-0dd7-443f-b5d8-95d4d8b1aedd" alt="Mobile View 2" width="200"/>
        <br/><sub>Mobile View 2</sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/71c0fc02-d703-4a44-ba87-284c50dd23e7" alt="Mobile View 3" width="200"/>
        <br/><sub>Mobile View 3</sub>
      </td>
    </tr>
  </table>
</div>



## 📦 How to Use / Run This Project Locally

Follow these steps to get a local copy of the project up and running.

### 1️⃣ Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

cd one (backend)
npm install

Set up environment variables
- Create a .env file in the one/ folder for backend variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

cd two (frontend)
npm install

Create a .env file in the client/ folder for frontend variables
REACT_APP_API_URL=http://localhost:5000/api

## 🏃‍♂️ Run the application

cd one (backend)
- npm start

cd two (frontend)
- npm run dev

