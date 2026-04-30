import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// 🕵️‍♀️🔥 Detective Game - Shahd Abu Nofal Edition
const cases = [
  {
    title: "🔥 انفجار الميناء الغامض",
    intro: "حدث انفجار ضخم في الميناء أثناء الليل... القضية بين يديك الآن.",
    atmosphere: "🚨 الشرطة تطوّق المنطقة - أضواء حمراء وزرقاء تملأ المكان",
    clues: [
      "تم تعطيل الكاميرات قبل الحادث",
      "تم العثور على جهاز توقيت",
      "شخص شوهد يهرب نحو السفينة",
    ],
    suspects: [
      { name: "قائد السفينة", guilty: false, hint: "كان في عرض البحر وقت الحادث" },
      { name: "مهندس الأنظمة", guilty: true, hint: "خبير في التحكم والبرمجة المتفجرة" },
      { name: "حارس الميناء", guilty: false, hint: "أصيب أثناء الانفجار" },
    ],
  },
  {
    title: "⚔️ اختطاف داخل المدينة",
    intro: "طفل مفقود من منطقة محصنة بالكامل بدون أي أثر اقتحام.",
    atmosphere: "🚔 المدينة مغلقة - فرق التحقيق في كل زاوية",
    clues: [
      "لا يوجد كسر في الأبواب",
      "تعطيل كامل لنظام الإنذار",
      "رسالة فدية مشفّرة وصلت",
    ],
    suspects: [
      { name: "حارس الأمن", guilty: true, hint: "يمتلك صلاحيات النظام بالكامل" },
      { name: "السائق", guilty: false, hint: "كان خارج المدينة" },
      { name: "جار المبنى", guilty: false, hint: "لا علاقة له بالحادث" },
    ],
  },
];

export default function ShahdDetectiveGame() {
  const [scene, setScene] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);

  const current = cases[scene];

  useEffect(() => {
    if (result) return;
    if (time === 0) {
      setResult("fail");
      return;
    }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, result]);

  const check = (s) => {
    setSelected(s.name);

    if (s.guilty) {
      setResult("win");
      setScore((prev) => prev + 1);
    } else {
      setResult("fail");
    }
  };

  const next = () => {
    setScene((s) => (s + 1) % cases.length);
    setSelected(null);
    setResult(null);
    setTime(30);
  };

  const restart = () => {
    setScene(0);
    setSelected(null);
    setResult(null);
    setScore(0);
    setTime(30);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black p-6">

      <div className="w-full max-w-6xl p-2 rounded-[30px] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 shadow-2xl">

        <Card className="rounded-[25px] bg-black/70 text-white backdrop-blur-xl border border-white/10">
          <CardContent className="p-6">

            {/* الهيدر */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">🕵️‍♀️ لعبة التحقيق الاحترافية</h1>
              <p className="text-pink-300 font-semibold">Shahd Abu Nofal</p>
              <p className="text-sm text-gray-400">🎮 Detective Action Story Game</p>
            </div>

            {/* الساحة */}
            <div className="grid grid-cols-3 gap-4">

              {/* الأدلة */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h2 className="font-bold mb-2">🔎 الأدلة</h2>
                <ul className="list-disc ml-4 text-sm text-gray-300">
                  {current.clues.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* المشهد */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                <h2 className="text-lg font-bold mb-2">{current.title}</h2>
                <p className="text-sm text-gray-300 mb-2">{current.intro}</p>
                <p className="text-red-300 italic mb-4">{current.atmosphere}</p>

                <div className="text-xl mb-2">⏳ {time}s</div>
                <div className="text-yellow-300">⭐ {score}</div>
              </div>

              {/* المشتبه بهم */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h2 className="font-bold mb-2">👤 المشتبه بهم</h2>

                <div className="flex flex-col gap-2">
                  {current.suspects.map((s, i) => (
                    <Button key={i} onClick={() => check(s)} disabled={!!result}>
                      {s.name}
                    </Button>
                  ))}
                </div>

                {selected && (
                  <p className="mt-3 text-xs text-yellow-300">
                    💡 {current.suspects.find((s) => s.name === selected)?.hint}
                  </p>
                )}
              </div>

            </div>

            {/* النتائج */}
            {result && (
              <div className="text-center mt-6">
                {result === "win" ? (
                  <p className="text-green-400 font-bold text-lg">✔️ تم حل القضية!</p>
                ) : (
                  <p className="text-red-400 font-bold text-lg">❌ فشلت المهمة!</p>
                )}

                <div className="flex gap-2 justify-center mt-3">
                  <Button onClick={next}>القضية التالية ➡️</Button>
                  <Button onClick={restart} variant="secondary">إعادة اللعبة 🔁</Button>
                </div>
              </div>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
