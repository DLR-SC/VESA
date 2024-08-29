import React from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { IWordCloudData } from "types/appData";
import _ from "lodash";

interface IBarChartProps {
  data: IWordCloudData[];
  handleActiveColumnChange: (filterValue: any) => void;
}

function BarChart(props: IBarChartProps): JSX.Element {
  const series = React.useRef<am5xy.ColumnSeries>();
  const chart = React.useRef<am5xy.XYChart>();
  const xAxis = React.useRef<am5xy.CategoryAxis<am5xy.AxisRenderer>>();
  const activeColumnRef = React.useRef<am5.Sprite & am5.RoundedRectangle>();

  React.useLayoutEffect(() => {
    const root = am5.Root.new("year-chart");
    root.setThemes([am5themes_Animated.new(root)]);

    chart.current = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    const cursor = chart.current.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create Y-axis
    const yAxis = chart.current.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
      })
    );

    // x renderer
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    // Create X-Axis
    xAxis.current = chart.current.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.2,
        renderer: xRenderer,
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series.current = chart.current.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "occurence",
        xAxis: xAxis.current,
        yAxis: yAxis,
        valueYField: "count",
        sequencedInterpolation: true,
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.current.columns.template.setAll({
      // interactive: true,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
      toggleKey: "active",
    });

    // selection state
    series.current.columns.template.states.create("active", {
      fill: root.interfaceColors.get("primaryButtonHover"),
      stroke: root.interfaceColors.get("primaryButtonHover"),
    });

    // // create selected state for column
    series.current.columns.template.on("active", (active, target) => {
      if (activeColumnRef.current) {
        activeColumnRef.current.set("active", false);
      }
      if (active) {
        activeColumnRef.current = target;
        props.handleActiveColumnChange(target?.dataItem?.dataContext);
      } else {
        if (activeColumnRef.current === target) {
          activeColumnRef.current = undefined;
          // Call the function only when deactivating the column
          props.handleActiveColumnChange(target?.dataItem?.dataContext);
        }
      }
    });

    const button = chart.current.children.push(
      am5.Button.new(root, {
        dx: 10,
        dy: 10,
        label: am5.Label.new(root, {
          text: "Reset",
        }),
      })
    );

    button.events.on("click", () => {
      props.handleActiveColumnChange({year: 0});
    });

    return () => {
      root.dispose();
    };
  }, []);

  React.useLayoutEffect(() => {
    if (props.data) {
      const data = dataReducer(props.data);
      xAxis.current?.data.setAll(data);
      series.current?.data.setAll(data);
      series.current?.appear(1000);
      chart.current?.appear(1000, 100);
    }
  }, [props.data]);

  return (
    <>
      <div id="year-chart" style={{ width: "100%", height: "500px" }} />
    </>
  );
}

const dataReducer = (data: IWordCloudData[]) => {
  interface GroupedData {
    [year: number]: { year: number; count: number };
  }
  const groupedData: GroupedData = data.reduce((acc, item) => {
    const { year } = item;
    if (acc[year]) {
      acc[year].count += 1;
    } else {
      acc[year] = { year, count: 1 };
    }
    return acc;
  }, {} as GroupedData);

  // Convert grouped data object to array
  const chartData = Object.values(groupedData);

  //   chartData.sort((a, b) => b.count - a.count)
  return chartData;
};

export default BarChart;
