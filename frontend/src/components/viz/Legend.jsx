import { BAR_COLORS } from '../../lib/colors.js';
const items = [['Comparing','compare'],['Swapped','swapped'],['Sorted','sorted'],['Current','current'],['Pivot','pivot'],['Found','found']];
export default function Legend() {
return (<div className="flex flex-wrap gap-3 text-xs text-slate-300">
{items.map(([label, key]) => (<div key={key} className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: BAR_COLORS[key] }} />{label}</div>))}

  </div>);
}
