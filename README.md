# Helpdesk Management System

A modern Helpdesk Management System built with **Next.js 16**, **Prisma**, and **MongoDB** that enables employees to submit support tickets, technical staff to resolve issues, and managers to oversee the entire support workflow.

---

## 🚀 Features

### 👤 Authentication & Authorization

* Secure user authentication
* Role-based access control
* Protected dashboard routes
* Session management

### 🎫 Ticket Management

* Create support tickets
* View ticket details
* Update ticket status
* Assign tickets to technical staff
* Set ticket priority
* Categorize tickets

### 👥 User Roles

#### Employee

* Create new tickets
* View personal tickets
* Track ticket progress

#### Technical Employee

* View assigned tickets
* Update ticket status
* Resolve tickets

#### Manager

* View all tickets
* Assign tickets to employees
* Manage users
* Access reports and analytics

---

## 🛠 Tech Stack

### Frontend

* Next.js 16 (App Router)
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Next.js Server Actions
* Prisma ORM
* MongoDB

### Authentication

* Session-based authentication
* Role-based authorization

---

## 📂 Project Structure

```text
app/
├── dashboard/
├── login/
├── register/
├── reports/
├── tickets/
└── users/

components/
├── dashboard/
├── forms/
└── ui/

actions/
lib/
prisma/
public/
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Mahi122130/helpdesk-management.git
```

### Navigate into the project

```bash
cd helpdesk-management
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
DATABASE_URL=your_database_url
AUTH_SECRET=your_secret
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run database migrations 

```bash
npx prisma db push
```

### Start the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 📦 Build for Production

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## 🚀 Deployment

This project is ready for deployment on **Vercel**.

Before deploying:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all required environment variables.
4. Deploy.

---

## 📸 Screenshots

You can add screenshots here.

* Login Page
* Dashboard
* Ticket Management
* Reports
* User Management

---

## 🔮 Future Improvements

* Email notifications
* Real-time ticket updates
* Ticket comments
* File attachments
* Dashboard analytics
* Search and filtering
* Dark mode
* Audit logs

---

## 👩‍💻 Author

**Mahelet Yared**

GitHub: https://github.com/Mahi122130

---

## 📄 License

This project is intended for educational and portfolio purposes.
