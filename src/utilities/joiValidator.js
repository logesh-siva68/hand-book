module.exports = (joiValidator) => {
  return (req, res, next) => {
    const result = joiValidator(req)
    if (result.error) {
      const error = new Error(result.error)
      res.status(400).json({
        status: 'error',
        error: error.message
      })
    } else next()
  }
}
