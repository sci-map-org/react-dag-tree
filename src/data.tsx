import { EdgeOptions, NodeOptions, RecursivePartial } from "dagre-reactjs";

export const basic1: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Basics of UX Design",
      // width: 600,
    },
    {
      id: "1",
      label: "Basics of UI Design",
    },
    {
      id: "2",
      label: "Basics of UX Research",
    },
    {
      id: "3",
      label: "Design Thinking",
    },
    {
      id: "4",
      label: "Work in Figma",
    },
    {
      id: "5",
      label: "Design Persona",
    },
    {
      id: "6",
      label: "User Journey and User flow",
    },
  ],
  edges: [
    {
      from: "0",
      to: "2",
      path: "test",
    },
    {
      from: "0",
      to: "3",
      points: [
        {
          x: 165,
          y: 175,
        },
        { x: 165, y: 200 },
        { x: 165, y: 225 },
      ],
      path: "test",
      // x: 165,
      // y: 175,
    },
    {
      from: "1",
      to: "4",
      // labelType: "mycustomlabel",
    },
    {
      from: "2",
      to: "5",
    },
    {
      from: "2",
      to: "6",
    },
  ],
};

export const basic2: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: "0",
      label: "Basics of UX Design",
    },
    {
      id: "1",
      label: "Basics of UI Design",
    },
    {
      id: "2",
      label: "Basics of UX Research",
    },
    {
      id: "3",
      label: "Design Thinking",
    },
    {
      id: "4",
      label: "Work in Figma",
    },
    {
      id: "5",
      label: "Design Persona",
    },
    {
      id: "6",
      label: "User Journey and User flow",
    },
    {
      id: "7",
      label: "Typography",
    },
    {
      id: "8",
      label: "Qualitative and Quantitative methods",
    },
    {
      id: "9",
      label: "Usability testing",
    },
    {
      id: "10",
      label: "Design your own app",
    },
  ],
  edges: [
    {
      from: "0",
      to: "2",
      path: "test",
    },
    {
      from: "0",
      to: "3",
    },
    {
      from: "1",
      to: "4",
    },
    {
      from: "2",
      to: "5",
    },
    {
      from: "2",
      to: "6",
    },
    // {
    //   from: "4",
    //   to: "6",
    // },
    {
      from: "6",
      to: "8",
    },
    {
      from: "6",
      to: "9",
    },
    {
      from: "4",
      to: "7",
    },
    {
      from: "7",
      to: "10",
    },
    {
      from: "9",
      to: "10",
    },
  ],
};
