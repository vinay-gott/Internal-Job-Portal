const express = require('express');
const app = express();
const dotenv = require('dotenv');
const DBconnection = require('./config/db');
const cors = require('cors');

app.use(cors());


dotenv.config();
DBconnection();

// Import route files
const loginRoute = require('./routes/LoginRoute.route');
const jobRoute = require('./routes/JobRoute.route');
const HrRoute = require('./routes/HrRoute.route');
const appliedJobRoute = require('./routes/AppliedJobRoute.route');
const signupRoute = require('./routes/signUpRoute.route');
const AdminRoute=require('./routes/AdminRoute.route');
const DiscussionRoute=require('./routes/DiscussionRoute.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('API is running');
});

// Set base endpoint for all routes
app.use('/login',loginRoute);
app.use("/signup",signupRoute)
app.use('/job',jobRoute);
app.use('/hr',HrRoute);
app.use('/appliedjobs',appliedJobRoute)
app.use('/admin',AdminRoute)
app.use('/discussion',DiscussionRoute)


const PORT = process.env.PORT || 3128;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});