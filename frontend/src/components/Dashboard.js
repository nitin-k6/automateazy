// import React, { useEffect, useState } from 'react';
// import  {getCurrentUser}  from '../services/authService.js';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await getCurrentUser();
//       setUser(userData);
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {user ? <p>Welcome, User ID: {user._id}</p> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService.js';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, User ID: {user._id}</p> : <p>No user data found.</p>}
    </div>
  );
};

export default Dashboard;
