// ==================== livingmedia.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    const newsFeed = document.getElementById('newsFeed');
    const mentions = player.mediaMentions || [];
    if (mentions.length > 0) {
        newsFeed.innerHTML = mentions.slice(-6).reverse().map(m => `
            <div class="news-item">
                <span class="news-date">${new Date(m.date).toLocaleDateString('en-GB')}</span>
                <p>${m.headline || m}</p>
            </div>
        `).join('');
    }

    document.getElementById('btnInterview').addEventListener('click', () => {
        const responses = [
            'I\'m focused on improving every day.',
            'The team comes first. Personal glory follows.',
            'I believe in hard work and discipline.',
            'I\'m grateful for the opportunities given to me.',
        ];
        const chosen = responses[Math.floor(Math.random() * responses.length)];
        player.mediaMentions = player.mediaMentions || [];
        player.mediaMentions.push({
            headline: player.name + ': "' + chosen + '"',
            date: new Date().toISOString()
        });
        player.reputation = (player.reputation || 0) + 2;
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('📢 Interview published! Reputation +2', 'success');
        setTimeout(() => location.reload(), 800);
    });

    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();