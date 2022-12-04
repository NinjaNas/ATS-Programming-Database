import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import React from "react";

function barChart({ data, barKey, dataKey }) {
	return (
		<ResponsiveContainer
			width='100%'
			height='90%'>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey={dataKey} />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar
					dataKey={barKey}
					fill='#82ca9d'
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

export default barChart;

