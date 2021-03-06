const d3 = require('d3');

const data = {
  name: "Root Element",
  children: [
    { name: "First Generation" },
    { name: "First Generation",
      children: [
        { name: "Second Generation" },
        { name: "Second Generation" }
      ]
    },
    { name: "First Generation" },
    { name: "First Generation",
      children: [
        { name: "Second Generation" }
      ]
    },
    { name: "First Generation" }
  ]
}

const root = d3.hierarchy(data, d => d.children ? d.children : null);

const width = 960;
const height = 500;

const svg = d3.select('#tree')
    .attr('width', width)
    .attr('height', height)

const g = svg.append('g')
    .attr('transform', 'translate(80,80)')

const tree = d3.tree()
  .size([width - 160, height - 160]);

const link = g.selectAll('.link')
  .data(tree(root).descendants().slice(1))
  .enter().append('path')
    .attr('class', 'link')
    .attr('d', d => {
      return "M" + d.x + "," + d.y
        + "C" + d.x + "," + (d.y + d.parent.y) / 2
        + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
        + " " + d.parent.x + "," + d.parent.y;
      });

const node = g.selectAll('.node')
  .data(root.descendants())
  .enter().append('g')
    .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')

node.append('circle')
  .attr('r', 2.5);

node.append('text')
  .attr('dy', 3)
  .attr('y', d => d.children ? -10 : 10)
  .style('text-anchor', 'middle')
  .text(d => {
    console.log(d);
    return d.data.name;
  })
