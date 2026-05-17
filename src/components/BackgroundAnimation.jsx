import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationId;
        let width, height;

        const orbs = [];
        const ORB_COUNT = 5;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function createOrb() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 200 + 100,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                hue: Math.random() * 60 + 230, // purple-blue range
                opacity: Math.random() * 0.06 + 0.03,
            };
        }

        function init() {
            resize();
            orbs.length = 0;
            for (let i = 0; i < ORB_COUNT; i++) {
                orbs.push(createOrb());
            }
        }

        function drawOrb(orb) {
            const gradient = ctx.createRadialGradient(
                orb.x, orb.y, 0,
                orb.x, orb.y, orb.radius
            );
            gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 60%, ${orb.opacity})`);
            gradient.addColorStop(1, `hsla(${orb.hue}, 70%, 60%, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (const orb of orbs) {
                orb.x += orb.vx;
                orb.y += orb.vy;

                // Gentle bounce at edges
                if (orb.x < -orb.radius) orb.x = width + orb.radius;
                if (orb.x > width + orb.radius) orb.x = -orb.radius;
                if (orb.y < -orb.radius) orb.y = height + orb.radius;
                if (orb.y > height + orb.radius) orb.y = -orb.radius;

                drawOrb(orb);
            }

            animationId = requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="bg-animation-canvas"
            aria-hidden="true"
        />
    );
}
