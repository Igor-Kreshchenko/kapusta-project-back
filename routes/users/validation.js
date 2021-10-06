const Joi = require("joi");
const HttpCode = require("../../helpers/constants");

const schemaSignup = Joi.object({
  password: Joi.string().min(6).max(15).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
});

const schemaLogin = Joi.object({
  password: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({
      status: HttpCode.BAD_REQUEST,
      message: `Missing fields: field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports = {
  validationCreateUser: async (req, res, next) => {
    return await validate(schemaSignup, req.body, next);
  },
  validationLoginUser: async (req, res, next) => {
    return await validate(schemaLogin, req.body, next);
  },
};
