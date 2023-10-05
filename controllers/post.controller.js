const postService = require('../services/post.services')

exports.create = async(req, res) => {
  const data = req.body
  console.log("Creating new Post with title ", data.title)

  try {
    const result = await postService.create(data)
    res.status(200).json( { status: true, data : result})
    console.log("Success in saving post")
  } catch(err) {
    console.log("Problem in saving post")
    res.status(400).json( { status: false, data: err})
  }
}

exports.findAll = async(req, res) => {
  console.log("Find All Posts")

  try {
    const result = await postService.findAll()
    res.status(200).json( { status: true, data : result})
    console.log("Success in finding all posts")
  } catch(err) {
    console.log("Problem in finding all posts")
    res.status(400).json( { status: false, data: err})
  }
}

exports.findOne = async(req, res) => {
  const id = req.params.id;
  console.log("Find post with id ", id)

  try {
    const result = await postService.findOne(id)
    res.status(200).json( { status: true, data : result})
    console.log("Success in finding post with id ", id)
  } catch(err) {
    console.log("Problem in finding post with id ", id)
    res.status(400).json( { status: false, data: err})
  }
}

exports.updatePost = async(req, res) => {
  const data = req.body.data
  const id = req.parms.id
  console.log("Update Post with id: ", id)
  try {
    const result = await postService.updatePost(data)
    res.status(200).json( { status: true, data : result})
    console.log("Success in updating post with id ", id)
  } catch(err) {
    console.log("Problem in updating post with id ", id)
    res.status(400).json( { status: false, data: err})
  }
}

exports.updateCategory = async(req, res) => {
  const data = req.body.data
  const id = req.parms.id
  console.log("Update Category with id: ", id)
  try {
    const result = await postService.updateCategory(data)
    res.status(200).json( { status: true, data : result})
    console.log("Success in updating category with id ", id)
  } catch(err) {
    console.log("Problem in updating category with id ", id)
    res.status(400).json( { status: false, data: err})
  }
}

exports.deletePost = async(req, res) => {
  const id = req.parms.id
  console.log("Delete post")

  try {
    const result = await postService.deletePost(id)
    res.status(200).json( { status: true, data : result})
    console.log("Success in deleting post with id ", id)
  } catch(err) {
    console.log("Problem in deleting post with id ", id)
    res.status(400).json( { status: false, data: err})
  }
}


exports.deleteCategorries = async(req, res) => {
  const id = req.parms.id
  console.log("Remove categories")

  try {
    const result = await postService.deleteCategories(req.body)
    res.status(200).json( { status: true, data : result})
    console.log("Success in removing categories ")
  } catch(err) {
    console.log("Problem in removing categories ")
    res.status(400).json( { status: false, data: err})
  }
}
