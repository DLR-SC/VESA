import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import React, { useEffect } from "react";
import { ITimeData, TemporalCoverage } from "types/appData";

interface ITimeSeriesProps {
  data: ITimeData[];
  handleScroll: (range: TemporalCoverage) => void;
  initialDate: TemporalCoverage;
}

function LineSeriesChart(props: ITimeSeriesProps): JSX.Element {
  const [chartState, setChartState] = React.useState<am5xy.XYChart | null>(
    null
  ); // Chart state
  const [scrollBarChartState, setScrollbarChartState] =
    React.useState<am5xy.XYChartScrollbar | null>(null); // Scrollbar Chart state
  const customColor = { blue: am5.color(0x6894dc) }; // blue color for the stroke and fill

  const [timeRange, setTimeRange] = React.useState<TemporalCoverage>(
    props.initialDate
  );
  const [thumbMoved, setThumbMoved] = React.useState<boolean>(false);

  useEffect(() => {
    let root = am5.Root.new("time-chart");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    root.dateFormatter.setAll({
      dateFormat: "yyyy",
      dateFields: ["valueX"],
    });

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        min: new Date(props.initialDate.start_date as string).getTime(),
        max: new Date(props.initialDate.end_date as string).getTime(),
        strictMinMaxSelection: true,
        maxDeviation: 0.1,
        // groupData: true,
        // groupCount: 2500,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        maxDeviation: 0.2,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        connect: false,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical",
          labelText: "{valueY}",
        }),
        fill: customColor.blue,
        stroke: customColor.blue,
      })
    );

    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    let scrollbar = am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 60,
    });

    xAxis.onPrivate("selectionMin", function (value, target) {
      if (value) {
        let startDate = new Date(value);
        setTimeRange((prev) => ({
          ...prev,
          start_date: startDate.toISOString(),
        }));
      }
    });

    xAxis.onPrivate("selectionMax", function (value, target) {
      if (value) {
        let endDate = new Date(value);
        setTimeRange((prev) => ({
          ...prev,
          end_date: endDate.toISOString(),
        }));
      }
    });

    chart.set("scrollbarX", scrollbar);
    chart.bottomAxesContainer.children.push(scrollbar);

    const scrollBarX = chart.get("scrollbarX");
    const sbBg = scrollBarX?.get("background");

    sbBg?.setAll({
      fill: customColor.blue,
      fillOpacity: 0.1,
    });

    scrollBarX?.thumb.setAll({
      fill: customColor.blue,
      fillOpacity: 0.05,
    });

    let sbxAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        min: new Date(props.initialDate.start_date as string).getTime(),
        max: new Date(props.initialDate.end_date as string).getTime(),
        // groupData: true,
        // groupIntervals: [{ timeUnit: "month", count: 1 }],
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          opposite: false,
          strokeOpacity: 0,
        }),
      })
    );

    let sbyAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let sbseries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueYField: "value",
        valueXField: "date",
        stroke: customColor.blue,
      })
    );

    sbseries.strokes.template.setAll({
      strokeWidth: 2,
    });
    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    series.appear(1000, 100);
    chart.appear(1000, 100);

    setChartState(chart);
    setScrollbarChartState(scrollbar);
    return () => {
      root.dispose();
      chart.dispose();
    }; // Cleanup function
  }, []);

  /** Setting the data for lineseries and scrollbar series */
  useEffect(() => {
    const isChartStateReady = chartState && chartState.series.length > 0;
    const isScrollBarChartStateReady =
      scrollBarChartState && scrollBarChartState.chart.series.length > 0;

    if (isChartStateReady && isScrollBarChartStateReady) {
      const sbSeries = scrollBarChartState.chart.series.getIndex(0);
      const lineSeries = chartState.series.getIndex(0);

      if (sbSeries && lineSeries) {
        lineSeries.data.setAll(props.data);
        sbSeries.data.setAll(props.data);
      }

      chartState.zoomOut();
    }
  }, [props.data, chartState, scrollBarChartState]);

  useEffect(() => {
    if (chartState) {
      props.handleScroll(timeRange);
    }
  }, [timeRange]);

  return <div id="time-chart" className="chart_div" />;
}
export default LineSeriesChart;
