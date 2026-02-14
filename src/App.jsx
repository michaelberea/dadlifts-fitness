import { useState, useEffect } from "react";

// ============================================================
// DADLIFTS — The World Needs Strong Dads
// GREEN / CREAM PALETTE VERSION
// ============================================================

const PROGRAM = {
  name: "The Dad Strength Starter",
  tagline: "The world needs strong dads.",
  description:
    "A simple 3-day program built around the barbell movements that build real strength. Squat, press, pull, hinge — the lifts that matter. Designed for dads who are done overthinking and ready to start.",
  schedule: "3 days per week — at least one rest day between sessions.",
  example: "Monday / Wednesday / Friday or Tuesday / Thursday / Saturday",
  progression: {
    main: "Add 5 lbs to main lifts (3×5) each session you complete all reps. Squat and deadlift can jump 10 lbs early on.",
    accessory:
      "When you hit all reps across all sets on accessories, add 5 lbs next session.",
    stall:
      "Miss your reps? Repeat the same weight next time. Miss it twice? Drop 10% and build back up. No ego. Just progress.",
  },
};

const WORKOUTS = {
  fullGym: [
    {
      id: "A",
      name: "Day A",
      subtitle: "Lower Body — Squat Focus",
      focus: "squat",
      exercises: [
        { name: "Barbell Back Squat", sets: 3, reps: "5", rest: "2-3 min", primary: true, tip: "Feet shoulder-width. Chest up. Break at the hips and knees together. Hit parallel — thighs at least parallel to the floor. Drive through your whole foot.", mistakes: "Don't let your knees cave in. Don't lean too far forward. Don't cut depth short — half squats build half strength." },
        { name: "Romanian Deadlift", sets: 3, reps: "8", rest: "90 sec", primary: false, tip: "Slight knee bend, push your hips back like you're closing a car door with your butt. Feel the stretch in your hamstrings. Bar stays close to your legs.", mistakes: "This isn't a regular deadlift — don't bend your knees too much. Don't round your back. If you can't feel your hamstrings, you're doing it wrong." },
        { name: "Walking Lunges", sets: 2, reps: "10/leg", rest: "90 sec", primary: false, tip: "Long stride, lower your back knee toward the floor. Keep your torso upright. Dumbbells at your sides or a barbell on your back.", mistakes: "Don't let your front knee shoot way past your toes. Don't rush — control each rep." },
        { name: "Farmer's Carry", sets: 3, reps: "40 yards", rest: "60 sec", primary: false, tip: "Grab the heaviest dumbbells you can handle. Stand tall, shoulders back, walk with purpose. You've been training for this every grocery trip — now do it on purpose.", mistakes: "Don't slouch. Don't let the weights pull your shoulders forward. Short, controlled steps." },
      ],
    },
    {
      id: "B",
      name: "Day B",
      subtitle: "Upper Body — Press Focus",
      focus: "press",
      exercises: [
        { name: "Barbell Bench Press", sets: 3, reps: "5", rest: "2-3 min", primary: true, tip: "Plant your feet. Squeeze your shoulder blades together like you're pinching a pencil. Lower the bar to mid-chest, press straight up. Full lockout at the top.", mistakes: "Don't bounce the bar off your chest. Don't flare your elbows out to 90° — keep them at about 45°. Always use a spotter or safety bars for heavy sets." },
        { name: "Overhead Press", sets: 3, reps: "8", rest: "90 sec", primary: false, tip: "Bar starts at your collarbone. Brace your core like someone's about to poke you in the stomach. Press straight up, move your head through once the bar passes. Lock out overhead.", mistakes: "Don't lean back excessively — that turns it into an incline bench. Don't use your legs (that's a push press, different exercise). If the weight won't go up strict, it's too heavy." },
        { name: "Barbell Row", sets: 3, reps: "8", rest: "90 sec", primary: false, tip: "Hinge forward about 45°, pull the bar to your lower chest. Squeeze your shoulder blades at the top. Control it on the way down.", mistakes: "Don't jerk the weight up with your whole body. Don't stand too upright — you need to be hinged forward for this to work. If you're using momentum, go lighter." },
        { name: "Plank", sets: 3, reps: "30-45 sec", rest: "60 sec", primary: false, tip: "Forearms on the floor, body in a straight line from head to heels. Squeeze everything — glutes, core, quads. Breathe. This protects your back for everything else you do.", mistakes: "Don't let your hips sag — that's your lower back taking the load. Don't pike your hips up either. If you're shaking, that means it's working." },
      ],
    },
    {
      id: "C",
      name: "Day C",
      subtitle: "Full Body — Deadlift Focus",
      focus: "deadlift",
      exercises: [
        { name: "Barbell Deadlift", sets: 3, reps: "5", rest: "2-3 min", primary: true, tip: "Bar over mid-foot. Hips back, chest up, grip just outside your knees. Push the floor away. The bar drags up your legs. Lock out with your hips, not by leaning back.", mistakes: "Don't round your lower back — ever. Don't yank the bar. Take the slack out first, then drive. If your lower back rounds, the weight is too heavy. Check your ego." },
        { name: "Barbell Back Squat (Light)", sets: 3, reps: "8", rest: "90 sec", primary: false, tip: "Same squat as Day A but lighter weight, more reps. Focus on smooth, controlled reps. This is about building the movement pattern, not testing your max.", mistakes: "Don't go heavy here — this is a skill day for squats. If you're grinding reps, drop the weight." },
        { name: "Pull-ups or Lat Pulldown", sets: 3, reps: "6-8", rest: "90 sec", primary: false, tip: "Pull-ups: dead hang, pull your chest to the bar. Can't do a pull-up yet? That's fine — use the lat pulldown machine or do band-assisted pull-ups. No shame in starting where you are.", mistakes: "Don't kip or swing. Don't do half reps. Full extension at the bottom, chin over bar at the top. Quality over quantity." },
        { name: "Dumbbell Curl + Tricep Pushdown", sets: 2, reps: "10 each", rest: "60 sec", primary: false, tip: "Superset these — curls first, then immediately tricep pushdowns. Yes, arm work is in here. You deserve to look good too. Control the weight, squeeze at the top of curls and bottom of pushdowns.", mistakes: "Don't swing the dumbbells on curls — if your whole body is rocking, go lighter. These are the dessert, not the main course." },
      ],
    },
  ],
  dumbbellBench: [
    {
      id: "A",
      name: "Day A",
      subtitle: "Lower Body — Squat Focus",
      focus: "squat",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "5", rest: "2-3 min", primary: true, tip: "Hold a dumbbell vertically at your chest. Elbows between your knees at the bottom. This naturally teaches great squat form. Go as deep as you can with a flat back.", mistakes: "Don't let the dumbbell pull you forward. Keep it tight to your chest. Drive your elbows between your knees to open up your hips." },
        { name: "Single-Leg DB Romanian Deadlift", sets: 3, reps: "8/leg", rest: "90 sec", primary: false, tip: "Dumbbell in the opposite hand of your standing leg. Hinge forward, free leg goes straight back. Touch the dumbbell toward the floor, squeeze your glute to come back up.", mistakes: "Don't twist your hips open — keep them square. Use a wall or rack for balance if needed. It's okay to start with no weight." },
        { name: "Walking Lunges", sets: 2, reps: "10/leg", rest: "90 sec", primary: false, tip: "Dumbbells at your sides. Long stride, back knee toward the floor. Same movement, same rules.", mistakes: "Same as the barbell version — control each rep, don't rush." },
        { name: "Farmer's Carry", sets: 3, reps: "40 yards", rest: "60 sec", primary: false, tip: "This is actually easier to set up with dumbbells. Grab the heaviest ones you can, stand tall, walk. This is your exercise.", mistakes: "Shoulders back and down. Don't shuffle — walk with purpose." },
      ],
    },
    {
      id: "B",
      name: "Day B",
      subtitle: "Upper Body — Press Focus",
      focus: "press",
      exercises: [
        { name: "Dumbbell Bench Press", sets: 3, reps: "5", rest: "2-3 min", primary: true, tip: "Dumbbells give you a bigger range of motion than a barbell. Lower them to the sides of your chest, press up and slightly in. Squeeze at the top.", mistakes: "Don't let the dumbbells drift too wide at the bottom. Keep your shoulder blades pinched the whole time." },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "8", rest: "90 sec", primary: false, tip: "Seated or standing. Start at shoulder height, press straight up. Dumbbells can touch lightly at the top. Control the descent.", mistakes: "Don't arch your back excessively. If you have to lean way back, the weight is too heavy." },
        { name: "Dumbbell Row", sets: 3, reps: "8/arm", rest: "90 sec", primary: false, tip: "One knee and hand on the bench, other hand rows the dumbbell. Pull to your hip, not your armpit. Squeeze your back at the top.", mistakes: "Don't rotate your torso to get the weight up. If you're twisting, go lighter. This is a back exercise, not a core twist." },
        { name: "Plank", sets: 3, reps: "30-45 sec", rest: "60 sec", primary: false, tip: "Same as the barbell version. No equipment needed. Just you and the floor and your willpower.", mistakes: "Hips level. Breathe. Don't look at the clock." },
      ],
    },
    {
      id: "C",
      name: "Day C",
      subtitle: "Full Body — Hinge Focus",
      focus: "deadlift",
      exercises: [
        { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "5", rest: "2-3 min", primary: true, tip: "Two dumbbells, slight knee bend, hinge at the hips. Dumbbells slide down the front of your legs. Feel the stretch, drive your hips forward to stand. This is your primary hinge without a barbell.", mistakes: "Don't round your back. Push your hips back, not down. You should feel this in your hamstrings and glutes, not your lower back." },
        { name: "Dumbbell Split Squat", sets: 3, reps: "8/leg", rest: "90 sec", primary: false, tip: "Staggered stance, back foot elevated on bench if possible (Bulgarian split squat). Dumbbells at your sides. Lower until your back knee nearly touches the floor.", mistakes: "Don't lean forward. Stay upright. The burn is supposed to be there." },
        { name: "Dumbbell Pullover", sets: 3, reps: "6-8", rest: "90 sec", primary: false, tip: "Lie across a bench, one heavy dumbbell held with both hands overhead. Lower it behind your head in an arc, feeling the stretch in your lats. Pull it back over your chest.", mistakes: "Don't bend your elbows too much — keep them slightly bent throughout. Don't go so heavy that you lose control behind your head." },
        { name: "Dumbbell Curl + Tricep Kickback", sets: 2, reps: "10 each", rest: "60 sec", primary: false, tip: "Same idea as the barbell day — superset your arm work. Curls then kickbacks. Get a good squeeze and don't rush.", mistakes: "On kickbacks, keep your upper arm locked in place. Only your forearm moves. If your elbow is swinging, go lighter." },
      ],
    },
  ],
};

