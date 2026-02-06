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

// Washington state FIPS code is 53
const WA_FIPS = "53";

// County name mapping from FIPS to names used in our data
const fipsToCountyName = {
    "53001": "Adams", "53003": "Asotin", "53005": "Benton", "53007": "Chelan",
    "53009": "Clallam", "53011": "Clark", "53013": "Columbia", "53015": "Cowlitz",
    "53017": "Douglas", "53019": "Ferry", "53021": "Franklin", "53023": "Garfield",
    "53025": "Grant", "53027": "Grays Harbor", "53029": "Island", "53031": "Jefferson",
    "53033": "King", "53035": "Kitsap", "53037": "Kittitas", "53039": "Klickitat",
    "53041": "Lewis", "53043": "Lincoln", "53045": "Mason", "53047": "Okanogan",
    "53049": "Pacific", "53051": "Pend Oreille", "53053": "Pierce", "53055": "San Juan",
    "53057": "Skagit", "53059": "Skamania", "53061": "Snohomish", "53063": "Spokane",
    "53065": "Stevens", "53067": "Thurston", "53069": "Wahkiakum", "53071": "Walla Walla",
    "53073": "Whatcom", "53075": "Whitman", "53077": "Yakima"
};

// Load US counties TopoJSON and render Washington state
Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json")
]).then(([us]) => {
    // Filter to only Washington state counties
    const waCounties = topojson.feature(us, us.objects.counties).features.filter(
        d => d.id.startsWith(WA_FIPS)
    );

    // Get Washington state outline
    const waState = topojson.merge(us, us.objects.counties.geometries.filter(
        d => d.id.startsWith(WA_FIPS)
    ));

    // Create projection centered on Washington state
    const projection = d3.geoMercator()
        .center([-120.5, 47.4])
        .scale(4500)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Draw state background
    svg.append("path")
        .datum(waState)
        .attr("class", "state-outline")
        .attr("d", path)
        .attr("fill", "#f0f4f8")
        .attr("stroke", "#1e3a8a")
        .attr("stroke-width", 2);

    // Draw county boundaries with fill based on appearances
    svg.selectAll("path.county")
        .data(waCounties)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path)
        .attr("fill", d => {
            const countyName = fipsToCountyName[d.id];
            const data = countyData[countyName];
            if (data && data.appearances > 0) {
                return colorScale(data.per100k);
            }
            return "#e8eef4";
        })
        .attr("stroke", "#999")
        .attr("stroke-width", 0.5)
        .on("mouseover", function(event, d) {
            const countyName = fipsToCountyName[d.id];
            const countyInfo = countyData[countyName];

            if (!countyInfo) return;

            const countyAppearancesList = appearances.filter(a => a.county === countyName);

            let tooltipHTML = `<h3>${countyName} County</h3>`;
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

            d3.select(this)
                .attr("stroke", "#1e3a8a")
                .attr("stroke-width", 2);
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
            d3.select(this)
                .attr("stroke", "#999")
                .attr("stroke-width", 0.5);
        });

    // Add county labels for counties with appearances
    svg.selectAll("text.county-label")
        .data(waCounties.filter(d => {
            const countyName = fipsToCountyName[d.id];
            return countyData[countyName] && countyData[countyName].appearances > 0;
        }))
        .enter()
        .append("text")
        .attr("class", "county-label")
        .attr("transform", d => `translate(${path.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("font-size", "10px")
        .attr("font-weight", "600")
        .attr("fill", d => {
            const countyName = fipsToCountyName[d.id];
            const data = countyData[countyName];
            return data.per100k > maxPer100k * 0.5 ? "white" : "#333";
        })
        .attr("pointer-events", "none")
        .text(d => {
            const countyName = fipsToCountyName[d.id];
            return countyData[countyName].appearances;
        });

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("font-weight", "700")
        .attr("fill", "#1e3a8a")
        .text("Governor Ferguson Appearances by County (Heat Map)");
}).catch(error => {
    console.error("Error loading map data:", error);
    // Fallback: show error message
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .text("Error loading map. Please check your internet connection.");
});

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
