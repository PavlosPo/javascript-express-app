const { error } = require('winston');

const CategoryEntity = require('../model/Category').CategoryEntity
const dataSource = require('../connect').dataSource

function create (name) {
console.log("serviceCategory Create ", name)

  const result = dataSource
    .getRepository(CategoryEntity)  // get Entity
    .createQueryBuilder()
    .insert() // CRUD INSERT
    .into(CategoryEntity)
    .values([
      { name: name }
    ])
    .execute()
    .catch(error => console.log(error));

    return result;
} 

function findOne(id) {
  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .select('ct')
    .from(CategoryEntity, 'ct')
    .where('ct.id = :id', { id : id })
    .getOne()

  return result;
}

function findAll() {
  console.log("ServiceCategory find all")

  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .select('category') // select * as 'category' from category
    .from(CategoryEntity, 'category')
    .getMany()

  return result;
}

function update(data) {
  const result = dataSource
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .update(CategoryEntity)
    .set({name: data.name})
    .where("id = :id", { id : data.id })
    .execute()
    .catch(error => console.log(error))

  return result;
}

function deleteCategory(id) {
  const result = dataSource
  .getRepository(CategoryEntity)
  .createQueryBuilder()
  .delete()
  .from(CategoryEntity)
  .where('id = :id', { id : id })
  .execute()
  .catch(error => console.log(error))

  return result;
}

module.exports = { create , findOne ,findAll, update, deleteCategory }