# 🎓 Course Learning App (LMS Backend)

A robust and scalable Learning Management System (LMS) backend built with Node.js, Express, MongoDB, and TypeScript. This API connects students and teachers through structured courses, lessons, topics, quizzes, and performance tracking.

---

## 🚀 Features

### 👥 Authentication & User Roles

- Secure user registration and login
- Role-based access control: **Student** and **Teacher**

### 🎯 Teacher Capabilities

- Create, update, delete Courses, Lessons, Topics
- Add Quizzes to Topics
- View analytics: student engagement, likes, feedback
- Track student progress and quiz results

### 📚 Student Capabilities

- Enroll in and follow courses
- Like and provide feedback on courses
- Mark topics as completed (progress tracking)
- Attempt quizzes and view results
- Follow teachers

---

## 🧰 Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Backend        | Node.js, Express               |
| Language       | TypeScript                     |
| Database       | MongoDB, Mongoose              |
| Auth           | JWT                            |
| Validation     | Zod                            |
| Error Handling | Custom global handler          |
| Others         | ESLint, Prettier, dotenv, CORS |

---

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/FahimHasan683031/LMS-Job-Task.git
cd lms-backend

**Step - 2:** install the all packges
```

    npm install

```

**Step - 3:** Create a .env file on the root

**Step - 4:** put the below code in the env file and probide your own database creadentials

```

    NODE_ENV= development
    PORT=localhost port
    DATABASE_URL= database url with valid userName and password
    BCRYPT_SALT=10
    jWT_SECRET= provide your jwt secret key
    JWT_ACCESS_EXPIRES_IN=1d
    JWT_REFRASh_EXPIRES_IN=10d

```

**Step - 5:** use the below commend for run the application
```

    npm run dev

```

