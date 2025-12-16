import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Determine the API base URL
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/leaderboard/`;
        
        console.log('Leaderboard - Fetching from API:', apiUrl);
        console.log('Leaderboard - Codespace name:', codespace);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard - Raw response data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Leaderboard - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="mt-3">Loading leaderboard...</h2>
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
        <h2>🏆 Leaderboard</h2>
        <span className="badge bg-warning">{leaderboard.length} Competitors</span>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p>There are no leaderboard entries to display at the moment.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th className="text-center" width="10%">Rank</th>
                <th width="30%">User</th>
                <th width="25%">Team</th>
                <th className="text-center" width="20%">Total Points</th>
                <th width="15%">Period</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="text-center">
                    {index === 0 && <span className="badge bg-warning fs-5">🥇 {index + 1}</span>}
                    {index === 1 && <span className="badge bg-secondary fs-5">🥈 {index + 1}</span>}
                    {index === 2 && <span className="badge bg-danger fs-5">🥉 {index + 1}</span>}
                    {index > 2 && <span className="badge bg-primary">{index + 1}</span>}
                  </td>
                  <td><strong>{entry.user_name || 'Unknown'}</strong></td>
                  <td><span className="badge bg-info">{entry.team_name || 'No Team'}</span></td>
                  <td className="text-center">
                    <span className="badge bg-success fs-6">{entry.total_points || 0} pts</span>
                  </td>
                  <td>{entry.period || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
