// https://observablehq.com/@erikbrinkman/d3-dag-sugiyama@607
import * as d3_o from "d3";
import * as d3_dag from "d3-dag";
import { useEffect } from "react";

const d3 = { ...d3_o, ...d3_dag };

const run = async () => {
  const sources = {
    Grafo: ["grafo", d3.dagStratify()],
    "X-Shape": ["ex", d3.dagStratify()],
    Zherebko: ["zherebko", d3.dagConnect()],
  };

  const source = "Grafo";
  const [key, reader] = sources[source];
  const dag_data = await d3.json(
    `https://raw.githubusercontent.com/erikbrinkman/d3-dag/master/examples/${key}.json`
  );

  // @ts-ignore
  const dag = reader(dag_data);

  const layerings = {
    "Simplex (slow)": d3.layeringSimplex(),
    "Longest Path (fast)": d3.layeringLongestPath(),
    "Coffman Graham (medium)": d3.layeringCoffmanGraham(),
  };

  const decrossings = {
    "Optimal (slow)": d3.decrossOpt(),
    "Two Layer Opt (medium)": d3.decrossTwoLayer().order(d3.twolayerOpt()),
    "Two Layer Median (flast)": d3.decrossTwoLayer().order(d3.twolayerMedian()),
    "Two Layer Mean (flast)": d3.decrossTwoLayer(),
  };

  const coords = {
    "Vertical (slow)": d3.coordVert(),
    "Minimum Curves (slow)": d3.coordMinCurve(),
    "Greedy (medium)": d3.coordGreedy(),
    "Center (fast)": d3.coordCenter(),
  };
  const padding = 1.5;
  const nodeRadius = 20;
  const base = nodeRadius * 2 * padding;
  const nodeSizes = {
    "Edge Aware Separation": (node: any) => {
      const size = node instanceof d3.SugiDummyNode ? 5 : base;
      return [size, size] as [number, number];
    },
    "Constant Separation": () => [base, base] as [number, number],
  };
  const layering = Object.keys(layerings)[0] as keyof typeof layerings;
  const decross = Object.keys(decrossings)[0] as keyof typeof decrossings;
  const coord = Object.keys(coords)[0] as keyof typeof coords;
  const nodeSize = Object.keys(nodeSizes)[0] as keyof typeof nodeSizes;

  const layout = d3
    .sugiyama()
    .nodeSize(() => [60, 60])
    .layering(layerings[layering])
    .decross(decrossings[decross])
    .coord(coords[coord])
    .nodeSize(nodeSizes[nodeSize]);

  const start = Date.now();
  layout(dag);
  const d = Date.now() - start;

  // Use computed layout and get size
  const { width, height } = layout(dag);

  // This code only handles rendering
  //   const svgNode = d3.select("svg");

  const svgSelection = d3.select("#sugi");
  const defs = svgSelection.append("defs"); // For gradients

  const steps = dag.size();
  const interp = d3.interpolateRainbow;
  const colorMap: any = {};
  for (const [i, node] of dag.idescendants().entries()) {
    colorMap[node.id] = interp(i / steps);
  }

  // How to draw edges
  const line = d3
    .line()
    .curve(d3.curveNatural)
    .x((d) => d[0]) // check
    .y((d) => d[1]);

  // Plot edges
  svgSelection
    .append("g")
    .selectAll("path")
    .data(dag.links())
    .enter()
    .append("path")
    // @ts-ignore
    .attr("d", (a: { points: { x: number; y: number }[] }) => {
      return line(a.points.map(({ x, y }) => [x, y]));
    })
    .attr("fill", "none")
    .attr("stroke-width", 3)
    //@ts-ignore
    .attr("stroke", ({ source, target }) => {
      const gradId = `${source.id}-${target.id}`;
      const grad = defs
        .append("linearGradient")
        .attr("id", gradId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", source.x)
        .attr("x2", target.x)
        .attr("y1", source.y)
        .attr("y2", target.y);
      grad
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", colorMap[source.id]);
      grad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", colorMap[target.id]);
      return `url(#${gradId})`;
    });

  // Select nodes
  const nodes = svgSelection
    .append("g")
    .selectAll("g")
    .data(dag.descendants())
    .enter()
    .append("g")
    // @ts-ignore
    .attr("transform", ({ x, y }) => `translate(${x}, ${y})`);

  // Plot node circles
  nodes
    .append("circle")
    .attr("r", nodeRadius)
    // @ts-ignore
    .attr("fill", (n) => colorMap[n.id]);

  // Add text to nodes
  nodes
    .append("text")
    //@ts-ignore
    .text((d) => d.id)
    .attr("font-weight", "bold")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white");
};

export const Sugiyama: React.FC<{}> = () => {
  useEffect(() => {
    run();
  }, []);
  return (
    <div>
      <svg id="sugi" width="1000px" height="1000px"></svg>
    </div>
  );
};
