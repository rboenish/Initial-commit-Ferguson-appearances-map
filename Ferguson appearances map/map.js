// Calculate appearances per 100k population for each county
const countyData = {};
Object.keys(countyPopulations).forEach(county => {
    const appearances = countyAppearances[county] || 0;
    const population = countyPopulations[county];
    const per100k = (appearances / population) * 100000;
    
    countyData[county] = {
        name: county,
        appearances: appearances,
        population: population,
        per100k: per100k
    };
});

// Set up dimensions
const width = 900;
const height = 600;
const timelineWidth = 900;
const timelineHeight = 300;

// Create color scale for heat map
const maxPer100k = Math.max(...Object.values(countyData).map(d => d.per100k));
const colorScale = d3.scaleSequential()
    .domain([0, maxPer100k])
    .interpolator(d3.interpolateBlues);

// Create SVG for map
const svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("max-width", "100%")
    .style("height", "auto");

// Create tooltip
const tooltip = d3.select("#tooltip");

// Load and render Washington state map
// Using a simplified GeoJSON for Washington counties
const washingtonGeoJSON = {
    "type": "FeatureCollection",
    "features": [
        // We'll use a simplified approach with approximate county centers for demonstration
        // In production, you'd load actual county boundary GeoJSON
    ]
};

// Since we don't have actual GeoJSON, let's create a simplified representation
// using county positions (this would be replaced with real TopoJSON/GeoJSON in production)

// Simplified county center coordinates (approximate lat/lon converted to display coordinates)
const countyCoordinates = {
    "Adams": [470, 210],
    "Asotin": [680, 370],
    "Benton": [520, 320],
    "Chelan": [350, 180],
    "Clallam": [130, 80],
    "Clark": [280, 520],
    "Columbia": [640, 370],
    "Cowlitz": [250, 450],
    "Douglas": [380, 200],
    "Ferry": [520, 50],
    "Franklin": [520, 330],
    "Garfield": [640, 340],
    "Grant": [450, 260],
    "Grays Harbor": [150, 330],
    "Island": [230, 200],
    "Jefferson": [150, 180],
    "King": [280, 280],
    "Kitsap": [230, 260],
    "Kittitas": [350, 280],
    "Klickitat": [320, 400],
    "Lewis": [250, 370],
    "Lincoln": [520, 240],
    "Mason": [200, 290],
    "Okanogan": [380, 90],
    "Pacific": [150, 390],
    "Pend Oreille": [580, 50],
    "Pierce": [250, 310],
    "San Juan": [180, 140],
    "Skagit": [240, 160],
    "Skamania": [290, 450],
    "Snohomish": [270, 220],
    "Spokane": [580, 260],
    "Stevens": [550, 90],
    "Thurston": [250, 340],
    "Wahkiakum": [210, 420],
    "Walla Walla": [600, 340],
    "Whatcom": [240, 100],
    "Whitman": [620, 310],
    "Yakima": [380, 340]
};

// Create county circles
const counties = svg.selectAll("circle")
    .data(Object.entries(countyData))
    .enter()
    .append("circle")
    .attr("class", "county")
    .attr("cx", d => countyCoordinates[d[0]] ? countyCoordinates[d[0]][0] : 0)
    .attr("cy", d => countyCoordinates[d[0]] ? countyCoordinates[d[0]][1] : 0)
    .attr("r", d => Math.max(15, Math.sqrt(d[1].appearances) * 10))
    .attr("fill", d => d[1].appearances > 0 ? colorScale(d[1].per100k) : "#e5e5e5")
    .attr("stroke", "#333")
    .attr("stroke-width", 1.5)
    .on("mouseover", function(event, d) {
        const countyInfo = d[1];
        const countyAppearancesList = appearances.filter(a => a.county === d[0]);
        
        let tooltipHTML = `<h3>${d[0]} County</h3>`;
        tooltipHTML += `<div class="stat"><strong>Appearances:</strong> ${countyInfo.appearances}</div>`;
        tooltipHTML += `<div class="stat"><strong>Population:</strong> ${countyInfo.population.toLocaleString()}</div>`;
        tooltipHTML += `<div class="stat"><strong>Per 100k residents:</strong> ${countyInfo.per100k.toFixed(2)}</div>`;
        
        if (countyAppearancesList.length > 0) {
            tooltipHTML += `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #444;">`;
            tooltipHTML += `<strong>Recent appearances:</strong>`;
            countyAppearancesList.slice(0, 3).forEach(app => {
                tooltipHTML += `<div style="margin-top: 4px; font-size: 12px;">• ${app.town} - ${app.date}</div>`;
            });
            if (countyAppearancesList.length > 3) {
                tooltipHTML += `<div style="margin-top: 4px; font-size: 12px; font-style: italic;">...and ${countyAppearancesList.length - 3} more</div>`;
            }
            tooltipHTML += `</div>`;
        }
        
        tooltip.html(tooltipHTML)
            .style("opacity", 1)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
            
        d3.select(this).attr("opacity", 0.7);
    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0);
        d3.select(this).attr("opacity", 1);
    });

