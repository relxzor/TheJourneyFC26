// ==================== dashboard.js ====================
// THE JOURNEY — Dashboard Controller

(function() {
    'use strict';

    // Get player data
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

    // ==================== POPULATE PLAYER HEADER ====================
    document.getElementById('dashPlayerName').textContent = player.name || 'Unknown';
    document.getElementById('dashPosition').textContent = player.position || '—';
    document.getElementById('dashAge').textContent = 'Age: ' + (player.age || 15);
    document.getElementById('dashNationality').textContent = player.nationality || '—';
    document.getElementById('dashClub').textContent = player.club || player.academy || '—';
    document.getElementById('dashOVR').textContent = player.ovr || 45;
    document.getElementById('dashMatches').textContent = player.matchesPlayed || 0;
    document.getElementById('dashGoals').textContent = player.goalsScored || 0;
    document.getElementById('dashAssists').textContent = player.assists || 0;

    // Market value formatting
    const marketVal = player.marketValue || 50000;
    document.getElementById('dashMarketValue').textContent = '£' + formatNumber(marketVal);

    // OVR Ring
    const ovrCircle = document.getElementById('ovrRingCircle');
    if (ovrCircle) {
        const ovr = player.ovr || 45;
        const circumference = 2 * Math.PI * 52; // r=52
        const offset = circumference - (ovr / 99 * circumference);
        ovrCircle.setAttribute('stroke-dashoffset', offset);
    }

    // Club logo
    const clubLogo = document.getElementById('dashClubLogo');
    if (clubLogo && player.academyLogo) {
        clubLogo.src = player.academyLogo;
        clubLogo.style.display = 'block';
    }

    // ==================== ATTRIBUTE SUMMARY (with Double Touch) ====================
    const attrList = document.getElementById('attrSummaryList');
    if (attrList && player.attributes) {
        const keyAttrs = ['acceleration', 'sprintSpeed', 'stamina', 'ballControl', 'passing', 'finishing', 'dribbling', 'composure', 'strength', 'vision', 'doubleTouch'];
        const attrLabels = {
            acceleration: 'Acceleration', sprintSpeed: 'Sprint Speed', stamina: 'Stamina',
            ballControl: 'Ball Control', passing: 'Passing', finishing: 'Finishing',
            dribbling: 'Dribbling', composure: 'Composure', strength: 'Strength', vision: 'Vision',
            doubleTouch: 'Double Touch'
        };
        let html = '';
        keyAttrs.forEach(key => {
            const val = player.attributes[key] || 40;
            html += `<div class="attr-summary-row"><span>${attrLabels[key]}</span><span class="attr-val">${val}</span></div>`;
        });
        attrList.innerHTML = html;
    }

    // ==================== FITNESS ====================
    const stamina = player.attributes?.stamina || 40;
    const fatigue = player.fatigue || 0;
    const morale = player.morale || 70;
    const injuryRes = player.attributes?.injuryResistance || 42;
    const injuryRisk = Math.max(5, Math.min(90, Math.round((100 - injuryRes) * 0.4 + fatigue * 0.3)));

    document.getElementById('staminaBar').style.width = stamina + '%';
    document.getElementById('staminaValue').textContent = stamina + '%';
    document.getElementById('fatigueBar').style.width = fatigue + '%';
    document.getElementById('fatigueValue').textContent = fatigue + '%';
    document.getElementById('moraleBar').style.width = morale + '%';
    document.getElementById('moraleValue').textContent = morale + '%';
    document.getElementById('injuryRiskBar').style.width = injuryRisk + '%';
    document.getElementById('injuryRiskValue').textContent = injuryRisk + '%';

    const injuryStatus = document.getElementById('injuryStatusDisplay');
    if (player.injuryStatus && player.injuryStatus !== 'Fit') {
        injuryStatus.className = 'injury-status injured';
        injuryStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Status: <strong>' + player.injuryStatus + '</strong>';
    }

    // ==================== FINANCIAL ====================
    document.getElementById('dashBalance').textContent = '£' + formatNumber(player.bankBalance || 500);
    document.getElementById('dashSalary').textContent = '£' + formatNumber(player.salary || 200);
    document.getElementById('dashMarketVal').textContent = '£' + formatNumber(player.marketValue || 50000);
    const sponsorIncome = (player.sponsors || []).reduce((sum, s) => sum + (s.value || 0), 0);
    document.getElementById('dashSponsorIncome').textContent = '£' + formatNumber(sponsorIncome);
    document.getElementById('dashExpenses').textContent = '£' + formatNumber(Math.round((player.salary || 200) * 0.375));

    // ==================== TIMELINE ====================
    const timelineList = document.getElementById('timelineList');
    if (timelineList && player.careerTimeline) {
        const recent = player.careerTimeline.slice(-5).reverse();
        let html = '';
        recent.forEach(item => {
            const date = new Date(item.date);
            const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            html += `<div class="timeline-item ${item.type || ''}">
                        <span class="tl-date">${dateStr}</span>
                        <span>${item.event}: ${item.detail}</span>
                     </div>`;
        });
        if (!html) html = '<div class="timeline-item"><span>No career events yet. Start your journey!</span></div>';
        timelineList.innerHTML = html;
    }

    // ==================== MEDIA FEED ====================
    const mediaFeed = document.getElementById('mediaFeedMini');
    if (mediaFeed) {
        const mentions = player.mediaMentions || [];
        if (mentions.length > 0) {
            let html = '';
            mentions.slice(-4).reverse().forEach(m => {
                html += `<div class="media-feed-item"><i class="fa-solid fa-circle"></i><span>${m.headline || m}</span></div>`;
            });
            mediaFeed.innerHTML = html;
        } else {
            mediaFeed.innerHTML = '<div class="media-feed-item"><i class="fa-solid fa-circle"></i><span>No media coverage yet. Make headlines on the pitch.</span></div>';
        }
    }

    // ==================== UTILS ====================
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // ==================== NAVIGATION ====================
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

    // Reset button
    const btnReset = document.getElementById('btnResetCareer');
    if (btnReset) {
        btnReset.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('⚠️ Reset your entire career? This cannot be undone.')) {
                localStorage.removeItem('theJourney_playerData');
                localStorage.removeItem('theJourney_gameStarted');
                window.location.href = 'index.html';
            }
        });
    }

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

    console.log('%c⚽ DASHBOARD LOADED %c| %c' + (player.name || 'Player') + ' %c| Week ' + (player.week || 1),
        'color:#00e676;font-weight:bold;', 'color:#b0b0ba;', 'color:#fff;', 'color:#787882;');
})();