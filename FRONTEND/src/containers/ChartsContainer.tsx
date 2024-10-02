import { Box, Grid, Paper, useTheme } from "@mui/material";
import { appBarHeight } from "../components/AppBar";
import { calculateRowHeights } from "../store/dataset/utility/utility";
import ResultBox from "../components/ResultBox";
import SearchBox from "../components/SearchBox";
import GeoContainer from "./GeoContainer";
import LineSeriesChartContainer from "./LineSeriesChartContainer";
import NodeChartContainer from "./NodeChartContainer";
import WordCloudContainer from "./WordCloudContainer";
import Chartspaper from "../components/ChartsPaper";

function ChartsContainer(): JSX.Element {
  const theme = useTheme();
  const viewportHeight = window.innerHeight;
  const { firstRowHeight, secondRowHeight } = calculateRowHeights(
    viewportHeight,
    appBarHeight
  );

  const gridSettings = {
    flex: 1,
    padding: theme.spacing(2),
    columnSpacing: theme.spacing(2),
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container {...gridSettings} paddingBottom={0}>
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <SearchBox />
            <WordCloudContainer />
          </Chartspaper>
        </Grid>
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
          <ResultBox />
        </Grid>
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <GeoContainer />
          </Chartspaper>
        </Grid>
      </Grid>
      <Grid container {...gridSettings}>
        <Grid item xs={12} sm={4} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <NodeChartContainer />
          </Chartspaper>
        </Grid>
        <Grid item xs={12} sm={8} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <LineSeriesChartContainer />
          </Chartspaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChartsContainer;
