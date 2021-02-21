import { Box, Button, Flex, Text } from "@chakra-ui/react";
//@ts-ignore
import circleCorners from "d3-curve-circlecorners";
import * as d3 from "d3-shape";
import {
  DagreReact,
  Edge,
  EdgeOptions,
  MarkerProps,
  Node,
  NodeOptions,
  Point,
  Rect,
  ReportSize,
  Size,
  ValueCache,
} from "dagre-reactjs";
import * as React from "react";
import { basic2 } from "./data";

const CustomButtonLabel: React.FC<{
  onButtonClicked: () => void;
  title: string;
  description?: string;
}> = ({ title }) => {
  return (
    <Flex
      direction="column"
      borderWidth="3px"
      w="300px"
      h="160px"
      borderColor="green.700"
      borderRadius={7}
      p={3}
    >
      <Text>{title}</Text>
      <Button>Test</Button>
    </Flex>
  );
};
const renderNode = (
  node: NodeOptions,
  reportSize: ReportSize,
  valueCache: ValueCache
) => {
  return (
    <Node
      key={node.id}
      node={node}
      reportSize={reportSize}
      valueCache={valueCache}
      html={true}
    >
      {{
        shape: (innerSize: Size) => <Rect node={node} innerSize={innerSize} />,
        label: () => (
          <CustomButtonLabel
            onButtonClicked={() => console.log("clicked")}
            title={node.label}
            description={node.meta.description}
          />
        ),
      }}
    </Node>
  );
};

const getOrigin = (p1: Point, p2: Point, width: number): Point => {
  const theta = Math.atan((p2.y - p1.y) / (p2.x - p1.x));

  if (theta > Math.PI / 4) {
    return { x: 0, y: 0 };
  }
  return {
    x: p1.x - width / 2,
    y: p1.y - (width / 2) * Math.tan(theta),
  };
};
const width = 300;
const height = 160;

const generatePathD3Curve = (points: Array<Point>, ...args: any): string => {
  const origin = getOrigin(points[0], points[1], width);
  if (origin.x !== 0) {
    points = [
      {
        x: origin.x,
        y: origin.y + height / 2,
      },
      {
        x: origin.x,
        y: points[1].y,
      },
      ...points.slice(1),
    ];
  }

  let p: [number, number][] = points.map((point) => [point.x, point.y]);

  if (p.map(([x, y]) => x).every((x) => x === p[0][0])) {
    p = [p[0], p[p.length - 1]];
  }

  const c = d3.line().curve(circleCorners.radius(8))(p);
  return c!;
};
const CircleMarker: React.FC<MarkerProps> = ({ edgeMeta, markerId }) => {
  return null;
  // return (
  //   <marker
  //     id={markerId}
  //     markerWidth="20"
  //     markerHeight="10"
  //     refX="10"
  //     refY="10"
  //   >
  //     <circle cx="10" cy="10" r="6" style={edgeMeta.styles.marker.styles} />
  //   </marker>
  // );
};

export const Dagre: React.FC<{}> = () => {
  const [width, setWidth] = React.useState(1000);
  const [height, setHeight] = React.useState(1000);
  return (
    <svg id="schedule" width={width} height={height}>
      <DagreReact
        {...basic2}
        renderNode={renderNode}
        customPathGenerators={{ d3curve: generatePathD3Curve }}
        customMarkerComponents={{
          circle: CircleMarker, //custom react component
        }}
        defaultNodeConfig={{
          styles: {
            shape: { styles: { borderWidth: 0, stroke: "unset" } },
          },
        }}
        defaultEdgeConfig={{
          pathType: "d3curve",
          labelPos: "c",
          markerType: "circle",
          styles: {
            marker: {
              styles: {
                strokeWidth: "1px",
              },
            },
            edge: {
              styles: {
                strokeWidth: "2px",
                fill: "#ffffffff",
                stroke: "#276749", //"#8a0000",
              },
            },
          },
        }}
        graphLayoutComplete={(w, h) => {
          w && setWidth(w);
          h && setHeight(h);
        }}
        graphOptions={{
          align: "UL",
          nodesep: 20,
          edgeSep: 0,
          // ranker: "network-simplex",
          // ranker: "longest-path",
          ranker: "tight-tree",
          marginx: 15,
          marginy: 15,
        }}
      />
    </svg>
  );
};
