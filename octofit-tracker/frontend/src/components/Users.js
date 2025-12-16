import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Determine the API base URL - fuzzy-space-yodel-496gxr9r5rpfqxpq-8000.app.github.dev/api/users
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
    return (
      <div className="container mt-4 loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="mt-3">Loading users...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 error-container">
        <h2 className="text-danger">⚠️ Error: {error}</h2>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👤 Users</h2>
        <span className="badge bg-info">{users.length} Users</span>
      </div>
      
      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Users Found</h4>
          <p>There are no users to display at the moment.</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            {users.map((user) => (
              <div key={user.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0 text-white">{user.username || user.name || 'Unknown User'}</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <strong>📧 Email:</strong><br />
                        <small>{user.email || 'N/A'}</small>
                      </li>
                      <li className="mb-2">
                        <strong>👥 Team:</strong><br />
                        <span className="badge bg-success">{user.team_name || 'No team'}</span>
                      </li>
                      <li className="mb-2">
                        <strong>📅 Joined:</strong><br />
                        <small>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</small>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-info w-100">View Profile</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td><strong>{user.username || user.name || 'Unknown'}</strong></td>
                    <td>{user.email || 'N/A'}</td>
                    <td><span className="badge bg-success">{user.team_name || 'No team'}</span></td>
                    <td>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
