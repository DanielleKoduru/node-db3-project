const scheme = require("./scheme-model")
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const schemeId = await scheme.getById(req.params.id)
    if (schemeId) {
      req.scheme = schemeId
      next();
    } else {
      res.status(404).json({
        message: `scheme with scheme_id ${req.params.id} not found`
      })
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    if(!scheme) {
      return res.status(400).json({
        message: "invalid scheme_name"
      })
    }

    req.scheme = scheme
    next()
  } catch(err) {
    next (err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  try {
    if(!req.body.instructions || !req.body.step_number) {
      return res.status(400).json({
        message: "invalid step"
      })
    }
    next()
  } catch(err) {
    next (err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
