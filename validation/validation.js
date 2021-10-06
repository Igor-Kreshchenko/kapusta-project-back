const validation = (schema) => {
  const validFunc = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: "Error with Joi or with other library of validation",
      });
    }
    next();
  };
  return validFunc;
};
module.exports = validation;
