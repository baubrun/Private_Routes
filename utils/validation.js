const Joi = require("@hapi/joi")

const validation = (data, type) => {
    if (type === "register") {
        schema = Joi.object({
            email: Joi.string().email({
                minDomainSegments: 2
            }),
            name: Joi.string().min(6).required(),
            password: Joi.string().min(6).required(),
        })
    } else if (type === "login") {
        schema = Joi.object({
            email: Joi.string().email({
                minDomainSegments: 2
            }),
            password: Joi.string().min(6).required(),
        })
    }

    return schema.validate(data)
}



module.exports = validation