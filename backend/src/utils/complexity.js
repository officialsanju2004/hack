export const COMPLEXITY = {
bubble:    { time: 'O(n²)', space: 'O(1)', why: 'Nested loops over the array; in-place swaps.' },
selection: { time: 'O(n²)', space: 'O(1)', why: 'Outer scan + inner scan to find minimum; in-place.' },
insertion: { time: 'O(n²)', space: 'O(1)', why: 'Insert each element into a growing sorted prefix.' },
merge:     { time: 'O(n log n)', space: 'O(n)', why: 'log n levels, each merges in linear time.' },
quick:     { time: 'O(n log n) avg', space: 'O(log n)', why: 'Partition around pivot; stack averages log n.' },
linear:    { time: 'O(n)', space: 'O(1)', why: 'Check every element once.' },
binary:    { time: 'O(log n)', space: 'O(1)', why: 'Halve the search range each comparison.' },
bfs:       { time: 'O(V + E)', space: 'O(V)', why: 'Visit each vertex/edge once; queue holds frontier.' },
dfs:       { time: 'O(V + E)', space: 'O(V)', why: 'Visit each vertex/edge once; stack holds path.' },
dijkstra:  { time: 'O((V + E) log V)', space: 'O(V)', why: 'Priority-queue shortest-path relaxation.' }
};
