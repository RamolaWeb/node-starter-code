const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const success = (res, response = {}, status = 200) => {
  const result = {
    success: true,
    response,
  }
  return res.status(status).json(result)
}

const error = (res, e = {}, status = 500) => {
  const result = {
    success: false,
    e,
  }
  return res.status(status).json(result)
}

export {
  validateEmail,
  success,
  error,
}
