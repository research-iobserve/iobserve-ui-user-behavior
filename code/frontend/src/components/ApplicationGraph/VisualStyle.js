// @flow

import cytoscape from "cytoscape";

export const graphVisualStyle = cytoscape
  .stylesheet()
  .selector("node")
  .css({
    width: "50px",
    content: "data(name)",
    "text-valign": "center",
    "text-outline-width": 2,
    "text-outline-color": "#436EEE",
    "background-color": "#436EEE",
    color: "#fff",
    height: "50px"
  })
  .selector(":selected")
  .css({
    "border-width": 3,
    "border-color": "#333"
  })
  .selector("edge")
  .css({
    "curve-style": "bezier",
    width: "mapData(count, 0, 1000, 1, 50)",
    "target-arrow-shape": "triangle",
    "line-color": "#aaaaaa",
    "target-arrow-color": "#aaaa"
  })
  .selector(":selected")
  .css({
    "line-color": "#333"
  });
