    document.addEventListener('DOMContentLoaded', () => {
        // Initialize icons
        lucide.createIcons();
        
        // Scene management
        const scenes = ['scene1', 'scene2', 'scene3'];
        const progressDots = document.querySelectorAll('.progress-dot');
        let currentScene = 0;
        let animationStarted = false;
        let autoTransitionTimeout;
        
        // Initialize animation container for scene 2
        const channels = [
            { icon: '<i data-lucide="shopping-cart"></i>', label: "Shopify" },
            { icon: '<i data-lucide="bar-chart-2"></i>', label: "Google Ads" },
            { icon: '<i data-lucide="facebook"></i>', label: "Meta Ads" },
            { icon: '<i data-lucide="mail"></i>', label: "Email" },
            { icon: '<i data-lucide="credit-card"></i>', label: "Checkout" },
            { icon: '<i data-lucide="users"></i>', label: "Audience" },
            { icon: '<i data-lucide="dollar-sign"></i>', label: "Revenue" },
            { icon: '<i data-lucide="activity"></i>', label: "Analytics" },
        ];
        
        const animationContainer = document.getElementById('animationContainer');
        
        // Create channel elements
        channels.forEach((channel, index) => {
            const channelElement = document.createElement('div');
            channelElement.className = 'channel';
            channelElement.innerHTML = `
                <div class="channel-icon">${channel.icon}</div>
                <div class="channel-label">${channel.label}</div>
            `;
            channelElement.dataset.index = index;
            animationContainer.appendChild(channelElement);
        });
        
        // Create unified center element
        const unifiedCenter = document.createElement('div');
        unifiedCenter.className = 'unified-center';
        unifiedCenter.innerHTML = `
            <div class="glow-effect"></div>
            <i data-lucide="layout-grid"></i>
        `;
        animationContainer.appendChild(unifiedCenter);
        
        // Create connection lines
        for (let i = 0; i < channels.length; i++) {
            const line = document.createElement('div');
            line.className = 'connection-line';
            line.id = `line-${i}`;
            animationContainer.appendChild(line);
        }
        
        // Hide all scenes except first one initially
        scenes.forEach((sceneId, index) => {
            const scene = document.getElementById(sceneId);
            if (index > 0) {
                scene.style.display = 'none';
            }
        });
        
        // Function to go to next scene
        function goToNextScene() {
            if (currentScene < scenes.length - 1) {
                // Hide current scene
                document.getElementById(scenes[currentScene]).style.display = 'none';
                progressDots[currentScene].classList.remove('active');
                
                // Show next scene
                currentScene++;
                const nextScene = document.getElementById(scenes[currentScene]);
                nextScene.style.display = 'flex';
                progressDots[currentScene].classList.add('active');
                
                // Scroll to the next scene
                nextScene.scrollIntoView({ behavior: 'smooth' });
                
                // Animate the new scene
                animateScene(currentScene);
                
                // Set timeout for next scene if not last
                if (currentScene < scenes.length - 1) {
                    autoTransitionTimeout = setTimeout(goToNextScene, 8000);
                }
            }
        }
        
        // Animate specific scene
        function animateScene(sceneIndex) {
            switch(sceneIndex) {
                case 0: // Siloed Marketing scene
                    const platforms = document.querySelectorAll('.platform');
                    platforms.forEach((platform, index) => {
                        setTimeout(() => {
                            platform.style.opacity = '1';
                            platform.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    
                    // Start auto transition after animation completes
                    setTimeout(() => {
                        if (currentScene === 0) { // Only if we're still on scene 1
                            autoTransitionTimeout = setTimeout(goToNextScene, 5000);
                        }
                    }, 2000);
                    break;
                    
                case 1: // Unification scene
                    // Position channels in circle
                    const channelElements = document.querySelectorAll('.channel');
                    const radius = Math.min(animationContainer.offsetWidth, animationContainer.offsetHeight) * 0.3;
                    
                    channelElements.forEach((element, index) => {
                        const angle = (index / channels.length) * 2 * Math.PI;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        gsap.to(element, {
                            opacity: 1,
                            scale: 1,
                            x: x,
                            y: y,
                            duration: 1,
                            delay: index * 0.1,
                            ease: "back.out"
                        });
                    });
                    
                    // After all channels are positioned, animate unification
                    setTimeout(() => {
                        // Animate channels to center
                        channelElements.forEach(element => {
                            gsap.to(element, {
                                x: 0,
                                y: 0,
                                duration: 1.5,
                                ease: "power2.inOut"
                            });
                        });
                        
                        // Animate connection lines
                        channelElements.forEach((element, index) => {
                            const line = document.getElementById(`line-${index}`);
                            const rect = element.getBoundingClientRect();
                            const center = animationContainer.getBoundingClientRect();
                            const centerX = center.left + center.width/2;
                            const centerY = center.top + center.height/2;
                            
                            const length = Math.sqrt(
                                Math.pow(rect.left + rect.width/2 - centerX, 2) + 
                                Math.pow(rect.top + rect.height/2 - centerY, 2)
                            );
                            
                            const angle = Math.atan2(
                                rect.top + rect.height/2 - centerY,
                                rect.left + rect.width/2 - centerX
                            );
                            
                            gsap.set(line, {
                                x: rect.left + rect.width/2,
                                y: rect.top + rect.height/2,
                                width: length,
                                rotation: angle,
                                opacity: 0.6
                            });
                            
                            gsap.to(line, {
                                width: 0,
                                duration: 1.5,
                                ease: "power2.inOut"
                            });
                        });
                        
                        // Show unified center
                        gsap.to(unifiedCenter, {
                            scale: 1,
                            duration: 6.5,
                            delay: 0.5,
                            ease: "elastic.out(1, 0.5)"
                        });
                        
                        // Start auto transition to next scene
                        if (currentScene === 1) { // Only if we're still on scene 2
                            autoTransitionTimeout = setTimeout(goToNextScene, 5000);
                        }
                        
                        // Refresh icons
                        setTimeout(() => lucide.createIcons(), 1700);
                    }, 1700);
                    break;
                    
                case 2: // Dashboard scene
                    gsap.to("#dashboardContainer", {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "back.out(1.7)"
                    });
                    
                    // Animate chart growth
                    const charts = document.querySelectorAll('.chart-data');
                    charts.forEach(chart => {
                        chart.style.animation = 'chartGrow 1.5s ease-out forwards';
                    });
                    
                    // Animate numbers counting up
                    const values = document.querySelectorAll('.widget-value');
                    values.forEach(value => {
                        const target = parseInt(value.textContent.replace(/\D/g, ''));
                        const duration = 2;
                        const start = 0;
                        const increment = target / (duration * 60); // 60fps
                        let current = start;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                clearInterval(timer);
                                current = target;
                            }
                            value.textContent = Math.floor(current).toLocaleString();
                            if (value.textContent.includes('.')) {
                                value.textContent = '$' + parseFloat(current).toFixed(2);
                            } else if (value.textContent.includes('%')) {
                                value.textContent = parseFloat(current).toFixed(1) + '%';
                            }
                        }, 1000/60);
                    });
                    break;
            }
        }
        
        // Set up Intersection Observer to detect when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    animationStarted = true;
                    
                    // Show first scene
                    document.getElementById(scenes[0]).style.display = 'flex';
                    
                    // Start the animation sequence
                    animateScene(0);
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the container is visible
        });
        
        // Observe the parent container (you may need to adjust this selector)
        const animationSection = document.querySelector('.scene-container');
        if (animationSection) {
            observer.observe(animationSection);
        }
        
        // Click handler for progress dots
        progressDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sceneIndex = parseInt(dot.dataset.scene.replace('scene', '')) - 1;
                
                if (sceneIndex !== currentScene) {
                    // Clear any pending auto transition
                    clearTimeout(autoTransitionTimeout);
                    
                    // Hide current scene
                    document.getElementById(scenes[currentScene]).style.display = 'none';
                    progressDots[currentScene].classList.remove('active');
                    
                    // Show selected scene
                    currentScene = sceneIndex;
                    const scene = document.getElementById(scenes[currentScene]);
                    scene.style.display = 'flex';
                    progressDots[currentScene].classList.add('active');
                    
                    // Scroll to the scene
                    scene.scrollIntoView({ behavior: 'smooth' });
                    
                    // Animate the scene
                    animateScene(currentScene);
                }
            });
        });
    });
