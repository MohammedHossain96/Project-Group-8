import { useState, useEffect } from 'react';
import FitnessForm from '../components/FitnessForm';
import Badge from '../components/Badge';
import ProgressChart from '../components/ProgressChart';
import { getUserBadges } from '../api/badgeAPI';
import { getUserFitnessData } from '../api/fitnessAPI';
import Auth from '../utils/auth';
import TipsCard from '../components/TipsCard';

const MainPage = () => {
  const [playlists, setPlaylists] = useState<{ name: string; url: string }[]>([]);
  const [fitnessData, setFitnessData] = useState({
    latest: { cardio: 0, weights: 0, calories: 0 },
    totals: { totalCardio: 0, totalWeights: 0, totalCalories: 0 }
  });
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  const refreshData = async () => {
    const profile = Auth.getProfile();
    if (profile && profile.id) {
      try {
        const userId = typeof profile.id === 'string' ? parseInt(profile.id, 10) : profile.id;
        if (!isNaN(userId)) {
          // Get badges first to ensure they're up to date
          const badges = await getUserBadges(userId);
          setUserBadges(badges);
          
          const data = await getUserFitnessData(userId);
          setFitnessData(data);
          
          console.log('Refreshed badges:', badges);
        }
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    }
  };

  useEffect(() => {
    const profile = Auth.getProfile();
    if (profile && profile.username) {
      setUsername(profile.username);
    } else {
       console.log("Could not find username in profile data.");
    }

    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
    refreshData();
  }, []);

  // Define next milestones based on current totals
  const getNextMilestone = (category: string, current: number) => {
    if (category === 'cardio') {
      if (current < 5) return 5;
      if (current < 15) return 15;
      if (current < 30) return 30;
      return Math.ceil(current / 10) * 10; // Next 10km milestone
    }
    
    if (category === 'weights') {
      if (current < 100) return 100;
      if (current < 250) return 250;
      if (current < 500) return 500;
      return Math.ceil(current / 100) * 100; // Next 100lbs milestone
    }
    
    // Calories
    if (current < 500) return 500;
    if (current < 1500) return 1500;
    if (current < 3000) return 3000;
    return Math.ceil(current / 1000) * 1000; // Next 1000 calorie milestone
  };

  return (
    <div className="main-container">
      <div className="main-content">
        <div className="card welcome-card">
          <div className="card-content">
            <h1>Welcome, {username || 'Fitness Enthusiast'}!</h1>
            <p className="welcome-message">
              Track your fitness journey, earn badges, and stay motivated with your personalized dashboard!
            </p>
          </div>
        </div>

        <h1>Fitness Tracker Dashboard</h1>

        <div className="row">
          <div className="col s12 m6">
            <FitnessForm onFormSubmit={refreshData} />
          </div>
          <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <h2>Your Badges</h2>
                <div className="badge-container">
                  {Array.isArray(userBadges) && userBadges.length > 0 ? (
                    // Filter out badges with level 0 before mapping
                    userBadges
                      .filter(badge => badge.badgeLevel > 0)
                      .map((badge, index) => (
                        <Badge
                          key={index}
                          category={badge.badgeCategory}
                          level={badge.badgeLevel}
                        />
                      ))
                  ) : (
                    <p>No badges earned yet.</p>
                  )}
                </div>
              </div>
            </div>
            
           
            <div className="card">
              <div className="card-content">
                <h2>Music Playlists</h2>
                
                {/* Spotify Playlist Embed */}
                <div className="spotify-embed-container">
                  <iframe 
                    style={{ borderRadius: "12px" }} 
                    src="https://open.spotify.com/embed/playlist/1pQMeVHt7e5rxfMcm1Qk2z?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                  </iframe>
                </div>
                
                {/* Existing playlists section - you can keep or remove this */}
                {playlists.length > 0 && (
                  <div className="playlist-links mt-2">
                    <h3>Additional Playlists</h3>
                    <ul>
                      {playlists.map((playlist, index) => (
                        <li key={index}>
                          <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                            {playlist.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h2>Fitness Progress</h2>
            <div className="progress-container">
              <ProgressChart 
                category="Cardio Distance" 
                current={fitnessData.latest.cardio} 
                total={fitnessData.totals.totalCardio || 0} 
                unit="km"
                nextMilestone={getNextMilestone('cardio', fitnessData.totals.totalCardio || 0)} 
              />
              
              <ProgressChart 
                category="Weight Lifted" 
                current={fitnessData.latest.weights} 
                total={fitnessData.totals.totalWeights || 0} 
                unit="lbs"
                nextMilestone={getNextMilestone('weights', fitnessData.totals.totalWeights || 0)} 
              />
              
              <ProgressChart 
                category="Calories Burned" 
                current={fitnessData.latest.calories} 
                total={fitnessData.totals.totalCalories || 0} 
                unit="cal"
                nextMilestone={getNextMilestone('calories', fitnessData.totals.totalCalories || 0)} 
              />
            </div>

            <div className="row">
              <div className="col s12 m6">
                <h3>Latest Workout</h3>
                <p><strong>Cardio:</strong> {fitnessData.latest.cardio} km</p>
                <p><strong>Weights:</strong> {fitnessData.latest.weights} lbs</p>
                <p><strong>Calories:</strong> {fitnessData.latest.calories}</p>
              </div>
              <div className="col s12 m6">
                <h3>Overall Stats</h3>
                <p><strong>Total Cardio:</strong> {fitnessData.totals.totalCardio || 0} km</p>
                <p><strong>Total Weight Lifted:</strong> {fitnessData.totals.totalWeights || 0} lbs</p>
                <p><strong>Total Calories Burned:</strong> {fitnessData.totals.totalCalories || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
       
          <div className="col s12">
            <TipsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;