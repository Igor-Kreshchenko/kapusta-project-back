
const getCurrent = async (req, res, next) => {
    const user = req.user;
    
    return res.status(200).json({
          email: user.email,
    })
       
}

module.exports = getCurrent;
