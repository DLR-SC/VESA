import { useMemo } from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import Chartspaper from "../components/ChartsPaper";
import InfoCard from "../components/InfoCard";
import ResultBox from "../components/ResultBox";
import SearchBox from "../components/SearchBox";
import { chartsInfo } from "../data/chartsInformation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import GeoContainer from "./GeoContainer";
import LineSeriesChartContainer from "./LineSeriesChartContainer";
import NodeChartContainer from "./NodeChartContainer";
import WordCloudContainer from "./WordCloudContainer";
import { updateGridLayout } from "../store/ui/uiSlice";

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
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const realignMode = useAppSelector((state) => state.ui.realignMode);
  const gridLayout = useAppSelector((state) => state.ui.gridLayout);
  const dispatch = useAppDispatch();

  const handleLayoutChange = (layout: Layout[]) => {
    dispatch(updateGridLayout(layout));
  };

  return (
    <ReactGridLayout
      className="layout"
      layout={gridLayout}
      isDraggable={realignMode}
      isResizable={realignMode}
      margin={[10, 10]}
      useCSSTransforms={true}
      onLayoutChange={handleLayoutChange}
    >
      {chartItems.map(({ key, content, infoTitle, infoDescription }) => (
        <div key={key} className="chart-container">
          <Chartspaper realignMode={realignMode}>
            {content}
            <InfoCard title={infoTitle} description={infoDescription} />
          </Chartspaper>
        </div>
      ))}
    </ReactGridLayout>
  );
};

export default ChartsContainer;
