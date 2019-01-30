import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename = path.basename(__filename)

const db = {}

const sequelize = new Sequelize('mysql://root:root@localhost:3306/startercode')

fs
  .readdirSync(__dirname)
  .filter(file => (
    (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  )).forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
