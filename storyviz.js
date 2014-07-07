var width = 960;
    height = 500;

var nodes = [],
    links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-400)
    .linkDistance(120)
    .size([width, height]);
    // .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");
