import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useState } from "react";
import { ChordData } from "types/appData";

interface INodeChartProps {
  data: ChordData[];
}

const NodeChart: React.FC<INodeChartProps> = ({ data }) => {
  const [chartSeries, setChartSeries] = useState<am5flow.ChordDirected | null>(
    null
  );

  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
    
    // create zoomable container for nodecharts
    let zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        maxZoomLevel: 3,
      })
    );

    let zoomTools = zoomableContainer.children.push(
      am5.ZoomTools.new(root, {
        target: zoomableContainer,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/flow-charts/
    let series = zoomableContainer.contents.children.push(
      am5flow.ChordDirected.new(root, {
        startAngle: 80,
        padAngle: 1,
        linkHeadRadius: undefined,
        sourceIdField: "from",
        targetIdField: "to",
        valueField: "value",
      })
    );

    series.nodes.labels.template.setAll({
      textType: "radial",
      centerX: 0,
      fontSize: 7,
    });

    series.links.template.set("fillStyle", "source");

    setChartSeries(series);

    series.appear(1000, 100);

    return () => {
      series?.dispose();
      root?.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartSeries) {
      chartSeries.data.setAll(data);
    }

    if(data.length > 80) {
      if(chartSeries) chartSeries.set("padAngle", 1.5)
    }
  }, [data, chartSeries]);

  return <div id="chartdiv" className="chart_div"></div>;
};

export default NodeChart;

/**
 * I have made a funtion to process the data from the API response to the format required by amCharts.
 *
 * I do not know to change the data in other charts based on the data from this chart.
 */
