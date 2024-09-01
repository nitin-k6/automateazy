How to Start the application

1. cd backend   // This will jump into backend directory
2.  npm start // This will start the server
   Now
1. cd frontend   // This will jump into frontend directory
2. npm start

   This will now start the React Application

   What to do and how it works
   Register first (// Used Middleware to validate the registration request body)  and then after successful login it will take you to dashboard. If login fail then it will show invalid credentials
   After successful login in the dashboard which is protected route and I have protected it using authMiddleware and In dashboard you can see the 'User ID' which we have extracted from (e.g., /me) to return the current user's data by
   extracting user id from the JWT.

   http://localhost://api/auth/register  POST Request
   http://localhost://api/auth/login      POST Request
   http://localhost://api/auth/me          GET Request  (- Fetches the current user detail)   Note: Works only after successful login
   

    POSTMAN  Link
     https://api.postman.com/collections/25970533-9e814f7e-a522-40a4-864a-3b99e6f9693b?access_key=PMAT-01J6Q9P1AX6EARCVH4DDWNRQTZ  (api key)
  
