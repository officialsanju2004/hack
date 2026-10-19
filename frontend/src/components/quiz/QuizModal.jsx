
import { useMemo, useState } from 'react';
import { useStore } from '../../store/useStore.js';
import { api, getClientId } from '../../api/client.js';

export default function QuizModal({ open, onClose }) {
  const { steps, currentStep, activeAlgorithm, next } = useStore();

  const [answer, setAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const question = useMemo(() => {
    if (!open || currentStep >= steps.length - 1) return null;

    const now = steps[currentStep];
    const nextStep = steps[currentStep + 1];
    const correct = nextStep.explanation;

    const opts = [correct];
    const pool = steps
      .filter((_, i) => i !== currentStep + 1)
      .map((s) => s.explanation);

    while (opts.length < 3 && pool.length) {
      const pick = pool.splice(
        Math.floor(Math.random() * pool.length),
        1
      )[0];

      if (!opts.includes(pick)) opts.push(pick);
    }

    opts.sort(() => Math.random() - 0.5);

    return { now, correct, opts };
  }, [open, currentStep, steps]);

  const submit = async (opt) => {
    if (!question) return;

    const ok = opt === question.correct;

    setAnswer(opt);
    setFeedback(
      ok
        ? 'Correct!'
        : `Not quite. Correct: "${question.correct}"`
    );

    try {
      await api.post('/quiz/attempts', {
        clientId: getClientId(),
        algorithm: activeAlgorithm?.id || 'unknown',
        correct: ok,
        chosen: opt,
        expected: question.correct,
      });
    } catch (error) {
      console.error('Failed to save quiz attempt:', error);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="card p-5 max-w-xl w-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">
            Predict the next step
          </h3>

          <button
            className="btn"
            onClick={() => {
              setAnswer(null);
              setFeedback(null);
              onClose();
            }}
          >
            Close
          </button>
        </div>

        {!question ? (
          <p className="text-sm text-slate-400">
            Step forward a bit first.
          </p>
        ) : (
          <>
            <p className="text-sm text-slate-300 mb-3">
              Current: “{question.now.explanation}”
            </p>

            <div className="space-y-2">
              {question.opts.map((o, i) => (
                <button
                  key={i}
                  disabled={!!answer}
                  onClick={() => submit(o)}
                  className={`w-full text-left text-sm p-2 rounded border border-white/10 ${
                    answer === o
                      ? 'bg-accent/20'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-3 text-sm">
                <p
                  className={
                    feedback.startsWith('Correct')
                      ? 'text-accent'
                      : 'text-swap'
                  }
                >
                  {feedback}
                </p>

                <button
                  className="btn mt-2"
                  onClick={() => {
                    setAnswer(null);
                    setFeedback(null);
                    next();
                  }}
                >
                  Advance one step
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