// Add county labels
svg.selectAll("text.county-label")
    .data(Object.entries(countyData).filter(d => d[1].appearances > 0))
    .enter()
    .append("text")
    .attr("class", "county-label")
    .attr("x", d => countyCoordinates[d[0]] ? countyCoordinates[d[0]][0] : 0)
    .attr("y", d => countyCoordinates[d[0]] ? countyCoordinates[d[0]][1] + 4 : 0)
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("font-weight", "600")
    .attr("fill", d => d[1].per100k > maxPer100k * 0.5 ? "white" : "#333")
    .attr("pointer-events", "none")
    .text(d => d[1].appearances);

// Add title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "700")
    .attr("fill", "#1e3a8a")
    .text("Governor Ferguson Appearances by County (Heat Map)");

// Create legend
const legendData = [
    { label: "No appearances", color: "#e5e5e5" },
    { label: "Low (< 1 per 100k)", color: colorScale(maxPer100k * 0.2) },
    { label: "Medium (1-2 per 100k)", color: colorScale(maxPer100k * 0.5) },
    { label: "High (2-3 per 100k)", color: colorScale(maxPer100k * 0.8) },
    { label: "Very High (3+ per 100k)", color: colorScale(maxPer100k) }
];

const legend = d3.select("#legend");
legendData.forEach(item => {
    const legendItem = legend.append("div")
        .attr("class", "legend-item");
    
    legendItem.append("div")
        .attr("class", "legend-color")
        .style("background-color", item.color);
    
    legendItem.append("span")
        .text(item.label);
});

// Create timeline chart
const margin = { top: 20, right: 30, bottom: 60, left: 50 };
const chartWidth = timelineWidth - margin.left - margin.right;
const chartHeight = timelineHeight - margin.top - margin.bottom;

const timelineSvg = d3.select("#timeline")
    .append("svg")
    .attr("width", timelineWidth)
    .attr("height", timelineHeight)
    .attr("viewBox", `0 0 ${timelineWidth} ${timelineHeight}`)
    .style("max-width", "100%")
    .style("height", "auto")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// X scale
const x = d3.scaleBand()
    .domain(monthlyAppearances.map(d => d.label))
    .range([0, chartWidth])
    .padding(0.2);

// Y scale
const y = d3.scaleLinear()
    .domain([0, d3.max(monthlyAppearances, d => d.count)])
    .nice()
    .range([chartHeight, 0]);

// Add grid lines
timelineSvg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y)
        .tickSize(-chartWidth)
        .tickFormat("")
    );

// Add bars
timelineSvg.selectAll(".bar")
    .data(monthlyAppearances)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.label))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => chartHeight - y(d.count))
    .on("mouseover", function(event, d) {
        tooltip.html(`<h3>${d.label}</h3><div class="stat"><strong>${d.count}</strong> appearances</div>`)
            .style("opacity", 1)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0);
    });

// Add value labels on bars
timelineSvg.selectAll(".bar-label")
    .data(monthlyAppearances)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", d => x(d.label) + x.bandwidth() / 2)
    .attr("y", d => y(d.count) - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "600")
    .attr("fill", "#333")
    .text(d => d.count > 0 ? d.count : "");

// Add X axis
timelineSvg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
timelineSvg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(5));

// Add Y axis label
timelineSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#666")
    .text("Number of Appearances");

// Log statistics
console.log("Total appearances:", appearances.length);
console.log("Counties visited:", Object.keys(countyAppearances).length);
console.log("Average per month:", (appearances.length / 14).toFixed(1));
