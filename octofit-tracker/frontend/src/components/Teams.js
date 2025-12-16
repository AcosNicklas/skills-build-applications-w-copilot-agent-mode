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
    return <div className="container mt-4"><h2>Loading teams...</h2></div>;
  }

  if (error) {
    return <div className="container mt-4"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Unnamed Team'}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {team.description || 'No description'}<br />
                    <strong>Members:</strong> {team.members?.length || 0}<br />
                    <strong>Created:</strong> {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
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

export default Teams;
