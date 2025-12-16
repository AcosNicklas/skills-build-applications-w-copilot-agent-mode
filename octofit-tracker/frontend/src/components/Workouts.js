import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Determine the API base URL - fuzzy-space-yodel-496gxr9r5rpfqxpq-8000.app.github.dev/api/workouts
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
    return (
      <div className="container mt-4 loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="mt-3">Loading workouts...</h2>
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
        <h2>💪 Workout Suggestions</h2>
        <span className="badge bg-danger">{workouts.length} Workouts</span>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Workout Suggestions</h4>
          <p>There are no workout suggestions available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0 text-white">{workout.name || 'Unnamed Workout'}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{workout.description || 'No description available'}</p>
                    <hr />
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <span className="badge bg-info">User</span> {workout.user_name || 'N/A'}
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-primary">Type</span> {workout.workout_type || 'N/A'}
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-success">Duration</span> {workout.duration || 'N/A'} min
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-warning">Difficulty</span> {workout.difficulty || 'N/A'}
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-danger w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Workout Name</th>
                  <th>Type</th>
                  <th>User</th>
                  <th className="text-center">Duration (min)</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td><strong>{workout.name || 'Unnamed Workout'}</strong></td>
                    <td><span className="badge bg-primary">{workout.workout_type || 'N/A'}</span></td>
                    <td>{workout.user_name || 'N/A'}</td>
                    <td className="text-center">{workout.duration || 'N/A'}</td>
                    <td><span className="badge bg-warning">{workout.difficulty || 'N/A'}</span></td>
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

export default Workouts;