```

### Auth

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | `/api/v1/auth/signup` | Register user |
| POST   | `/api/v1/auth/login`  | Login user    |

### User

| Method | Endpoint           | Description             | Access Role      |
| ------ | ------------------ | ----------------------- | ---------------- |
| GET    | `/api/v1/user`     | Get all users           | Admin / Internal |
| GET    | `/api/v1/user/:id` | Get a single user by ID | Admin / Self     |
| PATCH  | `/api/v1/user/:id` | Update a user by ID     | Admin / Self     |
| DELETE | `/api/v1/user/:id` | Delete a user by ID     | Admin            |

### Course API Endpoints

| Method | Endpoint             | Description                                | Access Role(s)   |
| ------ | -------------------- | ------------------------------------------ | ---------------- |
| POST   | `/api/v1/course`     | Create a new course                        | Teacher          |
| GET    | `/api/v1/course`     | Get all courses `searchTerm`, | Public           |
| GET    | `/api/v1/course/:id` | Get a single course by ID                  | Teacher, Student |
| PATCH  | `/api/v1/course/:id` | Update a course by ID                      | Teacher          |
| DELETE | `/api/v1/course/:id` | Delete a course by ID                      | Teacher          |

 `fieldName=fieldValue`, `limit`, and `page` query params

| Method | Endpoint             | Description                                                                                          | Access Role(s)   |
| ------ | -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------- |
| POST   | `/api/v1/course`     | Create a new course                                                                                  | Teacher          |
| GET    | `/api/v1/course`     | Get all courses with optional `searchTerm`, `fieldName=fieldValue`, `limit`, and `page` query params | Public           |
| GET    | `/api/v1/course/:id` | Get a single course by ID                                                                            | Teacher, Student |
| PATCH  | `/api/v1/course/:id` | Update a course by ID                                                                                | Teacher          |
| DELETE | `/api/v1/course/:id` | Delete a course by ID                                                                                | Teacher          |


### Lesson API Endpoints

| Method | Endpoint             | Description               | Access Role(s)   |
| ------ | -------------------- | ------------------------- | ---------------- |
| POST   | `/api/v1/lesson`     | Create a new lesson       | Teacher          |
| GET    | `/api/v1/lesson`     | Get all lessons           | Teacher, Student |
| GET    | `/api/v1/lesson/:id` | Get a single lesson by ID | Teacher, Student |
| PATCH  | `/api/v1/lesson/:id` | Update a lesson by ID     | Teacher          |
| DELETE | `/api/v1/lesson/:id` | Delete a lesson by ID     | Teacher          |

### Topic API Endpoints

| Method | Endpoint            | Description              | Access Role(s)   |
| ------ | ------------------- | ------------------------ | ---------------- |
| POST   | `/api/v1/topic`     | Create a new topic       | Teacher          |
| GET    | `/api/v1/topic`     | Get all topics           | Teacher, Student |
| GET    | `/api/v1/topic/:id` | Get a single topic by ID | Student          |
| PATCH  | `/api/v1/topic/:id` | Update a topic by ID     | Teacher          |
| DELETE | `/api/v1/topic/:id` | Delete a topic by ID     | Teacher          |

### Feedback API Endpoints

| Method | Endpoint               | Description                 | Access Role(s)    |
| ------ | ---------------------- | --------------------------- | ----------------- |
| POST   | `/api/v1/feedback`     | Submit new feedback         | Student           |
| GET    | `/api/v1/feedback`     | Get all feedbacks           | Public / Internal |
| GET    | `/api/v1/feedback/:id` | Get a single feedback by ID | Public / Internal |
| PATCH  | `/api/v1/feedback/:id` | Update a feedback by ID     | Student           |
| DELETE | `/api/v1/feedback/:id` | Delete a feedback by ID     | Student           |

### Follow API Endpoints

| Method | Endpoint             | Description                            | Access Role(s)    |
| ------ | -------------------- | -------------------------------------- | ----------------- |
| POST   | `/api/v1/follow`     | Follow a teacher                       | Student           |
| GET    | `/api/v1/follow`     | Get all follow relationships           | Public / Internal |
| GET    | `/api/v1/follow/:id` | Get a single follow relationship by ID | Public / Internal |
| PATCH  | `/api/v1/follow/:id` | Update a follow (e.g., note)           | Student           |
| DELETE | `/api/v1/follow/:id` | Unfollow a teacher                     | Student           |

### Like API Endpoints

| Method | Endpoint           | Description               | Access Role(s)    |
| ------ | ------------------ | ------------------------- | ----------------- |
| POST   | `/api/v1/like`     | Like a course             | Student           |
| GET    | `/api/v1/like`     | Get all likes             | Public / Internal |
| GET    | `/api/v1/like/:id` | Get a single like by ID   | Public / Internal |
| PATCH  | `/api/v1/like/:id` | Update a like (if needed) | Student           |
| DELETE | `/api/v1/like/:id` | Unlike a course           | Student           |

### Quiz API Endpoints

| Method | Endpoint            | Description             | Access Role(s)   |
| ------ | ------------------- | ----------------------- | ---------------- |
| POST   | `/api/v1/quize`     | Create a new quiz       | Teacher          |
| GET    | `/api/v1/quize`     | Get all quizzes         | Teacher, Student |
| GET    | `/api/v1/quize/:id` | Get a single quiz by ID | Teacher, Student |
| PATCH  | `/api/v1/quize/:id` | Update a quiz by ID     | Teacher          |
| DELETE | `/api/v1/quize/:id` | Delete a quiz by ID     | Teacher          |

### Progress API Endpoints

| Method | Endpoint               | Description                        | Access Role(s)    |
| ------ | ---------------------- | ---------------------------------- | ----------------- |
| GET    | `/api/v1/progress`     | Get all progress records           | Internal / Admin  |
| GET    | `/api/v1/progress/:id` | Get a single progress record by ID | Internal / Admin  |
| PATCH  | `/api/v1/progress/:id` | Update a progress record by ID     | Internal / System |
| DELETE | `/api/v1/progress/:id` | Delete a progress record by ID     | Internal / Admin  |
