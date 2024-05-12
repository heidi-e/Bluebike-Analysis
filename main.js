// Define data
const bbike = d3.csv("datasets/202301-bluebikes-tripdata.csv");

// Create a function that counts each instance a 'start station name' appears
bbike.then(function(data) {

    // Define the function
    function countStartStations(data) {
        // Initialize an empty object to store counts
        const stationCounts = {};

        // Loop through the data
        data.forEach(function(d) {
            // Check if the 'start station name' exists in the counts object
            if (stationCounts[d['start station name']]) {
                // Increment count if the station name exists
                stationCounts[d['start station name']]++;
            } else {
                // Initialize count to 1 if station name does not exist
                stationCounts[d['start station name']] = 1;
            }
        });

        // Convert the counts object into an array of objects
        const countsArray = Object.keys(stationCounts).map(key => ({
            station: key,
            count: stationCounts[key]
        }));

        // Sort the array by count in descending order
        countsArray.sort((a, b) => b.count - a.count);

        // Return the top 25 stations
        return countsArray.slice(0, 25);
    }

    // Call the function
    const startStationCounts = countStartStations(data);

    // Log the result
    console.log(startStationCounts);

    // Set up SVG dimensions and margins
    let width = 850,
    height = 600;

    let margin = {
        top: 30,
        bottom: 50,
        left: 350, 
        right: 100
    };

    // Append the SVG to the body of the page
    let svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Make y axis
    let yScale = d3.scaleBand()
        .domain(startStationCounts.map(d => d.station))
        .range([margin.top, height - margin.bottom])
        .padding(0.5)
        .paddingInner(0.5);

    let yAxis = svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    // Make x axis
    let xScale = d3.scaleLinear()
        .domain([0, d3.max(startStationCounts, d => d.count)]) // Use startStationCounts for the domain
        .range([margin.left, width - margin.right]);

    let xAxis = svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    /// Append the bars
    svg.selectAll("rect")
        .data(startStationCounts)
        .enter().append("rect")
        .attr("x", margin.left)
        .attr("y", d => yScale(d.station))
        .attr("width", d => xScale(d.count) - margin.left)
        .attr("height", yScale.bandwidth() - 1)
        .style("fill", "steelblue")
        .on("click", function(d) {
            // Toggle highlight color on click
            d3.select(this)
                .transition()
                .duration(200) // Adjust transition duration as desired
                .style("fill", d3.select(this).style("fill") === "steelblue" ? "red" : "steelblue");
        });

    // Add x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .text("Count of Trips Started");

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.right / 12)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Station Name");
})
