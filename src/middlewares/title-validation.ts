import {body} from "express-validator";
import {validationResult} from "express-validator";


const regexp = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')

export const titleValidationCreate = body('title').trim().isLength({
    max: 100
});



 export const titleValidationBloggersPosts = body('title').trim().isLength({
    max: 30
});


export const shortDescriptionValidation = body('shortDescription').trim().isLength({

    max: 100
});

export const contentValidation = body('content').trim().isLength({
    min: 6,
    max: 1000
});

export const nameValidationCreate = body('name').trim().isLength({
    min: 4,
    max: 15
});

export const urlValidation = body('youtubeUrl').trim().isLength({max: 100}).matches(regexp)





