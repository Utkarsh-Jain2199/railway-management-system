# Railway Management System

This is a railway management system built using Node.js and Express with PostgreSQL as the database. The system allows users to register, log in, check train seat availability, book a seat, and view booking details. It also includes an admin feature to add new trains to the system. JWT is used for user authentication, and admin endpoints are secured with an API key.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Running the Application](#running-the-application)
4. [Running Tests (Optional)](#running-tests-optional)
5. [API Endpoints](#api-endpoints)
6. [Assumptions](#assumptions)

## Prerequisites

Before running this project, ensure that you have the following installed:
- Node.js (version 14 or above)
- PostgreSQL (version 12 or above)
- npm (Node Package Manager)

## Setup Instructions

Follow these steps to set up the project on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/railway-management.git
cd railway-management
```

### 2. Install Dependencies
Run the following command to install the required Node.js packages:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory of the project with the following environment variables:

```bash
DB_USER=your_db_user        # PostgreSQL user
DB_HOST=localhost           # Host for PostgreSQL, typically localhost
DB_NAME=railway             # Name of your PostgreSQL database
DB_PASSWORD=your_db_password # PostgreSQL password
DB_PORT=5432                # Port number for PostgreSQL, typically 5432
JWT_SECRET=your_jwt_secret   # A secret key for JWT tokens
ADMIN_API_KEY=your_admin_api_key # Admin API key to access protected endpoints
```

### 4. Set Up PostgreSQL Database

1. Create a PostgreSQL database for this project:
   ```bash
   createdb railway
   ```

2. Create the required tables by running the provided SQL file in `models/models.sql`:
   ```bash
   psql -U your_db_user -d railway -f models/models.sql
   ```

3. Verify that the tables (`users`, `trains`, `bookings`) are created:
   ```bash
   \dt
   ```

### 5. Seed Initial Data (Optional)
You can add initial data like trains using the admin API once the server is running, or manually insert data into the PostgreSQL tables.

## Running the Application

### 1. Start the Server
Run the following command to start the server:
```bash
npm start
```

The server will be running on `http://localhost:3000` by default.

### 2. Access API Endpoints
Once the server is running, you can start using the API by sending requests to the following endpoints:

| **Endpoint**                   | **Method** | **Description**                               |
|---------------------------------|------------|-----------------------------------------------|
| `/auth/register`                | `POST`     | Registers a new user                          |
| `/auth/login`                   | `POST`     | Logs in a user and returns a JWT token        |
| `/admin/add-train`              | `POST`     | Admin adds a new train                        |
| `/train/availability`           | `GET`      | Gets seat availability between two stations   |
| `/book/book-seat`               | `POST`     | Books a seat on a specific train              |
| `/book/booking/:id`             | `GET`      | Retrieves specific booking details            |

## Running Tests (Optional)

To ensure your application is working as expected, you can write and run tests.

### 1. Set Up Testing Framework
Install a testing framework such as Jest or Mocha:
```bash
npm install --save-dev jest
```

### 2. Create Tests
You can create test files in a `__tests__` directory. Here’s an example of a basic test:

```javascript
// __tests__/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('POST /auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch(/User registered with ID:/);
  });
});
```

### 3. Run Tests
Run the tests using the following command:
```bash
npm test
```

## API Endpoints

### User Registration
**POST** `/auth/register`

#### Input:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Output:
```json
{
  "message": "User registered with ID: 1"
}
```

### User Login
**POST** `/auth/login`

#### Input:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Output:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Admin Add Train (API Key Protected)
**POST** `/admin/add-train`

#### Input:
```json
{
  "trainNumber": "12345",
  "source": "Mumbai",
  "destination": "Delhi",
  "seats": 100
}
```

#### Output:
```json
{
  "message": "Train added successfully"
}
```

### Get Seat Availability
**GET** `/train/availability?source=Mumbai&destination=Delhi`

#### Output:
```json
[
  {
    "id": 1,
    "train_number": "12345",
    "source": "Mumbai",
    "destination": "Delhi",
    "seats": 100
  },
  {
    "id": 2,
    "train_number": "67890",
    "source": "Mumbai",
    "destination": "Delhi",
    "seats": 75
  }
]
```

### Book a Seat (JWT Protected)
**POST** `/book/book-seat`

#### Input:
```json
{
  "trainId": 1
}
```

#### Output:
```json
{
  "message": "Seat booked successfully"
}
```

### Get Specific Booking Details (JWT Protected)
**GET** `/book/booking/:id`

#### Output:
```json
{
  "id": 1,
  "user_id": 1,
  "train_id": 1,
  "booking_date": "2024-09-07T12:34:56.000Z"
}
```

## Assumptions

1. **JWT Expiry**: The JWT token is valid for 1 hour by default. You can modify this in the `jwt.sign()` method if needed.
2. **Database**: PostgreSQL is assumed to be running locally, but you can adjust the host and port in the `.env` file for a remote database.

```

---