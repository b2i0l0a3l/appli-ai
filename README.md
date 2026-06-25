# 🚀 AppliAI - AI-Powered Job Application Copilot

AppliAI is a modern, premium web application designed to help job seekers tailor their CVs, generate tailored cover letters using AI, calculate matching scores against job descriptions, and track their applications seamlessly in one dashboard.

Made with ❤️ by **Bilal Belamraoui** ([belamraoui21@gmail.com](mailto:belamraoui21@gmail.com))

---

## ✨ Features

- **📊 Application Dashboard**: Track all your customized applications, matching scores, and status history.
- **🧠 Hybrid AI Engine (Gemini + Groq)**: Automatically analyzes job descriptions and CVs. If the primary Gemini model hits rate limits (429), it seamlessly falls back to Groq (Llama 3.3 70B) to guarantee 100% uptime.
- **📄 Smart PDF Parsing**: Extracts text from your CV directly on the server to keep AI payloads small (~2K tokens instead of 60K+), ensuring lightning-fast generations and low cost.
- **✍️ Rich Text Cover Letter Editor**: A Tiptap-powered interactive editor to customize and perfect your generated cover letters.
- **🔄 Database Sync & Autosave**: Automatically registers and updates all generated letters and CV analyses in a secure PostgreSQL database.
- **🔒 Secure Authentication**: Integrated with Clerk for user registration, user profiles, and secure data access.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Prisma
- **Auth**: Clerk
- **AI Providers**: Google Gemini API & Groq SDK (Llama 3.3 70B)
- **Text Editor**: Tiptap Rich Text Editor
- **Styling**: Tailwind CSS & Radix UI / shadcn/ui

---

## 🚀 Getting Started

Follow these steps to run AppliAI locally.

### 1. Clone the repository and install dependencies
```bash
git clone <repository-url>
cd appli-ai
npm install
```

### 2. Environment Variables Setup
Create a `.env` file in the root directory and add the following keys:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/welcome

# Database (PostgreSQL) URL
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# AI Provider API Keys
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

### 3. Setup the Database Schema
Push the schema to your database and generate the Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start using the app.

---

## 📬 Contact & Creator Info

- **Developer**: Bilal Belamraoui
- **Email**: [belamraoui21@gmail.com](mailto:belamraoui21@gmail.com)
- **GitHub**: [github.com/b2i0l0a3l](https://github.com/b2i0l0a3l)
