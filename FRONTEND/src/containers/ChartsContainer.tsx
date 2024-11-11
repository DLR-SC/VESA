import { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import SearchBox from "../components/SearchBox";
import ResultBox from "../components/ResultBox";
import GeoContainer from "./GeoContainer";
import LineSeriesChartContainer from "./LineSeriesChartContainer";
import NodeChartContainer from "./NodeChartContainer";
import WordCloudContainer from "./WordCloudContainer";
import { chartsInfo } from "../data/chartsInformation";
import Chartspaper from "../components/ChartsPaper";
import InfoCard from "../components/InfoCard";

// Layout settings for each item (position and size)
const layout: Layout[] = [
  { i: "search_wordcloud", x: 0, y: 0, w: 4, h: 2 },
  { i: "results", x: 4, y: 0, w: 4, h: 2 },
  { i: "geo", x: 8, y: 0, w: 4, h: 2 },
  { i: "node_chart", x: 0, y: 3, w: 4, h: 2 },
  { i: "line_series", x: 4, y: 3, w: 8, h: 2 },
];

// Chart items configuration array
const chartItems = [
  {
    key: "search_wordcloud",
    content: (
      <>
        <SearchBox />
        <WordCloudContainer />
      </>
    ),
    infoTitle: chartsInfo.wordCloud.title,
    infoDescription: chartsInfo.wordCloud.description,
  },
  {
    key: "results",
    content: <ResultBox />,
    infoTitle: chartsInfo.resultsTable.title,
    infoDescription: chartsInfo.resultsTable.description,
  },
  {
    key: "geo",
    content: <GeoContainer />,
    infoTitle: chartsInfo.mapsContainer.title,
    infoDescription: chartsInfo.mapsContainer.description,
  },
  {
    key: "node_chart",
    content: <NodeChartContainer />,
    infoTitle: chartsInfo.nordDirectedGraphs.title,
    infoDescription: chartsInfo.nordDirectedGraphs.description,
  },
  {
    key: "line_series",
    content: <LineSeriesChartContainer />,
    infoTitle: chartsInfo.columnBarChart.title,
    infoDescription: chartsInfo.columnBarChart.description,
  },
];

const ChartsContainer = (): JSX.Element => {
  const theme = useTheme();
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  const ChartItem = ({
    content,
    infoTitle,
    infoDescription,
  }: {
    content: React.ReactNode;
    infoTitle: string;
    infoDescription: string;
  }) => (
    <Chartspaper>
      {content}
      <InfoCard title={infoTitle} description={infoDescription} />
    </Chartspaper>
  );

  const gridItems = useMemo(() =>
    chartItems.map(({ key, content, infoTitle, infoDescription }) => (
      <div key={key} className="chart-container">
        <ChartItem
          content={content}
          infoTitle={infoTitle}
          infoDescription={infoDescription}
        />
      </div>
    ))
  ,[chartItems]);

  return (
    <ReactGridLayout
      className="layout"
      layout={layout}
      maxRows={2}
      isDraggable={true}
      isResizable={true}
      margin={[10, 10]}
      useCSSTransforms={true}
    >
      {gridItems}
    </ReactGridLayout>
  );
};

export default ChartsContainer;
