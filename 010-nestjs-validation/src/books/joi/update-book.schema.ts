
import * as Joi from 'joi';

export const updateBookSchema = Joi.object().keys({
    id: Joi.string().min(5).max(50).required(),
    title: Joi.string().min(5).max(40).required(),
    description: Joi.string().min(10).max(200).optional(),
    favorite: Joi.string().min(10).max(30).optional(),
    fileCover: Joi.string().min(10).max(30).optional(),
    fileName: Joi.string().min(10).max(30).optional(),
    fileBook: Joi.string().min(10).max(30).optional(),
});

