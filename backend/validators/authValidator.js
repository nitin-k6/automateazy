import Joi from 'joi';

// Middleware to validate the registration request body
 const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),  // Email must be a valid email format and is required
    password: Joi.string().min(6).required(),    // Password must be a string with a minimum length of 6 characters and is required
  });


   // Validate the request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();  // If validation is successful, proceed to the next middleware or route handler
};


export default {validateRegister}

