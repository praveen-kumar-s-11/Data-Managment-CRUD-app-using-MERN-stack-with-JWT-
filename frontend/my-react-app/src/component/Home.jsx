import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState('');
  const [viewData, setViewData] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUserData(event.target.value);
  };

  const handleCreateUser = async () => {
    try {
      console.log('userData:', userData);

      const response = await axios.post('http://localhost:8800/userroute/users', { data: userData },{
        withCredentials: true, // Include cookies in the request
        // Add other headers if necessary
      });
      console.log('User created:', response.data);
      setViewData(userData);
      
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleViewUsers = () => {
    navigate('/view'); 
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/userroute/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div>
      <h1>User Data Management</h1>
      <input
        type="text"
        value={userData}
        onChange={handleInputChange}
        placeholder="Enter  data"
      />
      <button onClick={handleCreateUser}>Create data</button>
      <button onClick={handleViewUsers}>View Data</button> 
      
    </div>
  );
}

export default Home;
