const { dataSource } = require('../connect')
const categoryService = require('../services/category.services')
const e = require("express")

exports.findAll = async(req, res) => {
  console.log('Find All categories')

  try {
    const result = await categoryService.findAll();
    res.status(200).json({status: true, data: result})
  } catch(err) {
    console.log("Problem while getting all categories")
    res.status(400).json({status: false})
  }
}

exports.create = async(req, res) => {
  console.log("Creating new category name")
  const name = req.body.name
  try {

    const result = await categoryService.create(name);  // Service
    res.status(200).json({status: true, data: result})
    console.log("Success in saving category")

  } catch (err) {
    console.log("Problem in saving category")
    res.status(400).json({status: false, data: err})
  }
}

exports.findOne = async(req, res) => {
  const id = req.params.id
  console.log("Getting category with id: ", id)

  try {
    const result = await categoryService.findOne(id);  // Service
    res.status(200).json({status: true, data: result})
    console.log("Success in finding category with id ", id)
  } catch(err) {
    console.log("Problem in finding category with id ", id)
    res.status(400).json({status: false, data: err})
  }
}

exports.update = async(req, res) => {
  const id = req.params.id
  console.log("Update category with id: ", id)

  try{
    const result = await categoryService.update(req.body)
    res.status(200).json({status: true, data: result})
    console.log("Success in updating category with id ", id)
  } catch(err) {
    console.log("Problem in updating category with id ", id)
    res.status(400).json({status: false, data: err})
  }

}

exports.delete = async(req, res) => {
  const id = req.params.id

  console.log("Deleting category with id ", id)
  try {
    const result = await categoryService.deleteCategory(req.body)
    res.status(200).json({status: true, data: result})
    console.log("Success in deleting category with id ", id)
  } catch(err) {
    console.log("Problem in deleting category with id ", id)
    res.status(400).json({status: false, data: err})
  }
}