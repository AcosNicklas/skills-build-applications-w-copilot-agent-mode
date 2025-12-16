import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Determine the API base URL
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/users/`;
        
        console.log('Users - Fetching from API:', apiUrl);
        console.log('Users - Codespace name:', codespace);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users - Raw response data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const userData = data.results || data;
        console.log('Users - Processed data:', userData);
        
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error('Users - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="container mt-4"><h2>Loading users...</h2></div>;
  }

  if (error) {
    return <div className="container mt-4"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username || user.name || 'Unknown User'}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email || 'N/A'}<br />
                    <strong>Team:</strong> {user.team_name || 'No team'}<br />
                    <strong>Joined:</strong> {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
