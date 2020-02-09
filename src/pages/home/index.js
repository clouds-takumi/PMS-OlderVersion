import { Component } from 'react'
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts'

class Dashboard extends Component {
  render() {
    const data = [
      { month: 'Jan.', count: 69 },
      { month: 'Feb.', count: 53 },
      { month: 'Mar.', count: 74 },
      { month: 'Apr.', count: 29 },
      { month: 'May.', count: 83 },
      { month: 'Jun.', count: 109 },
      { month: 'Jul.', count: 137 },
    ]
    const scale = {
      month: {alias: 'Month',},
      count: {alias: 'Sales',},
    }

    return (
      <div>
        <Chart height={400} data={data} scale={scale} forceFit>
          <Axis title name="month" />
          <Axis title name="count" />
          <Legend />
          <Tooltip crosshairs={{ type: 'rect' }} />
          <Geom type='interval' position='month*count' color='month' />
        </Chart>
      </div>
    )
  }
}

export default Dashboard
