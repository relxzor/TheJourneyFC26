// ==================== roleplay.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    document.getElementById('rpCity').textContent = player.city || 'Your Hometown';

    const locations = [
        { name: 'Training Ground', icon: 'fa-futbol', action: 'train' },
        { name: 'Gym', icon: 'fa-dumbbell', action: 'gym' },
        { name: 'Home', icon: 'fa-house', action: 'rest' },
        { name: 'Shopping Mall', icon: 'fa-bag-shopping', action: 'shop' },
        { name: 'Restaurant', icon: 'fa-utensils', action: 'eat' },
        { name: 'Nightclub', icon: 'fa-music', action: 'party' },
    ];

    document.getElementById('locationsGrid').innerHTML = locations.map(l => `
        <div class="location-card" onclick="visitLocation('${l.action}')">
            <i class="fa-solid ${l.icon}"></i>
            <span>${l.name}</span>
        </div>
    `).join('');

    window.visitLocation = function(action) {
        const outcomes = {
            rest: { msg: 'You rested at home. Fatigue reduced.', fatigue: -15, morale: 2 },
            gym: { msg: 'Workout complete! Strength +0.01', fatigue: 8, attr: 'strength', gain: 0.01 },
            shop: { msg: 'Shopping trip. Spent £30.', balance: -30, morale: 3 },
            eat: { msg: 'Nice meal. Energy restored.', fatigue: -5, balance: -20 },
            party: { msg: 'Night out! Morale up but fatigue increased.', morale: 8, fatigue: 10, reputation: -1 },
            train: { msg: 'Extra training session.', fatigue: 5, attr: 'stamina', gain: 0.02 },
        };
        const outcome = outcomes[action];
        if (!outcome) return;

        if (outcome.fatigue) player.fatigue = Math.min(100, Math.max(0, (player.fatigue || 0) + outcome.fatigue));
        if (outcome.morale) player.morale = Math.min(100, Math.max(20, (player.morale || 70) + outcome.morale));
        if (outcome.balance) player.bankBalance = Math.max(0, (player.bankBalance || 500) + outcome.balance);
        if (outcome.reputation) player.reputation = Math.max(0, (player.reputation || 0) + outcome.reputation);
        if (outcome.attr && outcome.gain && player.attributes) {
            player.attributes[outcome.attr] = Math.min(99, (player.attributes[outcome.attr] || 40) + outcome.gain);
        }

        player.careerTimeline = player.careerTimeline || [];
        player.careerTimeline.push({
            date: new Date().toISOString(),
            event: 'Open World',
            detail: outcome.msg,
            type: 'life'
        });

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast(outcome.msg, 'info');
    };

    // NPCs
    const npcs = [
        { name: 'Coach Thompson', role: 'Academy Coach', mood: 'Pleased' },
        { name: 'Sarah (Friend)', role: 'School Friend', mood: 'Supportive' },
        { name: 'Marcus', role: 'Teammate', mood: 'Competitive' },
        { name: 'Mrs. Davies', role: 'Landlady', mood: 'Friendly' },
    ];
    document.getElementById('npcList').innerHTML = npcs.map(n => `
        <div class="npc-item">
            <i class="fa-solid fa-circle-user"></i>
            <div>
                <strong>${n.name}</strong>
                <span style="color:var(--text-muted);font-size:0.7rem;display:block;">${n.role} — ${n.mood}</span>
            </div>
        </div>
    `).join('');

    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();