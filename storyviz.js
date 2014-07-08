var width = $('body').width(),
    height = 900;

d3.json("characters.json", function(json) {
    console.log(json);
    var force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .charge(-100)
        .linkDistance(50)
        .size([width, height])
        .on("tick", tick);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // var patternRadius = 30

    // svg.append("defs").append("pattern")
    //         .attr("id", "character")
    //         .attr("height", patternRadius)
    //         .attr("width", patternRadius)
    //         .attr("patternUnits", "objectBoundingBox")
    //       .append("image")
    //         .attr("xlink:href", "images/Arya.png")
    //         .attr("height", patternRadius)
    //         .attr("width", patternRadius);

    var node = svg.selectAll(".node"),
        link = svg.selectAll(".link");

    setTimeout(function() {
        start();
    }, 0);

    function start() {
        
        // Define drag behavior
        var node_drag = d3.behavior.drag()
            .on("dragstart", dragstart)
            .on("drag", dragmove)
            .on("dragend", dragend);

        function dragstart(d, i) {
            force.stop()
        }

        function dragmove(d, i) {
            d.px += d3.event.dx;
            d.py += d3.event.dy;
            d.x += d3.event.dx;
            d.y += d3.event.dy; 
            tick();
        }

        function dragend(d, i) {
            d.fixed = true;
            tick();
            force.resume();
        }


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
            // // append a circle svg element
            // .append("circle")
            // // assign class "node.id"
            // .attr("class", function(d) { return "node " + d.id; })
            // // set radius to 8
            // .attr("r", 15);
            // // .attr("fill", "url(#character)")
        var nodeEnter = node.enter();

        // nodeEnter.append("svg:g")
        //   .attr("class", "node")
        //   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        //   // .on("click", click)
        //   .call(force.drag);
        var imageHeight = 20,
            imageWidth = 20;

        nodeEnter.append("svg:image")
           .attr("class", "node")
           .attr("xlink:href", function(d) { return d.logo; })
           .attr("width", function(d) { return d.size; })
           .attr("height", function(d) { return d.size; })
           .call(node_drag)
           .append("svg:title")
           .text(function(d) { return d.name; })
           .attr("class", "title");
           // .on("mouseover", mouseover)

        // $('.node').tipsy({ 
        //     gravity: 'w', 
        //     title: function() {
        //       var name = 'hi';
        //       return name; 
        //     }
        // });

        // nodeEnter
        //     .append("svg:text")
        //     .attr("dx", 12)
        //     .attr("dy", ".35em")
        //     .text(function(d) { return d.name });

        node.exit().remove();

        force.start();                
    }

    function tick() {
      node.attr("x", function(d) { return d.x - 20; })
          .attr("y", function(d) { return d.y - 20; })

      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    }
   
    // function mouseover(d) {

    // }


    // function click(d) {
    //   if (d.children) {
    //     d._children = d.children;
    //     d.children = null;
    //   } else {
    //     d.children = d._children;
    //     d._children = null;
    //   }
     
    //   update();
    // }
    // function flatten(root) {
    //   var nodes = []; 
    //   var i = 0;
     
    //   function recurse(node) {
    //     if (node.children) 
    //         node.children.forEach(recurse);
    //     if (!node.id) 
    //         node.id = ++i;
    //     nodes.push(node);
    //   }
     
    //   recurse(root);
    //   return nodes;
    // }   
    
});