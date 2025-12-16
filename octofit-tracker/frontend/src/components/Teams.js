import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Determine the API base URL
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/teams/`;
        
        console.log('Teams - Fetching from API:', apiUrl);
        console.log('Teams - Codespace name:', codespace);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams - Raw response data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamData = data.results || data;
        console.log('Teams - Processed data:', teamData);
        
        setTeams(teamData);
        setLoading(false);
      } catch (err) {
        console.error('Teams - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="mt-3">Loading teams...</h2>
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
        <h2>👥 Teams</h2>
        <span className="badge bg-success">{teams.length} Teams</span>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Teams Found</h4>
          <p>There are no teams to display at the moment.</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0 text-white">{team.name || 'Unnamed Team'}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{team.description || 'No description available'}</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="badge bg-primary">👤 {team.members?.length || 0} Members</span>
                      <small className="text-muted">
                        {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                      </small>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-success w-100">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Description</th>
                  <th className="text-center">Members</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td><strong>{team.name || 'Unnamed Team'}</strong></td>
                    <td>{team.description || 'No description'}</td>
                    <td className="text-center">
                      <span className="badge bg-primary">{team.members?.length || 0}</span>
                    </td>
                    <td>{team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}</td>
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

export default Teams;
