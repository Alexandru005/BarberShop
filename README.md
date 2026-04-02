# \# 💈 BarberShop Web Application

# 

# A modern, interactive Full-Stack web application designed for managing barbershops. 

# The platform connects clients with barbers, allowing users to explore services, leave live reviews, and (coming soon) book appointments online.

# 

# \## 🛠️ Tech Stack

# 

# \*\*Frontend (Client-Side):\*\*

# \* React.js

# \* React Router DOM (for SPA navigation)

# \* Custom CSS (Dark-theme, grid/flexbox layouts)

# \* Bundled with Vite (Runs on port `5173`)

# 

# \*\*Backend (Server-Side):\*\*

# \* Java 25 (OpenJDK 25.0.2)

# \* Spring Boot 4.0.2

# \* Spring Data JPA \& Hibernate (ORM)

# \* RESTful APIs with CORS support

# \* Runs on port `8080`

# 

# \*\*Database:\*\*

# \* PostgreSQL 18.1

# \* Containerized using Docker

# \* Runs on port `5432`

# 

# \---

# 

# \## ✨ Key Features

# 

# \### 👤 User Authentication \& Roles

# \* \*\*Registration \& Login:\*\* Separate accounts for `Client` and `Barber`.

# \* \*\*Session Persistence:\*\* Logged-in user data is stored in the browser's `localStorage` for seamless navigation without needing to re-authenticate.

# 

# \### 🏢 Shop Exploration \& Display

# \* \*\*Dynamic Dashboard (HomePage):\*\* Automatically fetches and displays all registered barbershops from the database.

# \* \*\*Detailed Profiles (BarberShopPage):\*\* Dedicated pages for each salon, dynamically routed via URL IDs (e.g., `/barbershop/1`).

# \* \*\*Service Catalog:\*\* Lists offered services (e.g., VIP Haircut, Beard Trim) complete with prices, durations, and neatly formatted descriptions.

# \* \*\*Team Roster:\*\* Showcases the barbers employed at that specific shop.

# 

# \### 💬 Interactivity \& Feedback

# \* \*\*Live Review System:\*\* Logged-in clients can leave reviews (text + 1-5 star ratings) that are automatically linked to their account and the visited shop.

# \* \*\*Instant UI Updates:\*\* New reviews appear on the screen instantly upon submission, without requiring a page refresh.

# 

# \---

# 

# \## 🚀 Getting Started (Local Development)

# 

# Follow these exact steps to run the application locally:

# 

# \### 1. Database Setup (Docker Compose)

# 1\. Ensure the \*\*Docker Desktop\*\* application is running on your computer.

# 2\. In your IDE (e.g., IntelliJ IDEA), open the `docker-compose.yml` file located in the backend folder.

# 3\. Click the \*\*Run\*\* (Play) button in the IDE gutter next to the services, OR run `docker compose up -d` in your terminal. This will start the PostgreSQL database on port `5432`.

# 

# \### 2. Backend Setup (Spring Boot)

# 1\. In your IDE, open the `BackendApplication.java` file.

# 2\. Click the \*\*Run\*\* button to start the Spring Boot application.

# 3\. Wait for the console to display the message: `Tomcat started on port 8080`.

# \*(Note: Spring Boot will automatically connect to your Dockerized database and generate/update the tables as necessary).\*

# 

# \### 3. Frontend Setup (React)

# 1\. Open a terminal and navigate to the `frontend` directory.

# 2\. If this is your first time, install the dependencies by running:

# &#x20;  ```bash

# &#x20;  npm install