const EDUCATION = [
  { id: "why-compound", title: "Why Compound Lifts?", content: `You could spend an hour doing bicep curls, leg extensions, and cable crossovers. Or you could spend 45 minutes doing squats, bench press, and rows — and build more muscle, burn more calories, and get stronger everywhere that matters.\n\nCompound lifts work multiple joints and muscle groups at once. A squat isn't just a "leg exercise" — it trains your quads, hamstrings, glutes, core, and back all in one movement. A deadlift hits nearly every muscle in your body.\n\nFor dads with limited time (so, all dads), compound lifts give you the most return on your time investment. Period.\n\nThe five core movements in this program — squat, bench press, deadlift, overhead press, and row — cover every major movement pattern your body needs. Push, pull, hinge, squat, carry. That's the whole game.` },
  { id: "getting-started", title: "What Weight Do I Start With?", content: `Start lighter than you think you should. Seriously.\n\nYour goal for the first two weeks isn't to test your strength — it's to learn the movements. Here's a simple starting point:\n\nFor barbell exercises: Start with just the bar (45 lbs). If that's easy with good form, add 10 lbs per side next session. Keep going until the bar speed slows down. That's your working weight.\n\nFor dumbbell exercises: Start with 15-20 lb dumbbells. Same idea — if the form is good and it's easy, go up next time.\n\nFor bodyweight exercises (planks, pull-ups): Just do what you can. If you can't do a pull-up, use the lat pulldown or a band. No shame in that.\n\nThe first few weeks will feel easy. That's by design. You're building the habit, learning the form, and letting your joints catch up to your muscles. The weights get heavy fast once the linear progression kicks in.\n\nYour ego wants to load up the bar. Don't. The dads who make it past month three are the ones who started light.` },
  { id: "warmup", title: "How to Warm Up", content: `Don't skip this. You're not 22 anymore.\n\nA good warm-up takes 5-10 minutes and makes everything feel better. Here's the simple version:\n\nGeneral warm-up (3-5 minutes): Walk, jog lightly, ride a bike, jump rope — just get your heart rate up and blood flowing. Nothing fancy.\n\nMovement prep: Before your main lift, do 2-3 warm-up sets with lighter weight. For example, if you're squatting 135 lbs:\n- Set 1: Bar only (45 lbs) x 10 reps\n- Set 2: 95 lbs x 5 reps\n- Set 3: 115 lbs x 3 reps\n- Then your working sets at 135 lbs\n\nThe warm-up sets don't count toward your program. They're just getting your body ready and reinforcing good form before the weight gets challenging.\n\nSkip the 20-minute foam rolling routine. Skip the Instagram mobility circuit. Get warm, do your warm-up sets, and lift.` },
  { id: "progression", title: "How Progression Works", content: `This program uses linear progression — the simplest, most effective method for beginners.\n\nHere's how it works: Every time you complete all your sets and reps at a given weight, you add weight next session.\n\nMain lifts (3x5): Add 5 lbs per session. For squats and deadlifts, you can add 10 lbs per session in the early weeks when the weights are light.\n\nAccessories (3x8): Add 5 lbs when you hit all reps across all sets.\n\nThis means you're getting stronger every single workout. A dad starting with a 95 lb squat who trains three times a week could be squatting 185 lbs within three months. That's real.\n\nWhat happens when you stall: You will stall. It's not a matter of if. When you can't complete all your reps at a weight, try it again next session. If you miss it a second time, drop the weight by 10% and build back up. This is called a deload, and it works. You'll blow past your old stall point.\n\nDon't change the program because you stalled once. Trust the process.` },
  { id: "gym-etiquette", title: "Gym Etiquette", content: `Walking into a gym for the first time (or the first time in years) can feel awkward. Here are the unwritten rules so you don't have to learn them the hard way:\n\nRerack your weights. Always. Every time. This is the number one rule.\n\nDon't curl in the squat rack. The squat rack is for squats, overhead presses, and barbell rows. If you're doing curls, grab a barbell from somewhere else.\n\nYou can ask for a spot. Seriously. Walk up to someone between their sets and say "Hey, could you spot me on bench?" Nobody will say no. It's gym culture.\n\nWipe down equipment. Use the spray bottle and paper towels. Takes 10 seconds. Just do it.\n\nDon't give unsolicited advice. Even if someone's form is rough. They didn't ask. (Exception: if someone looks like they're about to seriously hurt themselves, a quick heads-up is okay.)\n\nIt's okay to not know things. Ask the front desk. Watch a YouTube video in the parking lot before you go in. Nobody expects you to know everything on day one.\n\nEveryone started somewhere. That jacked guy deadlifting 500 lbs? He once struggled with 135. You belong here.` },
  { id: "faq", title: "Common Questions", content: `"I only have 30 minutes. Can I still do this?"\nYes. Do your main lift and two accessories. Skip the last exercise if you're short on time. A shorter workout you actually do beats a perfect workout you skip.\n\n"How sore will I be?"\nThe first week? Very. It gets better fast. Soreness is not an indicator of a good workout — it just means your body isn't used to the movement yet. Don't skip your next session because you're sore. The best cure for soreness is movement.\n\n"Should I do cardio too?"\nIf you want to. This program doesn't include it, but a 20-30 minute walk on off days is great for recovery and your heart. Don't run yourself into the ground though — your body needs to recover from lifting.\n\n"What about diet?"\nEat enough protein (aim for 0.7-1g per pound of body weight) and eat enough food in general. You can't build muscle in a massive calorie deficit. Beyond that, don't overcomplicate it. Eat real food. Drink water. You know the basics.\n\n"I missed a day. Should I double up?"\nNo. Just pick up where you left off. If you missed Day B, do Day B next time you're in the gym. Don't try to cram two workouts together.\n\n"When will I see results?"\nYou'll feel different in 2 weeks. You'll see changes in 4-6 weeks. Other people will notice in 8-12 weeks. Stick with it.` },
];

