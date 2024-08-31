import jwt from 'jsonwebtoken';

// Middleware to authenticate the user based on JWT token
export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');   // Get the token from the request header 'Authorization'

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



