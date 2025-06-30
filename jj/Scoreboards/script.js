// 1) League definitions (data arrays already inlined below)
const leagues = {
  nfl: { icon: "🏈", name: "NFL", data: [] },
  nba: { icon: "🏀", name: "NBA", data: [] },
  mlb: { icon: "⚾", name: "MLB", data: [] },
};

// 2) DOM refs
const tickerEl = document.getElementById("ticker-content");
const boardEl = document.querySelector(".scoreboard");
const selectEl = document.getElementById("sport-select");

// 3) Rendering
function initTicker(games) {
  const wrap = document.getElementById("ticker-content");
  wrap.innerHTML = "";

  // duplicate the array so it scrolls seamlessly
  const items = games.concat(games);

  items.forEach((g) => {
    const card = document.createElement("div");
    card.className = "game-card ticker__item";
    card.innerHTML = `
        <div class="teams">
          <div class="team">
            <div class="team-name">${g.homeTeam}</div>
            <div class="score">${g.homeScore}</div>
          </div>
          <div class="team">
            <div class="team-name">${g.awayTeam}</div>
            <div class="score">${g.awayScore}</div>
          </div>
        </div>
        <div class="status">${g.status}</div>
      `;
    wrap.appendChild(card);
  });
}

function renderScoreboard(games) {
  boardEl.innerHTML = "";
  games.forEach((g) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = /* html */ `
        <div class="teams">
          <div class="team">
            <div class="team-name">${g.homeTeam}</div>
            <div class="score">${g.homeScore}</div>
          </div>
          <div class="team">
            <div class="team-name">${g.awayTeam}</div>
            <div class="score">${g.awayScore}</div>
          </div>
        </div>
        <div class="status">${g.status}</div>
      `;
    boardEl.appendChild(card);
  });
}

// 4) Update display when league changes
function updateDisplay(key) {
  const { data } = leagues[key];
  initTicker(data);
  renderScoreboard(data);
}

// 5) Wire up selector
window.addEventListener("DOMContentLoaded", () => {
  selectEl.addEventListener("change", (e) => updateDisplay(e.target.value));
  updateDisplay(selectEl.value);
});

// ──────────────────────────────────────────────────────────
// 6) Inline mock data (15 entries each) with real team names
// ──────────────────────────────────────────────────────────

const nflData = [
  {
    homeTeam: "Patriots",
    awayTeam: "Dolphins",
    homeScore: 21,
    awayScore: 14,
    status: "Q1 • 12:34",
  },
  {
    homeTeam: "Cowboys",
    awayTeam: "Giants",
    homeScore: 17,
    awayScore: 20,
    status: "Q2 • 08:15",
  },
  {
    homeTeam: "Packers",
    awayTeam: "Bears",
    homeScore: 28,
    awayScore: 24,
    status: "Q3 • 05:50",
  },
  {
    homeTeam: "Chiefs",
    awayTeam: "Raiders",
    homeScore: 10,
    awayScore: 13,
    status: "Q4 • 02:10",
  },
  {
    homeTeam: "Steelers",
    awayTeam: "Ravens",
    homeScore: 31,
    awayScore: 31,
    status: "Q1 • 09:05",
  },
  {
    homeTeam: "Rams",
    awayTeam: "Seahawks",
    homeScore: 7,
    awayScore: 6,
    status: "Q2 • 06:45",
  },
  {
    homeTeam: "Saints",
    awayTeam: "Panthers",
    homeScore: 14,
    awayScore: 21,
    status: "Q3 • 03:30",
  },
  {
    homeTeam: "Colts",
    awayTeam: "Texans",
    homeScore: 3,
    awayScore: 0,
    status: "Q4 • 01:20",
  },
  {
    homeTeam: "Broncos",
    awayTeam: "Chargers",
    homeScore: 24,
    awayScore: 27,
    status: "Q1 • 11:22",
  },
  {
    homeTeam: "Buccaneers",
    awayTeam: "Falcons",
    homeScore: 16,
    awayScore: 23,
    status: "Q2 • 07:07",
  },
  {
    homeTeam: "Jets",
    awayTeam: "Bills",
    homeScore: 35,
    awayScore: 10,
    status: "Q3 • 04:55",
  },
  {
    homeTeam: "49ers",
    awayTeam: "Cardinals",
    homeScore: 9,
    awayScore: 9,
    status: "Q4 • 00:45",
  },
  {
    homeTeam: "Vikings",
    awayTeam: "Lions",
    homeScore: 12,
    awayScore: 19,
    status: "Q1 • 13:10",
  },
  {
    homeTeam: "Jaguars",
    awayTeam: "Titans",
    homeScore: 27,
    awayScore: 17,
    status: "Q2 • 10:59",
  },
  {
    homeTeam: "Browns",
    awayTeam: "Bengals",
    homeScore: 30,
    awayScore: 27,
    status: "Q3 • 06:18",
  },
];

