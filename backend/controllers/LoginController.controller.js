const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
//const LoginModel=require("../models/LoginModel.model")
const EmployeeModel=require("../models/EmployeeModel.model")

async function checkUser(req, res) {
    const { empId, password, userType } = req.body;

    if (!empId || !password || !userType) {
        return res.status(400).send({ message: "Please enter empId, password, and userType" });
    }

    if (userType !== 'employee' && userType !== 'hr' && userType!=='admin') {
        return res.status(400).send({ message: "Invalid userType. Must be 'employee' or 'admin'" });
    }

    try {
        const emp = await EmployeeModel.findOne({ empId });

        if (!emp) {
            return res.status(404).send({ message: "Employee does not exist" });
        }

        if (emp.password !== password) {
            return res.status(401).send({ message: "Password is incorrect" });
        }

        if (emp.role !== userType) {
            return res.status(403).send({ message: `Access denied. ${userType} login required` });
        }

        const payload = {
            emp: {
                id: emp.empId,
                role: emp.role
            }
        };

        const token = jwt.sign(payload, process.env.JWT_PVT_KEY);
        res.header('auth-token', token).send({ token, success: true });

    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}


module.exports={checkUser}