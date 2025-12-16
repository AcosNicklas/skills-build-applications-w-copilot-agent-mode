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
        const apiUrl = `${baseUrl}/api/leaderboards/`;
        
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
    return <div className="container mt-4"><h2>Loading leaderboard...</h2></div>;
  }

  if (error) {
    return <div className="container mt-4"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user_name || 'Unknown'}</td>
                <td>{entry.team_name || 'N/A'}</td>
                <td>{entry.total_points || 0}</td>
                <td>{entry.period || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
