

  import { useState, useEffect } from "react";

const cases = [
  {
    title: "🔥 انفجار الميناء الغامض",
    intro: "حدث انفجار ضخم في الميناء أثناء الليل...",
    clues: [
      "تم تعطيل الكاميرات",
      "تم العثور على جهاز توقيت",
      "شخص هرب نحو السفينة",
    ],
    suspects: [
      { name: "قائد السفينة", guilty: false },
      { name: "مهندس الأنظمة", guilty: true },
      { name: "حارس الميناء", guilty: false },
    ],
  },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [result, setResult] = useState("");

  const current = cases[0];

  useEffect(() => {
    if (time <= 0) {
      setResult("⏰ انتهى الوقت!");
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const checkAnswer = (suspect) => {
    if (suspect.guilty) {
      setResult("✔️ تم حل القضية!");
      setScore(score + 1);
    } else {
      setResult("❌ الشخص الخطأ!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #111827, #581c87, #000)",
        color: "white",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          borderRadius: "25px",
          padding: "25px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "35px" }}>
          🕵️ Black Crime Files
        </h1>

        <p style={{ textAlign: "center", color: "#f9a8d4" }}>
          Shahd Abu Nofal
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h2>🔎 الأدلة</h2>

            {current.clues.map((clue, index) => (
              <p key={index}>• {clue}</p>
            ))}
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>{current.title}</h2>
            <p>{current.intro}</p>

            <h3>⏳ {time}s</h3>
            <h3>⭐ {score}</h3>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h2>👤 المشتبه بهم</h2>

            {current.suspects.map((suspect, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(suspect)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#7c3aed",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {suspect.name}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <h2 style={{ textAlign: "center", marginTop: "25px" }}>
            {result}
          </h2>
        )}
      </div>
    </div>
  );
    }
