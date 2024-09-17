import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import React from "react";
import { CrossfilterGroup, TimeChartFilter } from "types/appData";

interface ITimeSeriesProps {
  // data: TimeSeriesTransformed[];
  data: CrossfilterGroup[];
  handleFilter: (key: keyof TimeChartFilter, date: number) => void;
}

function TimeSeriesChart(props: ITimeSeriesProps): JSX.Element {
  React.useLayoutEffect(() => {
    const root = am5.Root.new("time-series-chart");
    const myTheme = am5.Theme.new(root);

    // Set themes
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // Add cursor
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true, // to group togethter data when zoomed out
        maxDeviation: 1,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "key",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
        minBulletDistance: 10,
      })
    );

    // Actual bullet
    series.bullets.push(() => {
      const bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill"),
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    // Add scrollbar
    const scrollbar = chart.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 60,
      })
    );

    chart.bottomAxesContainer.children.push(scrollbar);

    const sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70,
        }),
      })
    );

    // Listener for start and end date filters
    xAxis.onPrivate("selectionMin", (value, target) => {
      const startDateinDataset = props?.data[0]?.key as number;
      if (value && value >= startDateinDataset) {
        props.handleFilter("min", value);
      }
    });

    xAxis.onPrivate("selectionMax", (value, target) => {
      const endDateinDataset = props?.data[props?.data?.length - 1]
        ?.key as number;
      if (value && value <= endDateinDataset) props.handleFilter("max", value);
    });

    const sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "value",
        valueXField: "key",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis,
      })
    );

    // Set data
    series.data.setAll(props.data);
    sbSeries.data.setAll(props.data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [props.data]);

  return (
    <>
      <div id="time-series-chart" style={{ width: "100%", height: "300px" }} />
    </>
  );
}
export default TimeSeriesChart;
