// ==================== script.js ====================
// THE JOURNEY — Football Career Mode Simulator
// Version: 2.3.0 | FC26 Black & Green Edition

document.addEventListener('DOMContentLoaded', () => {
    // ==================== GLOBAL STATE ====================
    const GAME_VERSION = '2.3.0';
    const DIFFICULTY = 'LEGENDARY++';

    // ==================== CLUB LOGO DATABASE ====================
    const clubLogoDatabase = {
        'Manchester United Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
        'FC Barcelona La Masia': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
        'Real Madrid Castilla': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
        'Bayern Munich Campus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
        'Ajax Amsterdam Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/1200px-Ajax_Amsterdam.svg.png',
        'Benfica Campus': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png',
        'Chelsea Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
        'Arsenal Hale End': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
        'Paris Saint-Germain Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
        'AC Milan Primavera': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png',
        'Sporting CP Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Sporting_CP_logo.svg/1200px-Sporting_CP_logo.svg.png',
        'RB Salzburg Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/FC_Red_Bull_Salzburg_logo.svg/1200px-FC_Red_Bull_Salzburg_logo.svg.png',
        'Santos FC Academy': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Santos_FC_logo.svg/1200px-Santos_FC_logo.svg.png',
        'River Plate Academy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/River_Plate_logo.svg/1200px-River_Plate_logo.svg.png',
        'Local District Academy': '',
    };

    // ==================== DOM REFERENCES ====================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const globalNav = document.getElementById('globalNav');
    const playerForm = document.getElementById('playerForm');
    const ovrValue = document.getElementById('ovrValue');
    const ovrBar = document.getElementById('ovrBar');
    const academySelect = document.getElementById('playerAcademy');
    const academyLogoImg = document.getElementById('academyLogoImg');
    const academyLogoFallback = document.getElementById('academyLogoFallback');
    const academyLogoLabel = document.getElementById('academyLogoLabel');
    const toastContainer = document.getElementById('toastContainer');
    const btnResetCareer = document.getElementById('btnResetCareer');
    const btnRandomise = document.getElementById('btnRandomise');
    const btnStartCareer = document.getElementById('btnStartCareer');
    const playerPositionSelect = document.getElementById('playerPosition');

    if (!playerForm) {
        console.error('playerForm not found!');
        return;
    }

    // ==================== NAVIGATION ====================
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });

        document.addEventListener('click', (e) => {
            if (globalNav && !globalNav.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('scroll', () => {
            if (globalNav) {
                globalNav.classList.toggle('scrolled', window.scrollY > 10);
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ==================== TOAST SYSTEM ====================
    function showToast(message, type = 'info') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(130%)';
            toast.style.transition = 'all 0.35s ease';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 350);
        }, 3500);
    }

    // ==================== ACADEMY LOGO DISPLAY ====================
    function updateAcademyLogo() {
        if (!academySelect || !academyLogoImg || !academyLogoFallback || !academyLogoLabel) return;
        const selectedAcademy = academySelect.value;
        const logoUrl = clubLogoDatabase[selectedAcademy] || '';

        if (logoUrl) {
            academyLogoImg.src = logoUrl;
            academyLogoImg.style.display = 'block';
            academyLogoFallback.style.display = 'none';
            academyLogoLabel.textContent = selectedAcademy;
            academyLogoLabel.style.color = 'var(--green-bright)';
        } else {
            academyLogoImg.style.display = 'none';
            academyLogoFallback.style.display = 'flex';
            academyLogoLabel.textContent = selectedAcademy || 'Select an academy';
            academyLogoLabel.style.color = 'var(--text-secondary)';
        }
    }

    if (academySelect) {
        academySelect.addEventListener('change', updateAcademyLogo);
    }

    // ==================== OVR PREVIEW ====================
    function updateOVRPreview() {
        if (!playerPositionSelect || !ovrValue) return;
        const position = playerPositionSelect.value;
        let baseOVR = Math.floor(Math.random() * 9) + 42;

        if (position === 'ST' || position === 'CF') baseOVR = Math.floor(Math.random() * 7) + 43;
        if (position === 'GK') baseOVR = Math.floor(Math.random() * 8) + 42;

        ovrValue.textContent = baseOVR;
        if (ovrBar) {
            ovrBar.style.width = (baseOVR / 99 * 100) + '%';
        }

        const allFillBars = document.querySelectorAll('.attr-bar-fill');
        if (allFillBars.length > 0) {
            allFillBars[0].style.width = (baseOVR / 99 * 100) + '%';
        }
    }

    if (playerPositionSelect) {
        playerPositionSelect.addEventListener('change', updateOVRPreview);
    }

    // ==================== RANDOMISE PLAYER ====================
    function randomisePlayer() {
        const firstNames = ['James', 'Oliver', 'Leo', 'Ethan', 'Noah', 'Lucas', 'Marcus', 'Theo', 'Kai', 'Finn',
            'Alex', 'Daniel', 'Ryan', 'Callum', 'Liam', 'Adam', 'Samuel', 'Harry', 'Oscar', 'Max',
            'Enzo', 'Mateo', 'Thiago', 'Luka', 'Jude', 'Pedri', 'Gavi', 'Jamal', 'Kylian', 'Erling'
        ];
        const lastNames = ['Carter', 'Mitchell', 'Harrison', 'Walker', 'Bennett', 'Foster', 'Reid', 'Shaw',
            'Cole', 'Palmer', 'Davies', 'Hughes', 'Morgan', 'Ellis', 'Knight', 'Stone', 'Brooks',
            'Wells', 'Fox', 'Gray', 'Silva', 'Santos', 'Costa', 'Muller', 'Kim', 'Tanaka', 'Park'
        ];
        const cities = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Glasgow', 'Cardiff',
            'Belfast', 'Dublin', 'Bristol', 'Sheffield', 'Newcastle', 'Southampton', 'Brighton',
            'Nottingham', 'Madrid', 'Barcelona', 'Paris', 'Munich', 'Amsterdam', 'Lisbon', 'Milan'
        ];
        const academies = [
            'Manchester United Academy', 'Chelsea Academy', 'Arsenal Hale End',
            'FC Barcelona La Masia', 'AFC Ajax Academy', 'SL Benfica Campus',
            'Local District Academy', 'Local District Academy', 'Local District Academy',
            'Bayern Munich Campus', 'Real Madrid Castilla'
        ];
        const nationalities = ['England', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Portugal',
            'Brazil', 'Argentina', 'Belgium', 'Croatia', 'Norway', 'Nigeria', 'Ghana'
        ];
        const positions = ['ST', 'CM', 'LW', 'CAM', 'CB', 'RW', 'CDM', 'CF'];
        const personalities = ['Professional', 'Ambitious', 'LaidBack', 'HotHeaded', 'Shy', 'Charismatic'];

        document.getElementById('playerName').value = firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
        document.getElementById('playerNationality').value = nationalities[Math.floor(Math.random() * nationalities.length)];
        document.getElementById('playerPosition').value = positions[Math.floor(Math.random() * positions.length)];
        document.getElementById('playerFoot').value = Math.random() > 0.28 ? 'Right' : 'Left';
        document.getElementById('playerHeight').value = Math.floor(Math.random() * 35) + 165;
        document.getElementById('playerWeight').value = Math.floor(Math.random() * 30) + 58;
        document.getElementById('playerCity').value = cities[Math.floor(Math.random() * cities.length)];
        document.getElementById('playerAcademy').value = academies[Math.floor(Math.random() * academies.length)];
        document.getElementById('playerPersonality').value = personalities[Math.floor(Math.random() * personalities.length)];

        updateOVRPreview();
        updateAcademyLogo();

        showToast('🎲 Player randomised! Ready to begin.', 'info');
    }

    if (btnRandomise) {
        btnRandomise.addEventListener('click', randomisePlayer);
    }

    // ==================== GENERATE ATTRIBUTES (with Double Touch) ====================
    function generateAttributes(position, ovr) {
        const baseAttrs = {
            acceleration: 45, sprintSpeed: 44, agility: 43, balance: 46, jump: 42,
            strength: 40, stamina: 40, ballControl: 42, firstTouch: 41, passing: 43,
            vision: 40, crossing: 38, curve: 36, finishing: 42, heading: 40,
            shotPower: 44, longShot: 38, penalty: 45, freeKick: 35, dribbling: 43,
            composure: 40, leadership: 35, aggression: 42, decisionMaking: 38,
            concentration: 39, positioning: 41, reaction: 43, workRate: 45,
            teamwork: 44, professionalism: 50, potential: Math.floor(Math.random() * 30) + 65,
            personality_trait: 'Neutral', confidence: 45, discipline: 48,
            consistency: 40, pressureHandling: 38, injuryResistance: 42,
            matchFitness: 40, mentality: 43, weakFoot: 2, skillMoves: 1, internationalReputation: 0,
            doubleTouch: 35  // NEW skill
        };

        const positionModifiers = {
            'ST': { finishing: +6, shotPower: +5, heading: +4, positioning: +5, composure: +4, doubleTouch: +5 },
            'CF': { finishing: +5, shotPower: +4, vision: +4, positioning: +4, dribbling: +3, doubleTouch: +4 },
            'LW': { dribbling: +5, acceleration: +6, sprintSpeed: +5, crossing: +4, agility: +4, doubleTouch: +3 },
            'RW': { dribbling: +5, acceleration: +6, sprintSpeed: +5, crossing: +4, agility: +4, doubleTouch: +3 },
            'CAM': { passing: +5, vision: +5, ballControl: +4, firstTouch: +4, longShot: +3, doubleTouch: +4 },
            'CM': { passing: +5, vision: +4, ballControl: +4, firstTouch: +3, decisionMaking: +3, doubleTouch: +3 },
            'CDM': { strength: +4, aggression: +3, positioning: +4, tackling: +5, stamina: +3, doubleTouch: +2 },
            'CB': { strength: +6, heading: +5, jump: +4, aggression: +4, positioning: +4, doubleTouch: +1 },
            'LB': { acceleration: +4, sprintSpeed: +4, crossing: +4, stamina: +3, positioning: +3, doubleTouch: +2 },
            'RB': { acceleration: +4, sprintSpeed: +4, crossing: +4, stamina: +3, positioning: +3, doubleTouch: +2 },
            'LM': { acceleration: +4, crossing: +5, dribbling: +3, stamina: +3, agility: +3, doubleTouch: +3 },
            'RM': { acceleration: +4, crossing: +5, dribbling: +3, stamina: +3, agility: +3, doubleTouch: +3 },
            'GK': { reaction: +6, positioning: +5, jump: +4, concentration: +4, composure: +3, doubleTouch: +0 },
        };

        const mods = positionModifiers[position] || {};
        Object.keys(mods).forEach(key => {
            if (baseAttrs[key] !== undefined) baseAttrs[key] += mods[key];
        });

        Object.keys(baseAttrs).forEach(key => {
            if (typeof baseAttrs[key] === 'number' && key !== 'potential') {
                baseAttrs[key] = Math.min(99, Math.max(15, baseAttrs[key] + Math.floor(Math.random() * 7) - 3));
            }
        });

        baseAttrs.ovr = ovr;
        return baseAttrs;
    }

    // ==================== FORM SUBMISSION ====================
    playerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const requiredFields = [
            'playerName', 'playerNationality', 'playerPosition', 'playerFoot',
            'playerHeight', 'playerWeight', 'playerCity', 'playerAcademy'
        ];

        let hasError = false;
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                field.style.borderColor = 'var(--accent-red)';
                field.style.boxShadow = '0 0 0 3px rgba(255, 59, 59, 0.1)';
                hasError = true;
                setTimeout(() => {
                    field.style.borderColor = 'var(--border-default)';
                    field.style.boxShadow = 'none';
                }, 2000);
            }
        });

        if (hasError) {
            showToast('⚠️ Please fill in all required fields.', 'error');
            return;
        }

        const playerName = document.getElementById('playerName').value.trim();
        const playerOVR = parseInt(ovrValue.textContent) || 45;

        const playerData = {
            name: playerName,
            nationality: document.getElementById('playerNationality').value,
            position: document.getElementById('playerPosition').value,
            foot: document.getElementById('playerFoot').value,
            height: parseInt(document.getElementById('playerHeight').value),
            weight: parseInt(document.getElementById('playerWeight').value),
            city: document.getElementById('playerCity').value.trim(),
            academy: document.getElementById('playerAcademy').value,
            personality: document.getElementById('playerPersonality').value,
            ovr: playerOVR,
            age: 15,
            reputation: 0,
            followers: 0,
            marketValue: 50000,
            bankBalance: 500,
            week: 1,
            season: 1,
            club: document.getElementById('playerAcademy').value,
            contractYears: 2,
            salary: 200,
            created: new Date().toISOString(),
            gameVersion: GAME_VERSION,
            difficulty: DIFFICULTY,
            attributes: generateAttributes(playerPositionSelect.value, playerOVR),
            injuryHistory: [],
            trophies: [],
            matchesPlayed: 0,
            goalsScored: 0,
            assists: 0,
            cleanSheets: 0,
            manOfTheMatch: 0,
            yellowCards: 0,
            redCards: 0,
            trainingStreak: 0,
            fatigue: 0,
            morale: 70,
            injuryStatus: 'Fit',
            contractExpiry: 'Season 3',
            agent: 'Local Scout — John Davies',
            sponsors: [],
            socialMediaPosts: [],
            mediaMentions: [],
            npcRelationships: {},
            careerTimeline: [{
                date: new Date().toISOString(),
                event: 'Career Began',
                detail: `Joined ${document.getElementById('playerAcademy').value} at age 15.`,
                type: 'milestone'
            }],
            academyLogo: clubLogoDatabase[document.getElementById('playerAcademy').value] || null,
            equippedBoots: 'basic',
            ownedBoots: ['basic'],
            matches: [], // store match results
            leagueStandings: {} // placeholder for standings
        };

        try {
            localStorage.setItem('theJourney_playerData', JSON.stringify(playerData));
            localStorage.setItem('theJourney_gameStarted', 'true');
        } catch (err) {
            showToast('❌ Failed to save data. Check browser storage space.', 'error');
            return;
        }

        const btnCreate = document.getElementById('btnCreatePlayer');
        if (btnCreate) {
            btnCreate.innerHTML = '<i class="fa-solid fa-check"></i> Player Created!';
            btnCreate.style.background = 'linear-gradient(135deg, #00e676, #009624)';
            btnCreate.style.pointerEvents = 'none';
        }

        showToast('✅ Player created successfully! Redirecting...', 'success');

        setTimeout(() => {
            try {
                window.location.href = 'dashboard.html';
            } catch (ex) {
                window.location.replace('dashboard.html');
            }
        }, 1200);
    });

    // ==================== RESET CAREER ====================
    function resetCareer() {
        if (confirm('⚠️ Are you sure you want to reset your entire career?\n\nThis action cannot be undone.')) {
            localStorage.removeItem('theJourney_playerData');
            localStorage.removeItem('theJourney_gameStarted');
            showToast('🗑️ Career data has been permanently reset.', 'error');
            if (btnStartCareer) {
                btnStartCareer.innerHTML = '<i class="fa-solid fa-play"></i> Start Career';
                btnStartCareer.href = 'dashboard.html';
                btnStartCareer.title = 'Start a new career';
            }
            setTimeout(() => location.reload(), 900);
        }
    }

    if (btnResetCareer) {
        btnResetCareer.addEventListener('click', resetCareer);
    }

    // ==================== INITIALISATION ====================
    const existingData = localStorage.getItem('theJourney_playerData');
    const gameStarted = localStorage.getItem('theJourney_gameStarted');

    if (existingData && gameStarted === 'true') {
        try {
            const player = JSON.parse(existingData);
            if (btnStartCareer) {
                btnStartCareer.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Continue Career';
                btnStartCareer.href = 'dashboard.html';
                btnStartCareer.title = `Continue as ${player.name}`;
            }
            // Pre-fill form
            if (player.name) document.getElementById('playerName').value = player.name;
            if (player.nationality) document.getElementById('playerNationality').value = player.nationality;
            if (player.position) document.getElementById('playerPosition').value = player.position;
            if (player.foot) document.getElementById('playerFoot').value = player.foot;
            if (player.height) document.getElementById('playerHeight').value = player.height;
            if (player.weight) document.getElementById('playerWeight').value = player.weight;
            if (player.city) document.getElementById('playerCity').value = player.city;
            if (player.academy) document.getElementById('playerAcademy').value = player.academy;
            if (player.personality) document.getElementById('playerPersonality').value = player.personality;
            if (player.ovr && ovrValue) {
                ovrValue.textContent = player.ovr;
                if (ovrBar) ovrBar.style.width = (player.ovr / 99 * 100) + '%';
            }
        } catch (e) { /* ignore */ }
    }

    updateOVRPreview();
    updateAcademyLogo();

    console.log('%c⚽ THE JOURNEY %cv' + GAME_VERSION + ' | Dashboard-ready', 'color:#00e676;', 'color:#b0b0ba;');
});