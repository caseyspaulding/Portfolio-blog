import { useEffect, useRef, useState } from 'react';

export default function useOnScreen(ref: React.RefObject<Element>) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            {
                rootMargin: '0px',
                threshold: 0.1
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return isIntersecting;
}
