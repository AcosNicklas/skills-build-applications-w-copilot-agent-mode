import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.svg" alt="OctoFit Logo" className="navbar-logo" />
              <strong>[ OctoFit_Tracker.exe ]</strong>
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-5 home-hero">
              <h1>🏋️ Welcome to OctoFit Tracker</h1>
              <p className="lead">Track your fitness journey, compete with teams, and achieve your goals!</p>
              
              <div className="row mt-5">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3>👤</h3>
                      <h5 className="card-title">Users</h5>
                      <p className="card-text">Manage and view all users</p>
                      <Link to="/users" className="btn btn-info">View Users</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3>👥</h3>
                      <h5 className="card-title">Teams</h5>
                      <p className="card-text">Explore fitness teams</p>
                      <Link to="/teams" className="btn btn-success">View Teams</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3>🏃</h3>
                      <h5 className="card-title">Activities</h5>
                      <p className="card-text">Track workout activities</p>
                      <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-3">
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3>💪</h3>
                      <h5 className="card-title">Workouts</h5>
                      <p className="card-text">Get personalized suggestions</p>
                      <Link to="/workouts" className="btn btn-danger">View Workouts</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3>🏆</h3>
                      <h5 className="card-title">Leaderboard</h5>
                      <p className="card-text">See who's on top</p>
                      <Link to="/leaderboard" className="btn btn-warning">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
