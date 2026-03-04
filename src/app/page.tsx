"use client";

import { useEffect, useRef } from "react";

const CAT_FRAMES = [
	// Frame 1 - walking
	[
		"  /\\_/\\  ",
		" ( o.o ) ",
		"  > ^ <  ",
		" /|   |\\ ",
	],
	// Frame 2 - walking
	[
		"  /\\_/\\  ",
		" ( -.- ) ",
		"  > ^ <  ",
		"  |   |  ",
	],
];

interface Cat {
	x: number;
	y: number;
	vx: number;
	vy: number;
	frame: number;
	frameTimer: number;
	flip: boolean;
}

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const catsRef = useRef<Cat[]>([]);
	const animRef = useRef<number>(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const CAT_W = 72;
		const CAT_H = 40;
		const SPEED = 2.2;
		const NUM_CATS = 10;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);

		// Init cats
		catsRef.current = Array.from({ length: NUM_CATS }, () => ({
			x: Math.random() * (window.innerWidth - CAT_W),
			y: Math.random() * (window.innerHeight - CAT_H),
			vx: (Math.random() > 0.5 ? 1 : -1) * SPEED * (0.8 + Math.random() * 0.4),
			vy: (Math.random() > 0.5 ? 1 : -1) * SPEED * (0.8 + Math.random() * 0.4),
			frame: 0,
			frameTimer: 0,
			flip: false,
		}));

		const drawCat = (cat: Cat) => {
			const lines = CAT_FRAMES[cat.frame];
			ctx.save();
			ctx.font = "bold 10px monospace";
			ctx.fillStyle = "#000000";

			if (cat.flip) {
				ctx.scale(-1, 1);
				lines.forEach((line, i) => {
					ctx.fillText(line, -(cat.x + CAT_W), cat.y + i * 10 + 10);
				});
			} else {
				lines.forEach((line, i) => {
					ctx.fillText(line, cat.x, cat.y + i * 10 + 10);
				});
			}
			ctx.restore();
		};

		const tick = () => {
			if (!canvas) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const cats = catsRef.current;
			for (const cat of cats) {
				// Move
				cat.x += cat.vx;
				cat.y += cat.vy;

				// Bounce off walls
				if (cat.x <= 0) { cat.x = 0; cat.vx = Math.abs(cat.vx); cat.flip = false; }
				if (cat.x + CAT_W >= canvas.width) { cat.x = canvas.width - CAT_W; cat.vx = -Math.abs(cat.vx); cat.flip = true; }
				if (cat.y <= 0) { cat.y = 0; cat.vy = Math.abs(cat.vy); }
				if (cat.y + CAT_H >= canvas.height) { cat.y = canvas.height - CAT_H; cat.vy = -Math.abs(cat.vy); }

				// Bounce off each other
				for (const other of cats) {
					if (other === cat) continue;
					const dx = other.x - cat.x;
					const dy = other.y - cat.y;
					if (Math.abs(dx) < CAT_W && Math.abs(dy) < CAT_H) {
						if (Math.abs(dx) > Math.abs(dy)) {
							cat.vx *= -1;
							other.vx *= -1;
							cat.flip = cat.vx < 0;
							other.flip = other.vx < 0;
						} else {
							cat.vy *= -1;
							other.vy *= -1;
						}
					}
				}

				// Animate frames
				cat.frameTimer++;
				if (cat.frameTimer > 12) {
					cat.frameTimer = 0;
					cat.frame = (cat.frame + 1) % CAT_FRAMES.length;
				}

				drawCat(cat);
			}

			animRef.current = requestAnimationFrame(tick);
		};

		animRef.current = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(animRef.current);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<div className="relative w-screen h-screen overflow-hidden bg-[#FF006E]">
			<canvas ref={canvasRef} className="absolute inset-0" />
			<div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
				<h1
					style={{ fontFamily: "var(--font-eb-garamond)" }}
					className="text-6xl md:text-8xl font-bold uppercase tracking-widest text-black mix-blend-multiply select-none"
				>
					Iona OssaMain
				</h1>
			</div>
		</div>
	);
}
