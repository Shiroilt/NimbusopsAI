import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const FRAME_PATH = "/frames";
const FRAME_EXTENSION = "png";
const SCRUB_SPEED = 0.2;
export default function FrameSequence() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;
        // High DPI support
        const dpr = window.devicePixelRatio || 1;

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        context.scale(dpr, dpr);

        const images = new Array(FRAME_COUNT);
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();

            img.src = `${FRAME_PATH}/frame_${String(i).padStart(4, "0")}.${FRAME_EXTENSION}`;

            images[i - 1] = img;
        }

        const currentFrame = { frame: 0 };

        function renderFrame(index) {
            const img = images[index];

            if (!img || !img.complete) return;

            context.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // object-fit: cover
            const canvasRatio = window.innerWidth / window.innerHeight;
            const imageRatio = img.width / img.height;

            let drawWidth;
            let drawHeight;

            if (imageRatio > canvasRatio) {
                drawHeight = window.innerHeight;
                drawWidth = drawHeight * imageRatio;
            } else {
                drawWidth = window.innerWidth;
                drawHeight = drawWidth / imageRatio;
            }

            const x = (window.innerWidth - drawWidth) / 2;
            const y = (window.innerHeight - drawHeight) / 2;

            context.drawImage(img, x, y, drawWidth, drawHeight);
        }
        const ctx = gsap.context(() => {
            images[0].onload = () => {
                renderFrame(0);

                gsap.to(currentFrame, {
                    frame: FRAME_COUNT - 1,
                    snap: "frame",
                    ease: "none",

                    scrollTrigger: {
                        trigger: "#landing",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: SCRUB_SPEED,
                    },

                    onUpdate: () => {
                        renderFrame(Math.round(currentFrame.frame));
                    },
                });
            };
        });

        return () => ctx.revert();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10"
        />
    );
}