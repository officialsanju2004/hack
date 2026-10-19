
import { z } from 'zod';
import { ALGORITHMS } from '../services/algorithms/index.js';

const sortingSchema = z.object({
  algorithm: z.enum([
    'bubble',
    'selection',
    'insertion',
    'merge',
    'quick',
  ]),
  input: z.object({
    array: z.array(z.number().int().min(-999).max(999)).min(1).max(120),
  }),
});

const searchSchema = z.object({
  algorithm: z.enum(['linear', 'binary']),
  input: z.object({
    array: z.array(z.number().int()).min(1).max(120),
    target: z.number().int(),
  }),
});

const graphSchema = z.object({
  algorithm: z.enum(['bfs', 'dfs', 'dijkstra']),
  input: z.object({
    graph: z.object({
      nodes: z.array(
        z.object({
          id: z.string(),
          label: z.string().optional(),
          x: z.number(),
          y: z.number(),
        })
      ).max(60),
      edges: z.array(
        z.object({
          from: z.string(),
          to: z.string(),
          weight: z.number().positive().max(999).optional(),
          directed: z.boolean().optional(),
        })
      ).max(200),
      start: z.string(),
      target: z.string().optional(),
    }),
  }),
});

const schemas = {
  bubble: sortingSchema,
  selection: sortingSchema,
  insertion: sortingSchema,
  merge: sortingSchema,
  quick: sortingSchema,
  linear: searchSchema,
  binary: searchSchema,
  bfs: graphSchema,
  dfs: graphSchema,
  dijkstra: graphSchema,
};

export function runAlgorithm(req, res, next) {
  try {
    const { algorithm } = req.body || {};
    const schema = schemas[algorithm];

    if (!schema) {
      return res.status(400).json({ error: 'Unknown algorithm' });
    }

    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(422).json({
        error: parsed.error.issues
          .map((i) => `${i.path.join('.')}: ${i.message}`)
          .join('; '),
      });
    }

    if (algorithm === 'binary') {
      const arr = req.body.input.array;

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
          return res.status(422).json({
            error: 'Binary search needs a sorted array.',
          });
        }
      }
    }

    const algo = ALGORITHMS[algorithm];
    const result = algo.run(req.body.input);

    res.json({
      algorithm,
      meta: { ...algo, run: undefined },
      ...result,
    });
  } catch (e) {
    next(e);
  }
}