// --- GREEN/CREAM PALETTE ---
const c = {
  bg: "#2B3A2B",
  bgLight: "#334433",
  bgCard: "#344634",
  bgCardHover: "#3B4F3B",
  bgAccent: "#2F402F",
  text: "#F2EDE3",
  textSecondary: "#B8B0A2",
  textMuted: "#7D7868",
  accent: "#F2EDE3",
  accentDim: "#D4CFC5",
  accentGlow: "rgba(242, 237, 227, 0.08)",
  success: "#8BC48B",
  successDim: "rgba(139, 196, 139, 0.15)",
  border: "#3D5040",
  borderLight: "#47594A",
  danger: "#D4705A",
  highlight: "#C8B87D",
};

// --- SVG ICONS ---
const Icons = {
  workout: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 4v16M18 4v16M6 12h12M3 8h3M3 16h3M18 8h3M18 16h3" />
    </svg>
  ),
  program: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  ),
  learn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  progress: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  chevDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  gym: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 4v16M18 4v16M6 12h12M3 8h3M3 16h3M18 8h3M18 16h3" />
    </svg>
  ),
  dumbbell: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14.4 14.4L9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 01-2.828 0l-.707-.707a2 2 0 010-2.828l3.535-3.536a2 2 0 012.829 0l.707.707a2 2 0 010 2.829l-3.536 3.535z" />
      <path d="M5.343 2.515a2 2 0 012.828 0l.707.707a2 2 0 010 2.828L5.343 9.586a2 2 0 01-2.829 0l-.707-.707a2 2 0 010-2.829L5.343 2.515z" />
    </svg>
  ),
};

