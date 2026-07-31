// ==================== career.js ====================
// THE JOURNEY — Career Hub with Season System, Match Limits & Club Offers

(function() {
    'use strict';

    // ==================== LOAD PLAYER ====================
    function getPlayerData() {
        const data = localStorage.getItem('theJourney_playerData');
        if (!data) {
            window.location.href = 'index.html';
            return null;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            window.location.href = 'index.html';
            return null;
        }
    }

    const player = getPlayerData();
    if (!player) return;

    // ==================== LEAGUE DATABASE ====================
    const leagues = {
        'Premier League': {
            clubs: [
                'Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal',
                'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'West Ham United',
                'Everton', 'Fulham', 'Brighton & Hove Albion', 'Crystal Palace',
                'Wolverhampton Wanderers', 'Nottingham Forest', 'Brentford', 'Bournemouth',
                'Burnley', 'Leicester City', 'Leeds United'
            ],
            matchesPerTeam: 38, // 20 teams, home & away
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Premier_League_logo.svg/1200px-Premier_League_logo.svg.png'
        },
        'La Liga': {
            clubs: ['Real Madrid', 'Barcelona', 'Atletico Madrid', 'Sevilla', 'Valencia',
                'Villarreal', 'Real Sociedad', 'Athletic Bilbao', 'Betis', 'Osasuna',
                'Celta Vigo', 'Getafe', 'Girona', 'Rayo Vallecano', 'Almeria',
                'Mallorca', 'Valladolid', 'Cadiz', 'Elche', 'Espanyol'
            ],
            matchesPerTeam: 38,
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/La_Liga_logo_2023.svg/1200px-La_Liga_logo_2023.svg.png'
        },
        'Bundesliga': {
            clubs: ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen',
                'Eintracht Frankfurt', 'Wolfsburg', 'Freiburg', 'Hoffenheim', 'Mainz',
                'Stuttgart', 'Koln', 'Augsburg', 'Gladbach', 'Hertha Berlin', 'Bochum',
                'Werder Bremen', 'Schalke', 'Union Berlin', 'Darmstadt', 'Heidenheim'
            ],
            matchesPerTeam: 34, // 18 teams
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png'
        },
        'Serie A': {
            clubs: ['Inter Milan', 'AC Milan', 'Juventus', 'Napoli', 'Lazio', 'Roma',
                'Atalanta', 'Fiorentina', 'Torino', 'Sassuolo', 'Monza', 'Lecce',
                'Empoli', 'Salernitana', 'Bologna', 'Udinese', 'Verona', 'Cremonese',
                'Spezia', 'Sampdoria'
            ],
            matchesPerTeam: 38,
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Serie_A_logo_2022.svg/1200px-Serie_A_logo_2022.svg.png'
        },
        'Ligue 1': {
            clubs: ['PSG', 'Marseille', 'Monaco', 'Lyon', 'Lille', 'Rennes', 'Nice',
                'Lens', 'Montpellier', 'Reims', 'Strasbourg', 'Nantes', 'Brest',
                'Angers', 'Clermont', 'Lorient', 'Troyes', 'Ajaccio', 'Auxerre', 'Toulouse'
            ],
            matchesPerTeam: 38,
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png'
        },
        'Eredivisie': {
            clubs: ['Ajax', 'PSV', 'Feyenoord', 'AZ Alkmaar', 'Twente', 'Utrecht',
                'Groningen', 'Heerenveen', 'Vitesse', 'Emmen', 'Fortuna Sittard',
                'NEC Nijmegen', 'RKC Waalwijk', 'Sparta Rotterdam', 'Go Ahead Eagles',
                'Volendam', 'Excelsior', 'Cambuur'
            ],
            matchesPerTeam: 34,
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Eredivisie_logo.svg/1200px-Eredivisie_logo.svg.png'
        }
    };

    // Club logos (sama seperti sebelum ini)
    const clubLogos = {
        'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
        'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
        'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
        'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
        'Manchester City': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_crest.svg/1200px-Manchester_City_FC_crest.svg.png',
        'Tottenham Hotspur': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Tottenham_Hotspur_FC_crest.svg/1200px-Tottenham_Hotspur_FC_crest.svg.png',
        'Newcastle United': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_FC_crest.svg/1200px-Newcastle_United_FC_crest.svg.png',
        'Aston Villa': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Aston_Villa_FC_crest.svg/1200px-Aston_Villa_FC_crest.svg.png',
        'West Ham United': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/West_Ham_United_FC_crest.svg/1200px-West_Ham_United_FC_crest.svg.png',
        'Everton': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Everton_FC_crest.svg/1200px-Everton_FC_crest.svg.png',
        'Fulham': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Fulham_FC_crest.svg/1200px-Fulham_FC_crest.svg.png',
        'Brighton & Hove Albion': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png',
        'Crystal Palace': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Crystal_Palace_FC_crest.svg/1200px-Crystal_Palace_FC_crest.svg.png',
        'Wolverhampton Wanderers': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Wolverhampton_Wanderers_FC_crest.svg/1200px-Wolverhampton_Wanderers_FC_crest.svg.png',
        'Nottingham Forest': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Nottingham_Forest_FC_crest.svg/1200px-Nottingham_Forest_FC_crest.svg.png',
        'Brentford': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Brentford_FC_crest.svg/1200px-Brentford_FC_crest.svg.png',
        'Bournemouth': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/AFC_Bournemouth_crest.svg/1200px-AFC_Bournemouth_crest.svg.png',
        'Burnley': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Burnley_FC_crest.svg/1200px-Burnley_FC_crest.svg.png',
        'Leicester City': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_FC_crest.svg/1200px-Leicester_City_FC_crest.svg.png',
        'Leeds United': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Leeds_United_FC_crest.svg/1200px-Leeds_United_FC_crest.svg.png',
        'Southampton': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Southampton_FC_crest.svg/1200px-Southampton_FC_crest.svg.png',
        'Stoke City': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Stoke_City_FC_crest.svg/1200px-Stoke_City_FC_crest.svg.png',
        'Swansea City': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Swansea_City_AFC_crest.svg/1200px-Swansea_City_AFC_crest.svg.png',
        'Huddersfield Town': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Huddersfield_Town_A.F.C._crest.svg/1200px-Huddersfield_Town_A.F.C._crest.svg.png',
        'Norwich City': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Norwich_City_FC_crest.svg/1200px-Norwich_City_FC_crest.svg.png',
        // La Liga
        'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
        'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
        'Atletico Madrid': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Atl%C3%A9tico_Madrid_logo.svg/1200px-Atl%C3%A9tico_Madrid_logo.svg.png',
        'Sevilla': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png',
        'Valencia': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Valencia_CF_logo.svg/1200px-Valencia_CF_logo.svg.png',
        // Bundesliga
        'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
        'Borussia Dortmund': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
        // Serie A
        'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Inter_Milan_logo.svg/1200px-Inter_Milan_logo.svg.png',
        'AC Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png',
        'Juventus': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Juventus_FC_logo.svg/1200px-Juventus_FC_logo.svg.png',
        // Ligue 1
        'PSG': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
        // Eredivisie
        'Ajax': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/1200px-Ajax_Amsterdam.svg.png',
        'PSV': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/PSV_Eindhoven_logo.svg/1200px-PSV_Eindhoven_logo.svg.png',
        'Feyenoord': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Feyenoord_crest.svg/1200px-Feyenoord_crest.svg.png',
    };

    const trophyImages = {
        'Premier League': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Premier_League_Trophy_%282019%29.jpg/1200px-Premier_League_Trophy_%282019%29.jpg',
        'FA Cup': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/FA_Cup_%282014%29.jpg/1200px-FA_Cup_%282014%29.jpg',
        'EFL Cup': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/EFL_Cup_%282017%29.jpg/1200px-EFL_Cup_%282017%29.jpg',
        'UEFA Champions League': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Champions_League_trophy.jpg/1200px-Champions_League_trophy.jpg',
        'UEFA Europa League': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/UEFA_Europa_League_trophy.jpg/1200px-UEFA_Europa_League_trophy.jpg',
        'FIFA World Cup': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/FIFA_World_Cup_trophy_2018.jpg/1200px-FIFA_World_Cup_trophy_2018.jpg',
        'Ballon d\'Or': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ballon_d%27Or_%282017%29.jpg/1200px-Ballon_d%27Or_%282017%29.jpg',
        'Golden Boot': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Golden_Boot_%282018%29.jpg/1200px-Golden_Boot_%282018%29.jpg',
    };

    // ==================== NPC NAME DATABASE ====================
    const firstNames = ['James','Oliver','Leo','Ethan','Noah','Lucas','Marcus','Theo','Kai','Finn','Alex','Daniel','Ryan','Callum','Liam','Adam','Samuel','Harry','Oscar','Max','Enzo','Mateo','Thiago','Luka','Jude','Pedri','Gavi','Jamal','Kylian','Erling','Mohamed','Kevin','Raheem','Bukayo','Phil','Jack','Declan','Mason','Cole','Eberechi'];
    const lastNames = ['Carter','Mitchell','Harrison','Walker','Bennett','Foster','Reid','Shaw','Cole','Palmer','Davies','Hughes','Morgan','Ellis','Knight','Stone','Brooks','Wells','Fox','Gray','Silva','Santos','Costa','Muller','Kim','Tanaka','Park','Martinez','Garcia','Lopez','Fernandez','Rodriguez','Gonzalez','Perez','Sanchez','Henderson','Wilson','Taylor','Anderson','Thomas','Jackson','White','Harris'];

    function generateNPCName() {
        return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    // ==================== LEAGUE & SEASON SETUP ====================
    function getLeagueFromAcademy(academy) {
        if (academy.includes('Manchester United') || academy.includes('Chelsea') || academy.includes('Arsenal') || academy.includes('Liverpool') || academy.includes('Manchester City')) return 'Premier League';
        if (academy.includes('Barcelona') || academy.includes('Real Madrid')) return 'La Liga';
        if (academy.includes('Bayern')) return 'Bundesliga';
        if (academy.includes('AC Milan') || academy.includes('Juventus')) return 'Serie A';
        if (academy.includes('Paris')) return 'Ligue 1';
        if (academy.includes('Ajax')) return 'Eredivisie';
        if (academy.includes('Benfica') || academy.includes('Sporting')) return 'Primeira Liga';
        return 'Premier League';
    }

    // Determine player's league
    let leagueName = getLeagueFromAcademy(player.academy);
    // If player's club is not in the league, assign a default
    const leagueData = leagues[leagueName];
    if (!leagueData) {
        leagueName = 'Premier League';
        leagueData = leagues[leagueName];
    }

    // Ensure player.club is in the league clubs list
    if (!leagueData.clubs.includes(player.club)) {
        // If player is in academy, assign a random club from the league
        player.club = leagueData.clubs[Math.floor(Math.random() * leagueData.clubs.length)];
    }

    // Calculate total matches per season
    const totalMatchesPerSeason = leagueData.matchesPerTeam;

    // ==================== INITIALISE SEASON DATA ====================
    function initSeason() {
        if (!player.seasonData) {
            player.seasonData = {
                currentWeek: 1,
                matchesPlayed: 0,
                matchesRemaining: totalMatchesPerSeason,
                homeAway: [], // list of opponents with home/away flag
                currentOpponentIndex: 0
            };
            // Generate home/away fixture list
            const opponents = leagueData.clubs.filter(c => c !== player.club);
            let fixtures = [];
            // Each opponent: 1 home, 1 away
            opponents.forEach(opp => {
                fixtures.push({ opponent: opp, venue: 'home' });
                fixtures.push({ opponent: opp, venue: 'away' });
            });
            // Shuffle fixtures
            for (let i = fixtures.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [fixtures[i], fixtures[j]] = [fixtures[j], fixtures[i]];
            }
            player.seasonData.homeAway = fixtures;
            player.seasonData.currentOpponentIndex = 0;
            player.seasonData.matchesPlayed = 0;
            player.seasonData.matchesRemaining = fixtures.length;
            player.seasonData.currentWeek = 1;
        }
        // Ensure seasonData exists
        if (!player.seasonData) {
            player.seasonData = {
                currentWeek: 1,
                matchesPlayed: 0,
                matchesRemaining: totalMatchesPerSeason,
                homeAway: [],
                currentOpponentIndex: 0
            };
        }
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    // ==================== GET NEXT MATCH ====================
    function getNextMatch() {
        const seasonData = player.seasonData;
        if (!seasonData || seasonData.currentOpponentIndex >= seasonData.homeAway.length) {
            // Season ended
            return null;
        }
        const fixture = seasonData.homeAway[seasonData.currentOpponentIndex];
        const opponent = fixture.opponent;
        const isHome = fixture.venue === 'home';
        const homeTeam = isHome ? player.club : opponent;
        const awayTeam = isHome ? opponent : player.club;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 7);
        return {
            home: homeTeam,
            away: awayTeam,
            date: nextDate.toISOString(),
            league: leagueName,
            leagueLogo: leagueData.logo,
            homeLogo: clubLogos[homeTeam] || '',
            awayLogo: clubLogos[awayTeam] || '',
            venue: isHome ? 'Home Stadium' : 'Away Stadium'
        };
    }

    // ==================== DISPLAY NEXT MATCH ====================
    function displayNextMatch() {
        const nextMatch = getNextMatch();
        if (!nextMatch) {
            // Season ended
            document.getElementById('homeTeam').textContent = 'Season Ended';
            document.getElementById('awayTeam').textContent = '—';
            document.getElementById('homeLogo').src = '';
            document.getElementById('awayLogo').src = '';
            document.getElementById('matchDate').textContent = 'Season ' + player.season + ' Complete';
            document.getElementById('matchVenue').textContent = 'Championship Decided?';
            document.getElementById('matchLeague').textContent = leagueName;
            document.getElementById('opponentInfo').innerHTML = '<strong>Season finished! New season starting soon.</strong>';
            document.getElementById('matchResultContainer').style.display = 'none';
            document.getElementById('btnSimulateMatch').disabled = true;
            document.getElementById('btnSkipMatch').disabled = true;
            return;
        }

        player.nextMatch = nextMatch;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));

        document.getElementById('homeTeam').textContent = nextMatch.home;
        document.getElementById('awayTeam').textContent = nextMatch.away;
        document.getElementById('homeLogo').src = nextMatch.homeLogo;
        document.getElementById('awayLogo').src = nextMatch.awayLogo;
        document.getElementById('matchDate').textContent = new Date(nextMatch.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
        document.getElementById('matchVenue').textContent = nextMatch.venue;
        document.getElementById('matchLeague').textContent = nextMatch.league;
        const oppInfo = document.getElementById('opponentInfo');
        oppInfo.innerHTML = `
            <strong>Opponent:</strong> ${nextMatch.away === player.club ? nextMatch.home : nextMatch.away}<br>
            <strong>League:</strong> ${nextMatch.league}<br>
            <strong>Form:</strong> ${Math.floor(Math.random() * 5)}W ${Math.floor(Math.random() * 2)}D ${Math.floor(Math.random() * 3)}L
        `;
        document.getElementById('matchResultContainer').style.display = 'none';
        document.getElementById('btnSimulateMatch').disabled = false;
        document.getElementById('btnSkipMatch').disabled = false;
    }

    // ==================== MATCH SIMULATION ====================
    function simulateMatch(player, homeTeam, awayTeam) {
        const homeStrength = 60 + Math.floor(Math.random() * 20);
        const awayStrength = 60 + Math.floor(Math.random() * 20);
        let playerTeamStrength = 0;
        if (player.club === homeTeam) playerTeamStrength = homeStrength + player.ovr / 2;
        else if (player.club === awayTeam) playerTeamStrength = awayStrength + player.ovr / 2;
        else playerTeamStrength = 70;

        const position = player.position || 'ST';
        let maxPlayerGoals = 3;
        if (position === 'GK') maxPlayerGoals = 0;
        else if (['CB','LB','RB'].includes(position)) maxPlayerGoals = 1;
        else if (['CDM','CM','LM','RM'].includes(position)) maxPlayerGoals = 2;

        let homeScore = 0, awayScore = 0;
        const homeGoalChance = (homeTeam === player.club ? playerTeamStrength : homeStrength) / 100;
        const awayGoalChance = (awayTeam === player.club ? playerTeamStrength : awayStrength) / 100;
        for (let min = 10; min <= 90; min += 10) {
            if (Math.random() < homeGoalChance * 0.4) homeScore++;
            if (Math.random() < awayGoalChance * 0.4) awayScore++;
        }

        let homeGoals = [], awayGoals = [];
        for (let i = 0; i < homeScore; i++) {
            const minute = Math.floor(Math.random() * 90) + 1;
            let scorer = (homeTeam === player.club && i < maxPlayerGoals && Math.random() < 0.5) ? player.name : generateNPCName();
            homeGoals.push({ minute, scorer });
        }
        for (let i = 0; i < awayScore; i++) {
            const minute = Math.floor(Math.random() * 90) + 1;
            let scorer = (awayTeam === player.club && i < maxPlayerGoals && Math.random() < 0.5) ? player.name : generateNPCName();
            awayGoals.push({ minute, scorer });
        }
        homeGoals.sort((a,b) => a.minute - b.minute);
        awayGoals.sort((a,b) => a.minute - b.minute);

        const yellowCards = Math.floor(Math.random() * 3);
        const redCards = Math.floor(Math.random() * 2);
        const homePossession = 40 + Math.floor(Math.random() * 30);
        const awayPossession = 100 - homePossession;
        const homeShots = Math.floor(Math.random() * 15) + 5;
        const awayShots = Math.floor(Math.random() * 15) + 5;
        const homeShotsOnTarget = Math.floor(homeShots * (0.3 + Math.random() * 0.3));
        const awayShotsOnTarget = Math.floor(awayShots * (0.3 + Math.random() * 0.3));

        let playerGoals = 0, playerAssists = 0, playerMOTM = false, playerYellow = false, playerRed = false;
        if (player.club === homeTeam || player.club === awayTeam) {
            const allGoals = homeTeam === player.club ? homeGoals : awayGoals;
            playerGoals = allGoals.filter(g => g.scorer === player.name).length;
            if (['ST','CF','LW','RW','CAM'].includes(position)) {
                if (Math.random() < 0.3) playerAssists = 1 + Math.floor(Math.random() * 2);
            } else if (['CM','LM','RM','CDM'].includes(position)) {
                if (Math.random() < 0.2) playerAssists = 1;
            } else {
                if (Math.random() < 0.05) playerAssists = 1;
            }
            if (['CB','LB','RB','CDM'].includes(position) && Math.random() < 0.15) playerYellow = true;
            else if (Math.random() < 0.08) playerYellow = true;
            if (Math.random() < 0.02) playerRed = true;
            if (playerGoals >= 2 || (playerGoals >= 1 && Math.random() < 0.2)) playerMOTM = true;
        }

        player.matchesPlayed = (player.matchesPlayed || 0) + 1;
        player.goalsScored = (player.goalsScored || 0) + playerGoals;
        player.assists = (player.assists || 0) + playerAssists;
        if (playerMOTM) { player.reputation = (player.reputation || 0) + 2; player.manOfTheMatch = (player.manOfTheMatch || 0) + 1; }
        if (player.position === 'GK') {
            if (homeScore === 0 && player.club === homeTeam) player.cleanSheets = (player.cleanSheets || 0) + 1;
            if (awayScore === 0 && player.club === awayTeam) player.cleanSheets = (player.cleanSheets || 0) + 1;
        }
        if (playerYellow) player.yellowCards = (player.yellowCards || 0) + 1;
        if (playerRed) { player.redCards = (player.redCards || 0) + 1; player.injuryStatus = 'Suspended'; }

        player.fatigue = Math.min(100, (player.fatigue || 0) + 15);
        player.morale = Math.min(100, Math.max(20, (player.morale || 70) + (homeScore > awayScore ? 5 : -2) + (playerGoals > 0 ? 3 : 0)));

        if (Math.random() < 0.05) {
            const injuries = ['Minor hamstring strain', 'Ankle sprain', 'Groin pull', 'Concussion'];
            player.injuryStatus = injuries[Math.floor(Math.random() * injuries.length)];
            showToast('🚑 Injury! ' + player.injuryStatus + '.', 'error');
        }

        const matchResult = {
            date: new Date().toISOString(),
            home: homeTeam, away: awayTeam,
            homeScore, awayScore,
            homeGoals, awayGoals,
            playerGoals, playerAssists,
            motm: playerMOTM,
            yellowCards, redCards,
            playerYellow, playerRed,
            homePossession, awayPossession,
            homeShots, awayShots,
            homeShotsOnTarget, awayShotsOnTarget,
            league: leagueName
        };
        if (!player.matches) player.matches = [];
        player.matches.push(matchResult);

        const resultText = homeScore > awayScore ? 'Won' : (homeScore < awayScore ? 'Lost' : 'Drew');
        player.careerTimeline.push({
            date: matchResult.date,
            event: 'Match',
            detail: `${resultText} ${homeScore}-${awayScore} vs ${player.club === homeTeam ? awayTeam : homeTeam}. Goals: ${playerGoals}, Assists: ${playerAssists}`,
            type: 'match'
        });

        // Update season data
        player.seasonData.matchesPlayed++;
        player.seasonData.matchesRemaining--;
        player.seasonData.currentOpponentIndex++;

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        return matchResult;
    }

    // ==================== ADVANCE WEEK ====================
    function advanceWeek() {
        player.week = (player.week || 1) + 1;
        player.seasonData.currentWeek++;
        player.fatigue = Math.max(0, (player.fatigue || 0) - 5);
        player.morale = Math.min(100, Math.max(20, (player.morale || 70) + Math.floor(Math.random() * 5) - 2));
        player.bankBalance = (player.bankBalance || 500) + Math.floor((player.salary || 200) / 4);
        player.marketValue = Math.max(10000, (player.marketValue || 50000) + Math.floor(Math.random() * 2000 - 500));
        if (!player.mediaMentions) player.mediaMentions = [];
        const headlines = ['Continues steady progress in training.','Youth prospect shows promise.','Local talent attracting attention.','Fans hopeful for future star.','Coach praises work ethic.'];
        player.mediaMentions.push({
            headline: headlines[Math.floor(Math.random() * headlines.length)],
            date: new Date().toISOString()
        });
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    // ==================== HANDLE SEASON END ====================
    function handleSeasonEnd() {
        // Age up
        player.age = (player.age || 15) + 1;
        player.season = (player.season || 1) + 1;

        // Reset season data
        player.seasonData = null;
        player.nextMatch = null;

        // Check for club offers (if age >= 18 and performance good)
        if (player.age >= 18 && player.ovr >= 60) {
            generateClubOffers();
        }

        // Save
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('🏆 Season ' + (player.season - 1) + ' complete! Welcome to Season ' + player.season + '.', 'success');
        // Re-init season
        initSeason();
        displayNextMatch();
        updateCareerUI();
    }

    // ==================== CLUB OFFERS (Age 18+) ====================
    function generateClubOffers() {
        const offers = [];
        // Big clubs based on reputation/OVR
        const bigClubs = ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal',
            'Real Madrid', 'Barcelona', 'Bayern Munich', 'PSG', 'Inter Milan', 'AC Milan', 'Juventus'];
        const mediumClubs = ['Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'West Ham United',
            'Sevilla', 'Valencia', 'Atletico Madrid', 'Borussia Dortmund', 'RB Leipzig', 'Napoli', 'Roma', 'Lazio'];

        let eligibleClubs = [];
        if (player.ovr >= 70) {
            eligibleClubs = bigClubs.filter(c => c !== player.club);
        } else if (player.ovr >= 60) {
            eligibleClubs = mediumClubs.filter(c => c !== player.club);
        } else {
            eligibleClubs = [];
        }

        // Select random 2-4 clubs
        const numOffers = Math.min(3, eligibleClubs.length);
        for (let i = 0; i < numOffers; i++) {
            const idx = Math.floor(Math.random() * eligibleClubs.length);
            const club = eligibleClubs.splice(idx, 1)[0];
            if (club) {
                const salary = 500 + Math.floor(Math.random() * 1000) + (player.ovr * 20);
                offers.push({ club, salary, bonus: Math.floor(Math.random() * 500) });
            }
        }

        if (offers.length > 0) {
            player.pendingOffers = offers;
            localStorage.setItem('theJourney_playerData', JSON.stringify(player));
            showToast('📨 You have ' + offers.length + ' club offers! Check Transfer Hub.', 'info');
        }
    }

    // ==================== DISPLAY MATCH RESULT ====================
    function displayMatchResult(result) {
        const container = document.getElementById('matchResultContainer');
        container.style.display = 'block';
        const resultDiv = document.getElementById('matchResult');

        let scoreClass = 'draw';
        if (result.homeScore > result.awayScore) scoreClass = 'win';
        else if (result.homeScore < result.awayScore) scoreClass = 'loss';

        let eventsHTML = '';
        const allEvents = [];
        result.homeGoals.forEach(g => allEvents.push({ minute: g.minute, team: result.home, scorer: g.scorer, type: 'goal' }));
        result.awayGoals.forEach(g => allEvents.push({ minute: g.minute, team: result.away, scorer: g.scorer, type: 'goal' }));
        for (let i=0; i<result.yellowCards; i++) {
            const minute = Math.floor(Math.random() * 90) + 1;
            allEvents.push({ minute, team: Math.random()<0.5?result.home:result.away, type: 'yellow' });
        }
        for (let i=0; i<result.redCards; i++) {
            const minute = Math.floor(Math.random() * 90) + 1;
            allEvents.push({ minute, team: Math.random()<0.5?result.home:result.away, type: 'red' });
        }
        allEvents.sort((a,b) => a.minute - b.minute);
        eventsHTML = allEvents.map(e => {
            if (e.type === 'goal') return `<div class="event">⚽ ${e.minute}' — ${e.scorer} (${e.team})</div>`;
            if (e.type === 'yellow') return `<div class="event">🟨 ${e.minute}' — Yellow card (${e.team})</div>`;
            if (e.type === 'red') return `<div class="event">🟥 ${e.minute}' — Red card (${e.team})</div>`;
            return '';
        }).join('');

        resultDiv.innerHTML = `
            <div class="result-header">
                <div>
                    <strong>${result.home}</strong> ${result.homeScore} - ${result.awayScore} <strong>${result.away}</strong>
                </div>
                <div class="score ${scoreClass}">${result.homeScore} - ${result.awayScore}</div>
            </div>
            <div class="match-events">${eventsHTML}</div>
            <div class="match-stats">
                <div class="stat-item"><span class="stat-value">${result.homePossession}%</span><span class="stat-label">Possession</span></div>
                <div class="stat-item"><span class="stat-value">${result.homeShots} / ${result.homeShotsOnTarget}</span><span class="stat-label">Shots (On Target)</span></div>
                <div class="stat-item"><span class="stat-value">${result.awayShots} / ${result.awayShotsOnTarget}</span><span class="stat-label">Shots (On Target)</span></div>
                <div class="stat-item"><span class="stat-value">${result.yellowCards}</span><span class="stat-label">Yellow Cards</span></div>
                <div class="stat-item"><span class="stat-value">${result.redCards}</span><span class="stat-label">Red Cards</span></div>
                <div class="stat-item"><span class="stat-value">${result.playerGoals}G ${result.playerAssists}A</span><span class="stat-label">Your Stats</span></div>
            </div>
            ${result.motm ? `<div class="motm">🏅 Man of the Match: ${player.name}</div>` : ''}
        `;
    }

    // ==================== HANDLE SIMULATE MATCH ====================
    document.getElementById('btnSimulateMatch').addEventListener('click', function() {
        if (!player.seasonData || player.seasonData.currentOpponentIndex >= player.seasonData.homeAway.length) {
            showToast('Season ended! Starting new season...', 'info');
            handleSeasonEnd();
            return;
        }
        const match = getNextMatch();
        if (!match) {
            handleSeasonEnd();
            return;
        }
        const result = simulateMatch(player, match.home, match.away);
        advanceWeek();
        displayMatchResult(result);
        player.nextMatch = null;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        updateCareerUI();
        showToast('Match simulated! Week ' + player.seasonData.currentWeek + ' of Season ' + player.season + '.', 'success');
        // Check if season ended
        if (player.seasonData.currentOpponentIndex >= player.seasonData.homeAway.length) {
            setTimeout(() => {
                handleSeasonEnd();
            }, 3000);
        } else {
            setTimeout(() => {
                displayNextMatch();
            }, 3000);
        }
    });

    // ==================== HANDLE SKIP MATCH ====================
    document.getElementById('btnSkipMatch').addEventListener('click', function() {
        if (!player.seasonData || player.seasonData.currentOpponentIndex >= player.seasonData.homeAway.length) {
            showToast('Season ended! Starting new season...', 'info');
            handleSeasonEnd();
            return;
        }
        const match = getNextMatch();
        if (!match) {
            handleSeasonEnd();
            return;
        }
        // Skip: no match played, but still advance week and season data
        player.seasonData.matchesPlayed++;
        player.seasonData.matchesRemaining--;
        player.seasonData.currentOpponentIndex++;
        advanceWeek();
        player.careerTimeline.push({
            date: new Date().toISOString(),
            event: 'Skipped Match',
            detail: `Week ${player.seasonData.currentWeek} skipped. No match played.`,
            type: 'life'
        });
        player.nextMatch = null;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('Match skipped. Week advanced.', 'info');
        updateCareerUI();
        if (player.seasonData.currentOpponentIndex >= player.seasonData.homeAway.length) {
            setTimeout(() => {
                handleSeasonEnd();
            }, 2000);
        } else {
            setTimeout(() => {
                displayNextMatch();
            }, 1000);
        }
    });

    // ==================== UPDATE CAREER UI ====================
    function updateCareerUI() {
        document.getElementById('careerPlayerName').textContent = player.name || '—';
        document.getElementById('careerPosition').textContent = player.position || '—';
        document.getElementById('careerAge').textContent = 'Age: ' + (player.age || 15);
        document.getElementById('careerNationality').textContent = player.nationality || '—';
        document.getElementById('careerOVR').textContent = 'OVR: ' + (player.ovr || 45);
        document.getElementById('careerClub').textContent = player.club || player.academy || '—';
        const clubLogo = document.getElementById('careerClubLogo');
        if (clubLogo) {
            if (player.academyLogo) { clubLogo.src = player.academyLogo; clubLogo.style.display = 'block'; }
            else { clubLogo.style.display = 'none'; }
        }
        document.getElementById('careerMatches').textContent = player.matchesPlayed || 0;
        document.getElementById('careerGoals').textContent = player.goalsScored || 0;
        document.getElementById('careerAssists').textContent = player.assists || 0;
        document.getElementById('careerTrophies').textContent = (player.trophies ? player.trophies.length : 0);
        document.getElementById('careerCleanSheets').textContent = player.cleanSheets || 0;
        document.getElementById('careerMOTM').textContent = player.manOfTheMatch || 0;

        // Recent Results
        const recentResults = document.getElementById('recentResults');
        if (player.matches && player.matches.length > 0) {
            const last5 = player.matches.slice(-5).reverse();
            recentResults.innerHTML = last5.map(m => {
                let resultClass = 'result-draw';
                let scoreText = `${m.home} ${m.homeScore} - ${m.awayScore} ${m.away}`;
                if (m.homeScore > m.awayScore) {
                    resultClass = 'result-win';
                    if (m.home === player.club) scoreText = `W ${scoreText}`;
                    else scoreText = `L ${scoreText}`;
                } else if (m.homeScore < m.awayScore) {
                    resultClass = 'result-loss';
                    if (m.away === player.club) scoreText = `W ${scoreText}`;
                    else scoreText = `L ${scoreText}`;
                } else {
                    scoreText = `D ${scoreText}`;
                }
                return `<div class="result-item ${resultClass}">
                            <span>${new Date(m.date).toLocaleDateString('en-GB')}</span>
                            <span>${scoreText}</span>
                            <span>${m.playerGoals}G ${m.playerAssists}A</span>
                        </div>`;
            }).join('');
        } else {
            recentResults.innerHTML = '<p class="no-data">No matches played yet.</p>';
        }

        // Timeline
        const timeline = document.getElementById('careerTimeline');
        if (player.careerTimeline && player.careerTimeline.length > 0) {
            const items = player.careerTimeline.slice(-10).reverse();
            timeline.innerHTML = items.map(item => {
                const date = new Date(item.date);
                const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                return `<div class="timeline-item ${item.type || ''}">
                            <span class="tl-date">${dateStr}</span>
                            <span><strong>${item.event}:</strong> ${item.detail}</span>
                        </div>`;
            }).join('');
        } else {
            timeline.innerHTML = '<div class="timeline-item">No events yet. Start your journey!</div>';
        }

        // Trophy Cabinet
        const trophyCabinet = document.getElementById('trophyCabinet');
        if (player.trophies && player.trophies.length > 0) {
            trophyCabinet.innerHTML = player.trophies.map(trophy => {
                const img = trophyImages[trophy] || '';
                return `<div class="trophy-item">
                            <img src="${img}" alt="${trophy}" onerror="this.style.display='none';">
                            <span class="trophy-name">${trophy}</span>
                        </div>`;
            }).join('');
        } else {
            trophyCabinet.innerHTML = '<p class="no-trophies">No trophies yet. Keep winning!</p>';
        }

        // Season Stats
        const seasonStats = document.getElementById('seasonStats');
        seasonStats.innerHTML = `
            <div class="season-stat"><span class="stat-value">${player.season || 1}</span><span class="stat-label">Season</span></div>
            <div class="season-stat"><span class="stat-value">${player.seasonData ? player.seasonData.currentWeek : 0}</span><span class="stat-label">Week</span></div>
            <div class="season-stat"><span class="stat-value">${player.seasonData ? player.seasonData.matchesPlayed : 0}</span><span class="stat-label">Matches Played</span></div>
            <div class="season-stat"><span class="stat-value">${player.seasonData ? player.seasonData.matchesRemaining : 0}</span><span class="stat-label">Matches Left</span></div>
            <div class="season-stat"><span class="stat-value">${player.goalsScored || 0}</span><span class="stat-label">Goals</span></div>
            <div class="season-stat"><span class="stat-value">${player.assists || 0}</span><span class="stat-label">Assists</span></div>
            <div class="season-stat"><span class="stat-value">${player.morale || 70}%</span><span class="stat-label">Morale</span></div>
            <div class="season-stat"><span class="stat-value">${player.fatigue || 0}%</span><span class="stat-label">Fatigue</span></div>
            <div class="season-stat"><span class="stat-value">${player.reputation || 0}</span><span class="stat-label">Reputation</span></div>
            <div class="season-stat"><span class="stat-value">${player.cleanSheets || 0}</span><span class="stat-label">Clean Sheets</span></div>
            <div class="season-stat"><span class="stat-value">${player.manOfTheMatch || 0}</span><span class="stat-label">MOTM</span></div>
        `;
    }

    // ==================== INIT ====================
    initSeason();
    displayNextMatch();
    updateCareerUI();

    // Toast
    function showToast(msg, type) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast ' + (type || 'info');
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(130%)';
            toast.style.transition = 'all 0.35s ease';
            setTimeout(() => toast.remove(), 350);
        }, 3000);
    }

    // Nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if (!document.getElementById('globalNav').contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    }

    console.log('%c⚽ CAREER HUB LOADED (SEASON SYSTEM) %c| %c' + (player.name || 'Player') + ' %c| Season ' + (player.season || 1),
        'color:#00e676;font-weight:bold;', 'color:#b0b0ba;', 'color:#fff;', 'color:#787882;');
})();