const nbaData = [
  {
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeScore: 102,
    awayScore: 99,
    status: "Q1 • 11:15",
  },
  {
    homeTeam: "Celtics",
    awayTeam: "Nets",
    homeScore: 88,
    awayScore: 91,
    status: "Q2 • 08:30",
  },
  {
    homeTeam: "Bulls",
    awayTeam: "Heat",
    homeScore: 110,
    awayScore: 107,
    status: "Q3 • 05:21",
  },
  {
    homeTeam: "Spurs",
    awayTeam: "Mavericks",
    homeScore: 95,
    awayScore: 100,
    status: "Q4 • 02:48",
  },
  {
    homeTeam: "Knicks",
    awayTeam: "76ers",
    homeScore: 87,
    awayScore: 89,
    status: "Q1 • 09:12",
  },
  {
    homeTeam: "Clippers",
    awayTeam: "Suns",
    homeScore: 123,
    awayScore: 119,
    status: "Q2 • 07:03",
  },
  {
    homeTeam: "Bucks",
    awayTeam: "Raptors",
    homeScore: 76,
    awayScore: 80,
    status: "Q3 • 04:27",
  },
  {
    homeTeam: "Nuggets",
    awayTeam: "Trail Blazers",
    homeScore: 112,
    awayScore: 115,
    status: "Q4 • 01:14",
  },
  {
    homeTeam: "Jazz",
    awayTeam: "Pelicans",
    homeScore: 98,
    awayScore: 92,
    status: "Q1 • 12:00",
  },
  {
    homeTeam: "Hawks",
    awayTeam: "Wizards",
    homeScore: 105,
    awayScore: 108,
    status: "Q2 • 10:05",
  },
  {
    homeTeam: "Pistons",
    awayTeam: "Pacers",
    homeScore: 120,
    awayScore: 118,
    status: "Q3 • 06:36",
  },
  {
    homeTeam: "Hornets",
    awayTeam: "Magic",
    homeScore: 84,
    awayScore: 86,
    status: "Q4 • 03:09",
  },
  {
    homeTeam: "Rockets",
    awayTeam: "Kings",
    homeScore: 99,
    awayScore: 101,
    status: "Q1 • 13:28",
  },
  {
    homeTeam: "Timberwolves",
    awayTeam: "Grizzlies",
    homeScore: 115,
    awayScore: 113,
    status: "Q2 • 08:55",
  },
  {
    homeTeam: "Cavaliers",
    awayTeam: "Pistons",
    homeScore: 90,
    awayScore: 95,
    status: "Q3 • 05:50",
  },
];

const mlbData = [
  {
    homeTeam: "Yankees",
    awayTeam: "Red Sox",
    homeScore: 3,
    awayScore: 2,
    status: "Inning 7 • 2 Out",
  },
  {
    homeTeam: "Dodgers",
    awayTeam: "Giants",
    homeScore: 5,
    awayScore: 1,
    status: "Inning 5 • 1 Out",
  },
  {
    homeTeam: "Cubs",
    awayTeam: "Cardinals",
    homeScore: 0,
    awayScore: 0,
    status: "Inning 2 • 0 Out",
  },
  {
    homeTeam: "Astros",
    awayTeam: "Mariners",
    homeScore: 4,
    awayScore: 4,
    status: "Inning 4 • 2 Out",
  },
  {
    homeTeam: "Mets",
    awayTeam: "Braves",
    homeScore: 2,
    awayScore: 3,
    status: "Inning 3 • 1 Out",
  },
  {
    homeTeam: "Phillies",
    awayTeam: "Nationals",
    homeScore: 1,
    awayScore: 0,
    status: "Inning 6 • 0 Out",
  },
  {
    homeTeam: "Blue Jays",
    awayTeam: "Orioles",
    homeScore: 6,
    awayScore: 5,
    status: "Inning 8 • 2 Out",
  },
  {
    homeTeam: "Tigers",
    awayTeam: "Royals",
    homeScore: 7,
    awayScore: 2,
    status: "Inning 9 • 1 Out",
  },
  {
    homeTeam: "Twins",
    awayTeam: "White Sox",
    homeScore: 8,
    awayScore: 8,
    status: "Inning 1 • 0 Out",
  },
  {
    homeTeam: "Padres",
    awayTeam: "Rockies",
    homeScore: 3,
    awayScore: 3,
    status: "Inning 5 • 2 Out",
  },
  {
    homeTeam: "Rays",
    awayTeam: "Diamondbacks",
    homeScore: 10,
    awayScore: 9,
    status: "Inning 2 • 1 Out",
  },
  {
    homeTeam: "Pirates",
    awayTeam: "Brewers",
    homeScore: 4,
    awayScore: 1,
    status: "Inning 7 • 0 Out",
  },
  {
    homeTeam: "Angels",
    awayTeam: "Athletics",
    homeScore: 9,
    awayScore: 6,
    status: "Inning 4 • 2 Out",
  },
  {
    homeTeam: "Reds",
    awayTeam: "Marlins",
    homeScore: 1,
    awayScore: 2,
    status: "Inning 6 • 2 Out",
  },
  {
    homeTeam: "Guardians",
    awayTeam: "Rays",
    homeScore: 5,
    awayScore: 5,
    status: "Inning 9 • 0 Out",
  },
];

// 7) Assign into leagues
leagues.nfl.data = nflData;
leagues.nba.data = nbaData;
leagues.mlb.data = mlbData;
