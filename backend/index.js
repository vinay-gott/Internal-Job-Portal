const express = require('express');
const app = express();
const dotenv = require('dotenv');
const DBconnection = require('./config/db');

dotenv.config();
DBconnection();

// Import route files
const loginRoute = require('./routes/LoginRoute.route');
const jobRoute = require('./routes/JobRoute.route');
const employeeRoute = require('./routes/EmployeeRoute.route');
const appliedJobRoute = require('./routes/AppliedJobRoute.route');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

// Set base endpoint for all routes
//app.use('/api/login', loginRoute);
app.use('/api/job',jobRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/appliedjob', appliedJobRoute)


const PORT = process.env.PORT || 3128;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});