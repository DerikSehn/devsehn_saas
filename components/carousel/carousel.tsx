import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import React, { useEffect, useState } from 'react';
import CarouselArrow from './carousel-arrow';
import { cn } from '@/lib/utils';

export default function Carousel({ perView, children, className }: { perView?: number, children: React.ReactNode, className?: string }) {

    const size = useWindowSize();

    const sizes = [
        {
            value: 1,
            size: 320
        },
        {
            value: 2,
            size: 640
        },
        {
            value: 3,
            size: 768
        },
        {
            value: 4,
            size: 1024
        },
        {
            value: 5,
            size: 1280
        },
        {
            value: 6,
            size: 1536
        }
    ]

    const [sliderRef] = useKeenSlider({
        loop: true,
        rtl: true,
        slides: {
            perView: perView || sizes.filter((item) => item.size < size.width).slice(-1)[0].value
        },
        rubberband: true,

    });

    return (
        <div ref={sliderRef} className={cn("keen-slider", className)}>
            {React.Children.map(children, (child, index) => (
                <div className="keen-slider__slide" key={index}>
                    {child}
                </div>
            ))}
            <CarouselArrow direction='left' />
            <CarouselArrow direction='right' />
        </div>
    );
}

// Hook
function useWindowSize() {
    const [windowSize, setWindowSize] = useState<({
        width: number
        height: number
    })>({
        width: 1280,
        height: 1280,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}