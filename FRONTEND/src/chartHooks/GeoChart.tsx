import * as am5 from "@amcharts/amcharts5";
import * as am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { IClusteredDataItem } from "@amcharts/amcharts5/.internal/charts/map/ClusteredPointSeries";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import React, { useEffect, useState, useRef } from "react";
import { IDatasetID, IGeoData, IPointHoverHandler } from "types/appData";

interface IGeoChartProps {
  data: IGeoData[];
  selectedCoordinate: (id: IDatasetID) => void;
  selectedIDs: IDatasetID[];
  onPointHover: IPointHoverHandler;
}

interface GeoDataItem {
  geometry: { type: "Point"; coordinates: [`${number}` | null, `${number}`  | null] };
  id: IDatasetID;
  groupId: string;
}

const LegendToggleIconSvgPath =
  "M20 15H4v-2h16zm0 2H4v2h16zm-5-6 5-3.55V5l-5 3.55L10 5 4 8.66V11l5.92-3.61z";

function getColorByGroupId(groupId: string): am5.Color {
  switch (groupId) {
    case "staccollection":
      return am5.color(0x8c00ff);
    case "dataset":
      return am5.color(0xff8c00);
    case "active":
      return am5.color(0xed254e);
    default:
      return am5.color(0x999998); // Neutral color
  }
}

const GeoChart: React.FC<IGeoChartProps> = ({
  data,
  selectedCoordinate,
  selectedIDs,
  onPointHover,
}) => {
  const [geoData, setGeoData] = useState<GeoDataItem[]>([]);
  const [chart, setChart] = useState<am5map.MapChart | null>(null);
  const [toggleLegend, setToggleLegend] = useState<boolean>(true);

  const legendRef = useRef<am5.Legend | null>(null);
  const selectedLegendRef = useRef<am5.Legend | null>(null);

  // Map incoming data to geoData format
  useEffect(() => {
    const geoJSONData: GeoDataItem[] = data.map((item) => ({
      geometry: { type: "Point", coordinates: item.coordinates },
      id: item.id,
      groupId: selectedIDs.includes(item.id) ? "active" : item.groupId,
    }));

    setGeoData(geoJSONData);
  }, [data, selectedIDs]);

  // Initialize the chart
  useEffect(() => {
    const root = am5.Root.new("map-chart");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = createChart(root);
    setChart(chart);

    const zoomControl = createZoomControl(root, chart, setToggleLegend);
    chart.set("zoomControl", zoomControl);

    createMapPolygonSeries(root, chart);
    const pointSeries = createPointSeries(
      root,
      chart,
      selectedCoordinate,
      onPointHover
    );

    createLegends(root, chart, legendRef, selectedLegendRef);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, []);

  // Update legend visibility when selectedIDs or toggleLegend changes
  useEffect(() => {
    if (selectedLegendRef.current) {
      selectedLegendRef.current.set(
        "visible",
        toggleLegend && selectedIDs.length > 0
      );
    }
  }, [selectedIDs, toggleLegend]);

  useEffect(() => {
    if (legendRef.current) {
      legendRef.current.set("visible", toggleLegend);
    }
  }, [toggleLegend]);

  // Update pointSeries data when geoData changes
  useEffect(() => {
    if (chart) {
      const pointSeries = chart.series.values.find(
        (series) => series instanceof am5map.ClusteredPointSeries
      ) as am5map.ClusteredPointSeries;

      if (pointSeries) {
        pointSeries.data.setAll(geoData);
      }
    }
  }, [geoData, chart]);

  return <div id="map-chart" className="chart_div"></div>;
};

export default GeoChart;

// Helper Functions

function createChart(root: am5.Root): am5map.MapChart {
  return root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "translateY",
      projection: am5map.geoMercator(),
      cursorOverStyle: "default",
    })
  );
}

function createZoomControl(
  root: am5.Root,
  chart: am5map.MapChart,
  setToggleLegend: React.Dispatch<React.SetStateAction<boolean>>
): am5map.ZoomControl {
  const zoomControl = am5map.ZoomControl.new(root, {});

  const tooltip = am5.Tooltip.new(root, { dy: -15 });
  tooltip.get("background")?.setAll({
    fill: am5.color(0xeeeeee),
  });

  zoomControl.minusButton.set("tooltip", tooltip);
  zoomControl.plusButton.set("tooltip", tooltip);
  zoomControl.homeButton.set("tooltip", tooltip);

  zoomControl.minusButton.set("tooltipText", "Zoom Out");
  zoomControl.plusButton.set("tooltipText", "Zoom In");
  zoomControl.homeButton.set("tooltipText", "Reset Zoom");

  zoomControl.homeButton.set("visible", true);

  const legendButton = createLegendButton(root, setToggleLegend, tooltip);
  zoomControl.children.insertIndex(0, legendButton);

  return zoomControl;
}

function createLegendButton(
  root: am5.Root,
  setToggleLegend: React.Dispatch<React.SetStateAction<boolean>>,
  tooltip: am5.Tooltip
): am5.Button {
  const legendButton = am5.Button.new(root, {
    width: 35,
    height: 35,
    icon: am5.Graphics.new(root, {
      svgPath: LegendToggleIconSvgPath,
      height: 30,
      width: 30,
      fill: am5.color(0xffffff),
    }),
    tooltip: tooltip,
    tooltipText: "Toggle map legends",
  });

  legendButton.events.on("click", () => {
    setToggleLegend((prev) => !prev);
  });

  return legendButton;
}

function createMapPolygonSeries(root: am5.Root, chart: am5map.MapChart) {
  chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow.default,
    })
  );
}

