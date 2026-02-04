
# Next.js with Auth.js and Prisma

This project is a **Next.js application** integrated with **Auth.js (NextAuth)** for authentication and **Prisma** as the ORM for PostgreSQL.
All authentication features are ready — you just need to register your app with OAuth providers and configure your PostgreSQL database.

> Check out my other projects at : [My GitHub](https://github.com/MSGLUM4X)

---

## Table of Contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Run Locally](#run-locally)
* [Run in Production](#run-in-production)
* [Author](#author)
* [Support](#show-your-support)
* [Links](#links)

---

# Quickstart — Local Development

## Prerequisites

* Node.js
* npm (or yarn / pnpm)
* PostgreSQL

---

## Installation

First, install the project dependencies:

```bash
npm install
```

---

### 1. OAuth Application Setup

Register OAuth applications for the providers you want to use:

* **GitHub**: [GitHub OAuth Apps](https://github.com/settings/developers)
* **Google**: [Google Cloud Console](https://console.cloud.google.com/)

**Configuration example (for local development):**

* **Origin:** `http://localhost:3000`
* **Redirect URI:** `http://localhost:3000/api/auth/callback/(provider-name)`

> Replace `localhost` with your production domain when deploying.

---

### 2. Database Setup

* Create a PostgreSQL database and get the connection URL.
* Generate the Prisma client:

```bash
npx prisma generate
```

---

### 3. NextAuth Secret

Generate a secret key for Auth.js:

```bash
npx auth secret
```

---

### 4. Access Control

You can classify users using **`SERVICE1_EMAIL`** and **`SERVICE2_EMAIL`**  and **`ADMIN_EMAIL`** in your `.env` file.

* Users in `SERVICE1_EMAIL` and `SERVICE2_EMAIL` have limited access.
* Users in `ADMIN_EMAIL` have admin privileges.
* A user can belong to both groups or any custom classification you define.

> ⚠️ This system is suitable for **small private projects**. For public projects, it’s recommended to store user roles in the database, especially if access depends on payments or subscriptions.

---

## Configuration

Create a `.env` file in the project root with the following structure:

```env
# NextAuth Configuration
AUTH_SECRET=your_random_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret

# Access control
SERVICE1_EMAIL='["email1@example.com","email2@example.com"]'
SERVICE2_EMAIL='["email1@example.com"]'
ADMIN_EMAIL='["email3@example.com","email2@example.com"]'

# Database
DATABASE_URL=postgresql://user:password@host:port/database
```

---

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

## Run in Production

```bash
npm run build
npm run start
```

---

## Author

**Maxime Rouard** — [Website](https://maxime-rouard.fr)

---

## Show Your Support

If this project helped you, give it a ⭐️!

---

## Links

* **Next.js** — [https://nextjs.org](https://nextjs.org)
* **Auth.js (NextAuth)** — [https://authjs.dev/](https://authjs.dev/)
* **Prisma** — [https://www.prisma.io](https://www.prisma.io)
* **PostgreSQL** — [https://www.postgresql.org](https://www.postgresql.org)


