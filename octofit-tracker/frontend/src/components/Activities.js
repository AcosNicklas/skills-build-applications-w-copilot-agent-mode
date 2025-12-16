import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Determine the API base URL
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
    return <div className="container mt-4"><h2>Loading activities...</h2></div>;
  }

  if (error) {
    return <div className="container mt-4"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="row">
          {activities.map((activity) => (
            <div key={activity.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.user_name || 'Unknown User'}</h5>
                  <p className="card-text">
                    <strong>Type:</strong> {activity.activity_type || 'N/A'}<br />
                    <strong>Duration:</strong> {activity.duration || 'N/A'} minutes<br />
                    <strong>Distance:</strong> {activity.distance || 'N/A'} km<br />
                    <strong>Calories:</strong> {activity.calories_burned || 'N/A'}<br />
                    <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
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

export default Activities;
