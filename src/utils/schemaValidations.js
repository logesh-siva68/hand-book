const Joi = require('joi')

/**
 * User input Validations
 * @param req
 * @returns {validation;{}, error:{}}
 */
const userPostValidation = async (req) => {
  const validationParams = { ...req.body }
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .required()
      .regex('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/'),
    email: Joi.string().email()
  })

  return schema.validate(validationParams, { allowUnknown: true })
}

module.exports = { userPostValidation }
