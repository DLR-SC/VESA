import { Layout } from "react-grid-layout";

export const chartsDefaultLayout: Layout[] = [
  { i: "search_wordcloud", x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 },
  { i: "results", x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "geo", x: 8, y: 0, w: 4, h: 2, minW: 4, minH: 2 },
  { i: "node_chart", x: 0, y: 3, w: 4, h: 2, minW: 4, minH: 2 },
  { i: "line_series", x: 4, y: 3, w: 8, h: 2, minW: 4, minH: 2 },
];
