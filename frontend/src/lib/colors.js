export const BAR_COLORS = { default: '#334155', compare: '#fde68a', swapped: '#fca5a5', sorted: '#86efac', current: '#93c5fd', pivot: '#c4b5fd', found: '#5eead4' };
export function classify(index, hl) {
if (!hl) return 'default';
if (hl.found?.includes(index)) return 'found';
if (hl.swapped?.includes(index)) return 'swapped';
if (hl.compare?.includes(index)) return 'compare';
if (hl.pivot?.includes(index)) return 'pivot';
if (hl.current?.includes(index)) return 'current';
if (hl.sorted?.includes(index)) return 'sorted';
if (hl.range && index >= hl.range[0] && index <= hl.range[1]) return 'current';
return 'default';
}
