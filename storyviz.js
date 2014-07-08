
var width = $('#network').width(),
    height = $('#network').height();



d3.json("characters.json", function(json) {

    var force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .charge(-150)
        .linkDistance(50)
        .size([width, height])
        .gravity(0.20)
        .on("tick", tick);

    var svg = d3.select("#network").append("svg")
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


    var chapter = 350;

    var changeIcon = function(chapter) {
        // If character has died by this chapter, change its icon
        node.attr("xlink:href", function(d) { 
            if (d.chapter > 0 && chapter > d.chapter) {
                return "images/dead.png";
            }
            return d.logo; 
        });
    };

    // initialize the nextChapter setInterval to enable other functions to clearInterval
    var nextChapter;

    var playChapters = function() {
        nextChapter = setInterval(function(){
            chapter++;
            changeIcon(chapter);
            
            $('.range-slider').foundation('slider', 'set_value', chapter);
            $('#sliderOutput').text(chapter);

            if (chapter >= 400) {
                clearInterval(nextChapter);
            }
        }, 50);
    }

    var play = false;

    $('#playChapters').click(function(){
        if (!play) {
            playChapters();
            this.innerHTML = "Pause";
            play = true;
        } else {
            clearInterval(nextChapter);
            this.innerHTML = "Play Death";
            play = false;
        }
    });

    
    var updateSlider = function(){
        chapter = $('.range-slider input')[0].value;
        changeIcon(chapter);
        $('#sliderOutput').text(chapter);
    };

    $(document).foundation({
      slider: {
        on_change: function(){
            updateSlider();
        }
      }
    });

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

        var nodeEnter = node.enter();

        // nodeEnter.append("svg:g")
        //   .attr("class", "node")
        //   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        var imageHeight = 20,
            imageWidth = 20;

        nodeEnter.append("svg:image")
           .attr("class", "node")
           // Check time, if character is dead at current chapter, change xlink
           .attr("xlink:href", function(d) { 
                if (d.chapter > 0 && chapter > d.chapter) {
                    return "images/dead.png";
                }
                return d.logo; 
            })
           .attr("width", function(d) { return d.size; })
           .attr("height", function(d) { return d.size; })
           .call(node_drag)
           .append("svg:title")
           .text(function(d) { return d.name; })
           .attr("class", "title");


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

});