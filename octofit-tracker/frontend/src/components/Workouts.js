import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Determine the API base URL
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/workouts/`;
        
        console.log('Workouts - Fetching from API:', apiUrl);
        console.log('Workouts - Codespace name:', codespace);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts - Raw response data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutData = data.results || data;
        console.log('Workouts - Processed data:', workoutData);
        
        setWorkouts(workoutData);
        setLoading(false);
      } catch (err) {
        console.error('Workouts - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <div className="container mt-4"><h2>Loading workouts...</h2></div>;
  }

  if (error) {
    return <div className="container mt-4"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Workout Suggestions</h2>
      {workouts.length === 0 ? (
        <p>No workout suggestions found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || 'Unnamed Workout'}</h5>
                  <p className="card-text">
                    <strong>User:</strong> {workout.user_name || 'N/A'}<br />
                    <strong>Type:</strong> {workout.workout_type || 'N/A'}<br />
                    <strong>Description:</strong> {workout.description || 'No description'}<br />
                    <strong>Duration:</strong> {workout.duration || 'N/A'} minutes<br />
                    <strong>Difficulty:</strong> {workout.difficulty || 'N/A'}
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

export default Workouts;
