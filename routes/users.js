import express from 'express'

import { fetchMyProfile } from '../controller'

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => (
  fetchMyProfile(req, res)
))

export default router
