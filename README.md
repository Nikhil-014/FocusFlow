# 🚀 FocusFlow – Productivity & Task Management App

**FocusFlow** is a modern and responsive productivity web application designed to help users organize their daily tasks, manage their time, and track their productivity.

The application provides secure user authentication and an interactive task management dashboard with a clean, minimal green-and-white interface.

## 🌐 Live Demo

https://shimmering-gaufre-9749f0.netlify.app/

## ✨ Features

### 🔐 User Authentication

- User registration (Sign Up).
- User login (Sign In).
- Email confirmation through Supabase.
- Secure authentication using Supabase Auth.
- Sign Out functionality.

### 📋 Task Management

- Add new tasks.
- Add task descriptions.
- Set task due dates.
- Edit existing tasks.
- Delete tasks.
- Mark tasks as completed.
- View pending and completed task statuses.

### 📊 Productivity Dashboard

- Display total tasks.
- Track completed tasks.
- Track pending tasks.
- Automatically calculate productivity progress.
- Personalized dashboard for logged-in users.

### 💾 Local Data Storage

- Save tasks using browser localStorage.
- Maintain tasks after refreshing the page.
- Store tasks separately for each logged-in user in the same browser.

### 📱 Responsive Design

- Clean and modern user interface.
- Green-and-white color theme.
- Responsive dashboard layout.
- User-friendly forms and navigation.

## 🛠️ Technologies Used

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| HTML5         | Website structure                 |
| CSS3          | Styling and responsive design     |
| JavaScript    | Application functionality         |
| React.js      | Frontend development              |
| Vite          | Development server and build tool |
| Supabase Auth | User authentication               |
| localStorage  | Local task storage                |
| Git & GitHub  | Version control                   |

## 📂 Project Structure

```text
FocusFlow/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── Auth.css
│   │   ├── SignIn.jsx
│   │   ├── SignIn.css
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   │
│   ├── lib/
│   │   └── supabaseClient.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run FocusFlow on your local machine.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd FocusFlow
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Supabase

Create a Supabase project:

[https://supabase.com/](https://supabase.com/)

Get your:

- Supabase Project URL.
- Supabase Publishable Key.

Create a `.env` file in the root directory.

Add your credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Make sure the variable names match those used in your `supabaseClient.js` file.

**Security:** Never upload secret API keys or passwords to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## 🔑 Authentication Setup

FocusFlow uses Supabase Authentication.

1. Create a Supabase account.
2. Create a new project.
3. Configure your Project URL and Publishable Key.
4. Enable Email authentication.
5. Configure your email confirmation settings.
6. Run the application and create an account.

## 💾 Data Storage

FocusFlow currently uses browser localStorage to store user tasks.

- No separate task database is required.
- Tasks are stored locally in the browser.
- Tasks remain available after refreshing the page.
- Each user has a separate localStorage key.

**Note:** Tasks do not synchronize across different browsers or devices. Clearing browser storage can permanently remove locally stored tasks.

## 🚀 Future Improvements

The following features are planned for future development:

- [ ] Task filtering (All, Pending, Completed).
- [ ] Search tasks by title.
- [ ] Clear all completed tasks.
- [ ] Daily goal management.
- [ ] Advanced productivity analytics.
- [ ] Task priority management.
- [ ] Dark mode.
- [ ] Improved dashboard experience.
- [ ] Mobile UI enhancements.

## 🎯 Project Objective

The main objective of FocusFlow is to develop a simple and user-friendly productivity application that helps users organize their daily activities, manage tasks efficiently, and monitor their progress.

This project also demonstrates practical implementation of React.js, JavaScript, authentication, component-based architecture, and browser localStorage.

**Made with ❤️ using React.js**
