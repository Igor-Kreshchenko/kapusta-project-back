
const getCurrent = async (req, res, next) => {
    const { body } = req;
    return res.status(200).json({
        email:body.email
    })
}

module.exports = getCurrent;