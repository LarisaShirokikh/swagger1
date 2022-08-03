import {body} from "express-validator";
import {validationResult} from "express-validator";

const regexp = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')

export const titleValidationCreate = body('title').trim().isLength({
    max: 100
}).withMessage('Title should be from 5 to 30 symbols');



 export const titleValidationBloggersPosts = body('title').trim().isLength({
    max: 30
}).withMessage('Title should be from 5 to 30 symbols');

export const shortDescriptionValidationBloggersPosts = body('shortDescription').trim().isLength({
    max: 100
}).withMessage('shortDescription should be from 5 to 100 symbols');

export const shortDescriptionValidation = body('shortDescription').trim().isLength({
    min: 5,
    max: 100
}).withMessage('shortDescription should be from 5 to 100 symbols');

export const contentValidation = body('content').trim().isLength({

    max: 1000
}).withMessage('content should be max to 1000 symbols');

export const nameValidationCreate = body('name').trim().isLength({

    max: 15
}).withMessage('Name should be from 0 to 15 symbols');

export const urlValidation = body('youtubeUrl').trim().isLength({
    max: 100
}).matches(regexp)


