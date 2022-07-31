import {body} from "express-validator";
import {validationResult} from "express-validator";

export const titleValidation = body('title').trim().isLength({
    min: 5,
    max: 30
}).withMessage('Title should be from 5 to 30 symbols');

export const shortDescriptionValidation = body('shortDescription').trim().isLength({
    min: 5,
    max: 100
}).withMessage('shortDescription should be from 5 to 100 symbols');

export const contentValidation = body('content').trim().isLength({
    min: 5,
    max: 1000
}).withMessage('content should be from 5 to 1000 symbols');

export const nameValidation = body('name').trim().isLength({
    min: 5,
    max: 15
}).withMessage('Name should be from 15 to 100 symbols');

export const urlValidation = body('youtubeUrl').trim().isURL().isLength({
    min: 5,
    max: 100,
    //pattern: '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'

}).withMessage('youtubeUrl should be from 5 to 100 symbols');