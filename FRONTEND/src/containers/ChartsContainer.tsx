import { Box, Grid, useTheme } from "@mui/material";
import ResultBox from "../components/ResultBox";
import SearchBox from "../components/SearchBox";
import GeoContainer from "./GeoContainer";
import LineSeriesChartContainer from "./LineSeriesChartContainer";
import NodeChartContainer from "./NodeChartContainer";
import WordCloudContainer from "./WordCloudContainer";
import Chartspaper from "../components/ChartsPaper";
import InfoCard from "../components/InfoCard";
import { chartsInfo } from "../data/chartsInformation";

function ChartsContainer(): JSX.Element {
  const theme = useTheme();

  const gridSettings = {
    flex: 1,
    padding: theme.spacing(2),
    columnSpacing: theme.spacing(2),
  };

  // Configuration array for chart items
  const chartItems = [
    {
      xs: 4,
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
      xs: 4,
      content: <ResultBox />,
      infoTitle: chartsInfo.resultsTable.title,
      infoDescription: chartsInfo.resultsTable.description,
    },
    {
      xs: 4,
      content: <GeoContainer />,
      infoTitle: chartsInfo.mapsContainer.title,
      infoDescription: chartsInfo.mapsContainer.description,
    },
    {
      xs: 12,
      sm: 4,
      content: <NodeChartContainer />,
      infoTitle: chartsInfo.nordDirectedGraphs.title,
      infoDescription: chartsInfo.nordDirectedGraphs.description,
    },
    {
      xs: 12,
      sm: 8,
      content: <LineSeriesChartContainer />,
      infoTitle: chartsInfo.columnBarChart.title,
      infoDescription: chartsInfo.columnBarChart.description,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* First Row */}
      <Grid container {...gridSettings} paddingBottom={0}>
        {chartItems.slice(0, 3).map((item, index) => (
          <Grid
            item
            key={index}
            xs={item.xs}
            display="flex"
            flexDirection="column"
          >
            <Chartspaper>
              {item.content}
              <InfoCard title={item.infoTitle} description={item.infoDescription} />
            </Chartspaper>
          </Grid>
        ))}
      </Grid>
      {/* Second Row */}
      <Grid container {...gridSettings}>
        {chartItems.slice(3).map((item, index) => (
          <Grid
            item
            key={index + 3} // Adjusted index to ensure unique keys
            xs={item.xs}
            sm={item.sm}
            display="flex"
            flexDirection="column"
          >
            <Chartspaper>
              {item.content}
              <InfoCard title={item.infoTitle} description={item.infoDescription} />
            </Chartspaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ChartsContainer;
