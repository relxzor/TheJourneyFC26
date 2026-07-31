// ==================== training.js (UPDATED) ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    const drills = [
        { name: 'Ball Control Drill', icon: 'fa-futbol', attr: 'ballControl', gain: 0.03, staminaCost: 8, fatigueGain: 6 },
        { name: 'Sprint Training', icon: 'fa-person-running', attr: 'sprintSpeed', gain: 0.02, staminaCost: 12, fatigueGain: 10 },
        { name: 'Passing Practice', icon: 'fa-share', attr: 'passing', gain: 0.03, staminaCost: 6, fatigueGain: 5 },
        { name: 'Shooting Drill', icon: 'fa-bullseye', attr: 'finishing', gain: 0.03, staminaCost: 9, fatigueGain: 7 },
        { name: 'Strength Workout', icon: 'fa-dumbbell', attr: 'strength', gain: 0.02, staminaCost: 14, fatigueGain: 12 },
        { name: 'Agility Ladder', icon: 'fa-shoe-prints', attr: 'agility', gain: 0.02, staminaCost: 8, fatigueGain: 6 },
        { name: 'Double Touch', icon: 'fa-rotate', attr: 'doubleTouch', gain: 0.04, staminaCost: 10, fatigueGain: 8 } // NEW
    ];

    const drillsGrid = document.getElementById('drillsGrid');
    drillsGrid.innerHTML = drills.map(d => `
        <div class="drill-card" data-drill="${d.attr}">
            <i class="fa-solid ${d.icon}"></i>
            <div class="drill-name">${d.name}</div>
            <div class="drill-effect">+${d.gain.toFixed(2)} ${d.attr.replace(/([A-Z])/g,' $1').trim()}</div>
            <div class="drill-cost">⚡ -${d.staminaCost} Stamina | 😫 +${d.fatigueGain} Fatigue</div>
        </div>
    `).join('');

    drillsGrid.querySelectorAll('.drill-card').forEach(card => {
        card.addEventListener('click', () => {
            const attr = card.dataset.drill;
            const drill = drills.find(d => d.attr === attr);
            if (!drill) return;

            const currentStamina = player.attributes?.stamina || 40;
            if (currentStamina < drill.staminaCost) {
                showToast('⚠️ Not enough stamina! Rest first.', 'error');
                return;
            }

            // Apply training
            if (!player.attributes) player.attributes = {};
            player.attributes[attr] = Math.min(99, (player.attributes[attr] || 40) + drill.gain);
            player.attributes.stamina = Math.max(5, currentStamina - drill.staminaCost);
            player.fatigue = Math.min(100, (player.fatigue || 0) + drill.fatigueGain);
            player.trainingStreak = (player.trainingStreak || 0) + 1;

            // Injury risk
            const injuryRisk = Math.max(5, Math.min(90, (100 - (player.attributes.injuryResistance || 42)) * 0.4 + player.fatigue * 0.3));
            if (Math.random() * 100 < injuryRisk * 0.15) {
                const injuries = ['Minor hamstring strain', 'Ankle sprain', 'Groin pull', 'Muscle fatigue'];
                player.injuryStatus = injuries[Math.floor(Math.random() * injuries.length)];
                player.trainingStreak = 0;
                showToast('🚑 Injury! ' + player.injuryStatus + '. Rest required.', 'error');
            }

            player.careerTimeline = player.careerTimeline || [];
            player.careerTimeline.push({
                date: new Date().toISOString(),
                event: 'Training',
                detail: `Completed ${drill.name}. ${attr.replace(/([A-Z])/g,' $1').trim()} improved to ${player.attributes[attr].toFixed(1)}.`,
                type: 'training'
            });

            localStorage.setItem('theJourney_playerData', JSON.stringify(player));
            showToast(`✅ ${drill.name} complete! +${drill.gain.toFixed(2)} ${attr.replace(/([A-Z])/g,' $1').trim()}`, 'success');
            updateProgress();
        });
    });

    function updateProgress() {
        const progressList = document.getElementById('progressList');
        const attrs = player.attributes || {};
        // Added doubleTouch to key attrs
        const keyAttrs = ['ballControl','sprintSpeed','passing','finishing','strength','agility','stamina','doubleTouch'];
        progressList.innerHTML = keyAttrs.map(a =>
            `<div class="progress-item">${a.replace(/([A-Z])/g,' $1').trim()}: <span>${(attrs[a]||40).toFixed(1)}</span></div>`
        ).join('');
    }

    updateProgress();

    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();