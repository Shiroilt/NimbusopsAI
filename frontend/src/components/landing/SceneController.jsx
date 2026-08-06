import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./Hero";
import FeaturePrediction from "./FeaturePrediction";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";

gsap.registerPlugin(ScrollTrigger);

export default function SceneController() {
    const containerRef = useRef(null);
    
    // Scene Refs
    const heroRef = useRef(null);
    const predictionRef = useRef(null);
    const scene3Ref = useRef(null);
    const scene4Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states (hide everything except Hero)
            gsap.set(predictionRef.current, { autoAlpha: 0, y: 40 });
            gsap.set(scene3Ref.current, { autoAlpha: 0, y: 40 });
            gsap.set(scene4Ref.current, { autoAlpha: 0, y: 40 });

            // Inner elements of scenes (for stagger effects)
            gsap.set(".architecture-card", { autoAlpha: 0, y: 40 });
            gsap.set(".icon-glow", { opacity: 0 });

            // The Master Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // Hero Lifecycle
            tl.to(heroRef.current, { autoAlpha: 0, y: -40, duration: 1 })
            
            // FeaturePrediction Lifecycle
              .to(predictionRef.current, { autoAlpha: 1, y: 0, duration: 1 })
              .to(predictionRef.current, { autoAlpha: 1, duration: 2 }) // hold
              .to(predictionRef.current, { autoAlpha: 0, y: -40, duration: 1 })
              
            // Scene 3 Lifecycle
              .to(scene3Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
              // Internal animations for Scene 3
              .to(".architecture-card", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2 })
              .to(".pipeline-line", { x: "0%", duration: 1, ease: "power1.inOut" })
              .to(".pipeline-line-mobile", { y: "0%", duration: 1, ease: "power1.inOut" }, "<")
              .to(".icon-glow", { opacity: 1, duration: 1, stagger: 0.2 })
              .to(scene3Ref.current, { autoAlpha: 1, duration: 2 }) // hold
              .to(scene3Ref.current, { autoAlpha: 0, y: -40, duration: 1 })
              
            // Scene 4 (Auth) Lifecycle
              .to(scene4Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
              .to(scene4Ref.current, { autoAlpha: 1, duration: 2 }); // hold at the end

        }); // Scope defaults to the document since we are using refs for root scenes and classes for children

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-[800vh]">
            <Hero ref={heroRef} />
            <FeaturePrediction ref={predictionRef} />
            <Scene3 ref={scene3Ref} />
            <Scene4 ref={scene4Ref} />
        </div>
    );
}
