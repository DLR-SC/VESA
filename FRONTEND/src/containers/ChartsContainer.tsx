import { Box, Grid, useTheme } from "@mui/material";
import ResultBox from "../components/ResultBox";
import SearchBox from "../components/SearchBox";
import GeoContainer from "./GeoContainer";
import LineSeriesChartContainer from "./LineSeriesChartContainer";
import NodeChartContainer from "./NodeChartContainer";
import WordCloudContainer from "./WordCloudContainer";
import Chartspaper from "../components/ChartsPaper";
import InfoCard from "../components/InfoCard";

function ChartsContainer(): JSX.Element {
  const theme = useTheme();

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
            <>
              <SearchBox />
              <WordCloudContainer />
            </>
            <InfoCard title="sample" description="sample text" />
          </Chartspaper>
        </Grid>
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <ResultBox />
            <InfoCard title="sample" description="sample text" />
          </Chartspaper>
        </Grid>
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <GeoContainer />
            <InfoCard title="sample" description="sample text" />
          </Chartspaper>
        </Grid>
      </Grid>
      <Grid container {...gridSettings}>
        <Grid item xs={12} sm={4} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <NodeChartContainer />
            <InfoCard title="sample" description="sample text" />
          </Chartspaper>
        </Grid>
        <Grid item xs={12} sm={8} display={"flex"} flexDirection={"column"}>
          <Chartspaper>
            <LineSeriesChartContainer />
            <InfoCard title="sample" description="sample text" />
          </Chartspaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChartsContainer;
