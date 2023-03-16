import {body, CustomValidator, param} from "express-validator";
import {blogsLocalRepository} from "../../../repositories/blogs-repository";
import {inputValidationMiddleware} from "../input-validation-middleware";

const titleValidation = body('title').isString().trim().notEmpty().isLength({max: 30})
const shortDescriptionValidation = body('shortDescription').isString().trim().notEmpty().isLength({max: 100})
const contentValidation = body('content').isString().trim().notEmpty().isLength({max: 1000})
const blogIdValidation = body('content').isString().trim().notEmpty()

// для валидации blogId (проверки наличия такого блога) при создании поста
const isValidBlogId: CustomValidator = value => {
    const blog = blogsLocalRepository.findBlogById(value)
    if (blog) {
        return true;
    }
    return new Error('Invalid Blog_ID')
};
const inputBlogIdValidator = param('id').custom(isValidBlogId);

export const createPostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputBlogIdValidator,
    inputValidationMiddleware
]

export const updatePostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware
]