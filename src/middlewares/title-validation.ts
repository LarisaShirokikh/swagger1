import {body} from "express-validator";
import {validationResult} from "express-validator";

export const titleValidation = body('title').trim().isLength({
    min: 5,
    max: 30
}).withMessage('Title should be from 5 to 30 symbols');