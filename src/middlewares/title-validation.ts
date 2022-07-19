import {body} from "express-validator";
import {validationResult} from "express-validator";

export const titleValidation = body('title').trim().isLength({
    min: 5,
    max: 15
}).withMessage('Title should be from 5 to 30 symbols');

export const nameValidation = body('name').trim().isLength({
    min: 5,
    max: 15
}).withMessage('Name should be from 5 to 15 symbols');

export const urlValidation = body('youtubeUrl').trim().isURL().isLength({
    min: 5,
    max: 100
}).withMessage('youtubeUrl should be from 5 to 100 symbols');