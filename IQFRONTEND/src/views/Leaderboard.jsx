import React from "react";
import "./Leaderboard.css";

const dummyPlayers = [
  {
    id: 1,
    name: "iQBUVL",
    service: "Gaming Coaching",
    rating: 4.9,
    sessions: 312,
    img: "/BUVL.jpg"
  },
  {
    id: 2,
    name: "iQScopes",
    service: "Video Editing",
    rating: 4.8,
    sessions: 198,
    // img: "/CODB.png"
  },
  {
    id: 3,
    name: "iQJoyStacks",
    service: "Coaching for Editing",
    rating: 4.7,
    sessions: 224,
    // img: "/armyguy3.png"
  },
  {
    id: 4,
    name: "IQ YT_FINISHED",
    service: "Marketing Consulting",
    rating: 4.6,
    sessions: 167,
    // img: "/Apex.png"
  },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard-wrapper">
      <div className="leaderboard-card">
        <div className="leaderboard-outer-block">

          <h1 className="leaderboard-title">IQ Entertainment Leaderboard</h1>
          <p className="leaderboard-meta">Updated Weekly</p>

          <div className="leaderboard-table">
            {dummyPlayers.map((player, index) => (
              <div key={player.id} className="leaderboard-row">

                <div className="rank-number">{index + 1}</div>

                <img src={player.img} alt={player.name} className="player-img" />

                <div className="player-info">
                  <p className="player-name">{player.name}</p>
                  <p className="player-service">{player.service}</p>
                </div>

                <div className="player-stats">
                  <p className="player-rating">⭐ {player.rating}</p>
                  <p className="player-sessions">{player.sessions} Sessions</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
