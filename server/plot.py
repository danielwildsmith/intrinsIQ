import plotly.graph_objects as go


# Sample time and monetary value data
time = ['2023-09-01', '2023-09-02', '2023-09-03', '2023-09-04', '2023-09-05']
price = [100, 120, 90, 150, 110]

# Create a trace for the line chart without dots
trace = go.Scatter(x=time, y=price, mode='lines', name='Price')

# Create a random point for Intrinsic Value
intrinsic_time = time[-1]
intrinsic_value = 130

# Create a trace for the Intrinsic Value point with an 'x' marker
intrinsic_trace = go.Scatter(x=[intrinsic_time], y=[intrinsic_value], mode='markers', 
                             marker=dict(symbol='circle', size=10), name='Intrinsic Value')

# Create a layout for the chart
layout = go.Layout(
    title='Intrinsic Value',
    xaxis=dict(title='Time', linecolor='black'),
    yaxis=dict(title='Price (USD)', linecolor='black'),
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)'  # sets background and plot as transparent
)

# Create a figure and add both traces to it
fig = go.Figure(data=[trace, intrinsic_trace], layout=layout)

# Customize the hover text for the Fortnite Value point
intrinsic_hover_text = f'Date: {intrinsic_time}<br>Price: {intrinsic_value} USD'
fig.data[1].hovertext = intrinsic_hover_text

# Customize the hover text to display the time and price for the existing points
hover_text = [f'Date: {t}<br>Price: {v} USD' for t, v in zip(time, price)]
fig.data[0].hovertext = hover_text

# Display the chart
fig.show()