function AboutFooter({ onShowLegal }) {
  return (
    <div style={{ padding: "32px 20px 24px", textAlign: "center", borderTop: `1px solid ${c.border}`, marginTop: "20px" }}>
      <div style={{ fontSize: "13px", fontWeight: 800, color: c.textMuted, letterSpacing: "0.12em", marginBottom: "6px" }}>DADLIFTS</div>
      <div style={{ fontSize: "12px", color: c.textMuted, lineHeight: 1.5, marginBottom: "4px", fontStyle: "italic" }}>The world needs strong dads.</div>
      <div style={{ fontSize: "11px", color: c.textMuted, opacity: 0.6, marginBottom: "12px" }}>Built for dads, by a dad.</div>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <button onClick={() => onShowLegal("privacy")} style={{ background: "none", border: "none", color: c.textMuted, fontSize: "11px", cursor: "pointer", opacity: 0.6, padding: 0 }}>Privacy Policy</button>
        <button onClick={() => onShowLegal("terms")} style={{ background: "none", border: "none", color: c.textMuted, fontSize: "11px", cursor: "pointer", opacity: 0.6, padding: 0 }}>Terms of Use</button>
      </div>
    </div>
  );
}

function NavBar({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: "today", label: "Workout", icon: Icons.workout },
    { id: "program", label: "Program", icon: Icons.program },
    { id: "learn", label: "Learn", icon: Icons.learn },
    { id: "progress", label: "Progress", icon: Icons.progress },
  ];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: c.bg, borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-around", padding: "6px 0 env(safe-area-inset-bottom, 8px)", zIndex: 100 }}>
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setCurrentTab(tab.id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 16px", cursor: "pointer", color: currentTab === tab.id ? c.accent : c.textMuted, transition: "color 0.2s" }}>
          {tab.icon}
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Header({ equipmentLevel, setShowEquipmentModal }) {
  return (
    <header style={{ padding: "14px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${c.border}` }}>
      <h1 style={{ fontSize: "18px", fontWeight: 800, color: c.accent, letterSpacing: "0.12em", margin: 0 }}>DADLIFTS</h1>
      <button onClick={() => setShowEquipmentModal(true)} style={{ background: c.bgAccent, border: `1px solid ${c.border}`, borderRadius: "8px", padding: "6px 12px", color: c.textSecondary, fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
        <span style={{ color: c.textMuted }}>{equipmentLevel === "fullGym" ? Icons.gym : Icons.dumbbell}</span>
        {equipmentLevel === "fullGym" ? "Full Gym" : "DB + Bench"}
        <span style={{ color: c.textMuted, display: "flex" }}>{Icons.chevDown}</span>
      </button>
    </header>
  );
}

function EquipmentModal({ equipmentLevel, setEquipmentLevel, onClose }) {
  const options = [
    { id: "fullGym", label: "Full Gym", icon: Icons.gym, desc: "Barbell, rack, bench — the works" },
    { id: "dumbbellBench", label: "Dumbbells + Bench", icon: Icons.dumbbell, desc: "Home gym or limited equipment" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: c.bgCard, borderRadius: "16px 16px 0 0", padding: "28px 20px 40px", width: "100%", maxWidth: "500px", borderTop: `1px solid ${c.borderLight}` }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: c.text, marginBottom: "4px" }}>Your Equipment</h3>
        <p style={{ fontSize: "13px", color: c.textSecondary, marginBottom: "20px" }}>Every exercise adapts to your setup.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {options.map((opt) => (
            <button key={opt.id} onClick={() => { setEquipmentLevel(opt.id); onClose(); }} style={{ background: equipmentLevel === opt.id ? c.accentGlow : c.bgAccent, border: `1.5px solid ${equipmentLevel === opt.id ? c.accent : c.border}`, borderRadius: "12px", padding: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", textAlign: "left", transition: "all 0.15s" }}>
              <span style={{ color: equipmentLevel === opt.id ? c.accent : c.textMuted }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: equipmentLevel === opt.id ? c.accent : c.text }}>{opt.label}</div>
                <div style={{ fontSize: "12px", color: c.textSecondary }}>{opt.desc}</div>
              </div>
              {equipmentLevel === opt.id && <span style={{ color: c.accent }}>{Icons.check}</span>}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "16px", textAlign: "center" }}>Bodyweight tier coming soon</p>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, isExpanded, onToggle }) {
  return (
    <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", overflow: "hidden" }}>
      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            {exercise.primary && (
              <span style={{ background: "rgba(200, 184, 125, 0.15)", color: c.highlight, fontSize: "9px", fontWeight: 800, padding: "2px 7px", borderRadius: "3px", letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid rgba(200, 184, 125, 0.25)` }}>MAIN</span>
            )}
            <h4 style={{ fontSize: "14px", fontWeight: 600, color: c.text, margin: 0 }}>{exercise.name}</h4>
          </div>
          <div style={{ fontSize: "13px", color: c.textSecondary, display: "flex", gap: "12px", marginTop: "5px" }}>
            <span><strong style={{ color: c.text, fontWeight: 600 }}>{exercise.sets} x {exercise.reps}</strong></span>
            <span style={{ color: c.textMuted }}>Rest: {exercise.rest}</span>
          </div>
        </div>
        <button onClick={onToggle} style={{ background: isExpanded ? "rgba(200, 184, 125, 0.1)" : c.bgAccent, border: `1px solid ${isExpanded ? "rgba(200, 184, 125, 0.3)" : c.border}`, borderRadius: "6px", padding: "7px 12px", color: isExpanded ? c.highlight : c.textSecondary, fontSize: "11px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
          {isExpanded ? "Hide" : "How To"}
        </button>
      </div>
      {isExpanded && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${c.border}`, paddingTop: "14px" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: c.highlight, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Form Tips</div>
            <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{exercise.tip}</p>
          </div>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: c.danger, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Common Mistakes</div>
            <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{exercise.mistakes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TodayScreen({ equipmentLevel, progress, setProgress }) {
  const workouts = WORKOUTS[equipmentLevel];
  const currentDayIndex = progress.currentDay;
  const workout = workouts[currentDayIndex];
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const currentWeek = Math.floor(progress.totalCompleted / 3) + 1;

  const completeWorkout = () => {
    const nextDay = (currentDayIndex + 1) % 3;
    const newProgress = { ...progress, currentDay: nextDay, totalCompleted: progress.totalCompleted + 1, history: [...progress.history, { day: workout.id, date: new Date().toISOString() }] };
    setProgress(newProgress);
    localStorage.setItem("dadlifts_progress_g", JSON.stringify(newProgress));
    setShowConfirm(false);
  };

  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", color: c.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
          Week {currentWeek} — Workout {(progress.totalCompleted % 3) + 1} of 3
        </div>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: c.text, margin: "0 0 2px", letterSpacing: "-0.02em" }}>{workout.name}</h2>
        <p style={{ fontSize: "14px", color: c.highlight, margin: 0, fontWeight: 600 }}>{workout.subtitle}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
        {workout.exercises.map((ex, i) => (
          <ExerciseCard key={i} exercise={ex} isExpanded={expandedExercise === i} onToggle={() => setExpandedExercise(expandedExercise === i ? null : i)} />
        ))}
      </div>
      <button onClick={() => setShowConfirm(true)} style={{ width: "100%", padding: "16px", background: c.accent, color: c.bg, border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Complete Workout
      </button>

      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowConfirm(false)}>
          <div style={{ background: c.bgCard, border: `1px solid ${c.borderLight}`, borderRadius: "14px", padding: "28px 24px", maxWidth: "340px", width: "100%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "17px", fontWeight: 700, color: c.text, marginBottom: "8px" }}>Workout done?</div>
            <div style={{ fontSize: "13px", color: c.textSecondary, marginBottom: "24px", lineHeight: 1.5 }}>
              This will mark {workout.name} as complete and move you to the next session.
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: "12px", background: c.bgAccent, border: `1px solid ${c.border}`, borderRadius: "8px", color: c.textSecondary, fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                Not Yet
              </button>
              <button onClick={completeWorkout} style={{ flex: 1, padding: "12px", background: c.accent, border: "none", borderRadius: "8px", color: c.bg, fontSize: "14px", fontWeight: 800, cursor: "pointer" }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgramScreen({ equipmentLevel, onShowLegal }) {
  const workouts = WORKOUTS[equipmentLevel];
  const [expandedDay, setExpandedDay] = useState(null);
  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: c.text, margin: "0 0 2px" }}>{PROGRAM.name}</h2>
        <p style={{ fontSize: "14px", color: c.highlight, margin: "0 0 14px", fontWeight: 600, fontStyle: "italic" }}>{PROGRAM.tagline}</p>
        <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: "0 0 16px" }}>{PROGRAM.description}</p>
        <div style={{ background: c.bgAccent, borderRadius: "8px", padding: "12px 14px", border: `1px solid ${c.border}` }}>
          <div style={{ fontSize: "10px", color: c.textMuted, marginBottom: "4px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Schedule</div>
          <div style={{ fontSize: "13px", color: c.text }}>{PROGRAM.schedule}</div>
          <div style={{ fontSize: "12px", color: c.textSecondary, marginTop: "2px" }}>{PROGRAM.example}</div>
        </div>
      </div>
      <div style={{ fontSize: "10px", fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>The Workouts</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
        {workouts.map((workout, wi) => (
          <div key={wi} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", overflow: "hidden" }}>
            <button onClick={() => setExpandedDay(expandedDay === wi ? null : wi)} style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: c.text }}>{workout.name}</div>
                <div style={{ fontSize: "12px", color: c.textSecondary, marginTop: "2px" }}>{workout.subtitle}</div>
              </div>
              <span style={{ color: c.textMuted, transform: expandedDay === wi ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "flex" }}>{Icons.chevDown}</span>
            </button>
            {expandedDay === wi && (
              <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${c.border}` }}>
                {workout.exercises.map((ex, ei) => (
                  <div key={ei} style={{ padding: "10px 0", borderBottom: ei < workout.exercises.length - 1 ? `1px solid ${c.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {ex.primary && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.highlight, flexShrink: 0 }} />}
                      <span style={{ fontSize: "13px", color: c.text, fontWeight: ex.primary ? 600 : 400 }}>{ex.name}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: c.textSecondary }}>{ex.sets} x {ex.reps}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: "10px", fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Progression</div>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {Object.entries(PROGRAM.progression).map(([key, val]) => (
          <div key={key}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: c.highlight, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
              {key === "main" ? "Main Lifts" : key === "accessory" ? "Accessories" : "When You Stall"}
            </div>
            <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{val}</p>
          </div>
        ))}
      </div>
      <AboutFooter onShowLegal={onShowLegal} />
    </div>
  );
}

function LearnScreen({ onShowLegal }) {
  const [expandedArticle, setExpandedArticle] = useState(null);
  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: c.text, margin: "0 0 4px" }}>Learn</h2>
        <p style={{ fontSize: "13px", color: c.textSecondary, margin: 0 }}>Everything you need to know. No more, no less.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {EDUCATION.map((article, idx) => (
          <div key={article.id} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", overflow: "hidden" }}>
            <button onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)} style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: c.textMuted, minWidth: "20px" }}>{String(idx + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: c.text, flex: 1 }}>{article.title}</span>
              <span style={{ color: c.textMuted, transform: expandedArticle === article.id ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "flex" }}>{Icons.chevDown}</span>
            </button>
            {expandedArticle === article.id && (
              <div style={{ padding: "0 16px 20px 48px", borderTop: `1px solid ${c.border}`, paddingTop: "16px" }}>
                <div style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.7, whiteSpace: "pre-line" }}>{article.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <AboutFooter onShowLegal={onShowLegal} />
    </div>
  );
}

function ProgressScreen({ progress, onShowLegal }) {
  const currentWeek = Math.floor(progress.totalCompleted / 3) + 1;
  const workoutsThisWeek = progress.totalCompleted % 3;
  const getLast7Days = () => {
    const days = [];
    const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const didWorkout = progress.history.some((h) => h.date.split("T")[0] === dateStr);
      days.push({ label: dayLabels[d.getDay()], date: d.getDate(), completed: didWorkout, isToday: i === 0 });
    }
    return days;
  };
  const streak = (() => {
    if (progress.history.length === 0) return 0;
    const weekSet = new Set();
    progress.history.forEach((h) => {
      const d = new Date(h.date);
      const weekKey = `${d.getFullYear()}-${Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))}`;
      weekSet.add(weekKey);
    });
    return weekSet.size;
  })();

  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: c.text, margin: "0 0 4px" }}>Your Progress</h2>
        <p style={{ fontSize: "13px", color: c.textSecondary, margin: 0 }}>Consistency beats perfection. Every time.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
        {[
          { label: "Workouts", value: progress.totalCompleted },
          { label: "Week", value: currentWeek },
          { label: "Streak", value: streak },
        ].map((stat, i) => (
          <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", padding: "16px 10px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 800, color: c.accent, marginBottom: "2px", letterSpacing: "-0.02em" }}>{stat.value}</div>
            <div style={{ fontSize: "9px", fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>This Week</div>
        <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: "6px", borderRadius: "3px", background: i < workoutsThisWeek ? c.accent : c.bgAccent, border: i >= workoutsThisWeek ? `1px solid ${c.border}` : "none" }} />
          ))}
        </div>
        <div style={{ fontSize: "13px", color: c.textSecondary }}>
          {workoutsThisWeek === 3 ? "Week complete. Rest up — you earned it." : `${workoutsThisWeek}/3 done. ${3 - workoutsThisWeek} to go.`}
        </div>
      </div>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Last 7 Days</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
          {getLast7Days().map((day, i) => (
            <div key={i}>
              <div style={{ fontSize: "10px", color: c.textMuted, marginBottom: "6px", fontWeight: 600 }}>{day.label}</div>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: day.completed ? c.accent : "transparent", border: day.isToday && !day.completed ? `1.5px solid ${c.textMuted}` : day.completed ? "none" : `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: "11px", fontWeight: 600, color: day.completed ? c.bg : c.textMuted }}>
                {day.completed ? <span style={{ display: "flex" }}>{Icons.check}</span> : day.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      {progress.totalCompleted === 0 && (
        <div style={{ background: c.bgAccent, border: `1px solid ${c.border}`, borderRadius: "10px", padding: "24px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: c.text, marginBottom: "6px" }}>The starting line</div>
          <div style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.5 }}>Your first workout is waiting. Head to the Workout tab and get started. The world needs strong dads — starting with you.</div>
        </div>
      )}
      {progress.totalCompleted > 0 && progress.totalCompleted < 12 && (
        <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.7 }}>
            You'll feel different in 2 weeks. You'll see changes in 4-6 weeks. Other people will notice in 8-12 weeks.
            <span style={{ display: "block", marginTop: "8px", color: c.text, fontWeight: 600 }}>Stick with it.</span>
          </div>
        </div>
      )}
      <AboutFooter onShowLegal={onShowLegal} />
    </div>
  );
}

function LegalScreen({ page, onBack }) {
  const content = page === "privacy" ? {
    title: "Privacy Policy",
    lastUpdated: "February 2026",
    sections: [
      { heading: "The short version", body: "DadLifts doesn't collect your data. Everything stays on your device." },
      { heading: "What we store", body: "Your workout progress and equipment preference are saved in your browser's local storage. This data never leaves your device — we don't have servers, accounts, or databases storing your information." },
      { heading: "Analytics & tracking", body: "We don't use analytics, cookies, or tracking scripts. No third parties are watching your workout habits." },
      { heading: "Third-party services", body: "We load the Inter font from Google Fonts. Google may log standard web request data (IP address, browser type) when this font is loaded. That's the only external service we use." },
      { heading: "Contact", body: "Questions? Reach out at dadlifts.fitness." },
    ],
  } : {
    title: "Terms of Use",
    lastUpdated: "February 2026",
    sections: [
      { heading: "Not medical advice", body: "DadLifts provides general fitness information, not medical advice. This program is for educational purposes. Consult your doctor before starting any exercise program, especially if you have existing health conditions or injuries." },
      { heading: "Use at your own risk", body: "Strength training carries inherent risk of injury. You are solely responsible for your safety. Start with light weights, learn proper form, and listen to your body. If something hurts, stop." },
      { heading: "No guarantees", body: "Results vary. We don't guarantee any specific outcomes. Consistency, nutrition, recovery, and individual factors all affect progress." },
      { heading: "The program", body: "DadLifts is provided free of charge, as-is, with no warranty. We may update or modify the program at any time." },
      { heading: "That's it", body: "Be smart. Lift safely. Take care of yourself so you can take care of your family." },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, padding: "0 0 60px" }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: c.textSecondary, fontSize: "14px", cursor: "pointer", padding: "4px 0", fontWeight: 600 }}>← Back</button>
      </div>
      <div style={{ padding: "28px 24px", maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: c.text, margin: "0 0 6px" }}>{content.title}</h2>
        <p style={{ fontSize: "11px", color: c.textMuted, margin: "0 0 28px" }}>Last updated: {content.lastUpdated}</p>
        {content.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: "22px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: c.text, margin: "0 0 6px" }}>{s.heading}</h3>
            <p style={{ fontSize: "13px", color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WelcomeScreen({ onStart, onShowLegal }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center", background: c.bg }}>
      <div style={{ width: "40px", height: "3px", background: c.accent, borderRadius: "2px", marginBottom: "40px" }} />
      <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.25em", color: c.textMuted, textTransform: "uppercase", marginBottom: "32px" }}>DADLIFTS</div>
      <h1 style={{ fontSize: "32px", fontWeight: 800, color: c.text, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.03em", maxWidth: "300px" }}>
        The world needs strong dads.
      </h1>
      <p style={{ fontSize: "15px", color: c.textSecondary, lineHeight: 1.6, maxWidth: "300px", margin: "0 0 12px" }}>
        One program. Compound lifts. Built for dads who are done overthinking and ready to get strong.
      </p>
      <p style={{ fontSize: "13px", color: c.textMuted, maxWidth: "280px", margin: "0 0 40px", lineHeight: 1.5 }}>
        No complicated routines. No fitness influencer nonsense. Just the barbell movements that build real strength — programmed for your schedule.
      </p>
      <button onClick={onStart} style={{ padding: "16px 52px", background: c.accent, color: c.bg, border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Start the Program
      </button>
      <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "14px" }}>Free. No account needed.</p>
      <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
        <button onClick={() => onShowLegal("privacy")} style={{ background: "none", border: "none", color: c.textMuted, fontSize: "10px", cursor: "pointer", opacity: 0.5, padding: 0 }}>Privacy Policy</button>
        <button onClick={() => onShowLegal("terms")} style={{ background: "none", border: "none", color: c.textMuted, fontSize: "10px", cursor: "pointer", opacity: 0.5, padding: 0 }}>Terms of Use</button>
      </div>
    </div>
  );
}

const DEFAULT_PROGRESS = { currentDay: 0, totalCompleted: 0, history: [], startedAt: null };

export default function DadLifts() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTab, setCurrentTab] = useState("today");
  const [equipmentLevel, setEquipmentLevel] = useState("fullGym");
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [legalPage, setLegalPage] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dadlifts_progress_g");
      if (saved) { setProgress(JSON.parse(saved)); setHasStarted(true); }
      const savedEquip = localStorage.getItem("dadlifts_equipment_g");
      if (savedEquip) setEquipmentLevel(savedEquip);
    } catch (e) {}
  }, []);

  useEffect(() => { try { localStorage.setItem("dadlifts_equipment_g", equipmentLevel); } catch (e) {} }, [equipmentLevel]);

  const handleStart = () => {
    const newProgress = { ...DEFAULT_PROGRESS, startedAt: new Date().toISOString() };
    setProgress(newProgress);
    localStorage.setItem("dadlifts_progress_g", JSON.stringify(newProgress));
    setHasStarted(true);
    setShowEquipmentModal(true);
  };

  if (legalPage) {
    return (
      <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`* { box-sizing: border-box; } body { margin: 0; background: ${c.bg}; }`}</style>
        <LegalScreen page={legalPage} onBack={() => setLegalPage(null)} />
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`* { box-sizing: border-box; } body { margin: 0; background: ${c.bg}; }`}</style>
        <WelcomeScreen onStart={handleStart} onShowLegal={setLegalPage} />
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: "500px", margin: "0 auto", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; } body { margin: 0; background: ${c.bg}; } button:active { opacity: 0.85; }`}</style>
      <Header equipmentLevel={equipmentLevel} setShowEquipmentModal={setShowEquipmentModal} />
      {currentTab === "today" && <TodayScreen equipmentLevel={equipmentLevel} progress={progress} setProgress={setProgress} />}
      {currentTab === "program" && <ProgramScreen equipmentLevel={equipmentLevel} onShowLegal={setLegalPage} />}
      {currentTab === "learn" && <LearnScreen onShowLegal={setLegalPage} />}
      {currentTab === "progress" && <ProgressScreen progress={progress} onShowLegal={setLegalPage} />}
      <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {showEquipmentModal && <EquipmentModal equipmentLevel={equipmentLevel} setEquipmentLevel={setEquipmentLevel} onClose={() => setShowEquipmentModal(false)} />}
    </div>
  );
}
