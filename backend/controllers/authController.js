import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';



// Function to handle user registration
 const registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
    
       // Hash the password with bcrypt, using a salt round of 12
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ email, password: hashedPassword });  // Created a new user instance with the hashed password
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

   // Function to handle user login
   const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
        // Compare the given password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
             
    // Generate a JWT token for the user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
  
      res.json({ token, user: { id: user._id, email: user.email } }); // Send a success response with the token and user details
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };



// Function to handle token refresh
const refresh_token = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) return res.status(400).json({ message: 'Token is required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the provided token using the secret key
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'Invalid token' });

        const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { // Generate a new token for the user
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({ token: newToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};




  export default {registerUser, loginUser, refresh_token};

