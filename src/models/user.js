import mongoose from 'mongoose'

import { validateEmail, TABLE_NAME } from '../utils'

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: v => validateEmail(v),
      message: props => `${props.value} is not a valid email!`,
    },
    required: [true, 'Email required'],
  },
  name: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
})

const User = mongoose.model(TABLE_NAME.TABLE_USER, UserSchema)
export default User
