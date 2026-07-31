// ==================== career.js ====================
// THE JOURNEY — Career Hub with Match Simulation & Week Advancement

(function() {
    'use strict';

    // Load player data
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

    // ==================== CLUB & LEAGUE DATABASES ====================
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
    };

    const leagueLogos = {
        'Premier League': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Premier_League_logo.svg/1200px-Premier_League_logo.svg.png',
        'La Liga': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/La_Liga_logo_2023.svg/1200px-La_Liga_logo_2023.svg.png',
        'Bundesliga': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
        'Serie A': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Serie_A_logo_2022.svg/1200px-Serie_A_logo_2022.svg.png',
        'Ligue 1': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png',
        'Eredivisie': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Eredivisie_logo.svg/1200px-Eredivisie_logo.svg.png',
        'Primeira Liga': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Primeira_Liga_logo.svg/1200px-Primeira_Liga_logo.svg.png',
        'Championship': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/EFL_Championship_logo.svg/1200px-EFL_Championship_logo.svg.png',
        'UEFA Champions League': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/UEFA_Champions_League_logo.svg/1200px-UEFA_Champions_League_logo.svg.png',
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
    const firstNames = [
        'James', 'Oliver', 'Leo', 'Ethan', 'Noah', 'Lucas', 'Marcus', 'Theo', 'Kai', 'Finn',
        'Alex', 'Daniel', 'Ryan', 'Callum', 'Liam', 'Adam', 'Samuel', 'Harry', 'Oscar', 'Max',
        'Enzo', 'Mateo', 'Thiago', 'Luka', 'Jude', 'Pedri', 'Gavi', 'Jamal', 'Kylian', 'Erling',
        'Mohamed', 'Kevin', 'Raheem', 'Bukayo', 'Phil', 'Jack', 'Declan', 'Mason', 'Cole', 'Eberechi'
    ];
    const lastNames = [
        'Carter', 'Mitchell', 'Harrison', 'Walker', 'Bennett', 'Foster', 'Reid', 'Shaw',
        'Cole', 'Palmer', 'Davies', 'Hughes', 'Morgan', 'Ellis', 'Knight', 'Stone', 'Brooks',
        'Wells', 'Fox', 'Gray', 'Silva', 'Santos', 'Costa', 'Muller', 'Kim', 'Tanaka', 'Park',
        'Martinez', 'Garcia', 'Lopez', 'Fernandez', 'Rodriguez', 'Gonzalez', 'Perez', 'Sanchez',
        'Henderson', 'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris'
    ];

    function generateNPCSurname() {
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    function generateNPCFirstName() {
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    }

    function generateNPCName() {
        return generateNPCFirstName() + ' ' + generateNPCSurname();
    }

    // ==================== Determine League ====================
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

    const league = getLeagueFromAcademy(player.academy);
    const leagueLogo = leagueLogos[league] || '';

    function getLeagueClubs() {
        const premierLeagueClubs = [
            'Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal',
            'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'West Ham United',
            'Everton', 'Fulham', 'Brighton & Hove Albion', 'Crystal Palace',
            'Wolverhampton Wanderers', 'Nottingham Forest', 'Brentford', 'Bournemouth',
            'Burnley', 'Leicester City', 'Leeds United', 'Southampton', 'Stoke City',
            'Swansea City', 'Huddersfield Town', 'Norwich City'
        ];
        return premierLeagueClubs;
    }

    const leagueClubs = getLeagueClubs();

    // ==================== ADVANCED MATCH SIMULATION ====================
    function simulateMatch(player, homeTeam, awayTeam) {
        // Team strengths
        const homeStrength = 60 + Math.floor(Math.random() * 20);
        const awayStrength = 60 + Math.floor(Math.random() * 20);
        let playerTeamStrength = 0;
        if (player.club === homeTeam) {
            playerTeamStrength = homeStrength + player.ovr / 2;
        } else if (player.club === awayTeam) {
            playerTeamStrength = awayStrength + player.ovr / 2;
        } else {
            playerTeamStrength = 70;
        }

        // Position-based goal scoring limitation
        const position = player.position || 'ST';
        let maxPlayerGoals = 3; // default for attackers
        if (position === 'GK') maxPlayerGoals = 0;
        else if (['CB', 'LB', 'RB'].includes(position)) maxPlayerGoals = 1; // defenders rarely score more than 1
        else if (['CDM', 'CM', 'LM', 'RM'].includes(position)) maxPlayerGoals = 2; // midfielders can score 2

        // Generate goals (more realistic)
        let homeScore = 0, awayScore = 0;
        const homeGoalChance = (homeTeam === player.club ? playerTeamStrength : homeStrength) / 100;
        const awayGoalChance = (awayTeam === player.club ? playerTeamStrength : awayStrength) / 100;
        // Simulate 90 minutes: each 10 min chunk has chance of goal
        for (let min = 10; min <= 90; min += 10) {
            if (Math.random() < homeGoalChance * 0.4) homeScore++;
            if (Math.random() < awayGoalChance * 0.4) awayScore++;
        }
        // Adjust for player influence (but cap)
        if (player.club === homeTeam && player.attributes?.finishing > 70) {
            let extra = Math.floor(Math.random() * 2);
            if (extra > 0 && playerGoals < maxPlayerGoals) {
                homeScore += extra;
            }
        }
        if (player.club === awayTeam && player.attributes?.finishing > 70) {
            let extra = Math.floor(Math.random() * 2);
            if (extra > 0 && playerGoals < maxPlayerGoals) {
                awayScore += extra;
            }
        }

        // Generate goal events with NPC names
        let homeGoals = [], awayGoals = [];
        for (let i = 0; i < homeScore; i++) {
            const minute = Math.floor(Math.random() * 90) + 1;
            let scorer;
            if (homeTeam === player.club && i < maxPlayerGoals && Math.random() < 0.5) {
                scorer = player.name;
            } else {
                scorer = generateNPCName();
            }
            homeGoals.push({ minute, scorer });
        }
        for (let i = 0; i < awayScore; i++) {
            const minute = Math.floor(Math.random() * 90) + 1;
            let scorer;
            if (awayTeam === player.club && i < maxPlayerGoals && Math.random() < 0.5) {
                scorer = player.name;
            } else {
                scorer = generateNPCName();
            }
            awayGoals.push({ minute, scorer });
        }
        // Sort by minute
        homeGoals.sort((a,b) => a.minute - b.minute);
        awayGoals.sort((a,b) => a.minute - b.minute);

        // Generate cards
        const yellowCards = Math.floor(Math.random() * 3);
        const redCards = Math.floor(Math.random() * 2);

        // Possession & shots
        const homePossession = 40 + Math.floor(Math.random() * 30);
        const awayPossession = 100 - homePossession;
        const homeShots = Math.floor(Math.random() * 15) + 5;
        const awayShots = Math.floor(Math.random() * 15) + 5;
        const homeShotsOnTarget = Math.floor(homeShots * (0.3 + Math.random() * 0.3));
        const awayShotsOnTarget = Math.floor(awayShots * (0.3 + Math.random() * 0.3));

        // Player performance
        let playerGoals = 0, playerAssists = 0, playerMOTM = false, playerYellow = false, playerRed = false;
        if (player.club === homeTeam || player.club === awayTeam) {
            // Count goals (only those scored by player)
            const allGoals = homeTeam === player.club ? homeGoals : awayGoals;
            playerGoals = allGoals.filter(g => g.scorer === player.name).length;
            // Assists: random chance, but position dependent
            if (['ST', 'CF', 'LW', 'RW', 'CAM'].includes(position)) {
                if (Math.random() < 0.3) playerAssists = 1 + Math.floor(Math.random() * 2);
            } else if (['CM', 'LM', 'RM', 'CDM'].includes(position)) {
                if (Math.random() < 0.2) playerAssists = 1;
            } else {
                // defenders and GK rarely assist
                if (Math.random() < 0.05) playerAssists = 1;
            }
            // Cards
            if (['CB', 'LB', 'RB', 'CDM'].includes(position) && Math.random() < 0.15) playerYellow = true;
            else if (Math.random() < 0.08) playerYellow = true;
            if (Math.random() < 0.02) playerRed = true;
            // MOTM
            if (playerGoals >= 2 || (playerGoals >= 1 && Math.random() < 0.2)) playerMOTM = true;
        }

        // Update player stats
        player.matchesPlayed = (player.matchesPlayed || 0) + 1;
        player.goalsScored = (player.goalsScored || 0) + playerGoals;
        player.assists = (player.assists || 0) + playerAssists;
        if (playerMOTM) {
            player.reputation = (player.reputation || 0) + 2;
            player.manOfTheMatch = (player.manOfTheMatch || 0) + 1;
        }
        // Clean sheets only for GK
        if (player.position === 'GK') {
            if (homeScore === 0 && player.club === homeTeam) player.cleanSheets = (player.cleanSheets || 0) + 1;
            if (awayScore === 0 && player.club === awayTeam) player.cleanSheets = (player.cleanSheets || 0) + 1;
        }
        if (playerYellow) player.yellowCards = (player.yellowCards || 0) + 1;
        if (playerRed) { player.redCards = (player.redCards || 0) + 1; player.injuryStatus = 'Suspended'; }

        // Fatigue & morale
        player.fatigue = Math.min(100, (player.fatigue || 0) + 15);
        player.morale = Math.min(100, Math.max(20, (player.morale || 70) + (homeScore > awayScore ? 5 : -2) + (playerGoals > 0 ? 3 : 0)));

        // Injury chance
        if (Math.random() < 0.05) {
            const injuries = ['Minor hamstring strain', 'Ankle sprain', 'Groin pull', 'Concussion'];
            player.injuryStatus = injuries[Math.floor(Math.random() * injuries.length)];
            showToast('🚑 Injury! ' + player.injuryStatus + '.', 'error');
        }

        // Build match result object
        const matchResult = {
            date: new Date().toISOString(),
            home: homeTeam,
            away: awayTeam,
            homeScore: homeScore,
            awayScore: awayScore,
            homeGoals: homeGoals,
            awayGoals: awayGoals,
            playerGoals: playerGoals,
            playerAssists: playerAssists,
            motm: playerMOTM,
            yellowCards: yellowCards,
            redCards: redCards,
            playerYellow: playerYellow,
            playerRed: playerRed,
            homePossession: homePossession,
            awayPossession: awayPossession,
            homeShots: homeShots,
            awayShots: awayShots,
            homeShotsOnTarget: homeShotsOnTarget,
            awayShotsOnTarget: awayShotsOnTarget,
            league: league
        };
        if (!player.matches) player.matches = [];
        player.matches.push(matchResult);

        // Add to timeline
        const resultText = homeScore > awayScore ? 'Won' : (homeScore < awayScore ? 'Lost' : 'Drew');
        const detail = `${resultText} ${homeScore}-${awayScore} vs ${player.club === homeTeam ? awayTeam : homeTeam}. Goals: ${playerGoals}, Assists: ${playerAssists}`;
        player.careerTimeline.push({
            date: matchResult.date,
            event: 'Match',
            detail: detail,
            type: 'match'
        });

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        return matchResult;
    }

    // ==================== Generate Next Match ====================
    function generateNextMatch() {
        let opponent = leagueClubs[Math.floor(Math.random() * leagueClubs.length)];
        while (opponent === player.club) {
            opponent = leagueClubs[Math.floor(Math.random() * leagueClubs.length)];
        }
        const isHome = Math.random() < 0.5;
        const homeTeam = isHome ? player.club : opponent;
        const awayTeam = isHome ? opponent : player.club;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 7);
        return {
            home: homeTeam,
            away: awayTeam,
            date: nextDate.toISOString(),
            league: league,
            leagueLogo: leagueLogo,
            homeLogo: clubLogos[homeTeam] || '',
            awayLogo: clubLogos[awayTeam] || '',
            venue: isHome ? 'Home Stadium' : 'Away Stadium'
        };
    }

    // ==================== Display Next Match ====================
    function displayNextMatch() {
        const nextMatch = generateNextMatch();
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
    }

    // ==================== Display Match Result (detailed) ====================
    function displayMatchResult(result) {
        const container = document.getElementById('matchResultContainer');
        container.style.display = 'block';
        const resultDiv = document.getElementById('matchResult');

        let scoreClass = 'draw';
        if (result.homeScore > result.awayScore) scoreClass = 'win';
        else if (result.homeScore < result.awayScore) scoreClass = 'loss';

        // Build events list
        let eventsHTML = '';
        const allEvents = [];
        result.homeGoals.forEach(g => allEvents.push({ minute: g.minute, team: result.home, scorer: g.scorer, type: 'goal' }));
        result.awayGoals.forEach(g => allEvents.push({ minute: g.minute, team: result.away, scorer: g.scorer, type: 'goal' }));
        // Add cards (dummy)
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

    // ==================== ADVANCE WEEK (integrated) ====================
    function advanceWeek() {
        player.week = (player.week || 1) + 1;
        // Natural recovery
        player.fatigue = Math.max(0, (player.fatigue || 0) - 5);
        // Small random morale change
        player.morale = Math.min(100, Math.max(20, (player.morale || 70) + Math.floor(Math.random() * 5) - 2));
        // Salary
        player.bankBalance = (player.bankBalance || 500) + Math.floor((player.salary || 200) / 4);
        // Market value fluctuation
        player.marketValue = Math.max(10000, (player.marketValue || 50000) + Math.floor(Math.random() * 2000 - 500));
        // Media mention (generic)
        if (!player.mediaMentions) player.mediaMentions = [];
        const headlines = [
            'Continues steady progress in training.',
            'Youth prospect shows promise.',
            'Local talent attracting attention.',
            'Fans hopeful for future star.',
            'Coach praises work ethic.',
        ];
        player.mediaMentions.push({
            headline: headlines[Math.floor(Math.random() * headlines.length)],
            date: new Date().toISOString()
        });

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    // ==================== Handle Simulate Match ====================
    document.getElementById('btnSimulateMatch').addEventListener('click', function() {
        if (!player.nextMatch) {
            showToast('No upcoming match. Generating...', 'info');
            displayNextMatch();
            return;
        }
        const match = player.nextMatch;
        const result = simulateMatch(player, match.home, match.away);
        // Advance week after match
        advanceWeek();
        // Show result
        displayMatchResult(result);
        player.nextMatch = null;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        updateCareerUI();
        showToast('Match simulated! Week ' + player.week + ' advanced.', 'success');
        // Generate new next match after 5 seconds
        setTimeout(() => {
            displayNextMatch();
        }, 5000);
    });

    // ==================== Handle Skip Match ====================
    document.getElementById('btnSkipMatch').addEventListener('click', function() {
        if (!player.nextMatch) {
            displayNextMatch();
            return;
        }
        // Advance week without playing
        advanceWeek();
        player.careerTimeline.push({
            date: new Date().toISOString(),
            event: 'Skipped Week',
            detail: `Week ${player.week} skipped. No match played.`,
            type: 'life'
        });
        player.nextMatch = null;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('Week skipped. Next match generated.', 'info');
        updateCareerUI();
        setTimeout(() => {
            displayNextMatch();
        }, 1000);
    });

    // ==================== Update Career UI ====================
    function updateCareerUI() {
        document.getElementById('careerPlayerName').textContent = player.name || '—';
        document.getElementById('careerPosition').textContent = player.position || '—';
        document.getElementById('careerAge').textContent = 'Age: ' + (player.age || 15);
        document.getElementById('careerNationality').textContent = player.nationality || '—';
        document.getElementById('careerOVR').textContent = 'OVR: ' + (player.ovr || 45);
        document.getElementById('careerClub').textContent = player.club || player.academy || '—';
        const clubLogo = document.getElementById('careerClubLogo');
        if (clubLogo) {
            if (player.academyLogo) {
                clubLogo.src = player.academyLogo;
                clubLogo.style.display = 'block';
            } else {
                clubLogo.style.display = 'none';
            }
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
            <div class="season-stat"><span class="stat-value">${player.week || 1}</span><span class="stat-label">Week</span></div>
            <div class="season-stat"><span class="stat-value">${player.season || 1}</span><span class="stat-label">Season</span></div>
            <div class="season-stat"><span class="stat-value">${player.matchesPlayed || 0}</span><span class="stat-label">Appearances</span></div>
            <div class="season-stat"><span class="stat-value">${player.goalsScored || 0}</span><span class="stat-label">Goals</span></div>
            <div class="season-stat"><span class="stat-value">${player.assists || 0}</span><span class="stat-label">Assists</span></div>
            <div class="season-stat"><span class="stat-value">${player.morale || 70}%</span><span class="stat-label">Morale</span></div>
            <div class="season-stat"><span class="stat-value">${player.fatigue || 0}%</span><span class="stat-label">Fatigue</span></div>
            <div class="season-stat"><span class="stat-value">${player.reputation || 0}</span><span class="stat-label">Reputation</span></div>
            <div class="season-stat"><span class="stat-value">${player.cleanSheets || 0}</span><span class="stat-label">Clean Sheets</span></div>
            <div class="season-stat"><span class="stat-value">${player.manOfTheMatch || 0}</span><span class="stat-label">MOTM</span></div>
        `;
    }

    // ==================== Initialise ====================
    displayNextMatch();
    updateCareerUI();

    // ==================== Toast system ====================
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

    // ==================== Navigation toggle ====================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (!document.getElementById('globalNav').contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    }

    console.log('%c⚽ CAREER HUB LOADED (ADVANCED) %c| %c' + (player.name || 'Player') + ' %c| Week ' + (player.week || 1),
        'color:#00e676;font-weight:bold;', 'color:#b0b0ba;', 'color:#fff;', 'color:#787882;');
})();