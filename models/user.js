import { sequilize } from '../app'

import { TABLE_NAME } from '../utils'

const User = sequilize.define(TABLE_NAME.TABLE_USER, {
  email: {
    type: sequilize.TEXT,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  name: {
    type: sequilize.TEXT,
    allowNull: false,
  },
  password: {
    type: sequilize.TEXT,
    allowNull: false,
  },
})

export {
  User,
}
