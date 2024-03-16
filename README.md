# Golang Restful API with MongoDB Database
This is hosted on technotes-api-g3mi.onrender.com

## Quick Start
1. Clone

```bash
git clone https://github.com/tobiasprima/techNotes.git
```

2. Install Dependency

```bash
npm install
```

3. To test with Mongodb locally
-create new `.env` file and add:

```bash
DATABASE_URI = {YOUR_DATABASE_URI}
ACCESS_TOKEN_SECRET = {YOUR_ACCESS_TOKEN_SECRET}
REFRESH_TOKEN_SECRET = {YOUR_REFRESH_TOKEN_SECRET}
```

-run on localhost

```bash
npm start
//or
nodemon server.js
```

4. Test Endpoints
With Frontend
1. Clone Frontend
```bash
git clone https://github.com/tobiasprima/techNotesFrontEnd.git
```
or https://github.com/tobiasprima/techNotesFrontEnd and clone
2. Run on localhost
```bash
npm start
```
3. Open localhost:3000

4. Login
- As Manager (Create User, Delete User, Create Note and Delete Note Permission)
CLASSIFIED
- As Employee (Create Notes and Edit Notes Permission)
username: testEmployee
password: test1234
