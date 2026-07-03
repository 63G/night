import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Coffee,
  CornerDownLeft,
  Download,
  Heart,
  Music,
  Plane,
  RefreshCcw,
  RotateCcw,
  Sparkles,
  Star,
  Target,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { toPng } from "html-to-image";
import {
  type CSSProperties,
  Fragment,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ActivityId =
  | "flower"
  | "would-you-rather"
  | "memory"
  | "wordle"
  | "painting"
  | "battle-ships"
  | "letters";

type Activity = {
  id: ActivityId;
  title: string;
  eyebrow: string;
  guidance: string;
};

const activities: Activity[] = [
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

function App() {
  const [step, setStep] = useState(() => {
    const saved = window.localStorage.getItem("threadlight-step");
    return saved ? Math.min(Number(saved), activities.length - 1) : 0;
  });
  const [completed, setCompleted] = useState<Set<ActivityId>>(() => {
    const saved = window.localStorage.getItem("threadlight-completed");
    return new Set(saved ? (JSON.parse(saved) as ActivityId[]) : []);
  });

  useEffect(() => {
    window.localStorage.setItem("threadlight-step", String(step));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    window.localStorage.setItem(
      "threadlight-completed",
      JSON.stringify([...completed]),
    );
  }, [completed]);

  const activity = activities[step];
  const progress = Math.round(((step + 1) / activities.length) * 100);

  const completeAndNext = () => {
    setCompleted((current) => new Set(current).add(activity.id));
    setStep((current) => Math.min(current + 1, activities.length - 1));
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 0));

  const resetNight = () => {
    setCompleted(new Set());
    setStep(0);
    window.localStorage.removeItem("threadlight-step");
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
            <span>long-distance date night</span>
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
          {activities.map((item, index) => (
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
          {step < activities.length - 1 ? (
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

export default App;
