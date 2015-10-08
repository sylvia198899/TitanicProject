// Dead of the second class

var sliderAge = 0;
var radioSex = 0;

$(document).ready(function() {
    getvalue20(sliderAge, radioSex);
  // Get value Onchange radio function.
  $('input:radio').change(function(){
    radioSex = $("form input[type='radio']:checked").val();
    getvalue20(sliderAge, radioSex);
  });

  $("[data-slider]")
      .each(function () {
        var input = $(this);
        $("<span>")
          .addClass("output")
          .insertAfter($(this));
      })
      .bind("slider:ready slider:changed", function (event, data) {
        $(this)
          .nextAll(".output:first")
            .html(data.value.toFixed(0));
            sliderAge = data.value;
            getvalue20(sliderAge, radioSex);
      });
});

// draw the nodes of dead passengers in the second class
function getvalue20(Age, Sex){
  draw20(Age, Sex);
}

function draw20(Age, Sex){
  d3.select("#draw20").remove();
var width = 230,
    height = 230;

var fill4 = d3.scale.category10();

var svg4 = d3.select("#middle0").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "draw20");

var force4 = d3.layout.force()
    .gravity(.04)
    .distance(20)
    .charge(-4.3)
    .size([width, height]);


//read the data from dead passengers in the second class
d3.json("20.json", function(error, json) {

  force4
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg4.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg4.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force4.drag);

  node.append("circle")
      .attr("class", "node")
      .attr("r", function(d) {

        
      if(Sex == 0){ // for all gender
        if(d.value > Age)
          return (Math.sqrt(d.value)+2)/2;
        else
          return 0;
      }
      else{ //  users choose male or female
        if(d.value > Age && d.group == Sex)
          return (Math.sqrt(d.value)+2)/2;
        else
          return 0;
      }

      })
      .style("fill", function(d) { return fill4(d.group); });

  force4.on("tick", function() { 
    link.attr("x1", function(d) { 

        return d.source.x; 
         })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr('stroke-width',function(d) {

        return (Math.log(d.value)+1)/2;

        });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});
}