import JOI from "joi";

export const createUserSchema=JOI.object({
        name:JOI.string().trim().min(2).max(20).required(),
        email:JOI.string().required().email(),
        password:JOI.string().trim().min(5).max(12).required(),
})

export const updateUserSchema=JOI.object({
    name:JOI.string().trim().min(2).max(20),
    email:JOI.string().email(),
    password:JOI.string().min(5).max(20),
})

