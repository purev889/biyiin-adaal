module.exports = [
"[project]/data/questions.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RANK_TIERS",
    ()=>RANK_TIERS,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// data/questions.js
// Interstellar Quiz — Mission Lazarus Intelligence Test
const QUESTIONS = [
    {
        id: 1,
        category: "COSMOLOGY",
        text: "What is the name of the black hole that anchors the alien solar system in Interstellar?",
        options: [
            "Sagittarius A*",
            "Gargantua",
            "Andromeda Prime",
            "Messier 87"
        ],
        correct: 1,
        fact: "Gargantua was rendered with scientific accuracy, leading to new astrophysical discoveries about gravitational lensing."
    },
    {
        id: 2,
        category: "TEMPORAL PHYSICS",
        text: "On Miller's Planet, one hour equals how many years on Earth due to gravitational time dilation?",
        options: [
            "23 years",
            "100 years",
            "7 years",
            "47 years"
        ],
        correct: 2,
        fact: "This extreme time dilation is caused by Miller's Planet orbiting incredibly close to Gargantua's event horizon."
    },
    {
        id: 3,
        category: "MISSION DATA",
        text: "What is the name of the spacecraft that carries the crew through the wormhole?",
        options: [
            "Discovery One",
            "Prometheus",
            "Endurance",
            "Nostromo"
        ],
        correct: 2,
        fact: "The Endurance's ring design allowed for centrifugal artificial gravity. Its modular structure enabled selective jettisoning."
    },
    {
        id: 4,
        category: "NAVIGATION",
        text: "Near which planet in our solar system was the wormhole discovered?",
        options: [
            "Jupiter",
            "Neptune",
            "Uranus",
            "Saturn"
        ],
        correct: 3,
        fact: "The wormhole appeared near Saturn's rings 48 years before the mission — placed there by a mysterious intelligence."
    },
    {
        id: 5,
        category: "CREW MANIFEST",
        text: "Who portrays Commander Cooper, the former NASA pilot who leads the mission?",
        options: [
            "Matt Damon",
            "Michael Caine",
            "Casey Affleck",
            "Matthew McConaughey"
        ],
        correct: 3,
        fact: "McConaughey prepared for the role by studying NASA pilot psychology and consulting with actual space mission specialists."
    },
    {
        id: 6,
        category: "PROTOCOL",
        text: "What does 'Plan A' require to save humanity still on Earth?",
        options: [
            "Colonize Miller's Planet immediately",
            "Solve the gravity equation to launch stations off Earth",
            "Send embryos to a habitable world",
            "Detonate nuclear devices to terraform Mars"
        ],
        correct: 1,
        fact: "Professor Brand secretly knew Plan A was impossible — the quantum data needed could only come from inside a black hole's singularity."
    },
    {
        id: 7,
        category: "AI SYSTEMS",
        text: "TARS' honesty setting is adjustable. What is its default honesty level?",
        options: [
            "100%",
            "85%",
            "90%",
            "75%"
        ],
        correct: 3,
        fact: "Cooper sets TARS to 90% honesty, noting that 100% honesty isn't always the most diplomatic or useful approach."
    },
    {
        id: 8,
        category: "ASTROPHYSICS",
        text: "What theoretical construct does Cooper navigate through in the film's climax?",
        options: [
            "A wormhole",
            "A neutron star",
            "A tesseract",
            "A quantum singularity"
        ],
        correct: 2,
        fact: "The five-dimensional tesseract was constructed by future humans who had mastered manipulation of spacetime itself."
    },
    {
        id: 9,
        category: "MISSION HISTORY",
        text: "Which scientist's last name is shared by three of the candidate planets in the mission?",
        options: [
            "Lazarus",
            "Mann",
            "Brand",
            "Cooper"
        ],
        correct: 1,
        fact: "Dr. Mann's planet appeared most promising on telemetry — but the data he transmitted was falsified to ensure rescue."
    },
    {
        id: 10,
        category: "DIRECTION",
        text: "Who directed Interstellar, released in 2014?",
        options: [
            "Denis Villeneuve",
            "Steven Spielberg",
            "James Cameron",
            "Christopher Nolan"
        ],
        correct: 3,
        fact: "Nolan worked with physicist Kip Thorne as executive producer, ensuring the black hole depiction was scientifically grounded."
    }
];
const RANK_TIERS = [
    {
        min: 0,
        max: 3,
        title: "Earth-Bound",
        desc: "Your knowledge remains tethered to the home planet. The cosmos awaits."
    },
    {
        min: 4,
        max: 6,
        title: "Rookie Astronaut",
        desc: "You've crossed the threshold. The mission has only just begun."
    },
    {
        min: 7,
        max: 8,
        title: "Mission Specialist",
        desc: "Your grasp of spacetime is formidable. Gargantua calls to you."
    },
    {
        min: 9,
        max: 9,
        title: "Commander Cooper",
        desc: "You navigate the cosmos like a seasoned pilot. Love defies gravity."
    },
    {
        min: 10,
        max: 10,
        title: "Transcended Time",
        desc: "You exist beyond the fifth dimension. They chose well."
    }
];
const __TURBOPACK__default__export__ = QUESTIONS;
}),
"[project]/pages/quiz.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
// pages/quiz.js
// Interstellar — Mission Quiz Page
// Matches the visual language of the main Interstellar landing page exactly.
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/questions.js [ssr] (ecmascript)");
;
;
;
;
// ─── Starfield Canvas ────────────────────────────────────────────────────────
function StarCanvas() {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, stars = [], anim;
        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            stars = Array.from({
                length: Math.min(Math.floor(W * H / 7000), 420)
            }, ()=>({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: Math.random() * 1.2 + 0.1,
                    b: Math.random() * 0.65 + 0.15,
                    phase: Math.random() * Math.PI * 2,
                    spd: Math.random() * 0.6 + 0.2
                }));
        }
        let t = 0;
        function frame() {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#00000A';
            ctx.fillRect(0, 0, W, H);
            // Subtle nebula glow
            const gr = ctx.createRadialGradient(W * 0.5, H * 0.35, H * 0.1, W * 0.5, H * 0.5, H * 0.9);
            gr.addColorStop(0, 'rgba(25,45,120,0.07)');
            gr.addColorStop(0.5, 'rgba(10,20,60,0.04)');
            gr.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gr;
            ctx.fillRect(0, 0, W, H);
            stars.forEach((s)=>{
                const b = s.b * (0.5 + 0.5 * Math.sin(t * s.spd + s.phase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(210,218,255,${b})`;
                ctx.fill();
            });
            t += 0.008;
            anim = requestAnimationFrame(frame);
        }
        resize();
        window.addEventListener('resize', resize);
        frame();
        return ()=>{
            cancelAnimationFrame(anim);
            window.removeEventListener('resize', resize);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
        ref: ref,
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
        }
    }, void 0, false, {
        fileName: "[project]/pages/quiz.js",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
// ─── Utility helpers ─────────────────────────────────────────────────────────
function getRank(score) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["RANK_TIERS"].find((t)=>score >= t.min && score <= t.max) || __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["RANK_TIERS"][0];
}
function getLeaderboard() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveScore(name, score) {
    const lb = getLeaderboard();
    lb.push({
        name: name.trim().toUpperCase() || 'UNKNOWN',
        score,
        date: Date.now()
    });
    lb.sort((a, b)=>b.score - a.score || a.date - b.date);
    const top = lb.slice(0, 20);
    localStorage.setItem('interstellar_lb', JSON.stringify(top));
    return top;
}
function QuizPage() {
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('intro');
    const [qIndex, setQIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null); // index of picked option
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]); // {qId, picked, correct}
    const [nameInput, setNameInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [leaderboard, setLb] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [transitioning, setTransitioning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>setVisible(true), 100);
        return ()=>clearTimeout(t);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (phase === 'leaderboard') setLb(getLeaderboard());
    }, [
        phase
    ]);
    const currentQ = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"][qIndex];
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].length;
    const handleStart = ()=>{
        setPhase('quiz');
        setQIndex(0);
        setScore(0);
        setAnswers([]);
        setSelected(null);
        setRevealed(false);
    };
    const handleSelect = (optIdx)=>{
        if (revealed) return;
        setSelected(optIdx);
        setRevealed(true);
        const isCorrect = optIdx === currentQ.correct;
        if (isCorrect) setScore((s)=>s + 1);
        setAnswers((a)=>[
                ...a,
                {
                    qId: currentQ.id,
                    picked: optIdx,
                    correct: isCorrect
                }
            ]);
    };
    const handleNext = ()=>{
        if (transitioning) return;
        setTransitioning(true);
        setTimeout(()=>{
            if (qIndex + 1 >= total) {
                setPhase('result');
            } else {
                setQIndex((i)=>i + 1);
                setSelected(null);
                setRevealed(false);
            }
            setTransitioning(false);
        }, 420);
    };
    const handleSubmitScore = ()=>{
        if (submitted) {
            setPhase('leaderboard');
            return;
        }
        const top = saveScore(nameInput, score);
        setLb(top);
        setSubmitted(true);
        setPhase('leaderboard');
    };
    const handleRestart = ()=>{
        setPhase('intro');
        setQIndex(0);
        setScore(0);
        setAnswers([]);
        setSelected(null);
        setRevealed(false);
        setSubmitted(false);
        setNameInput('');
    };
    const rank = getRank(score);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Mission Quiz — INTERSTELLAR"
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Test your knowledge of the cosmos. The Interstellar challenge awaits."
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&family=Lato:wght@300;400;700&display=swap",
                        rel: "stylesheet"
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StarCanvas, {}, void 0, false, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,8,0.55) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    padding: '22px 64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(0,0,12,0.82)',
                    backdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(240,160,0,0.12)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: "/",
                        style: {
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 20,
                            letterSpacing: 7,
                            color: '#EDE9DF',
                            textDecoration: 'none'
                        },
                        children: [
                            "INTER",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#F0A000'
                                },
                                children: "✦"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 210,
                                columnNumber: 16
                            }, this),
                            "STELLAR"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 10,
                            letterSpacing: 4,
                            color: '#F0A000',
                            textTransform: 'uppercase'
                        },
                        children: "// MISSION QUIZ //"
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: "/",
                        style: {
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 9,
                            letterSpacing: 3,
                            color: '#7A7A92',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            border: '1px solid rgba(240,160,0,0.2)',
                            padding: '8px 16px',
                            transition: 'all 0.3s'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.color = '#F0A000';
                            e.currentTarget.style.borderColor = 'rgba(240,160,0,0.6)';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.color = '#7A7A92';
                            e.currentTarget.style.borderColor = 'rgba(240,160,0,0.2)';
                        },
                        children: "← HOME"
                    }, void 0, false, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    position: 'relative',
                    zIndex: 2,
                    minHeight: '100vh',
                    paddingTop: 90,
                    fontFamily: "'Lato', sans-serif",
                    color: '#EDE9DF'
                },
                children: [
                    phase === 'intro' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 'calc(100vh - 90px)',
                            padding: '0 24px',
                            textAlign: 'center',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(36px)',
                            transition: 'opacity 1s ease, transform 1s ease'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 10,
                                    letterSpacing: 9,
                                    color: '#F0A000',
                                    textTransform: 'uppercase',
                                    marginBottom: 32
                                },
                                children: "// LAZARUS INTELLIGENCE ASSESSMENT — SECTOR GARGANTUA //"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: 'clamp(72px, 14vw, 180px)',
                                    lineHeight: 0.88,
                                    letterSpacing: 8,
                                    color: '#EDE9DF',
                                    marginBottom: 12,
                                    textShadow: '0 0 120px rgba(240,150,0,0.14), 0 0 40px rgba(255,255,255,0.04)'
                                },
                                children: "MISSION"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: 'clamp(72px, 14vw, 180px)',
                                    lineHeight: 0.88,
                                    letterSpacing: 8,
                                    color: 'rgba(237,233,223,0.80)',
                                    marginBottom: 36
                                },
                                children: "QUIZ"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontStyle: 'italic',
                                    fontWeight: 300,
                                    fontSize: 'clamp(16px, 2vw, 24px)',
                                    color: '#7A7A92',
                                    letterSpacing: 4,
                                    marginBottom: 20
                                },
                                children: "Beyond the Horizon of Human Knowledge"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 60,
                                    height: 1,
                                    background: 'linear-gradient(90deg, transparent, #F0A000, transparent)',
                                    margin: '0 auto 36px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    maxWidth: 580,
                                    fontSize: 15,
                                    lineHeight: 1.92,
                                    color: '#7A7A92',
                                    marginBottom: 52,
                                    fontWeight: 300
                                },
                                children: "Ten questions stand between you and the stars. Answer correctly and your name joins the annals of Mission Lazarus. The cosmos is watching, Commander."
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 48,
                                    marginBottom: 56,
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    {
                                        num: total,
                                        label: 'Questions'
                                    },
                                    {
                                        num: 10,
                                        label: 'Ranks Available'
                                    },
                                    {
                                        num: '∞',
                                        label: 'Glory at Stake'
                                    }
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderLeft: '2px solid rgba(120,80,0,0.7)',
                                            paddingLeft: 20,
                                            textAlign: 'left'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    fontSize: 44,
                                                    color: '#EDE9DF',
                                                    lineHeight: 1
                                                },
                                                children: item.num
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 321,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Space Mono', monospace",
                                                    fontSize: 9,
                                                    letterSpacing: 3,
                                                    color: '#7A7A92',
                                                    textTransform: 'uppercase',
                                                    marginTop: 6
                                                },
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 327,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.label, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleStart,
                                style: {
                                    background: 'transparent',
                                    border: '1px solid rgba(240,160,0,0.55)',
                                    color: '#EDE9DF',
                                    padding: '16px 52px',
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 11,
                                    letterSpacing: 5,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.borderColor = '#F0A000';
                                    e.currentTarget.style.color = '#F0A000';
                                    e.currentTarget.style.boxShadow = '0 0 36px rgba(240,160,0,0.2), inset 0 0 20px rgba(240,160,0,0.04)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                                    e.currentTarget.style.color = '#EDE9DF';
                                    e.currentTarget.style.boxShadow = 'none';
                                },
                                children: "BEGIN MISSION"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 80,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 10,
                                    opacity: 0.4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 8,
                                            letterSpacing: 4,
                                            color: '#F0A000',
                                            textTransform: 'uppercase'
                                        },
                                        children: "Transmission Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 370,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 1,
                                            height: 44,
                                            background: 'linear-gradient(to bottom, #F0A000, transparent)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    phase === 'quiz' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 820,
                            margin: '0 auto',
                            padding: '60px 24px 120px',
                            opacity: transitioning ? 0 : 1,
                            transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
                            transition: 'opacity 0.4s ease, transform 0.4s ease'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 52
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Space Mono', monospace",
                                                    fontSize: 9,
                                                    letterSpacing: 5,
                                                    color: '#F0A000',
                                                    textTransform: 'uppercase'
                                                },
                                                children: [
                                                    "— QUESTION ",
                                                    qIndex + 1,
                                                    " / ",
                                                    total,
                                                    " —"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Space Mono', monospace",
                                                    fontSize: 9,
                                                    letterSpacing: 3,
                                                    color: '#7A7A92',
                                                    textTransform: 'uppercase'
                                                },
                                                children: [
                                                    "SCORE: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#F0A000'
                                                        },
                                                        children: score
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/quiz.js",
                                                        lineNumber: 409,
                                                        columnNumber: 26
                                                    }, this),
                                                    " / ",
                                                    qIndex + (revealed ? 1 : 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 404,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: 1,
                                            background: 'rgba(255,255,255,0.07)',
                                            position: 'relative'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                height: '100%',
                                                width: `${qIndex / total * 100}%`,
                                                background: 'linear-gradient(90deg, transparent, #F0A000)',
                                                transition: 'width 0.6s ease',
                                                boxShadow: '0 0 12px rgba(240,160,0,0.6)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/quiz.js",
                                            lineNumber: 418,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 413,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 6,
                                            marginTop: 10
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    height: 3,
                                                    background: i < qIndex ? answers[i]?.correct ? '#F0A000' : 'rgba(200,50,50,0.6)' : i === qIndex ? 'rgba(240,160,0,0.4)' : 'rgba(255,255,255,0.06)',
                                                    transition: 'background 0.4s ease'
                                                }
                                            }, i, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 429,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(240,160,0,0.12)',
                                    padding: '48px 48px 40px',
                                    marginBottom: 32,
                                    position: 'relative',
                                    overflow: 'hidden'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 1,
                                            background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.25), transparent)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 8,
                                            letterSpacing: 6,
                                            color: '#7A5000',
                                            textTransform: 'uppercase',
                                            marginBottom: 22,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'inline-block',
                                                    width: 18,
                                                    height: 1,
                                                    background: '#7A5000'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, this),
                                            currentQ.category
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 458,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 12,
                                            right: 24,
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: 88,
                                            color: 'rgba(255,255,255,0.025)',
                                            lineHeight: 1,
                                            userSelect: 'none',
                                            pointerEvents: 'none'
                                        },
                                        children: String(qIndex + 1).padStart(2, '0')
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontWeight: 300,
                                            fontSize: 'clamp(22px, 3vw, 34px)',
                                            lineHeight: 1.42,
                                            color: '#EDE9DF',
                                            letterSpacing: 0.5
                                        },
                                        children: currentQ.text
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 443,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "quiz-answer-grid",
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 12,
                                    marginBottom: 36
                                },
                                children: currentQ.options.map((opt, i)=>{
                                    const isCorrect = i === currentQ.correct;
                                    const isPicked = i === selected;
                                    const isWrong = revealed && isPicked && !isCorrect;
                                    const showCorrect = revealed && isCorrect;
                                    let borderColor = 'rgba(255,255,255,0.09)';
                                    let bg = 'rgba(255,255,255,0.025)';
                                    let textColor = '#7A7A92';
                                    let glow = 'none';
                                    if (revealed) {
                                        if (showCorrect) {
                                            borderColor = 'rgba(240,160,0,0.75)';
                                            bg = 'rgba(240,160,0,0.075)';
                                            textColor = '#F0A000';
                                            glow = '0 0 28px rgba(240,160,0,0.18)';
                                        } else if (isWrong) {
                                            borderColor = 'rgba(200,50,50,0.6)';
                                            bg = 'rgba(200,50,50,0.06)';
                                            textColor = 'rgba(200,80,80,0.9)';
                                        } else {
                                            borderColor = 'rgba(255,255,255,0.04)';
                                            textColor = 'rgba(120,120,145,0.4)';
                                        }
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSelect(i),
                                        disabled: revealed,
                                        style: {
                                            background: bg,
                                            border: `1px solid ${borderColor}`,
                                            padding: '20px 24px',
                                            textAlign: 'left',
                                            cursor: revealed ? 'default' : 'pointer',
                                            transition: 'all 0.35s ease',
                                            boxShadow: glow,
                                            position: 'relative',
                                            overflow: 'hidden'
                                        },
                                        onMouseEnter: (e)=>{
                                            if (revealed) return;
                                            e.currentTarget.style.borderColor = 'rgba(240,160,0,0.4)';
                                            e.currentTarget.style.background = 'rgba(240,160,0,0.04)';
                                            e.currentTarget.style.color = '#EDE9DF';
                                        },
                                        onMouseLeave: (e)=>{
                                            if (revealed) return;
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                                            e.currentTarget.style.color = '#7A7A92';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    fontSize: 11,
                                                    letterSpacing: 4,
                                                    color: showCorrect ? '#F0A000' : isWrong ? 'rgba(200,80,80,0.7)' : '#7A5000',
                                                    marginBottom: 8,
                                                    textTransform: 'uppercase'
                                                },
                                                children: [
                                                    'ALPHA',
                                                    'BETA',
                                                    'GAMMA',
                                                    'DELTA'
                                                ][i]
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 550,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Lato', sans-serif",
                                                    fontWeight: 300,
                                                    fontSize: 14,
                                                    lineHeight: 1.6,
                                                    color: textColor,
                                                    transition: 'color 0.35s'
                                                },
                                                children: opt
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 557,
                                                columnNumber: 21
                                            }, this),
                                            showCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: 2,
                                                    background: 'linear-gradient(90deg, transparent, #F0A000, transparent)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 569,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 521,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this),
                            revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    opacity: 1,
                                    animation: 'fadeUpIn 0.5s ease forwards'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'rgba(0,0,18,0.9)',
                                            border: '1px solid rgba(240,160,0,0.10)',
                                            borderLeft: '2px solid rgba(120,80,0,0.8)',
                                            padding: '22px 28px',
                                            marginBottom: 28
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Space Mono', monospace",
                                                    fontSize: 8,
                                                    letterSpacing: 5,
                                                    color: '#7A5000',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 10
                                                },
                                                children: "◈ Mission Log"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 593,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "'Cormorant Garamond', serif",
                                                    fontStyle: 'italic',
                                                    fontWeight: 300,
                                                    fontSize: 15,
                                                    lineHeight: 1.72,
                                                    color: '#7A7A92'
                                                },
                                                children: currentQ.fact
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 600,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 586,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: handleNext,
                                            style: {
                                                background: 'transparent',
                                                border: '1px solid rgba(240,160,0,0.55)',
                                                color: '#EDE9DF',
                                                padding: '14px 44px',
                                                fontFamily: "'Space Mono', monospace",
                                                fontSize: 10,
                                                letterSpacing: 4,
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.borderColor = '#F0A000';
                                                e.currentTarget.style.color = '#F0A000';
                                                e.currentTarget.style.boxShadow = '0 0 24px rgba(240,160,0,0.18)';
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                                                e.currentTarget.style.color = '#EDE9DF';
                                                e.currentTarget.style.boxShadow = 'none';
                                            },
                                            children: qIndex + 1 >= total ? 'VIEW RESULTS →' : 'NEXT QUESTION →'
                                        }, void 0, false, {
                                            fileName: "[project]/pages/quiz.js",
                                            lineNumber: 611,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 610,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 581,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 384,
                        columnNumber: 11
                    }, this),
                    phase === 'result' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 720,
                            margin: '0 auto',
                            padding: '80px 24px 120px',
                            textAlign: 'center',
                            opacity: visible ? 1 : 0,
                            transition: 'opacity 0.8s ease'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 9,
                                    letterSpacing: 8,
                                    color: '#F0A000',
                                    textTransform: 'uppercase',
                                    marginBottom: 28
                                },
                                children: "// TRANSMISSION RECEIVED — MISSION DEBRIEF //"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 652,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(240,160,0,0.15)',
                                    padding: '52px 48px',
                                    position: 'relative',
                                    marginBottom: 36,
                                    overflow: 'hidden'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 2,
                                            background: 'linear-gradient(90deg, transparent, #F0A000, transparent)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 669,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: 'clamp(80px, 18vw, 140px)',
                                            lineHeight: 1,
                                            color: '#EDE9DF',
                                            textShadow: '0 0 80px rgba(240,150,0,0.3)'
                                        },
                                        children: [
                                            score,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '0.35em',
                                                    color: '#7A5000',
                                                    verticalAlign: 'middle'
                                                },
                                                children: [
                                                    "/",
                                                    total
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 681,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: 'clamp(28px, 5vw, 52px)',
                                            letterSpacing: 8,
                                            color: '#F0A000',
                                            margin: '12px 0 20px',
                                            textShadow: '0 0 30px rgba(240,160,0,0.35)'
                                        },
                                        children: rank.title
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 688,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 60,
                                            height: 1,
                                            background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.4), transparent)',
                                            margin: '0 auto 24px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 698,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontStyle: 'italic',
                                            fontWeight: 300,
                                            fontSize: 18,
                                            lineHeight: 1.7,
                                            color: '#7A7A92'
                                        },
                                        children: rank.desc
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 704,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            bottom: -20,
                                            right: 20,
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: 180,
                                            color: 'rgba(255,255,255,0.018)',
                                            lineHeight: 1,
                                            userSelect: 'none',
                                            pointerEvents: 'none'
                                        },
                                        children: score
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 713,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 661,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(10, 1fr)',
                                    gap: 6,
                                    marginBottom: 48
                                },
                                children: answers.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        title: `Q${i + 1}`,
                                        style: {
                                            height: 6,
                                            background: a.correct ? '#F0A000' : 'rgba(200,50,50,0.55)',
                                            boxShadow: a.correct ? '0 0 8px rgba(240,160,0,0.5)' : 'none'
                                        }
                                    }, i, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 729,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 724,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'rgba(0,0,14,0.9)',
                                    border: '1px solid rgba(240,160,0,0.1)',
                                    padding: '36px 40px',
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 9,
                                            letterSpacing: 5,
                                            color: '#7A5000',
                                            textTransform: 'uppercase',
                                            marginBottom: 20
                                        },
                                        children: "◈ Register Your Name — Mission Archive"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 744,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        maxLength: 22,
                                        placeholder: "ENTER CALLSIGN...",
                                        value: nameInput,
                                        onChange: (e)=>setNameInput(e.target.value),
                                        style: {
                                            width: '100%',
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid rgba(240,160,0,0.25)',
                                            color: '#EDE9DF',
                                            padding: '10px 4px',
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 14,
                                            letterSpacing: 6,
                                            textTransform: 'uppercase',
                                            outline: 'none',
                                            marginBottom: 28,
                                            caretColor: '#F0A000'
                                        },
                                        onFocus: (e)=>{
                                            e.target.style.borderBottomColor = '#F0A000';
                                        },
                                        onBlur: (e)=>{
                                            e.target.style.borderBottomColor = 'rgba(240,160,0,0.25)';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 752,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 12,
                                            justifyContent: 'center',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleSubmitScore,
                                                style: {
                                                    background: 'transparent',
                                                    border: '1px solid rgba(240,160,0,0.55)',
                                                    color: '#EDE9DF',
                                                    padding: '14px 44px',
                                                    fontFamily: "'Space Mono', monospace",
                                                    fontSize: 10,
                                                    letterSpacing: 4,
                                                    textTransform: 'uppercase',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.borderColor = '#F0A000';
                                                    e.currentTarget.style.color = '#F0A000';
                                                    e.currentTarget.style.boxShadow = '0 0 24px rgba(240,160,0,0.18)';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                                                    e.currentTarget.style.color = '#EDE9DF';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                },
                                                children: "SUBMIT TO ARCHIVE →"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 773,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleRestart,
                                                style: {
                                                    background: 'transparent',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    color: '#7A7A92',
                                                    padding: '14px 36px',
                                                    fontFamily: "'Space Mono', monospace",
                                                    fontSize: 10,
                                                    letterSpacing: 4,
                                                    textTransform: 'uppercase',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                                    e.currentTarget.style.color = '#EDE9DF';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                    e.currentTarget.style.color = '#7A7A92';
                                                },
                                                children: "RETRY MISSION"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 799,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 772,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 644,
                        columnNumber: 11
                    }, this),
                    phase === 'leaderboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 780,
                            margin: '0 auto',
                            padding: '80px 24px 140px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    marginBottom: 64
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 9,
                                            letterSpacing: 8,
                                            color: '#F0A000',
                                            textTransform: 'uppercase',
                                            marginBottom: 24,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'inline-block',
                                                    width: 24,
                                                    height: 1,
                                                    background: '#F0A000'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 841,
                                                columnNumber: 17
                                            }, this),
                                            "Mission Archive",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'inline-block',
                                                    width: 24,
                                                    height: 1,
                                                    background: '#F0A000'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/quiz.js",
                                                lineNumber: 843,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 835,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: 'clamp(52px, 9vw, 100px)',
                                            letterSpacing: 10,
                                            color: '#EDE9DF',
                                            marginBottom: 12
                                        },
                                        children: "LEADERBOARD"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 845,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontStyle: 'italic',
                                            fontSize: 18,
                                            color: '#7A7A92'
                                        },
                                        children: "Those who dared to answer the stars"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 853,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 834,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 1,
                                    background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.35), transparent)',
                                    marginBottom: 8,
                                    boxShadow: '0 0 18px rgba(240,160,0,0.2)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 862,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '60px 1fr auto auto',
                                    padding: '12px 28px',
                                    gap: 16,
                                    alignItems: 'center'
                                },
                                children: [
                                    'RANK',
                                    'CALLSIGN',
                                    'SCORE',
                                    'TITLE'
                                ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 8,
                                            letterSpacing: 4,
                                            color: '#7A5000',
                                            textTransform: 'uppercase'
                                        },
                                        children: h
                                    }, h, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 876,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 870,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 1,
                                    background: 'rgba(240,160,0,0.08)',
                                    marginBottom: 4
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 886,
                                columnNumber: 13
                            }, this),
                            leaderboard.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '60px 24px',
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontStyle: 'italic',
                                    fontSize: 18,
                                    color: 'rgba(122,122,146,0.5)'
                                },
                                children: "No records yet — be the first to claim the stars."
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 894,
                                columnNumber: 15
                            }, this) : leaderboard.map((entry, i)=>{
                                const entryRank = getRank(entry.score);
                                const isTop3 = i < 3;
                                const isUser = entry.name === (nameInput.trim().toUpperCase() || '');
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: '60px 1fr auto auto',
                                        padding: '18px 28px',
                                        gap: 16,
                                        alignItems: 'center',
                                        background: isUser ? 'rgba(240,160,0,0.04)' : i % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent',
                                        border: isUser ? '1px solid rgba(240,160,0,0.15)' : '1px solid transparent',
                                        borderLeft: isTop3 ? `2px solid ${[
                                            '#F0A000',
                                            'rgba(200,160,60,0.7)',
                                            'rgba(160,120,40,0.5)'
                                        ][i]}` : '2px solid transparent',
                                        marginBottom: 2,
                                        transition: 'all 0.3s'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Bebas Neue', sans-serif",
                                                fontSize: isTop3 ? 28 : 20,
                                                color: isTop3 ? [
                                                    '#F0A000',
                                                    'rgba(220,180,70,0.85)',
                                                    'rgba(160,120,50,0.7)'
                                                ][i] : 'rgba(122,122,146,0.4)',
                                                lineHeight: 1
                                            },
                                            children: String(i + 1).padStart(2, '0')
                                        }, void 0, false, {
                                            fileName: "[project]/pages/quiz.js",
                                            lineNumber: 927,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Space Mono', monospace",
                                                fontSize: 13,
                                                letterSpacing: 4,
                                                color: isUser ? '#F0A000' : isTop3 ? '#EDE9DF' : '#7A7A92',
                                                textTransform: 'uppercase'
                                            },
                                            children: entry.name
                                        }, void 0, false, {
                                            fileName: "[project]/pages/quiz.js",
                                            lineNumber: 939,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Bebas Neue', sans-serif",
                                                fontSize: 32,
                                                color: '#EDE9DF',
                                                lineHeight: 1
                                            },
                                            children: [
                                                entry.score,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 14,
                                                        color: '#7A5000'
                                                    },
                                                    children: [
                                                        "/",
                                                        total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/quiz.js",
                                                    lineNumber: 953,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/quiz.js",
                                            lineNumber: 949,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Space Mono', monospace",
                                                fontSize: 7,
                                                letterSpacing: 3,
                                                color: '#7A5000',
                                                textTransform: 'uppercase',
                                                textAlign: 'right',
                                                maxWidth: 120,
                                                lineHeight: 1.5
                                            },
                                            children: entryRank.title
                                        }, void 0, false, {
                                            fileName: "[project]/pages/quiz.js",
                                            lineNumber: 957,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/pages/quiz.js",
                                    lineNumber: 907,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 1,
                                    background: 'rgba(240,160,0,0.08)',
                                    marginTop: 4,
                                    marginBottom: 60
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 971,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 14,
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: handleRestart,
                                        style: {
                                            background: 'transparent',
                                            border: '1px solid rgba(240,160,0,0.55)',
                                            color: '#EDE9DF',
                                            padding: '14px 44px',
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: 4,
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.borderColor = '#F0A000';
                                            e.currentTarget.style.color = '#F0A000';
                                            e.currentTarget.style.boxShadow = '0 0 24px rgba(240,160,0,0.18)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                                            e.currentTarget.style.color = '#EDE9DF';
                                            e.currentTarget.style.boxShadow = 'none';
                                        },
                                        children: "NEW MISSION →"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 979,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/",
                                        style: {
                                            background: 'transparent',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#7A7A92',
                                            padding: '14px 36px',
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: 4,
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            display: 'inline-block',
                                            transition: 'all 0.3s'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                            e.currentTarget.style.color = '#EDE9DF';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.color = '#7A7A92';
                                        },
                                        children: "← RETURN HOME"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 1004,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 978,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 829,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                style: {
                    position: 'relative',
                    zIndex: 2,
                    background: '#000',
                    borderTop: '1px solid rgba(240,160,0,0.08)',
                    padding: '40px 64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: 20,
                                    letterSpacing: 7,
                                    color: '#EDE9DF'
                                },
                                children: [
                                    "INTER",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#F0A000'
                                        },
                                        children: "✦"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/quiz.js",
                                        lineNumber: 1047,
                                        columnNumber: 18
                                    }, this),
                                    "STELLAR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 1043,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontStyle: 'italic',
                                    color: '#7A7A92',
                                    fontSize: 13,
                                    marginTop: 6
                                },
                                children: "We are explorers, born of starlight"
                            }, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 1049,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 1042,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 9,
                            letterSpacing: 2,
                            color: 'rgba(237,233,223,0.4)',
                            lineHeight: 2,
                            textAlign: 'right'
                        },
                        children: [
                            "MMXXVII — MISSION LAZARUS",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 1062,
                                columnNumber: 36
                            }, this),
                            "SECTOR: GARGANTUA SYSTEM",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/pages/quiz.js",
                                lineNumber: 1063,
                                columnNumber: 35
                            }, this),
                            "QUIZ MODULE: ACTIVE"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/quiz.js",
                        lineNumber: 1056,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 1034,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: `
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background: #000; overflow-x: hidden; cursor: default; }

        @keyframes fadeUpIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }

        button:focus { outline: none; }
        input::placeholder { color: rgba(122,122,146,0.45); letter-spacing: 5px; }

        @media (max-width: 720px) {
          nav { padding: 16px 20px !important; }
          .quiz-options-grid { grid-template-columns: 1fr !important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/pages/quiz.js",
                lineNumber: 1069,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0q3cq.g._.js.map