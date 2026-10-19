
import { motion } from 'framer-motion';
import { BAR_COLORS, classify } from '../../lib/colors.js';

export default function ArrayBars({ array, highlights }) {
  if (!array?.length) {
    return (
      <div className="h-72 grid place-items-center text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
        Enter an array and press Run.
      </div>
    );
  }

  const max = Math.max(...array, 1);

  return (
    <div
      className="flex items-end gap-1 h-72 w-full px-2"
      role="img"
      aria-label="Array visualization"
    >
      {array.map((v, i) => {
        const cls = classify(i, highlights);

        return (
          <motion.div
            key={i}
            layout
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 24,
            }}
            className="flex-1 rounded-t-md relative"
            style={{
              height: `${Math.max(6, (v / max) * 100)}%`,
              background: BAR_COLORS[cls],
            }}
            title={`index ${i}: ${v}`}
          >
            {array.length <= 30 && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-300">
                {v}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
