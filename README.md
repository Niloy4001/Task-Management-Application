

# Task Management Application

A modern **Task Management Application** that allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. The tasks are categorized into three sections: **To-Do, In Progress, and Done**. All changes are instantly saved to a database for persistence.

## 🚀 Features

- ✅ **Add, Edit, Delete Tasks**
- 🔄 **Drag-and-Drop Reordering**
- 🔄 **Real-Time Synchronization with Database**
- 🌐 **Fully Responsive Design**
- 🎨 **Minimalistic & Clean UI**
- 🔥 **Instant Notifications with `react-hot-toast`**
- 📂 **Persistent Data Storage using Firebase**
- ⚡ **Optimized for Performance with `react-query`**

---

## 📌 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [Development](#development)
- [Contributors](#contributors)
- [License](#license)

---

## 🛠 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-manager.git
   ```
2. Navigate into the project folder:
   ```sh
   cd task-manager/client
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

## 🚀 Usage

1. Open the application in your browser (default: `http://localhost:5173`).
2. Add tasks under the **To-Do** section.
3. Drag and drop tasks between **To-Do**, **In Progress**, and **Done** sections.
4. Click on a task to edit or delete it.
5. All changes will be saved in real-time.

---

## 🏗 Tech Stack

| **Technology**  | **Purpose**                                   |
|----------------|----------------------------------------------|
| **React**      | Frontend UI Development                     |
| **TailwindCSS** | Styling & Responsive Design                |
| **DaisyUI**    | Pre-built UI Components                     |
| **Firebase**   | Backend & Real-time Database               |
| **React Query** | Data Fetching & Caching                    |
| **Axios**      | API Requests                                |
| **SweetAlert2** | User-friendly Alerts & Confirmations       |

---

## ⚙️ Configuration

### Firebase Setup:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** for real-time data persistence.
3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

---

## 💻 Development

### Scripts:
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Run Linter**: `npm run lint`
- **Preview Production Build**: `npm run preview`




