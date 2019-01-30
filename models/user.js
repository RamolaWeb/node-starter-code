import { TABLE_NAME } from '../utils'

const User = (sequilize, DATA_TYPE) => (
  sequilize.define(TABLE_NAME.TABLE_USER, {
    email: {
      type: DATA_TYPE.TEXT,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    name: {
      type: DATA_TYPE.TEXT,
      allowNull: false,
    },
    password: {
      type: DATA_TYPE.TEXT,
      allowNull: false,
    },
  })
)

export default User
