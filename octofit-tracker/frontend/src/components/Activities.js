import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Determine the API base URL - fuzzy-space-yodel-496gxr9r5rpfqxpq-8000.app.github.dev/api/activities
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/activities/`;
        
        console.log('Activities - Fetching from API:', apiUrl);
        console.log('Activities - Codespace name:', codespace);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities - Raw response data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activityData = data.results || data;
        console.log('Activities - Processed data:', activityData);
        
        setActivities(activityData);
        setLoading(false);
      } catch (err) {
        console.error('Activities - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="mt-3">Loading activities...</h2>
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
        <h2>🏃 Activities</h2>
        <span className="badge bg-primary">{activities.length} Total</span>
      </div>
      
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Activities Found</h4>
          <p>There are no activities to display at the moment.</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            {activities.map((activity) => (
              <div key={activity.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0 text-white">{activity.user_name || 'Unknown User'}</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <span className="badge bg-info">Type</span> {activity.activity_type || 'N/A'}
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-success">Duration</span> {activity.duration || 'N/A'} min
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-warning">Distance</span> {activity.distance || 'N/A'} km
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-danger">Calories</span> {activity.calories_burned || 'N/A'}
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-secondary">Date</span> {new Date(activity.date).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Distance (km)</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td><strong>{activity.user_name || 'Unknown'}</strong></td>
                    <td><span className="badge bg-info">{activity.activity_type || 'N/A'}</span></td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td>{activity.distance || 'N/A'}</td>
                    <td>{activity.calories_burned || 'N/A'}</td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
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

export default Activities;
