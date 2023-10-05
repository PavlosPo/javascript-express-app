const PostEntity = require('../model/Post').PostEntity
const dataSource = require('../connect').dataSource

function create(data) {
  const result = dataSource 
    .getRepository(PostEntity)
    .save(data)
    .catch((err) => console.log("Problem in saving post ", err))

  return result;
}

function findAll() {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder('post')
    .leftJoinAndSelect("post.categories", "category")
    .getMany()

  return result;
}

function findOne(id) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.categories', 'category')
    .where('id = :id', { id : id})
    .getOne()
  return result;
}

function updatePost(data) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .update(PostEntity)
    .set({
      title: data.title,
      text: data.text
    })
    .where('id = :id', { id : data.id })
    .execute()
  
    return result;
}

async function updateCategory(data) {
  const actualRelationships = await dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .relation(PostEntity, "categories")
    .of(data.id)
    .loadMany()

  const result = await dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .relation(PostEntity, "categories")
    .of(data.id)
    .addAndRemove(data.categories, actualRelationships)
    .catch((error) => console.log("Cannot update categories", error))

  return result;
}

function deletePost(id) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .delete()
    .from(PostEntity)
    .where('id = :id', {id: id})
    .execute();
  
  return result;
}

function deleteCategories(data) {
  const result = dataSource
    .getRepository(PostEntity)
    .createQueryBuilder()
    .relation(PostEntity, "categories")
    .of(data)
    .remove(data.categories);

  return result;
}

module.exports = { create , findAll, findOne, updatePost, updateCategory, deletePost, deleteCategories }