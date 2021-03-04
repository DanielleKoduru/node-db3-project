const db = require("../../data/db-config.js")
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const schemeId = await db('schemes')
    
    if (schemeId.length < 1) {
      res.status(404).json({
        message: `scheme with scheme_id ${req.params.id} not found`
      })
    }
    next()
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
const validateScheme = (req, res, next) => {
    if(!req.body.scheme_name || typeof req.body.scheme_name !== "string") {
      return res.status(400).json({
        message: "invalid scheme_name"
      })
    }
    next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
    if (!req.body.instructions || typeof req.body.instructions !== "string" || typeof req.body.step_number !== "number" || typeof req.body.step_number < 1) {
      return res.status(400).json({
        message: "invalid step"
      })
    }
    next ()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
