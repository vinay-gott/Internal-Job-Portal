const isAdmin = (req,res,next) => {
    if(req.emp.role === 'admin'){
        next()
    }else{
        return res.status(401).send({message:'Access denied'})
    }
}

module.exports = isAdmin;