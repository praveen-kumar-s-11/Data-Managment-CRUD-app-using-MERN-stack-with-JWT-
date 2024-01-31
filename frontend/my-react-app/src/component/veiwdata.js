// ViewData.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/userroute/users', { withCredentials: true })

      console.log('Response:', response.data); 
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <h1>View User Data</h1>
      <div>
        {userData.map((user, index) => (
          <div key={index}>
            
            <p>User Data: {user.userdata}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewData;
