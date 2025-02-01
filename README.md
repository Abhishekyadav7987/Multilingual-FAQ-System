# 🌍 Multilingual FAQ Service

Welcome to the **Multilingual FAQ Service**! 🚀 This backend system is built using **Node.js, Express, MongoDB**, and **Redis** to manage frequently asked questions with seamless multilingual support. 🌏

---

## 🚀 Key Features

- 📄 **Full CRUD Operations** for FAQs
- 🌐 **Multi-language Support** (English, Hindi, Bengali)
- 🔑 **Role-Based Access Control (RBAC)** for Admin & Users
- ⚡ **High-speed Caching** using Redis
- 🔐 **Secure JWT Authentication** for access management

---

## 🛠️ Getting Started

### 📥 Clone the Repository

```sh
$ git clone https://github.com/YourUsername/Multilingual-FAQ-Service.git

$ cd Backend
```

### 📦 Install Dependencies

```sh
$ npm install
```

### 🔧 Configure Environment Variables

Create a `.env` file and add the following:

```env
PORT=4000
MONGODB_URI=
REDIS_PORT=
REDIS_URL=
REDIS_USERNAME=
REDIS_PASSWORD=
JWT_SECRET=
```

### ▶ Start the Server

```sh
$ npm start
```

The API is now live at: **[http://localhost:4000](http://localhost:4000)** 🎉

---

## 🔌 API Endpoints

### 🛡️ Authentication

#### 🆕 Register
```http
POST /api/auth/signup
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpassword",
  "role": "admin"
}
```

#### 🔑 Login
```http
POST /api/auth/signin
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```
**Response:**
```json
{
  "token": "your_jwt_token",
  "role": "admin"
}
```

### 📚 FAQ Management

#### 📌 Retrieve All FAQs
```http
GET /api/faqs
```
**Optional Language Query:**
```http
/api/faqs?lang=bn  # Bengali FAQs
```

#### ➕ Add a FAQ (Admin Only)
```http
POST /api/faqs
```
**Headers:**
```http
Authorization: Bearer <your_token>
```
**Request Body:**
```json
{
  "question": "What is the capital of Spain?",
  "answer": "The capital of Spain is Madrid."
}
```

#### ✏️ Edit a FAQ (Admin Only)
```http
PUT /api/faqs/:id
```
**Headers:**
```http
Authorization: Bearer <your_token>
```

#### ❌ Remove a FAQ (Admin Only)
```http
DELETE /api/faqs/:id
```
**Headers:**
```http
Authorization: Bearer <your_token>
```

---

## 🔐 Role-Based Permissions

- **User** ➝ Can only read FAQs
- **Admin** ➝ Can create, edit, and delete FAQs

---

## 🏗️ Tech Stack

- **Node.js** & **Express.js** 🚀
- **MongoDB & Mongoose** 🍃
- **Redis Caching** ⚡
- **JWT Authentication** 🔑
- **Google Translate API** 🌍

---

## 🚀 Upcoming Features

- ✅ Enhanced error handling & validation
- ✅ Additional language support
- ✅ FAQ pagination

---

## 🤝 Contribute

Want to help? Fork the repository and send a PR! 🚀

---

## 📜 License

This project is released under the **MIT License**. 📝

---

### 💡 Developed with passion by Abhishek Yadav

