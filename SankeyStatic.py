import plotly.graph_objects as go
import pandas as pd
from collections import Counter

# read in the data
data = pd.read_csv("datasets/202301-bluebikes-tripdata.csv")

# zip the Start station Name columns and End Station Name columns into pairs (ignoring order within pairs)
pairs = [(min(a, b), max(a, b)) for a, b in zip(data['start station name'], data['end station name'])]
# count the frequency of each pair
pair_counts = Counter(pairs)

# Select the 20 most frequent pairs
most_common_pairs = pair_counts.most_common(20)

# Create a zipped list from the most common pairs
interleaved_list = [val for pair, count in most_common_pairs for val in pair]

# find the counts for each pair, to be used as the line values in the Sankey
counts = [count for pair, count in most_common_pairs for _ in pair[:1]]\

nodes = interleaved_list

# Define the source (from) and target (to) points for each flow in the Sankey diagram

source_indices = list(range(0, len(nodes), 2)) # since the nodes list is zipped, go every other
target_indices = list(range(1, len(nodes), 2))

# raise each element to the power of 2.5 to scale up the line widths
values = [x**2.5 for x in counts]

# Create the Sankey diagram
fig = go.Figure(data=[go.Sankey(
    node=dict(
        pad=15,
        thickness=20,
        line=dict(color='black', width=0.5),
        label=nodes,
    ),
    link=dict(
        source=source_indices,
        target=target_indices,
        value=values
    ))])

fig.update_layout(title_text='Most Popular BlueBike Routes', font_size=10)


# Save the diagram as a static image
fig.write_image('sankey_diagram.png')