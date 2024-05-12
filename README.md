# Bluebike-Analysis
Interactive website that analyzes BlueBike trip data to reveal MBTA inefficiencies in the greater Boston area

This is our final project for DS4200 that features an interactive website that analyzes
, and utilizes the B.O.S.S. (Blackjack Optimal Solution Suggestor) to suggest the next best move the player should play based on the House's hands and the player's hands. 


## Installation
To run the simulation, you will need Python 3 and the following libraries:
```
from dash import Dash, dcc, html, Input, Output
from dash import html
from dash import dcc
from dash.dependencies import Output, Input
import pandas as pd
```
## Usage
To start the dashboard, simply run the Blackjack_Dashboard.py file. Note that the dashboard works best on a **full screen** browser. 

The player should select the card value and suit for the house's hands as well as their own hands. The helper will automatically run its genetic algorithm to output the next best move to make a win. We hope you enjoy!
