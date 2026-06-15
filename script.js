document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('wax-seal');
    const letter = document.getElementById('letter');
    const originalLetterParent = letter.parentNode;
    const instructionText = document.getElementById('instruction-text');
    
    const btnAccept = document.getElementById('btn-accept');
    const btnReject = document.getElementById('btn-reject');
    const pandaImg = document.getElementById('panda-img');
    const pandaSticker = document.getElementById('panda-sticker');
    
    const successOverlay = document.getElementById('success-overlay');
    const btnCloseSuccess = document.getElementById('btn-close-success');
    
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const iconPlay = musicToggle.querySelector('.icon-play');
    const iconMute = musicToggle.querySelector('.icon-mute');
    
    const particlesContainer = document.getElementById('particles-container');

    let isEnvelopeOpened = false;
    let isMusicPlaying = false;
    let particlesInterval = null;

    // Aesthetic, neutral emojis for floating particles (no love hearts)
    const heartEmojis = ['🌸', '✨', '🍃', '⭐', '🌼', '🍀'];

    /* ==========================================================================
       Particle System (Floating Hearts)
       ========================================================================== */
    function createHeartParticle(isBurst = false) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomly select heart style
        particle.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Horizontal position
        const leftPos = Math.random() * 100;
        particle.style.left = `${leftPos}%`;
        
        // Random size
        const size = isBurst 
            ? Math.random() * 20 + 20 // Bigger hearts for success burst
            : Math.random() * 15 + 15; // Standard floating hearts
        particle.style.fontSize = `${size}px`;
        
        // Random animation duration
        const duration = isBurst 
            ? Math.random() * 2 + 2 // Faster float up for success burst
            : Math.random() * 4 + 4; // Gentle float up
        particle.style.animationDuration = `${duration}s`;
        
        // Random swing offset via custom CSS transition curves
        particle.style.animationTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // If it's a burst, starting bottom is slightly higher
        if (isBurst) {
            particle.style.bottom = `${Math.random() * 20}vh`;
            particle.style.animationName = 'floatUp';
        }
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation ends to prevent memory bloat
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    function startFloatingHearts() {
        if (!particlesInterval) {
            // Initial burst
            for (let i = 0; i < 10; i++) {
                setTimeout(createHeartParticle, i * 150);
            }
            // Continuous spawning
            particlesInterval = setInterval(() => {
                createHeartParticle();
            }, 800);
        }
    }

    function triggerSuccessBurst() {
        // Create 60 hearts instantly
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                createHeartParticle(true);
            }, i * 50);
        }
    }

    /* ==========================================================================
       Audio Control Logic
       ========================================================================== */
    function playAudio() {
        bgMusic.play()
            .then(() => {
                isMusicPlaying = true;
                iconPlay.classList.add('hidden');
                iconMute.classList.remove('hidden');
            })
            .catch(error => {
                console.log('Audio autoplay prevented by browser. Waiting for interaction.', error);
            });
    }

    function pauseAudio() {
        bgMusic.pause();
        isMusicPlaying = false;
        iconPlay.classList.remove('hidden');
        iconMute.classList.add('hidden');
    }

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    /* ==========================================================================
       Envelope Opening Sequences
       ========================================================================== */
    function openEnvelope() {
        if (isEnvelopeOpened) return;
        
        isEnvelopeOpened = true;
        envelope.classList.add('open');
        instructionText.textContent = 'Coba klik suratnya untuk membaca... ✉️';
        
        // Hide the envelope panda sticker completely when opened
        if (pandaSticker) {
            pandaSticker.style.opacity = '0';
            pandaSticker.style.pointerEvents = 'none';
        }
        
        // Play music (will now succeed as it's triggered by a user click)
        playAudio();
        
        // Start romantic ambient particles
        startFloatingHearts();
    }

    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
    });

    envelope.addEventListener('click', () => {
        if (!isEnvelopeOpened) {
            openEnvelope();
        }
    });

    /* ==========================================================================
       Letter Reading Expansion
       ========================================================================== */
    letter.addEventListener('click', (e) => {
        // Expand the letter only if the envelope is open and it's not already expanded
        if (isEnvelopeOpened && !letter.classList.contains('expanded')) {
            e.stopPropagation();
            
            // Append to body to bypass WebKit/Blink transform/perspective container fixed-offset bug
            document.body.appendChild(letter);
            letter.classList.add('expanded');
            instructionText.style.opacity = '0';
        }
    });

    // Close letter expansion if clicked outside the expanded letter modal
    document.addEventListener('click', (e) => {
        if (letter.classList.contains('expanded') && !letter.contains(e.target)) {
            // Only collapse if they didn't click on the success overlay buttons
            if (!successOverlay.contains(e.target)) {
                // Return letter to envelope DOM parent
                originalLetterParent.appendChild(letter);
                letter.classList.remove('expanded');
                instructionText.style.opacity = '1';
            }
        }
    });

    /* ==========================================================================
       Runaway Button ("Nggak Mau!") Interactivity
       ========================================================================== */
    function moveRejectButton() {
        // Ensure the button is absolute-positioned relative to the letter container
        btnReject.style.position = 'absolute';
        
        // Get dimensions of the letter container
        const containerWidth = letter.clientWidth;
        const containerHeight = letter.clientHeight;
        
        const btnWidth = btnReject.offsetWidth;
        const btnHeight = btnReject.offsetHeight;
        
        // Safe padding boundaries so it doesn't overlap borders/text padding
        const paddingX = 20;
        const paddingY = 20;
        
        const minX = paddingX;
        const maxX = containerWidth - btnWidth - paddingX;
        const minY = paddingY;
        const maxY = containerHeight - btnHeight - paddingY;
        
        // Safety check to prevent errors
        if (maxX <= minX || maxY <= minY) return;

        // Generate random coordinates inside the boundaries
        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (maxY - minY) + minY;
        
        // Ensure the new coordinate is reasonably far from the current position
        const currentX = parseFloat(btnReject.style.left) || (containerWidth / 2);
        const currentY = parseFloat(btnReject.style.top) || (containerHeight - 50);
        const distance = Math.hypot(newX - currentX, newY - currentY);
        
        if (distance < 100) {
            newX = (newX + 100) % (maxX - minX) + minX;
            newY = (newY + 100) % (maxY - minY) + minY;
        }
        
        btnReject.style.left = `${newX}px`;
        btnReject.style.top = `${newY}px`;
        btnReject.style.zIndex = '999';
    }

    // Runaway trigger on Desktop (mouseover)
    btnReject.addEventListener('mouseover', () => {
        moveRejectButton();
    });

    // Runaway trigger on Mobile (touchstart)
    btnReject.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents click event from triggering on old location
        moveRejectButton();
    });

    // Fallback in case of focus or click event gets through
    btnReject.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveRejectButton();
    });

    /* ==========================================================================
       Accept ("Aku Maafin!") & Success Sequence
       ========================================================================== */
    btnAccept.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Show success modal
        successOverlay.classList.remove('hidden');
        
        // Release a massive splash of hearts
        triggerSuccessBurst();
    });

    // Close Success Screen and fully reset to closed envelope state
    btnCloseSuccess.addEventListener('click', () => {
        successOverlay.classList.add('hidden');
        
        // Collapse the letter back and return to envelope DOM parent
        originalLetterParent.appendChild(letter);
        letter.classList.remove('expanded');
        
        // Close the envelope fold
        envelope.classList.remove('open');
        isEnvelopeOpened = false;
        
        // Restore the envelope panda sticker
        if (pandaSticker) {
            pandaSticker.style.opacity = '1';
            pandaSticker.style.pointerEvents = 'auto';
        }
        
        // Reset the instruction text
        instructionText.textContent = 'Ada pesan untukmu, silakan dibuka... ✨';
        instructionText.style.opacity = '1';
        
        // Reset the runaway button position to normal inside the letter
        btnReject.style.position = '';
        btnReject.style.left = '';
        btnReject.style.top = '';
    });
});
