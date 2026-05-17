import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    return (
        <footer className="footer-section">
            <p className="footer-copyright">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="footer-clock">{formatTime(time)}</p>
        </footer>
    );
}
