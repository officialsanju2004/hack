
import { useEffect, useState } from 'react';
import { api, getClientId } from '../../api/client.js';

export default function ScenarioLibrary({ onLoad }) {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(
        `/scenarios?clientId=${getClientId()}`
      );
      setItems(data.scenarios);
    } catch (error) {
      console.error('Failed to load scenarios:', error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    try {
      await api.delete(`/scenarios/${id}`);
      await load();
    } catch (error) {
      console.error('Failed to delete scenario:', error);
    }
  };

  return (
    <div className="card p-4 text-sm space-y-2">
      <h3 className="font-semibold text-slate-300">
        Saved scenarios
      </h3>

      {items.length === 0 && (
        <p className="text-xs text-slate-500">
          No saved scenarios yet.
        </p>
      )}

      <ul className="space-y-1 max-h-40 overflow-auto">
        {items.map((s) => (
          <li
            key={s._id}
            className="flex justify-between items-center bg-white/5 rounded px-2 py-1 text-xs"
          >
            <button
              className="text-left flex-1 hover:text-accent"
              onClick={() => onLoad(s)}
            >
              {s.name}{' '}
              <span className="text-slate-500">
                ({s.category})
              </span>
            </button>

            <button
              className="text-swap"
              onClick={() => del(s._id)}
              aria-label={`Delete ${s.name}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
