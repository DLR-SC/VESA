import * as am5 from "@amcharts/amcharts5";
import * as am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import React, { useEffect, useState } from "react";
import { IDatasetID, IGeoData, IPointHoverHandler } from "types/appData";
interface IGeoChartProps {
  data: IGeoData[];
  selectedCoordinate: (id: IDatasetID) => void;
  selectedIDs: IDatasetID[];
  onPointHover: IPointHoverHandler;
}

const LegendToggleIconSvgPath =
  "M20 15H4v-2h16zm0 2H4v2h16zm-5-6 5-3.55V5l-5 3.55L10 5 4 8.66V11l5.92-3.61z";

const GeoChart: React.FC<IGeoChartProps> = ({
  data,
  selectedCoordinate,
  selectedIDs,
  onPointHover,
}) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [chartState, setChartState] = useState<am5map.MapChart | null>(null);
  const [toggleLegend, setToggleLegend] = useState<any>(true);

  const selectedLegendRef = React.useRef<am5.Legend | null>(null); //Ref for the selected legend
  const legendRef = React.useRef<am5.Legend | null>(null); //Ref for the main legend

  useEffect(() => {
    const geoJSONData = data.map((item) => ({
      geometry: { type: "Point", coordinates: item.coordinates },
      id: item.id,
      groupId: selectedIDs.includes(item.id) ? "active" : item.groupId,
    }));

    setGeoData(geoJSONData);
  }, [data, selectedIDs]);

  useEffect(() => {
    const root = am5.Root.new("map-chart");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        cursorOverStyle: "default",
      })
    );

    let zoomControl = am5map.ZoomControl.new(root, {});

    zoomControl.homeButton.set("visible", true);

    let zoomControlTooltip = am5.Tooltip.new(root, { dy: -15 });

    zoomControlTooltip.get("background")?.setAll({
      fill: am5.color(0xeeeeee),
    });

    zoomControl.minusButton.set("tooltip", zoomControlTooltip);
    zoomControl.plusButton.set("tooltip", zoomControlTooltip);
    zoomControl.homeButton.set("tooltip", zoomControlTooltip);

    zoomControl.minusButton.set("tooltipText", "Zoom Out");
    zoomControl.plusButton.set("tooltipText", "Zoom In");
    zoomControl.homeButton.set("tooltipText", "Reset Zoom");

    chart.set("zoomControl", zoomControl);

    chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow.default,
      })
    );

    const pointSeries = chart.series.push(
      am5map.ClusteredPointSeries.new(root, {
        groupIdField: "groupId",
        minDistance: 15,
      })
    );

    pointSeries.set("clusteredBullet", (root, series, dataItem) => {
      let container = am5.Container.new(root, {
        cursorOverStyle: "pointer",
      });

      let circle1 = container.children.push(
        am5.Circle.new(root, {
          radius: 8,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        })
      );

      let circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 12,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        })
      );

      let circle3 = container.children.push(
        am5.Circle.new(root, {
          radius: 16,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        })
      );

      // adapters for the circle fills
      circle1.adapters.add("fill", function (fill, target) {
        return getColor(target.dataItem);
      });

      circle2.adapters.add("fill", function (fill, target) {
        return getColor(target.dataItem);
      });

      circle3.adapters.add("fill", function (fill, target) {
        return getColor(target.dataItem);
      });

      //@ts-ignore
      dataItem.on("children", () => {
        circle1._markDirtyKey("fill");
        circle2._markDirtyKey("fill");
        circle3._markDirtyKey("fill");
      });

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

      container.events.on("click", function (e) {
        if (e.target.dataItem) pointSeries.zoomToCluster(e.target.dataItem);
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    pointSeries.bullets.push((root, series, dataItem) => {
      const item = dataItem.dataContext as IGeoData;

      /**
       * I tried accessing the coordinates directly from the dataItem but it was not working
       * const coordinates = item.coordinates; //undefined item.coordinates error
       */
      const coordinates = dataItem.get("geometry")?.coordinates as number[];

      const lat = coordinates[1].toFixed(2);
      const lon = coordinates[0].toFixed(2);

      let color = item.groupId === "dataset" ? 0xff8c00 : 0x8c00ff;

      let circle = am5.Circle.new(root, {
        radius: 6,
        fill: am5.color(color),
        cursorOverStyle: "pointer",
        toggleKey: "active",
      });

      circle.events.on("click", (event) => {
        const dataObject = event.target.dataItem?.dataContext as {
          id: IDatasetID;
        };
        selectedCoordinate(dataObject?.id);
      });

      circle.states.create("hover", {
        scale: 1.4,
      });

      circle.states.create("active", {
        fill: am5.color(0xed254e),
        scale: 1.3,
      });

      circle.events.on("pointerover", (event) => {
        onPointHover(lat, lon);
      });

      circle.events.on("pointerout", (event) => {
        onPointHover("", "");
      });

      const dataContext = dataItem.dataContext as {
        id: IDatasetID;
        groupId: string;
      };
      const isActive = dataContext.groupId == "active" ? true : false;

      circle.set("active", isActive);

      return am5.Bullet.new(root, { sprite: circle });
    });

    //Add Legend to the map
    let legend = chart.children.push(
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

    legend.set("visible", true);
    legendRef.current = legend;

    let selectedLegend = chart.children.push(
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

    selectedLegend.set("visible", true);
    selectedLegendRef.current = selectedLegend;

    selectedLegendRef.current.set("visible", false);
    selectedLegend.labels.template.setAll({
      fontSize: "12px",
      fontWeight: "400",
      textAlign: "right",
    });

    let button = chart.children.push(
      am5.Button.new(root, {
        width: 35,
        height: 35,
        icon: am5.Graphics.new(root, {
          svgPath: LegendToggleIconSvgPath,
          height: 30,
          width: 30,
          fill: am5.color(0xffffff),
        }),
        tooltip: zoomControlTooltip,
        tooltipText: "Toggle map legends",
      })
    );

    chart.chartContainer.onPrivate("width", (width) => {
      if (width) button.set("dx", width - 45);
    });

    chart.chartContainer.onPrivate("height", (height) => {
      if (height) button.set("dy", height - 161);
    });

    button.events.on("click", function () {
      setToggleLegend((prevToggleLegend: any) => !prevToggleLegend);
    });

    setChartState(chart);

    return () => {
      chart?.dispose();
      root?.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartState && selectedLegendRef.current && toggleLegend) {
      selectedLegendRef.current.set("visible", selectedIDs.length > 0);
    } else if (chartState && selectedLegendRef.current && !toggleLegend) {
      selectedLegendRef.current.set("visible", false);
    }
  }, [selectedIDs, toggleLegend]);

  useEffect(() => {
    legendRef.current?.set("visible", toggleLegend);
  }, [toggleLegend]);

  useEffect(() => {
    if (chartState && chartState.series.length > 0) {
      const pointSeries = chartState.series.getIndex(
        1
      ) as am5map.ClusteredPointSeries;
      pointSeries?.data.setAll(geoData);
    }
  }, [geoData]);

  return <div id="map-chart" className="chart_div"></div>;
};

export default GeoChart;

// function for returning colors for clusters based on their group
const getColor = (dataItem: any) => {
  let children = dataItem.get("children");

  if (children && children.length > 0) {
    let child = children[0];
    // console.log(child.dataContext )
    if (child.dataContext.groupId === "staccollection") {
      return am5.color(0x8c00ff);
    }
    if (child.dataContext.groupId === "dataset") {
      return am5.color(0xff8c00);
    }
    if (child.dataContext.groupId === "active") {
      return am5.color(0xed254e);
    }
  }
  // return am5.color(0xff8c00);
};
