import { User, Layers, Gauge, HelpCircle, Trophy, Check } from "lucide-react";

function QuizStepper({ currentStep }) {
  const steps = [
    { key: "username", label: "Username", icon: User },
    { key: "category", label: "Category", icon: Layers },
    { key: "difficulty", label: "Difficulty", icon: Gauge },
    { key: "quiz", label: "Quiz", icon: HelpCircle },
    { key: "result", label: "Result", icon: Trophy },
  ];

  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="mb-10 overflow-x-auto">
      <div className="flex min-w-max justify-center items-center gap-3 text-sm font-semibold">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed = index < currentIndex;
          const active = index === currentIndex;

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
                  completed
                    ? "bg-green-500/10 border-green-500 text-green-400"
                    : active
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                      : "bg-white/5 border-white/10 text-slate-500"
                }`}
              >
                {completed ? <Check size={16} /> : <Icon size={16} />}
                <span>{step.label}</span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    completed ? "bg-green-500" : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizStepper;
