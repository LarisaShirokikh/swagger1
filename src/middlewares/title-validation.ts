import {body} from "express-validator";
import {validationResult} from "express-validator";


const regexp = new RegExp("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
                                 //^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$


export const titleValidationCreate = body('title').trim().isLength({
    min: 1,
    max: 30
}).isString();


export const shortDescriptionValidation = body('shortDescription').trim().isLength({
    min: 1,
    max: 100
}).isString();

export const contentValidation = body('content').trim().isLength({
    min: 30,
    max: 300
}).isString();

export const nameValidationCreate = body('name').trim().isLength({
    min: 1,
    max: 15
}).isString();

export const urlValidation = body('youtubeUrl').trim().isLength({
    min: 1,
    max: 100
}).matches(regexp).isString();

export const bloggerIdValidation = body('bloggerId').isNumeric();

export const loginValidator = body('login').trim().isLength({min: 3, max: 10}).isString();
export const passwordValidator = body('password').trim().isLength({min: 6, max: 20}).isString();






