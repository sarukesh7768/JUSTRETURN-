export function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Content Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
          .fromTo('.hero-cta-group', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .fromTo('.hero-stats .stat-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.2");

    // Hero Parallax
    gsap.to('.hero-content', {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 2. Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 3. How It Works Steps
    gsap.utils.toArray('.timeline-step').forEach((step, i) => {
        const xOffset = i % 2 === 0 ? -50 : 50;
        gsap.fromTo(step,
            { opacity: 0, x: xOffset },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // How Paths
    gsap.fromTo('.path-card',
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: ".how-paths",
                start: "top 80%"
            }
        }
    );

    // 4. Form Container
    gsap.fromTo('.form-container',
        { opacity: 0, scale: 0.95 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#return-form",
                start: "top 75%"
            }
        }
    );

    // 5. Dashboard Stats
    gsap.fromTo('.dashboard-stats .stat-card',
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#dashboard",
                start: "top 75%"
            }
        }
    );

    // 6. Footer
    gsap.fromTo('.footer-grid > div',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#footer",
                start: "top 90%"
            }
        }
    );
}
