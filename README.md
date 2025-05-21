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
| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | `/api/v1/auth/signup`   | Register user |
| POST   | `/api/v1/auth/login`    | Login user    |

### User
| Method | Endpoint            | Description             | Access Role      |
| ------ | ------------------- | ----------------------- | ---------------- |
| GET    | `/api/v1/users`     | Get all users           | Admin / Internal |
| GET    | `/api/v1/users/:id` | Get a single user by ID | Admin / Self     |
| PATCH  | `/api/v1/users/:id` | Update a user by ID     | Admin / Self     |
| DELETE | `/api/v1/users/:id` | Delete a user by ID     | Admin            |

### Course API Endpoints
| Method | Endpoint              | Description                                | Access Role(s)   |
| ------ | --------------------- | ------------------------------------------ | ---------------- |
| POST   | `/api/v1/courses`     | Create a new course                        | Teacher          |
| GET    | `/api/v1/courses`     | Get all courses (with filter & pagination) | Public           |
| GET    | `/api/v1/courses/:id` | Get a single course by ID                  | Teacher, Student |
| PATCH  | `/api/v1/courses/:id` | Update a course by ID                      | Teacher          |
| DELETE | `/api/v1/courses/:id` | Delete a course by ID                      | Teacher          |

###  Lesson API Endpoints
| Method | Endpoint              | Description               | Access Role(s)   |
| ------ | --------------------- | ------------------------- | ---------------- |
| POST   | `/api/v1/lessons`     | Create a new lesson       | Teacher          |
| GET    | `/api/v1/lessons`     | Get all lessons           | Teacher, Student |
| GET    | `/api/v1/lessons/:id` | Get a single lesson by ID | Teacher, Student |
| PATCH  | `/api/v1/lessons/:id` | Update a lesson by ID     | Teacher          |
| DELETE | `/api/v1/lessons/:id` | Delete a lesson by ID     | Teacher          |

###  Topic API Endpoints
| Method | Endpoint             | Description              | Access Role(s)   |
| ------ | -------------------- | ------------------------ | ---------------- |
| POST   | `/api/v1/topics`     | Create a new topic       | Teacher          |
| GET    | `/api/v1/topics`     | Get all topics           | Teacher, Student |
| GET    | `/api/v1/topics/:id` | Get a single topic by ID | Student          |
| PATCH  | `/api/v1/topics/:id` | Update a topic by ID     | Teacher          |
| DELETE | `/api/v1/topics/:id` | Delete a topic by ID     | Teacher          |

### Feedback API Endpoints
| Method | Endpoint                | Description                 | Access Role(s)    |
| ------ | ----------------------- | --------------------------- | ----------------- |
| POST   | `/api/v1/feedbacks`     | Submit new feedback         | Student           |
| GET    | `/api/v1/feedbacks`     | Get all feedbacks           | Public / Internal |
| GET    | `/api/v1/feedbacks/:id` | Get a single feedback by ID | Public / Internal |
| PATCH  | `/api/v1/feedbacks/:id` | Update a feedback by ID     | Student           |
| DELETE | `/api/v1/feedbacks/:id` | Delete a feedback by ID     | Student           |

### Follow API Endpoints
| Method | Endpoint              | Description                            | Access Role(s)    |
| ------ | --------------------- | -------------------------------------- | ----------------- |
| POST   | `/api/v1/follows`     | Follow a teacher                       | Student           |
| GET    | `/api/v1/follows`     | Get all follow relationships           | Public / Internal |
| GET    | `/api/v1/follows/:id` | Get a single follow relationship by ID | Public / Internal |
| PATCH  | `/api/v1/follows/:id` | Update a follow (e.g., note)           | Student           |
| DELETE | `/api/v1/follows/:id` | Unfollow a teacher                     | Student           |

###  Like API Endpoints
| Method | Endpoint            | Description               | Access Role(s)    |
| ------ | ------------------- | ------------------------- | ----------------- |
| POST   | `/api/v1/likes`     | Like a course             | Student           |
| GET    | `/api/v1/likes`     | Get all likes             | Public / Internal |
| GET    | `/api/v1/likes/:id` | Get a single like by ID   | Public / Internal |
| PATCH  | `/api/v1/likes/:id` | Update a like (if needed) | Student           |
| DELETE | `/api/v1/likes/:id` | Unlike a course           | Student           |

### Quiz API Endpoints
| Method | Endpoint              | Description             | Access Role(s)   |
| ------ | --------------------- | ----------------------- | ---------------- |
| POST   | `/api/v1/quizzes`     | Create a new quiz       | Teacher          |
| GET    | `/api/v1/quizzes`     | Get all quizzes         | Teacher, Student |
| GET    | `/api/v1/quizzes/:id` | Get a single quiz by ID | Teacher, Student |
| PATCH  | `/api/v1/quizzes/:id` | Update a quiz by ID     | Teacher          |
| DELETE | `/api/v1/quizzes/:id` | Delete a quiz by ID     | Teacher          |

### Progress API Endpoints
| Method | Endpoint               | Description                        | Access Role(s)    |
| ------ | ---------------------- | ---------------------------------- | ----------------- |
| GET    | `/api/v1/progress`     | Get all progress records           | Internal / Admin  |
| GET    | `/api/v1/progress/:id` | Get a single progress record by ID | Internal / Admin  |
| PATCH  | `/api/v1/progress/:id` | Update a progress record by ID     | Internal / System |
| DELETE | `/api/v1/progress/:id` | Delete a progress record by ID     | Internal / Admin  |
