const isHR = (req,res,next) => {
    if(req.emp.role === 'hr'){
        next()
    }else{
        return res.status(401).send({message:'Access denied'})
    }
}

module.exports = isHR;