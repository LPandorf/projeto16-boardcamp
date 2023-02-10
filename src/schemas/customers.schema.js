import joi from "joi";

export const customerSchema= joi.object({
    name: joi.string().min(2).required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.number().required(),
    birthday: joi.date().raw().required(),
});