import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Coffee,
  CornerDownLeft,
  Download,
  ExternalLink,
  Gamepad2,
  Heart,
  Home,
  ListOrdered,
  MessageCircle,
  Music,
  Plane,
  RefreshCcw,
  RotateCcw,
  Sprout,
  Sparkles,
  Star,
  Target,
  Trophy,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { toPng } from "html-to-image";
import {
  type CSSProperties,
  Fragment,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type DateNightId = "date-one" | "date-two" | "date-three";

type ActivityId =
  | "flower"
  | "would-you-rather"
  | "memory"
  | "wordle"
  | "painting"
  | "battle-ships"
  | "letters"
  | "secret-garden"
  | "xo-game"
  | "topic-cards"
  | "ranking"
  | "signal-game"
  | "code-game"
  | "star-sequence"
  | "moon-knock"
  | "soft-lie"
  | "mood-dial"
  | "blind-choice"
  | "build-room"
  | "voice-message"
  | "final-envelope";

type Activity = {
  id: ActivityId;
  title: string;
  eyebrow: string;
  guidance: string;
};

type DateNight = {
  id: DateNightId;
  title: string;
  subtitle: string;
  description: string;
  activities: Activity[];
};

const dateOneActivities: Activity[] = [
  {
    id: "flower",
    title: "Grow the Flower",
    eyebrow: "Open the night",
    guidance:
      "Start with the smallest shared action: click the flower until it blooms, then begin the date.",
  },
  {
    id: "would-you-rather",
    title: "Would You Rather",
    eyebrow: "Warm up",
    guidance:
      "Pick honestly, defend your answer, and let the playful disagreement do its work.",
  },
  {
    id: "memory",
    title: "Memory Match",
    eyebrow: "Play together",
    guidance:
      "Take turns calling cards out loud. Match all pairs before moving to the secret word.",
  },
  {
    id: "wordle",
    title: "Five-Letter Secret",
    eyebrow: "Solve it",
    guidance:
      "You have six guesses. The answer is fixed for tonight, and the page will guide the scoring.",
  },
  {
    id: "painting",
    title: "The Painting",
    eyebrow: "Slow down",
    guidance:
      "Look at the generated painting together. Name it, notice details, and turn it into a tiny conversation.",
  },
  {
    id: "battle-ships",
    title: "Battle-Ships",
    eyebrow: "Tiny duel",
    guidance:
      "Discuss each shot before firing. The hidden fleet is waiting somewhere in the moonlit grid.",
  },
  {
    id: "letters",
    title: "Letters",
    eyebrow: "Keep it",
    guidance:
      "Write short letters to each other, then download the finished keepsake or take a screenshot.",
  },
];

const dateTwoActivities: Activity[] = [
  {
    id: "secret-garden",
    title: "Your Secret Garden",
    eyebrow: "Enter quietly",
    guidance:
      "Open the private garden link, spend a moment there, then come back to continue the night.",
  },
  {
    id: "xo-game",
    title: "XO Game",
    eyebrow: "Play together",
    guidance:
      "You are X. The page is O. Win, lose, or draw, it stays simple.",
  },
  {
    id: "topic-cards",
    title: "Topic Cards",
    eyebrow: "Talk freely",
    guidance:
      "Simple cards only. Pull one, discuss it your way, and move when it feels complete.",
  },
  {
    id: "ranking",
    title: "Do We Know Each Other?",
    eyebrow: "Rank and compare",
    guidance:
      "Pick a list, rank it for yourself, then guess how the other person would order it.",
  },
  {
    id: "signal-game",
    title: "Signal Match",
    eyebrow: "Same wavelength",
    guidance:
      "A tiny guessing game. Choose the answer you think the other person would choose.",
  },
  {
    id: "code-game",
    title: "Constellation Code",
    eyebrow: "Crack the sky",
    guidance:
      "Guess the hidden four-symbol constellation. Exact stars are perfect; glow means right symbol, wrong place.",
  },
  {
    id: "star-sequence",
    title: "Star Sequence",
    eyebrow: "Remember the pattern",
    guidance:
      "Watch the glowing pattern, then repeat it together. Each round adds one more signal.",
  },
];

const dateThreeActivities: Activity[] = [
  {
    id: "moon-knock",
    title: "Knock First",
    eyebrow: "Arrive together",
    guidance:
      "Tap three quiet knocks to light the room. Small entrance, proper mood.",
  },
  {
    id: "soft-lie",
    title: "Two Truths, One Soft Lie",
    eyebrow: "Guess gently",
    guidance:
      "Pick a prompt, write three answers, and let the other person guess which one is the soft lie.",
  },
  {
    id: "mood-dial",
    title: "The Mood Dial",
    eyebrow: "Set the tone",
    guidance:
      "Choose how each of you feels tonight. The page gives you a matching tiny prompt.",
  },
  {
    id: "blind-choice",
    title: "Blind Choice",
    eyebrow: "Open a door",
    guidance:
      "Pick hidden doors without knowing what is behind them: questions, confessions, and tiny dares.",
  },
  {
    id: "build-room",
    title: "Build Our Room",
    eyebrow: "Make the scene",
    guidance:
      "Choose the light, sound, snack, view, blanket, and scent. The room writes itself as you go.",
  },
  {
    id: "voice-message",
    title: "Voice Without Voice",
    eyebrow: "Say it softly",
    guidance:
      "Build a message from small pieces, then read it out loud or keep it as a text.",
  },
  {
    id: "final-envelope",
    title: "The Final Envelope",
    eyebrow: "Keep the night",
    guidance:
      "Write the last two lines of tonight and download the envelope as a keepsake.",
  },
];

const dateNights: DateNight[] = [
  {
    id: "date-one",
    title: "Date 1",
    subtitle: "Threadlight",
    description:
      "Flower, would-you-rather, memory match, secret word, painting, battle-ships, and letters.",
    activities: dateOneActivities,
  },
  {
    id: "date-two",
    title: "Date 2",
    subtitle: "Garden Signals",
    description:
      "A secret garden doorway, XO, topic cards, ranking games, wavelength checks, code puzzles, and a memory sequence.",
    activities: dateTwoActivities,
  },
  {
    id: "date-three",
    title: "Date 3",
    subtitle: "Moonroom",
    description:
      "A private room with soft lies, mood dials, hidden doors, room-building, quiet messages, and a final envelope.",
    activities: dateThreeActivities,
  },
];

const defaultSteps: Record<DateNightId, number> = {
  "date-one": 0,
  "date-two": 0,
  "date-three": 0,
};

function App() {
  const [selectedNight, setSelectedNight] = useState<DateNightId | null>(null);
  const [stepByNight, setStepByNight] = useState<Record<DateNightId, number>>(() => {
    const saved = window.localStorage.getItem("threadlight-steps");
    return saved ? { ...defaultSteps, ...(JSON.parse(saved) as Partial<Record<DateNightId, number>>) } : defaultSteps;
  });
  const [completed, setCompleted] = useState<Set<ActivityId>>(() => {
    const saved = window.localStorage.getItem("threadlight-completed");
    return new Set(saved ? (JSON.parse(saved) as ActivityId[]) : []);
  });

  const activeNight = dateNights.find((night) => night.id === selectedNight) ?? null;
  const step = activeNight ? Math.min(stepByNight[activeNight.id], activeNight.activities.length - 1) : 0;
  const activity = activeNight?.activities[step];

  useEffect(() => {
    window.localStorage.removeItem("threadlight-selected-night");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("threadlight-steps", JSON.stringify(stepByNight));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepByNight]);

  useEffect(() => {
    window.localStorage.setItem(
      "threadlight-completed",
      JSON.stringify([...completed]),
    );
  }, [completed]);

  const openNight = (nightId: DateNightId) => {
    const night = dateNights.find((item) => item.id === nightId);
    if (!night) return;
    setStepByNight((current) => ({ ...current, [nightId]: 0 }));
    setCompleted((current) => {
      const next = new Set(current);
      night.activities.forEach((item) => next.delete(item.id));
      return next;
    });
    setSelectedNight(nightId);
  };

  if (!activeNight || !activity) {
    return <DateHome onSelect={openNight} />;
  }

  const progress = Math.round(((step + 1) / activeNight.activities.length) * 100);

  const setStep = (nextStep: number) => {
    setStepByNight((current) => ({
      ...current,
      [activeNight.id]: Math.min(Math.max(nextStep, 0), activeNight.activities.length - 1),
    }));
  };

  const completeAndNext = () => {
    setCompleted((current) => new Set(current).add(activity.id));
    setStep(step + 1);
  };

  const goBack = () => setStep(step - 1);

  const resetNight = () => {
    setCompleted((current) => {
      const next = new Set(current);
      activeNight.activities.forEach((item) => next.delete(item.id));
      return next;
    });
    setStep(0);
    window.localStorage.removeItem("threadlight-completed");
  };

  return (
    <main className="app-shell">
      <aside className="guide-rail" aria-label="Date night progress">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Sparkles size={18} aria-hidden="true" />
          </div>
          <div>
            <p>Threadlight</p>
            <span>{activeNight.title} · {activeNight.subtitle}</span>
          </div>
        </div>

        <div className="progress-block">
          <div className="progress-label">
            <span>Tonight</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="activity-nav">
          {activeNight.activities.map((item, index) => (
            <button
              key={item.id}
              className={`nav-item ${index === step ? "active" : ""}`}
              type="button"
              onClick={() => setStep(index)}
            >
              <span>{String(index).padStart(2, "0")}</span>
              <span>{item.title}</span>
              {completed.has(item.id) ? (
                <Check size={16} aria-label="Completed" />
              ) : null}
            </button>
          ))}
        </nav>

        <button className="ghost-button home-button" type="button" onClick={() => setSelectedNight(null)}>
          <Home size={16} aria-hidden="true" />
          All dates
        </button>

        <button className="ghost-button reset-button" type="button" onClick={resetNight}>
          <RotateCcw size={16} aria-hidden="true" />
          Reset night
        </button>
      </aside>

      <section className="date-stage" aria-labelledby="activity-title">
        <header className="stage-header">
          <div>
            <p className="eyebrow">{activity.eyebrow}</p>
            <h1 id="activity-title">{activity.title}</h1>
          </div>
          <p>{activity.guidance}</p>
        </header>

        <div className="activity-panel">{renderActivity(activity.id, completeAndNext)}</div>

        <footer className="stage-footer">
          <button className="ghost-button" type="button" onClick={goBack} disabled={step === 0}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>
          {step < activeNight.activities.length - 1 ? (
            <button className="primary-button" type="button" onClick={completeAndNext}>
              Continue
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button className="primary-button" type="button" onClick={resetNight}>
              Start over
              <RefreshCcw size={16} aria-hidden="true" />
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}

function DateHome({ onSelect }: { onSelect: (night: DateNightId) => void }) {
  return (
    <main className="home-screen">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Sparkles size={18} aria-hidden="true" />
          </div>
          <div>
            <p>Threadlight</p>
            <span>long-distance date nights</span>
          </div>
        </div>
        <div>
          <p className="eyebrow">Choose tonight</p>
          <h1 id="home-title">Pick a date.</h1>
          <p>
            Each night is its own guided flow, so you can keep adding new ones
            without losing the feeling of a complete little ritual.
          </p>
        </div>
      </section>

      <section className="date-card-grid" aria-label="Date nights">
        {dateNights.map((night, index) => (
          <button
            key={night.id}
            className="date-card"
            type="button"
            onClick={() => onSelect(night.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{night.title}</strong>
            <em>{night.subtitle}</em>
            <p>{night.description}</p>
            <span className="date-card-action">
              Start
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

function renderActivity(id: ActivityId, onNext: () => void) {
  switch (id) {
    case "flower":
      return <FlowerGrower onNext={onNext} />;
    case "would-you-rather":
      return <WouldYouRather onNext={onNext} />;
    case "memory":
      return <MemoryGame onNext={onNext} />;
    case "wordle":
      return <WordleGame onNext={onNext} />;
    case "painting":
      return <PaintingMoment onNext={onNext} />;
    case "battle-ships":
      return <Battleships onNext={onNext} />;
    case "letters":
      return <Letters />;
    case "secret-garden":
      return <SecretGarden onNext={onNext} />;
    case "xo-game":
      return <XoGame onNext={onNext} />;
    case "topic-cards":
      return <TopicCards onNext={onNext} />;
    case "ranking":
      return <RankingGame onNext={onNext} />;
    case "signal-game":
      return <SignalGame />;
    case "code-game":
      return <ConstellationCode />;
    case "star-sequence":
      return <StarSequence />;
    case "moon-knock":
      return <MoonKnock onNext={onNext} />;
    case "soft-lie":
      return <SoftLie onNext={onNext} />;
    case "mood-dial":
      return <MoodDial onNext={onNext} />;
    case "blind-choice":
      return <BlindChoice onNext={onNext} />;
    case "build-room":
      return <BuildRoom onNext={onNext} />;
    case "voice-message":
      return <VoiceMessage onNext={onNext} />;
    case "final-envelope":
      return <FinalEnvelope />;
  }
}

function FlowerGrower({ onNext }: { onNext: () => void }) {
  const [growth, setGrowth] = useState(0);
  const blooms = Array.from({ length: 14 }, (_, index) => index);
  const ready = growth >= 7;

  return (
    <div className="flower-layout">
      <div className="flower-copy">
        <span className="mini-label">First shared click</span>
        <h2>Click until it opens.</h2>
        <p>
          Let the flower be the doorbell. Each click grows the stem, opens the
          petals, and gives you both a second to arrive.
        </p>
        <div className="bloom-meter" aria-label={`Flower growth ${growth} of 7`}>
          {Array.from({ length: 7 }, (_, index) => (
            <span key={index} className={index < growth ? "filled" : ""} />
          ))}
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={ready ? onNext : () => setGrowth((value) => Math.min(value + 1, 7))}
        >
          {ready ? "Begin" : "Grow"}
          <Sparkles size={16} aria-hidden="true" />
        </button>
      </div>

      <button
        className={`flower-button growth-${growth}`}
        type="button"
        onClick={() => setGrowth((value) => Math.min(value + 1, 7))}
        aria-label="Grow the flower"
      >
        <div className="flower-pot" />
        <div className="flower-stem" />
        <div className="flower-head">
          {blooms.map((petal) => (
            <span
              key={petal}
              className={petal < growth * 2 ? "petal visible" : "petal"}
              style={
                {
                  "--angle": `${(360 / blooms.length) * petal}deg`,
                  "--scale": `${0.7 + growth * 0.055}`,
                } as CSSProperties
              }
            />
          ))}
          <span className="flower-core" />
        </div>
      </button>
    </div>
  );
}

const ratherPrompts = [
  {
    a: "Spend one rainy weekend together in a cabin",
    b: "Spend one bright weekend exploring a city neither of you knows",
  },
  {
    a: "Know exactly what the other is thinking for one day",
    b: "Be able to teleport to each other once a month",
  },
  {
    a: "Cook the same recipe on video call",
    b: "Order surprise food for each other",
  },
  {
    a: "Rewatch your first shared movie",
    b: "Start a new show and make it your thing",
  },
  {
    a: "Get a handwritten letter every month",
    b: "Get a voice note every morning for a month",
  },
  {
    a: "Plan a dream trip with no budget",
    b: "Plan the sweetest possible 24 hours in your current city",
  },
];

function WouldYouRather({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"a" | "b" | null>(null);
  const prompt = ratherPrompts[index];
  const last = index === ratherPrompts.length - 1;

  const advance = () => {
    if (!last) {
      setIndex((value) => value + 1);
      setChoice(null);
    } else {
      onNext();
    }
  };

  return (
    <div className="rather-wrap">
      <div className="prompt-counter">
        Prompt {index + 1} of {ratherPrompts.length}
      </div>
      <div className="rather-options">
        <ChoiceCard
          label="A"
          selected={choice === "a"}
          text={prompt.a}
          onClick={() => setChoice("a")}
        />
        <ChoiceCard
          label="B"
          selected={choice === "b"}
          text={prompt.b}
          onClick={() => setChoice("b")}
        />
      </div>
      <div className="activity-actions">
        <button className="ghost-button" type="button" onClick={() => setIndex((index + 1) % ratherPrompts.length)}>
          <RefreshCcw size={16} aria-hidden="true" />
          Shuffle
        </button>
        <button className="primary-button" type="button" onClick={advance} disabled={!choice}>
          {last ? "Next activity" : "Next prompt"}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function ChoiceCard({
  label,
  selected,
  text,
  onClick,
}: {
  label: string;
  selected: boolean;
  text: string;
  onClick: () => void;
}) {
  return (
    <button className={`choice-card ${selected ? "selected" : ""}`} type="button" onClick={onClick}>
      <span>{label}</span>
      <strong>{text}</strong>
    </button>
  );
}

type MemoryCard = {
  id: string;
  pairId: string;
  label: string;
  Icon: LucideIcon;
};

const memoryFaces: Array<Omit<MemoryCard, "id">> = [
  { pairId: "heart", label: "Heart", Icon: Heart },
  { pairId: "star", label: "Star", Icon: Star },
  { pairId: "song", label: "Song", Icon: Music },
  { pairId: "coffee", label: "Coffee", Icon: Coffee },
  { pairId: "spark", label: "Spark", Icon: Sparkles },
  { pairId: "trip", label: "Trip", Icon: Plane },
  { pairId: "photo", label: "Photo", Icon: Camera },
  { pairId: "tide", label: "Tide", Icon: Waves },
];

function makeMemoryDeck() {
  return memoryFaces
    .flatMap((face) => [
      { ...face, id: `${face.pairId}-1` },
      { ...face, id: `${face.pairId}-2` },
    ])
    .sort(() => Math.random() - 0.5);
}

function MemoryGame({ onNext }: { onNext: () => void }) {
  const [deck, setDeck] = useState<MemoryCard[]>(makeMemoryDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const complete = matched.size === memoryFaces.length;

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [first, second] = flipped;
    const firstCard = deck[first];
    const secondCard = deck[second];
    setMoves((value) => value + 1);
    if (firstCard.pairId === secondCard.pairId) {
      setMatched((current) => new Set(current).add(firstCard.pairId));
      window.setTimeout(() => setFlipped([]), 550);
    } else {
      window.setTimeout(() => setFlipped([]), 900);
    }
  }, [deck, flipped]);

  const reset = () => {
    setDeck(makeMemoryDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
  };

  const flip = (index: number) => {
    const card = deck[index];
    if (flipped.length === 2 || flipped.includes(index) || matched.has(card.pairId)) return;
    setFlipped((current) => [...current, index]);
  };

  return (
    <div className="memory-layout">
      <div className="score-strip">
        <span>{moves} moves</span>
        <span>{matched.size} / {memoryFaces.length} pairs</span>
      </div>
      <div className="memory-grid" aria-label="Memory card grid">
        {deck.map((card, index) => {
          const Icon = card.Icon;
          const open = flipped.includes(index) || matched.has(card.pairId);
          return (
            <button
              key={card.id}
              className={`memory-card ${open ? "open" : ""} ${matched.has(card.pairId) ? "matched" : ""}`}
              type="button"
              onClick={() => flip(index)}
              aria-label={open ? card.label : "Hidden card"}
            >
              <span className="card-back">?</span>
              <span className="card-front">
                <Icon size={30} aria-hidden="true" />
                <small>{card.label}</small>
              </span>
            </button>
          );
        })}
      </div>
      <div className="activity-actions">
        <button className="ghost-button" type="button" onClick={reset}>
          <RefreshCcw size={16} aria-hidden="true" />
          Reset
        </button>
        <button className="primary-button" type="button" onClick={onNext} disabled={!complete}>
          Continue
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

type TileState = "empty" | "correct" | "present" | "absent";
const answer = "BLOOD";
const keyRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

function scoreGuess(guess: string): TileState[] {
  const result: TileState[] = Array.from({ length: answer.length }, () => "absent");
  const remaining = new Map<string, number>();

  for (let index = 0; index < answer.length; index += 1) {
    if (guess[index] === answer[index]) {
      result[index] = "correct";
    } else {
      remaining.set(answer[index], (remaining.get(answer[index]) ?? 0) + 1);
    }
  }

  for (let index = 0; index < guess.length; index += 1) {
    const letter = guess[index];
    if (result[index] === "correct") continue;
    const count = remaining.get(letter) ?? 0;
    if (count > 0) {
      result[index] = "present";
      remaining.set(letter, count - 1);
    }
  }

  return result;
}

function WordleGame({ onNext }: { onNext: () => void }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState("Type a five-letter guess.");
  const won = guesses.includes(answer);
  const lost = guesses.length >= 6 && !won;
  const finished = won || lost;

  const rows = Array.from({ length: 6 }, (_, index) => guesses[index] ?? (index === guesses.length ? current : ""));
  const keyboardState = useMemo(() => {
    const rank: Record<TileState, number> = { empty: 0, absent: 1, present: 2, correct: 3 };
    const map = new Map<string, TileState>();
    guesses.forEach((guess) => {
      scoreGuess(guess).forEach((state, index) => {
        const letter = guess[index];
        if (rank[state] > rank[map.get(letter) ?? "empty"]) map.set(letter, state);
      });
    });
    return map;
  }, [guesses]);

  const typeLetter = (letter: string) => {
    if (finished || current.length >= 5) return;
    setCurrent((value) => `${value}${letter}`);
  };

  const backspace = () => {
    if (finished) return;
    setCurrent((value) => value.slice(0, -1));
  };

  const submit = () => {
    if (finished) return;
    if (current.length !== 5) {
      setMessage("Five letters first.");
      return;
    }
    const nextGuesses = [...guesses, current];
    setGuesses(nextGuesses);
    setCurrent("");
    if (current === answer) {
      setMessage("Solved. Read that word slowly, then carry on.");
    } else if (nextGuesses.length >= 6) {
      setMessage(`The answer was ${answer}. Say it dramatically and continue.`);
    } else {
      setMessage("Keep going.");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) typeLetter(key);
    if (event.key === "Backspace") backspace();
    if (event.key === "Enter") submit();
  };

  const reset = () => {
    setGuesses([]);
    setCurrent("");
    setMessage("Type a five-letter guess.");
  };

  return (
    <div className="wordle-wrap" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="wordle-board" aria-label="Wordle board">
        {rows.map((row, rowIndex) =>
          Array.from({ length: 5 }, (_, colIndex) => {
            const letter = row[colIndex] ?? "";
            const state = guesses[rowIndex] ? scoreGuess(row)[colIndex] : "empty";
            return (
              <span key={`${rowIndex}-${colIndex}`} className={`wordle-tile ${state}`}>
                {letter}
              </span>
            );
          }),
        )}
      </div>
      <p className="wordle-message">{message}</p>
      <div className="keyboard" aria-label="On-screen keyboard">
        {keyRows.map((row) => (
          <div key={row} className="key-row">
            {row.split("").map((letter) => (
              <button
                key={letter}
                className={`key ${keyboardState.get(letter) ?? ""}`}
                type="button"
                onClick={() => typeLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
        <div className="key-row command-row">
          <button className="key wide" type="button" onClick={backspace} aria-label="Delete letter">
            <X size={16} aria-hidden="true" />
          </button>
          <button className="key wide" type="button" onClick={submit} aria-label="Submit guess">
            <CornerDownLeft size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="activity-actions">
        <button className="ghost-button" type="button" onClick={reset}>
          <RefreshCcw size={16} aria-hidden="true" />
          Reset
        </button>
        <button className="primary-button" type="button" onClick={onNext} disabled={!finished}>
          Continue
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function PaintingMoment({ onNext }: { onNext: () => void }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [line, setLine] = useState("");
  const ready = title.trim() && detail.trim() && line.trim();

  return (
    <div className="painting-layout">
      <figure className="painting-frame">
        <img src="/art/starry-thread.png" alt="A Van Gogh-inspired night scene with two distant windows connected by a red thread" />
      </figure>
      <div className="painting-prompts">
        <label>
          Name the painting
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="The title you both agree on" />
        </label>
        <label>
          One detail you noticed
          <textarea value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="A color, shape, window, star, or feeling" />
        </label>
        <label>
          One line to send her
          <textarea value={line} onChange={(event) => setLine(event.target.value)} placeholder="Something small, specific, and yours" />
        </label>
        <button className="primary-button" type="button" onClick={onNext} disabled={!ready}>
          Continue
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

type Ship = {
  name: string;
  cells: string[];
};

const ships: Ship[] = [
  { name: "Rose", cells: ["A1", "A2", "A3", "A4"] },
  { name: "Moon", cells: ["C6", "D6", "E6"] },
  { name: "Song", cells: ["F2", "F3", "F4"] },
  { name: "Note", cells: ["B8", "C8"] },
  { name: "Kiss", cells: ["H5", "H6"] },
];

const shipCells = new Set(ships.flatMap((ship) => ship.cells));
const rows = "ABCDEFGH".split("");
const cols = Array.from({ length: 8 }, (_, index) => index + 1);

function Battleships({ onNext }: { onNext: () => void }) {
  const [shots, setShots] = useState<Set<string>>(new Set());
  const hits = [...shots].filter((shot) => shipCells.has(shot)).length;
  const total = shipCells.size;
  const won = hits === total;

  const fire = (cell: string) => {
    if (shots.has(cell) || won) return;
    setShots((current) => new Set(current).add(cell));
  };

  const reset = () => setShots(new Set());

  return (
    <div className="battle-layout">
      <div>
        <div className="score-strip">
          <span>{shots.size} shots</span>
          <span>{hits} / {total} hits</span>
        </div>
        <div className="battle-board" aria-label="Battle-ships board">
          <span className="corner-cell" />
          {cols.map((col) => (
            <span key={col} className="axis-cell">{col}</span>
          ))}
          {rows.map((row) => (
            <Fragment key={row}>
              <span key={`${row}-axis`} className="axis-cell">{row}</span>
              {cols.map((col) => {
                const cell = `${row}${col}`;
                const shot = shots.has(cell);
                const hit = shot && shipCells.has(cell);
                return (
                  <button
                    key={cell}
                    className={`battle-cell ${shot ? (hit ? "hit" : "miss") : ""}`}
                    type="button"
                    onClick={() => fire(cell)}
                    aria-label={`${cell} ${shot ? (hit ? "hit" : "miss") : "unknown"}`}
                  >
                    {shot ? (hit ? <Target size={18} aria-hidden="true" /> : "•") : ""}
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="fleet-panel">
        <span className="mini-label">Fleet</span>
        {ships.map((ship) => {
          const sunk = ship.cells.every((cell) => shots.has(cell));
          return (
            <div key={ship.name} className={`ship-row ${sunk ? "sunk" : ""}`}>
              <span>{ship.name}</span>
              <span>{ship.cells.length} cells</span>
            </div>
          );
        })}
        <p>{won ? "Fleet found. Victory belongs to both of you." : "Call the coordinate together before clicking."}</p>
        <div className="activity-actions stacked">
          <button className="ghost-button" type="button" onClick={reset}>
            <RefreshCcw size={16} aria-hidden="true" />
            Reset
          </button>
          <button className="primary-button" type="button" onClick={onNext} disabled={!won}>
            Write letters
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Letters() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [signoff, setSignoff] = useState("");
  const [status, setStatus] = useState("");

  const download = async () => {
    if (!captureRef.current) return;
    setStatus("Preparing keepsake...");
    const dataUrl = await toPng(captureRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#fff8f1",
    });
    const link = document.createElement("a");
    link.download = "threadlight-letters.png";
    link.href = dataUrl;
    link.click();
    setStatus("Downloaded. Keep a copy somewhere sweet.");
  };

  return (
    <div className="letter-layout">
      <div className="letter-keepsake" ref={captureRef}>
        <div className="letter-heading">
          <span>Threadlight letters</span>
          <strong>Two notes from tonight</strong>
        </div>
        <div className="letter-columns">
          <label>
            Letter one
            <textarea
              value={left}
              onChange={(event) => setLeft(event.target.value)}
              placeholder="I liked tonight when..."
            />
          </label>
          <label>
            Letter two
            <textarea
              value={right}
              onChange={(event) => setRight(event.target.value)}
              placeholder="Next time I want us to..."
            />
          </label>
        </div>
        <label className="signoff-field">
          Closing line
          <input
            value={signoff}
            onChange={(event) => setSignoff(event.target.value)}
            placeholder="Same sky, same thread."
          />
        </label>
      </div>
      <div className="activity-actions">
        <button className="primary-button" type="button" onClick={download}>
          <Download size={16} aria-hidden="true" />
          Download PNG
        </button>
        <span className="status-text">{status || "You can also use your normal screenshot shortcut."}</span>
      </div>
    </div>
  );
}

function SecretGarden({ onNext }: { onNext: () => void }) {
  const gardenUrl = "https://secret-garden-jet.vercel.app";

  return (
    <div className="garden-layout">
      <div className="garden-frame">
        <Sprout size={54} aria-hidden="true" />
        <span className="mini-label">Private link</span>
        <h2>Your secret garden waits here.</h2>
        <p>
          Step into the garden first. When you are both ready, return here and
          continue the rest of the night.
        </p>
        <div className="activity-actions">
          <a className="primary-button" href={gardenUrl} target="_blank" rel="noreferrer">
            Open garden
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <button className="ghost-button" type="button" onClick={onNext}>
            Continue
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

type XoMark = "X" | "O" | null;
type XoResult = "X" | "O" | "draw" | null;

const xoLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getXoResult(board: XoMark[]): XoResult {
  for (const [a, b, c] of xoLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "draw" : null;
}

function findXoMove(board: XoMark[], mark: "X" | "O") {
  for (const [a, b, c] of xoLines) {
    const cells = [board[a], board[b], board[c]];
    const emptyIndex = [a, b, c].find((cell) => board[cell] === null);
    if (emptyIndex !== undefined && cells.filter((cell) => cell === mark).length === 2) {
      return emptyIndex;
    }
  }
  return null;
}

function chooseO(board: XoMark[]) {
  const win = findXoMove(board, "O");
  if (win !== null) return win;
  const block = findXoMove(board, "X");
  if (block !== null) return block;
  if (!board[4]) return 4;
  const corners = [0, 2, 6, 8].filter((cell) => !board[cell]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  const open = board.map((cell, index) => (cell ? null : index)).filter((cell): cell is number => cell !== null);
  return open[Math.floor(Math.random() * open.length)];
}

function XoGame({ onNext }: { onNext: () => void }) {
  const [board, setBoard] = useState<XoMark[]>(Array.from({ length: 9 }, () => null));
  const result = getXoResult(board);

  const play = (index: number) => {
    if (board[index] || result) return;
    const next = [...board];
    next[index] = "X";
    if (!getXoResult(next)) {
      const move = chooseO(next);
      if (move !== undefined) next[move] = "O";
    }
    setBoard(next);
  };

  const reset = () => {
    setBoard(Array.from({ length: 9 }, () => null));
  };

  return (
    <div className="xo-layout">
      <div className="xo-board" aria-label="XO board">
        {board.map((mark, index) => (
          <button
            key={index}
            className={`xo-cell ${mark ? "filled" : ""}`}
            type="button"
            onClick={() => play(index)}
            aria-label={`Cell ${index + 1}${mark ? ` ${mark}` : ""}`}
          >
            {mark}
          </button>
        ))}
      </div>
      <div className="xo-panel">
        <Gamepad2 size={28} aria-hidden="true" />
        <h2>{result ? (result === "draw" ? "Draw." : `${result} wins.`) : "Beat the page."}</h2>
        <p>
          {result === "O"
            ? "O got this one. Reset and steal the next round."
            : result === "X"
              ? "You won. Take the victory with unreasonable confidence."
              : result === "draw"
                ? "Perfectly balanced. Annoying, but elegant."
                : "Tap a square. O will answer immediately."}
        </p>
        <div className="activity-actions stacked">
          <button className="ghost-button" type="button" onClick={reset}>
            <RefreshCcw size={16} aria-hidden="true" />
            Play again
          </button>
          <button className="primary-button" type="button" onClick={onNext}>
            Topic cards
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const topicCards = [
  "A tiny habit that makes a person feel loved",
  "The funniest wrong first impression",
  "A place that feels like a reset button",
  "Something you want to be braver about",
  "A food opinion you will defend too strongly",
  "What makes a normal day feel romantic",
  "A memory you wish had lasted ten more minutes",
  "A ridiculous thing you secretly find attractive",
  "The version of you that only comes out when you feel safe",
  "A dream trip with one rule: no practical planning",
  "What you need when you are quiet",
  "A small promise that actually matters",
];

function TopicCards({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const topic = topicCards[index];

  return (
    <div className="topic-layout">
      <div className="topic-card">
        <MessageCircle size={34} aria-hidden="true" />
        <span className="mini-label">Card {index + 1} of {topicCards.length}</span>
        <h2>{topic}</h2>
      </div>
      <div className="activity-actions">
        <button className="ghost-button" type="button" onClick={() => setIndex((index + topicCards.length - 1) % topicCards.length)}>
          <ArrowLeft size={16} aria-hidden="true" />
          Previous
        </button>
        <button className="ghost-button" type="button" onClick={() => setIndex((index + 1) % topicCards.length)}>
          Next topic
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button className="primary-button" type="button" onClick={onNext}>
          Rank things
          <ListOrdered size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

const rankingSets = [
  {
    title: "Fast-food restaurants",
    items: ["McDonald's", "KFC", "Burger King", "Subway", "Pizza Hut", "Five Guys"],
  },
  {
    title: "Perfect date snacks",
    items: ["Fries", "Ice cream", "Popcorn", "Chocolate", "Fruit", "Cookies"],
  },
  {
    title: "Love languages",
    items: ["Words", "Time", "Touch", "Acts", "Gifts"],
  },
  {
    title: "Movie night moods",
    items: ["Comedy", "Romance", "Thriller", "Animation", "Drama", "Mystery"],
  },
  {
    title: "Texting styles",
    items: ["Voice notes", "Long paragraphs", "Memes", "Photos", "Good morning texts", "Random updates"],
  },
  {
    title: "Dream dates",
    items: ["Beach walk", "Museum", "Late drive", "Cooking together", "Fancy dinner", "Arcade"],
  },
  {
    title: "Comfort shows",
    items: ["Sitcom", "Reality show", "Anime", "Crime documentary", "K-drama", "Cooking show"],
  },
  {
    title: "Desserts",
    items: ["Cheesecake", "Brownies", "Tiramisu", "Crepes", "Donuts", "Ice cream"],
  },
  {
    title: "Trip priorities",
    items: ["Food", "Views", "Shopping", "Sleep", "Photos", "Adventure"],
  },
  {
    title: "Pet names",
    items: ["Baby", "Love", "Princess", "Habibti", "Angel", "My girl"],
  },
  {
    title: "Cozy rituals",
    items: ["Movie call", "Shared playlist", "Night walk", "Reading together", "Cooking call", "Sleep call"],
  },
  {
    title: "Compliments",
    items: ["Smile", "Voice", "Style", "Mind", "Kindness", "Eyes"],
  },
];

function RankingGame({ onNext }: { onNext: () => void }) {
  const [setIndex, setSetIndex] = useState(0);
  const [items, setItems] = useState(rankingSets[0].items);
  const [dragging, setDragging] = useState<number | null>(null);
  const rankListRef = useRef<HTMLDivElement>(null);
  const active = rankingSets[setIndex];

  const chooseSet = (index: number) => {
    setSetIndex(index);
    setItems(rankingSets[index].items);
    setDragging(null);
  };

  const reorder = (from: number, target: number) => {
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(target, 0, item);
    setItems(next);
    setDragging(target);
  };

  const move = (index: number, direction: -1 | 1) => {
    reorder(index, index + direction);
  };

  const startDrag = (index: number, event: PointerEvent<HTMLButtonElement>) => {
    setDragging(index);
    rankListRef.current?.setPointerCapture(event.pointerId);
  };

  const dragOver = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging === null || !rankListRef.current) return;
    const rows = [...rankListRef.current.querySelectorAll<HTMLElement>("[data-rank-index]")];
    const target = rows.findIndex((row) => {
      const rect = row.getBoundingClientRect();
      return event.clientY >= rect.top && event.clientY <= rect.bottom;
    });
    if (target !== -1 && target !== dragging) {
      reorder(dragging, target);
    }
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (rankListRef.current?.hasPointerCapture(event.pointerId)) {
      rankListRef.current.releasePointerCapture(event.pointerId);
    }
    setDragging(null);
  };

  return (
    <div className="ranking-layout">
      <div className="ranking-tabs" aria-label="Ranking categories">
        {rankingSets.map((set, index) => (
          <button
            key={set.title}
            className={index === setIndex ? "active" : ""}
            type="button"
            onClick={() => chooseSet(index)}
          >
            {set.title}
          </button>
        ))}
      </div>
      <div className="ranking-board">
        <span className="mini-label">Rank this</span>
        <h2>{active.title}</h2>
        <div
          className="rank-list"
          ref={rankListRef}
          onPointerMove={dragOver}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {items.map((item, index) => (
            <div
              key={item}
              className={`rank-row ${dragging === index ? "dragging" : ""}`}
              data-rank-index={index}
            >
              <strong>{index + 1}</strong>
              <span>{item}</span>
              <button
                className="drag-handle"
                type="button"
                onPointerDown={(event) => startDrag(index, event)}
                aria-label={`Drag ${item}`}
              >
                <ListOrdered size={16} aria-hidden="true" />
              </button>
              <div className="rank-actions">
                <button type="button" onClick={() => move(index, -1)} aria-label={`Move ${item} up`}>
                  <ArrowLeft size={14} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => move(index, 1)} aria-label={`Move ${item} down`}>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <p>First rank yours. Then guess hers. Then compare out loud.</p>
        <button className="primary-button" type="button" onClick={onNext}>
          Final game
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

const signalRounds = [
  {
    prompt: "A midnight craving appears. What do you pick?",
    options: ["Fries", "Ice cream", "Noodles", "Cake"],
  },
  {
    prompt: "The next date needs one mood.",
    options: ["Cozy", "Chaotic", "Fancy", "Quiet"],
  },
  {
    prompt: "A surprise message should be...",
    options: ["Funny", "Soft", "Bold", "Very specific"],
  },
  {
    prompt: "If you had one teleport, where does it land?",
    options: ["Her door", "A beach", "A hotel lobby", "A kitchen"],
  },
];

function SignalGame() {
  const [round, setRound] = useState(0);
  const [you, setYou] = useState<string | null>(null);
  const [her, setHer] = useState<string | null>(null);
  const active = signalRounds[round];
  const revealed = Boolean(you && her);
  const matched = revealed && you === her;

  const nextRound = () => {
    setRound((value) => (value + 1) % signalRounds.length);
    setYou(null);
    setHer(null);
  };

  return (
    <div className="signal-layout">
      <div className="signal-card">
        <Trophy size={34} aria-hidden="true" />
        <span className="mini-label">Round {round + 1} of {signalRounds.length}</span>
        <h2>{active.prompt}</h2>
        <div className="signal-columns">
          <SignalPicker label="You" value={you} options={active.options} onPick={setYou} revealed={revealed} />
          <SignalPicker label="Her" value={her} options={active.options} onPick={setHer} revealed={revealed} />
        </div>
        <p>
          {revealed
            ? matched
              ? "Same signal. Suspiciously cute."
              : "Different signals. Defend your choice."
            : "Choose privately, then reveal when both sides are locked."}
        </p>
        <button className="primary-button" type="button" onClick={nextRound} disabled={!revealed}>
          Next signal
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function SignalPicker({
  label,
  value,
  options,
  onPick,
  revealed,
}: {
  label: string;
  value: string | null;
  options: string[];
  onPick: (value: string) => void;
  revealed: boolean;
}) {
  return (
    <div className="signal-picker">
      <strong>{label}</strong>
      {options.map((option) => (
        <button
          key={option}
          className={value === option ? "selected" : ""}
          type="button"
          onClick={() => onPick(option)}
        >
          {revealed || value !== option ? option : "Locked"}
        </button>
      ))}
    </div>
  );
}

const codeSymbols = ["Sun", "Moon", "Star", "Comet", "Nova", "Orbit"];
const codeLength = 4;

function makeCodeSecret() {
  return Array.from({ length: codeLength }, () => codeSymbols[Math.floor(Math.random() * codeSymbols.length)]);
}

function scoreCodeGuess(guess: string[], secret: string[]) {
  let exact = 0;
  const remainingSecret = new Map<string, number>();
  const remainingGuess: string[] = [];

  guess.forEach((symbol, index) => {
    if (symbol === secret[index]) {
      exact += 1;
    } else {
      remainingGuess.push(symbol);
      remainingSecret.set(secret[index], (remainingSecret.get(secret[index]) ?? 0) + 1);
    }
  });

  let glow = 0;
  remainingGuess.forEach((symbol) => {
    const count = remainingSecret.get(symbol) ?? 0;
    if (count > 0) {
      glow += 1;
      remainingSecret.set(symbol, count - 1);
    }
  });

  return { exact, glow };
}

function getCodeTileStates(guess: string[], secret: string[]) {
  const states: Array<"exact" | "glow" | "miss"> = Array.from({ length: guess.length }, () => "miss");
  const remainingSecret = new Map<string, number>();

  guess.forEach((symbol, index) => {
    if (symbol === secret[index]) {
      states[index] = "exact";
    } else {
      remainingSecret.set(secret[index], (remainingSecret.get(secret[index]) ?? 0) + 1);
    }
  });

  guess.forEach((symbol, index) => {
    if (states[index] === "exact") return;
    const count = remainingSecret.get(symbol) ?? 0;
    if (count > 0) {
      states[index] = "glow";
      remainingSecret.set(symbol, count - 1);
    }
  });

  return states;
}

function ConstellationCode() {
  const [secret, setSecret] = useState(makeCodeSecret);
  const [current, setCurrent] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[][]>([]);
  const solved = guesses.some((guess) => scoreCodeGuess(guess, secret).exact === codeLength);
  const outOfTries = guesses.length >= 7 && !solved;

  const addSymbol = (symbol: string) => {
    if (solved || outOfTries || current.length >= codeLength) return;
    setCurrent((value) => [...value, symbol]);
  };

  const submit = () => {
    if (current.length !== codeLength || solved || outOfTries) return;
    setGuesses((value) => [...value, current]);
    setCurrent([]);
  };

  const reset = () => {
    setSecret(makeCodeSecret());
    setCurrent([]);
    setGuesses([]);
  };

  return (
    <div className="code-layout">
      <div className="code-card">
        <Star size={34} aria-hidden="true" />
        <span className="mini-label">Seven tries</span>
        <h2>Guess the hidden constellation.</h2>
        <div className="code-current" aria-label="Current code guess">
          {Array.from({ length: codeLength }, (_, index) => (
            <span key={index}>{current[index] ?? ""}</span>
          ))}
        </div>
        <div className="code-symbols" aria-label="Constellation symbols">
          {codeSymbols.map((symbol) => (
            <button key={symbol} type="button" onClick={() => addSymbol(symbol)}>
              {symbol}
            </button>
          ))}
        </div>
        <div className="activity-actions">
          <button className="ghost-button" type="button" onClick={() => setCurrent((value) => value.slice(0, -1))}>
            Delete
            <X size={16} aria-hidden="true" />
          </button>
          <button className="primary-button" type="button" onClick={submit} disabled={current.length !== codeLength || solved || outOfTries}>
            Guess
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="code-history">
          {guesses.map((guess, index) => {
            const score = scoreCodeGuess(guess, secret);
            const states = getCodeTileStates(guess, secret);
            return (
              <div key={`${guess.join("-")}-${index}`} className="code-row">
                <span>{index + 1}</span>
                <div className="code-tiles" aria-label={`Guess ${index + 1}`}>
                  {guess.map((symbol, symbolIndex) => (
                    <strong key={`${symbol}-${symbolIndex}`} className={states[symbolIndex]}>
                      {symbol}
                    </strong>
                  ))}
                </div>
                <em>{score.exact} exact / {score.glow} glow</em>
              </div>
            );
          })}
        </div>
        {solved || outOfTries ? (
          <div className="code-result">
            {solved ? "Solved. Same sky, correct stars." : `The code was ${secret.join(" · ")}.`}
          </div>
        ) : null}
        <button className="ghost-button" type="button" onClick={reset}>
          <RefreshCcw size={16} aria-hidden="true" />
          New code
        </button>
      </div>
    </div>
  );
}

const sequenceTiles: Array<{ label: string; Icon: LucideIcon }> = [
  { label: "Heart", Icon: Heart },
  { label: "Star", Icon: Star },
  { label: "Spark", Icon: Sparkles },
  { label: "Song", Icon: Music },
  { label: "Coffee", Icon: Coffee },
  { label: "Wave", Icon: Waves },
];

const maxSequenceRound = 6;

function StarSequence() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [input, setInput] = useState<number[]>([]);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [isShowing, setIsShowing] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [message, setMessage] = useState("Start the pattern, watch together, then repeat it.");
  const timersRef = useRef<number[]>([]);
  const complete = roundComplete && sequence.length >= maxSequenceRound;

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const randomTile = () => Math.floor(Math.random() * sequenceTiles.length);

  const playPattern = (pattern: number[]) => {
    if (!pattern.length) return;
    clearTimers();
    setInput([]);
    setActiveTile(null);
    setIsShowing(true);
    setRoundComplete(false);
    setMessage("Watch the signals.");

    pattern.forEach((tile, index) => {
      const startsAt = index * 720;
      timersRef.current.push(window.setTimeout(() => setActiveTile(tile), startsAt));
      timersRef.current.push(window.setTimeout(() => setActiveTile(null), startsAt + 430));
    });

    timersRef.current.push(window.setTimeout(() => {
      setIsShowing(false);
      setMessage("Your turn. Repeat the pattern.");
    }, pattern.length * 720 + 150));
  };

  const start = () => {
    const next = [randomTile()];
    setSequence(next);
    playPattern(next);
  };

  const nextRound = () => {
    const next = [...sequence, randomTile()];
    setSequence(next);
    playPattern(next);
  };

  const reset = () => {
    clearTimers();
    setSequence([]);
    setInput([]);
    setActiveTile(null);
    setIsShowing(false);
    setRoundComplete(false);
    setMessage("Start the pattern, watch together, then repeat it.");
  };

  const pickTile = (tile: number) => {
    if (isShowing || !sequence.length || roundComplete) return;
    timersRef.current.push(window.setTimeout(() => setActiveTile(null), 180));
    setActiveTile(tile);

    const expected = sequence[input.length];
    if (tile !== expected) {
      setInput([]);
      setRoundComplete(false);
      setMessage("Wrong signal. Replay the pattern and try again.");
      return;
    }

    const nextInput = [...input, tile];
    setInput(nextInput);

    if (nextInput.length === sequence.length) {
      setRoundComplete(true);
      setMessage(
        sequence.length >= maxSequenceRound
          ? "Full sequence held. Take the tiny victory."
          : "Matched. Add one more signal when you are ready.",
      );
      return;
    }

    const left = sequence.length - nextInput.length;
    setMessage(`${left} signal${left === 1 ? "" : "s"} left.`);
  };

  return (
    <div className="sequence-layout">
      <div className="sequence-card">
        <Star size={34} aria-hidden="true" />
        <span className="mini-label">Round {sequence.length || 1} of {maxSequenceRound}</span>
        <h2>Hold the pattern together.</h2>
        <p>{message}</p>

        <div className="sequence-progress" aria-label="Sequence progress">
          {Array.from({ length: maxSequenceRound }, (_, index) => (
            <span
              key={index}
              className={[
                index < input.length ? "filled" : "",
                index < sequence.length && index >= input.length ? "waiting" : "",
              ].join(" ").trim()}
            />
          ))}
        </div>

        <div className="sequence-grid" aria-label="Star sequence buttons">
          {sequenceTiles.map(({ label, Icon }, index) => (
            <button
              key={label}
              className={activeTile === index ? "sequence-tile active" : "sequence-tile"}
              type="button"
              onClick={() => pickTile(index)}
              disabled={isShowing || !sequence.length || roundComplete}
            >
              <Icon size={24} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="activity-actions">
          {!sequence.length ? (
            <button className="primary-button" type="button" onClick={start}>
              Start pattern
              <Sparkles size={16} aria-hidden="true" />
            </button>
          ) : complete ? (
            <button className="primary-button" type="button" onClick={start}>
              Play again
              <RefreshCcw size={16} aria-hidden="true" />
            </button>
          ) : roundComplete ? (
            <button className="primary-button" type="button" onClick={nextRound}>
              Add signal
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button className="primary-button" type="button" onClick={() => playPattern(sequence)} disabled={isShowing}>
              Replay pattern
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          )}
          <button className="ghost-button" type="button" onClick={reset}>
            Reset
            <RefreshCcw size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MoonKnock({ onNext }: { onNext: () => void }) {
  const [knocks, setKnocks] = useState(0);
  const open = knocks >= 3;

  const knock = () => setKnocks((value) => Math.min(value + 1, 3));

  return (
    <div className={`moon-layout ${open ? "moon-open" : ""}`}>
      <div className="moon-card knock-card">
        <span className="mini-label">Door to Moonroom</span>
        <h2>{open ? "The room is lit." : "Knock before you enter."}</h2>
        <p>
          {open
            ? "Good. You are both here now. Take one breath, then step in."
            : "Three soft knocks. No rush. Let the date start like a secret."}
        </p>
        <button className="knock-door" type="button" onClick={knock} aria-label="Knock on the Moonroom door">
          <span />
          <strong>{open ? "Open" : "Knock"}</strong>
          <em>{knocks}/3</em>
        </button>
        <div className="activity-actions">
          <button className="primary-button" type="button" onClick={open ? onNext : knock}>
            {open ? "Enter Moonroom" : "Knock again"}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const softLiePrompts = [
  "Three tiny things I secretly like",
  "Three ways I might ask for attention",
  "Three date ideas I would actually say yes to",
  "Three compliments that would ruin my composure",
  "Three things I remember from us",
];

function SoftLie({ onNext }: { onNext: () => void }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [lieIndex, setLieIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const prompt = softLiePrompts[promptIndex];

  const updateAnswer = (index: number, value: string) => {
    setAnswers((current) => current.map((answer, answerIndex) => (answerIndex === index ? value : answer)));
    setRevealed(false);
  };

  const nextPrompt = () => {
    setPromptIndex((value) => (value + 1) % softLiePrompts.length);
    setAnswers(["", "", ""]);
    setLieIndex(null);
    setRevealed(false);
  };

  return (
    <div className="moon-layout">
      <div className="moon-card soft-lie-card">
        <MessageCircle size={34} aria-hidden="true" />
        <span className="mini-label">Prompt {promptIndex + 1} of {softLiePrompts.length}</span>
        <h2>{prompt}</h2>
        <div className="truth-grid">
          {answers.map((answer, index) => (
            <label key={index} className={revealed && lieIndex === index ? "lie-revealed" : ""}>
              <span>{index + 1}</span>
              <textarea
                value={answer}
                onChange={(event) => updateAnswer(index, event.target.value)}
                placeholder={index === 0 ? "Truth, lie, or dangerous truth..." : "Write one line..."}
              />
              <button className="ghost-button" type="button" onClick={() => setLieIndex(index)}>
                {lieIndex === index ? "Soft lie" : "Mark lie"}
              </button>
            </label>
          ))}
        </div>
        <div className="activity-actions">
          <button className="ghost-button" type="button" onClick={nextPrompt}>
            New prompt
            <RefreshCcw size={16} aria-hidden="true" />
          </button>
          <button className="ghost-button" type="button" onClick={() => setRevealed(true)} disabled={lieIndex === null}>
            Reveal lie
            <Sparkles size={16} aria-hidden="true" />
          </button>
          <button className="primary-button" type="button" onClick={onNext}>
            Mood dial
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const moonMoods = [
  { label: "Playful", prompt: "Ask for one unserious promise." },
  { label: "Shy", prompt: "Say one thing you want, but softer than usual." },
  { label: "Needy", prompt: "Ask for a very specific kind of attention." },
  { label: "Calm", prompt: "Describe the place you wish you were sharing." },
  { label: "Chaotic", prompt: "Invent a ridiculous emergency only love can solve." },
  { label: "Romantic", prompt: "Say the line you would write on a note and hide." },
];

function MoodDial({ onNext }: { onNext: () => void }) {
  const [mine, setMine] = useState("Playful");
  const [hers, setHers] = useState("Romantic");
  const mineMood = moonMoods.find((mood) => mood.label === mine) ?? moonMoods[0];
  const herMood = moonMoods.find((mood) => mood.label === hers) ?? moonMoods[1];

  return (
    <div className="moon-layout">
      <div className="moon-card mood-card">
        <Heart size={34} aria-hidden="true" />
        <h2>Choose the temperature of tonight.</h2>
        <div className="mood-columns">
          <div>
            <strong>You</strong>
            <div className="mood-buttons">
              {moonMoods.map((mood) => (
                <button key={mood.label} className={mine === mood.label ? "selected" : ""} type="button" onClick={() => setMine(mood.label)}>
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <strong>Her</strong>
            <div className="mood-buttons">
              {moonMoods.map((mood) => (
                <button key={mood.label} className={hers === mood.label ? "selected" : ""} type="button" onClick={() => setHers(mood.label)}>
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="moon-result">
          <span>{mine} + {hers}</span>
          <p>{mineMood.prompt} Then let her answer with: {herMood.prompt.toLowerCase()}</p>
        </div>
        <div className="activity-actions">
          <button className="primary-button" type="button" onClick={onNext}>
            Open doors
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const blindDoors = [
  { title: "Question", text: "What is one version of you that only I get to meet?" },
  { title: "Confession", text: "Admit one small thing you wanted to say but did not." },
  { title: "Tiny dare", text: "Send a voice note that is only seven seconds long." },
  { title: "Compliment", text: "Describe one detail about her that feels unfairly attractive." },
  { title: "Future", text: "Name one ordinary thing you want to do together one day." },
  { title: "Wild card", text: "Both of you ask one yes/no question. No explaining first." },
];

function BlindChoice({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());

  const toggleDoor = (index: number) => {
    setRevealed((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="moon-layout">
      <div className="moon-card blind-card">
        <Sparkles size={34} aria-hidden="true" />
        <h2>Pick a door before you know what it wants.</h2>
        <div className="door-grid">
          {blindDoors.map((door, index) => {
            const isOpen = revealed.has(index);
            return (
              <button key={door.title} className={isOpen ? "door-card open" : "door-card"} type="button" onClick={() => toggleDoor(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{isOpen ? door.title : "Closed door"}</strong>
                <p>{isOpen ? door.text : "Choose it, then deal with whatever appears."}</p>
              </button>
            );
          })}
        </div>
        <div className="activity-actions">
          <button className="ghost-button" type="button" onClick={() => setRevealed(new Set())}>
            Close all
            <RefreshCcw size={16} aria-hidden="true" />
          </button>
          <button className="primary-button" type="button" onClick={onNext}>
            Build room
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const roomOptions = [
  { key: "light", label: "Light", options: ["Moonlamp", "Candle line", "City glow"] },
  { key: "sound", label: "Sound", options: ["Soft playlist", "Rain outside", "Almost silence"] },
  { key: "snack", label: "Snack", options: ["Fries", "Chocolate", "Fruit plate"] },
  { key: "view", label: "View", options: ["Balcony", "Window seat", "Roof at night"] },
  { key: "blanket", label: "Blanket", options: ["One huge blanket", "Two hoodies", "Fresh sheets"] },
  { key: "scent", label: "Scent", options: ["Vanilla", "Clean laundry", "After rain"] },
];

function BuildRoom({ onNext }: { onNext: () => void }) {
  const [room, setRoom] = useState<Record<string, string>>(() =>
    Object.fromEntries(roomOptions.map((option) => [option.key, option.options[0]])),
  );

  return (
    <div className="moon-layout">
      <div className="moon-card build-room-card">
        <Coffee size={34} aria-hidden="true" />
        <h2>Build the room you wish existed.</h2>
        <div className="room-builder">
          {roomOptions.map((group) => (
            <div key={group.key} className="room-option">
              <strong>{group.label}</strong>
              <div>
                {group.options.map((option) => (
                  <button
                    key={option}
                    className={room[group.key] === option ? "selected" : ""}
                    type="button"
                    onClick={() => setRoom((current) => ({ ...current, [group.key]: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="room-summary">
          Tonight: {room.light.toLowerCase()}, {room.sound.toLowerCase()}, {room.snack.toLowerCase()}, a {room.view.toLowerCase()}, {room.blanket.toLowerCase()}, and {room.scent.toLowerCase()}.
        </div>
        <div className="activity-actions">
          <button className="primary-button" type="button" onClick={onNext}>
            Write without voice
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const voicePieces = {
  opener: ["I would tell you", "If you were here", "Tonight I keep thinking", "Low key"],
  feeling: ["I miss your face", "you make me calmer", "you are trouble", "I want your attention"],
  wish: ["come closer", "stay on the call", "let me spoil you", "tell me one secret"],
  closer: ["and I mean it.", "no argument.", "right now.", "softly."],
};

function VoiceMessage({ onNext }: { onNext: () => void }) {
  const [message, setMessage] = useState({
    opener: voicePieces.opener[0],
    feeling: voicePieces.feeling[1],
    wish: voicePieces.wish[1],
    closer: voicePieces.closer[0],
  });
  const [custom, setCustom] = useState("");

  const sentence = `${message.opener} ${message.feeling}; ${message.wish}, ${message.closer}`;

  return (
    <div className="moon-layout">
      <div className="moon-card voice-card">
        <Music size={34} aria-hidden="true" />
        <h2>Make a message without recording one.</h2>
        <div className="voice-pieces">
          {Object.entries(voicePieces).map(([key, options]) => (
            <div key={key}>
              <strong>{key}</strong>
              <div>
                {options.map((option) => (
                  <button
                    key={option}
                    className={message[key as keyof typeof message] === option ? "selected" : ""}
                    type="button"
                    onClick={() => setMessage((current) => ({ ...current, [key]: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <label className="custom-line">
          Add your own line
          <input value={custom} onChange={(event) => setCustom(event.target.value)} placeholder="One extra thing only you would say..." />
        </label>
        <div className="voice-preview">
          <p>{sentence}</p>
          {custom ? <span>{custom}</span> : null}
        </div>
        <div className="activity-actions">
          <button className="primary-button" type="button" onClick={onNext}>
            Final envelope
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FinalEnvelope() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [mine, setMine] = useState("");
  const [hers, setHers] = useState("");
  const [closing, setClosing] = useState("Keep this night somewhere soft.");
  const [status, setStatus] = useState("");

  const download = async () => {
    if (!captureRef.current) return;
    setStatus("Sealing envelope...");
    const dataUrl = await toPng(captureRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#111729",
    });
    const link = document.createElement("a");
    link.download = "moonroom-envelope.png";
    link.href = dataUrl;
    link.click();
    setStatus("Downloaded. The envelope is yours.");
  };

  return (
    <div className="moon-layout">
      <div className="moon-card envelope-card">
        <div className="moon-envelope" ref={captureRef}>
          <span>Moonroom envelope</span>
          <h2>Tonight I want you to remember...</h2>
          <div className="envelope-lines">
            <label>
              My line
              <textarea value={mine} onChange={(event) => setMine(event.target.value)} placeholder="Tonight I want you to remember..." />
            </label>
            <label>
              Her line
              <textarea value={hers} onChange={(event) => setHers(event.target.value)} placeholder="Tonight I want you to remember..." />
            </label>
          </div>
          <label className="custom-line">
            Closing
            <input value={closing} onChange={(event) => setClosing(event.target.value)} />
          </label>
        </div>
        <div className="activity-actions">
          <button className="primary-button" type="button" onClick={download}>
            <Download size={16} aria-hidden="true" />
            Download envelope
          </button>
          <span className="status-text">{status || "Screenshots work too. This one is meant to be kept."}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