function createPointSeries(
  root: am5.Root,
  chart: am5map.MapChart,
  selectedCoordinate: (id: IDatasetID) => void,
  onPointHover: IPointHoverHandler
): am5map.ClusteredPointSeries {
  const pointSeries = chart.series.push(
    am5map.ClusteredPointSeries.new(root, {
      groupIdField: "groupId",
      minDistance: 15,
      affectsBounds:true,
    })
  );

  pointSeries.set("clusteredBullet", (root, series, dataItem) =>
    createClusteredBullet(root, series, dataItem)
  );

  pointSeries.bullets.push((root, series, dataItem) =>
    createBullet(root, dataItem, selectedCoordinate, onPointHover)
  );

  return pointSeries;
}

function createClusteredBullet(
  root: am5.Root,
  series: am5map.ClusteredPointSeries,
  dataItem:  am5.DataItem<IClusteredDataItem>
): am5.Bullet {
  const container = am5.Container.new(root, {
    cursorOverStyle: "pointer",
  });

  // Add circles
  const circle1 = container.children.push(
    am5.Circle.new(root, {
      radius: 8,
      tooltipY: 0,
      fill: am5.color(0xff8c00), // Default color
    })
  );

  const circle2 = container.children.push(
    am5.Circle.new(root, {
      radius: 12,
      fillOpacity: 0.3,
      tooltipY: 0,
      fill: am5.color(0xff8c00), // Default color
    })
  );

  const circle3 = container.children.push(
    am5.Circle.new(root, {
      radius: 16,
      fillOpacity: 0.3,
      tooltipY: 0,
      fill: am5.color(0xff8c00), // Default color
    })
  );

  // Update cluster color based on children's groupId
  dataItem.on("children", (children, target) => {
    if (target) {
      const bullet = target.get("bullet")?.get("sprite");
      if (children && children.length) {
        let color: am5.Color;
        let sameGroupId = true;
        let groupId: string | undefined;

        am5.array.eachContinue(children, (child) => {
          const dataContext = child.dataContext as { groupId: string };
          if (!dataContext) return true;
          if (groupId === undefined) {
            groupId = dataContext.groupId;
          } else if (groupId !== dataContext.groupId) {
            sameGroupId = false;
            return false; // Stop iteration
          }
          return true;
        });

        color = sameGroupId && groupId ? getColorByGroupId(groupId) : am5.color(0x999998);
        //@ts-ignore
        bullet?.children.each((circle) => {
          if (circle instanceof am5.Circle) {
            circle.setAll({ fill: color });
          }
        });
      }
    }
  });

  // Add label
  container.children.push(
    am5.Label.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      fill: am5.color(0xffffff),
      populateText: true,
      fontSize: "8",
      text: "{value}",
    })
  );

  container.events.on("click", (e) => {
    if (e.target.dataItem) series.zoomToCluster(e.target.dataItem);
  });

  return am5.Bullet.new(root, {
    sprite: container,
  });
}

function createBullet(
  root: am5.Root,
  dataItem: am5.DataItem<am5map.IClusteredPointSeriesDataItem>,
  selectedCoordinate: (id: IDatasetID) => void,
  onPointHover: IPointHoverHandler
): am5.Bullet {
  const item = dataItem.dataContext as GeoDataItem;
  const coordinates = dataItem.get("geometry")?.coordinates as [number, number];

  const lat = coordinates[1].toFixed(2);
  const lon = coordinates[0].toFixed(2);
  const color = getColorByGroupId(item.groupId);

  const circle = am5.Circle.new(root, {
    radius: 6,
    fill: color,
    cursorOverStyle: "pointer",
    toggleKey: "active",
  });

  circle.events.on("click", () => {
    selectedCoordinate(item.id);
  });

  circle.events.on("pointerover", () => {
    onPointHover(lat, lon);
  });

  circle.events.on("pointerout", () => {
    onPointHover("", "");
  });

  circle.states.create("hover", {
    scale: 1.4,
  });

  circle.states.create("active", {
    fill: am5.color(0xed254e),
    scale: 1.3,
  });

  circle.set("active", item.groupId === "active");

  return am5.Bullet.new(root, { sprite: circle });
}

function createLegends(
  root: am5.Root,
  chart: am5map.MapChart,
  legendRef: React.MutableRefObject<am5.Legend | null>,
  selectedLegendRef: React.MutableRefObject<am5.Legend | null>
) {
  // Main legend
  const legend = chart.children.push(
    am5.Legend.new(root, {
      nameField: "name",
      fillField: "color",
      strokeField: "color",
      layout: root.verticalLayout,
      centerX: am5.percent(0),
      x: am5.percent(0),
    })
  );

  legend.data.setAll([
    {
      name: "Earth Observatory Datasets",
      color: am5.color(0x8c00ff),
    },
    {
      name: "Pangaea Datasets",
      color: am5.color(0xff8c00),
    },
  ]);

  legend.labels.template.setAll({
    fontSize: "12px",
    fontWeight: "400",
    textAlign: "left",
  });

  legendRef.current = legend;

  // Selected legend
  const selectedLegend = chart.children.push(
    am5.Legend.new(root, {
      nameField: "name",
      fillField: "color",
      strokeField: "color",
      layout: root.verticalLayout,
      centerX: am5.percent(100),
      x: am5.percent(100),
    })
  );

  selectedLegend.data.setAll([
    {
      name: "Selected",
      color: am5.color(0xed254e),
    },
  ]);

  selectedLegend.labels.template.setAll({
    fontSize: "12px",
    fontWeight: "400",
    textAlign: "right",
  });

  selectedLegend.set("visible", false);
  selectedLegendRef.current = selectedLegend;
}
