// 1. INTERACTIVE CURTAIN REMOVAL AND AUDIO ENGINE
function revealInvitation() {
    const curtain = document.getElementById('curtain-container');
    const wrapper = document.getElementById('main-scroll-wrapper');
    const audio = document.getElementById('bg-nasheed');
    
    if (curtain) {
        curtain.classList.add('open');
    }
    
    if (wrapper) {
        wrapper.classList.remove('hidden-scroll');
    }
    
    setTimeout(function() {
        initScratchCard();
    }, 400); 
    
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(function() {
            console.log("Audio playback waiting for user gesture.");
        });
    }
}

// 2. LAPTOP & TOUCH CONTEXT SCRATCH ENGINE
function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 280;
    canvas.height = 80;
    
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#b89047';
    for (let i = 0; i < 250; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 1.5, 1.5);
    }
    
    let isDrawing = false;
    
    function scratch(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        
        const x = e.offsetX ?? (e.clientX - rect.left);
        const y = e.offsetY ?? (e.clientY - rect.top);
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();
    }
    
    canvas.addEventListener('pointerdown', function(e) {
        isDrawing = true;
        canvas.setPointerCapture(e.pointerId);
        scratch(e);
    });
    
    canvas.addEventListener('pointermove', scratch);
    
    canvas.addEventListener('pointerup', function(e) {
        isDrawing = false;
        canvas.releasePointerCapture(e.pointerId);
    });
    
    canvas.addEventListener('pointercancel', function() { 
        isDrawing = false; 
    });
}

// 3. LIVE WEDDING COUNTDOWN ENGINE
const targetDate = new Date("July 16, 2026 11:30:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
}, 1000);