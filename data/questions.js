// data/questions.js
// Interstellar Quiz — Mission Lazarus Intelligence Test

const QUESTIONS = [
  {
    id: 1,
    category: "COSMOLOGY",
    text: "What is the name of the black hole that anchors the alien solar system in Interstellar?",
    options: ["Sagittarius A*", "Gargantua", "Andromeda Prime", "Messier 87"],
    correct: 1,
    fact: "Gargantua was rendered with scientific accuracy, leading to new astrophysical discoveries about gravitational lensing."
  },
  {
    id: 2,
    category: "TEMPORAL PHYSICS",
    text: "On Miller's Planet, one hour equals how many years on Earth due to gravitational time dilation?",
    options: ["23 years", "100 years", "7 years", "47 years"],
    correct: 2,
    fact: "This extreme time dilation is caused by Miller's Planet orbiting incredibly close to Gargantua's event horizon."
  },
  {
    id: 3,
    category: "MISSION DATA",
    text: "What is the name of the spacecraft that carries the crew through the wormhole?",
    options: ["Discovery One", "Prometheus", "Endurance", "Nostromo"],
    correct: 2,
    fact: "The Endurance's ring design allowed for centrifugal artificial gravity. Its modular structure enabled selective jettisoning."
  },
  {
    id: 4,
    category: "NAVIGATION",
    text: "Near which planet in our solar system was the wormhole discovered?",
    options: ["Jupiter", "Neptune", "Uranus", "Saturn"],
    correct: 3,
    fact: "The wormhole appeared near Saturn's rings 48 years before the mission — placed there by a mysterious intelligence."
  },
  {
    id: 5,
    category: "CREW MANIFEST",
    text: "Who portrays Commander Cooper, the former NASA pilot who leads the mission?",
    options: ["Matt Damon", "Michael Caine", "Casey Affleck", "Matthew McConaughey"],
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
    options: ["100%", "85%", "90%", "75%"],
    correct: 3,
    fact: "Cooper sets TARS to 90% honesty, noting that 100% honesty isn't always the most diplomatic or useful approach."
  },
  {
    id: 8,
    category: "ASTROPHYSICS",
    text: "What theoretical construct does Cooper navigate through in the film's climax?",
    options: ["A wormhole", "A neutron star", "A tesseract", "A quantum singularity"],
    correct: 2,
    fact: "The five-dimensional tesseract was constructed by future humans who had mastered manipulation of spacetime itself."
  },
  {
    id: 9,
    category: "MISSION HISTORY",
    text: "Which scientist's last name is shared by three of the candidate planets in the mission?",
    options: ["Lazarus", "Mann", "Brand", "Cooper"],
    correct: 1,
    fact: "Dr. Mann's planet appeared most promising on telemetry — but the data he transmitted was falsified to ensure rescue."
  },
  {
    id: 10,
    category: "DIRECTION",
    text: "Who directed Interstellar, released in 2014?",
    options: ["Denis Villeneuve", "Steven Spielberg", "James Cameron", "Christopher Nolan"],
    correct: 3,
    fact: "Nolan worked with physicist Kip Thorne as executive producer, ensuring the black hole depiction was scientifically grounded."
  }
];

export const RANK_TIERS = [
  { min: 0,  max: 3,  title: "Earth-Bound",        desc: "Your knowledge remains tethered to the home planet. The cosmos awaits." },
  { min: 4,  max: 6,  title: "Rookie Astronaut",    desc: "You've crossed the threshold. The mission has only just begun." },
  { min: 7,  max: 8,  title: "Mission Specialist",  desc: "Your grasp of spacetime is formidable. Gargantua calls to you." },
  { min: 9,  max: 9,  title: "Commander Cooper",    desc: "You navigate the cosmos like a seasoned pilot. Love defies gravity." },
  { min: 10, max: 10, title: "Transcended Time",    desc: "You exist beyond the fifth dimension. They chose well." }
];

export default QUESTIONS;
