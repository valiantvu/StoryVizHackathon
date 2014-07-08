var width = 960,
    height = 500;

d3.json("data.json", function(json) {
    // console.log(json.links);

    var force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .charge(-400)
        .linkDistance(120)
        .size([width, height])
        .on("tick", tick);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var patternRadius = 30
    svg.append("defs").append("pattern")
            .attr("id", "character")
            .attr("height", patternRadius)
            .attr("width", patternRadius)
            .attr("patternUnits", "objectBoundingBox")
          .append("image")
            .attr("xlink:href", "images/Arya.png")
            .attr("height", patternRadius)
            .attr("width", patternRadius);

    var node = svg.selectAll(".node"),
        link = svg.selectAll(".link");

    setTimeout(function() {
        // var a = {id: "a"},
        //     b = {id: "b"};
        // nodes.push(a, b);
        // links.push({source: a, target: b});

        start();
    }, 0);

    function start() {
        // Bind data from the links array, return all link nodes
        // console.log(force.links());
        // link = link.data(force.links(), function (d) { console.log(data); return d.source.id + "-" + d.target.id; });
        link = link.data(json.links);

        // Select empty link nodes with data attribute
        link.enter()
            // insert a line element
            .insert("line", ".node")
            // assign 'link' class
            .attr("class", "link");

        link.exit().remove();

        // Bind data from the nodes array, return all nodes
        node = node.data(json.nodes);

        // Select empty nodes
        node.enter()
            // append a circle svg element
            .append("circle")
            // assign class "node.id"
            .attr("class", function(d) { return "node " + d.id; })
            // set radius to 8
            .attr("r", 15)
            .attr("fill", "url(#character)")
        
        node
            .append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });

        node.exit().remove();

        force.start();                
    }

    function tick() {
      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })

      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    }
});