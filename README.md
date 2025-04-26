# DSR Management System

A NestJS-based backend system for Daily Status Reports with user authentication and reporting features.

## Features

- **User Authentication**
  - Signup with email verification (OTP)
  - JWT-based login
  - Password reset functionality
  - Profile management

- **DSR Module**
  - Create daily status reports
  - Update existing reports
  - Filter reports by date range
  - Paginated report listing

- **Infrastructure**
  - PostgreSQL database
  - Redis for OTP storage
  - Nodemailer for email services
  - Sequelize ORM

## Tech Stack

- **Backend**: Node.js + NestJS
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT + bcrypt
- **Logging**: Winston + Morgan
- **Email**: Nodemailer

## Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- Redis
- npm/yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dsr-project.git
   cd dsr-project
Install dependencies:

bash
npm install
Set up environment variables:

bash
.env.example .env
.env with your configuration:

env
DATABASE_URL=postgres://username:password@localhost:5432/dsr-api
JWT_SECRET=your_strong_secret_here
REDIS_URL=redis://localhost:6379
SMTP_HOST=your.smtp.server
SMTP_PORT=465
SMTP_USER=your@email.com
SMTP_PASSWORD=your_email_password
Run database migrations:

bash
npx sequelize-cli db:migrate
Running the Application
Development mode:

bash
npm run start:dev
Production mode:

bash
npm run build
npm run start
API Documentation
Authentication
Endpoint	Method	Description
/api/v1/users/signup	POST	Register new user
/api/v1/users/login	POST	User login
/api/v1/users/forgot-password	POST	Initiate password reset
/api/v1/users/send-otp	POST	Resend OTP
/api/v1/users/verify-otp	POST	Verify OTP
Profile Management
Endpoint	Method	Description
/api/v1/users/profile	GET	Get user profile
/api/v1/users/profile	PATCH	Update profile
DSR Management
Endpoint	Method	Description
/api/v1/dsr	POST	Create new DSR
/api/v1/dsr	PUT	Update DSR
/api/v1/dsr	GET	List DSRs (filter by date)
/api/v1/dsr/:dsrId	GET	Get specific DSR
Project Structure
src/
├── common/          # Shared modules
│   ├── auth/        # Authentication
│   ├── database/    # DB config
│   └── utils/       # Redis, mailer
├── users/           # User module
│   ├── dto/         # Data transfer objects
│   ├── entities/    # Database models
│   └── *.ts         # Controller/service
├── dsr/             # DSR module
└── main.ts          # Application entry
Docker Setup
bash
docker-compose up -d
Testing
Run unit tests:

bash
npm run test
Environment Variables
See .env.example for all required variables.

License
MIT


### Key Sections Included:
1. **Project Overview** - Brief description
2. **Features** - Core functionality
3. **Tech Stack** - Technologies used
4. **Installation** - Setup instructions
5. **API Docs** - Endpoint documentation
6. **Project Structure** - Directory layout
7. **Docker Support** - Containerization
8. **Testing** - Test commands
