const data = {
    name: "Snowboarding",
    children: [
        {name: "Alpine gate events", children: [
            {name: "Slalom", value: 1},
            {name: "Giant slalom", value: 1}
        ]},
        {name: "Snowboard cross", children: [
            {name: "Snowboard cross", value: 1}
        ]}
    ]
};

const width = 420;
const radius = width / 2;
const root = d3.partition().size([2 * Math.PI, radius])(
    d3.hierarchy(data).sum(d => d.value)
);
const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 2)
    .padAngle(0.01);

const svg = d3.select("#chart").append("svg")
    .attr("viewBox", [-radius, -radius, width, width])
    .attr("role", "img")
    .attr("aria-label", "Two alpine gate events: slalom and giant slalom; one snowboard cross event.");

svg.append("g").selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("d", arc)
    .attr("fill", d => (d.depth === 1 ? d.data.name : d.parent.data.name) === "Alpine gate events" ? "#cf4937" : "#177c83")
    .attr("fill-opacity", d => d.depth === 1 ? 1 : 0.72)
    .append("title")
    .text(d => d.data.name);

svg.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.1em")
    .attr("class", "chart-center-number")
    .text("3");
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1.5em")
    .attr("class", "chart-center-label")
    .text("EVENTS");