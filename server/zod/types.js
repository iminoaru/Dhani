const zod = require('zod')

const signupZod = zod.object({
    firstname: zod.string().min(3).max(50),
    lastname: zod.string().min(3).max(50),
    email: zod.string().email(),
    password: zod.string().min(6)
})

const loginZod = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

module.exports = { signupZod , loginZod }