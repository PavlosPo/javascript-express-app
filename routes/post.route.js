const express = require('express')
const router = express.Router();

const { body, param, validationResult } = require('express-validator')
const postController = require('../controllers/post.controller')

const text_and_title_Validator = () => {
  return [
    body('title').not().isEmpty().withMessage("Title is required"),
    body('title').isString().withMessage("Enter only letters"),
    body('text').not().isEmpty().withMessage("The field text is required"),
    body('text').not().isString().withMessage('Text is only letters')
    
  ]
}


router.get('/', postController.create);

router.get('/:id', postController.findOne)

router.get('/', postController.findAll)

router.post('/', text_and_title_Validator(), (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({status: false, data: errors.array})
  }
  next()
},postController.create)

router.patch('/:id', postController.updatePost)

router.patch('/:id/category', postController.updateCategory)

router.delete('/:id', postController.deletePost)

router.delete('/:id/categories', postController.deleteCategorries)

module.exports =  router 