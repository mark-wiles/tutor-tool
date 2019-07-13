import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class EarningsChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				chart: {
					toolbar: {
						show: false
					},
				},
				colors: ['#FFA500'],
				plotOptions: {
					bar: {
						dataLabels: {
							position: 'top',
						},
					}
				},
				dataLabels: {
					enabled: true,
					formatter: function (val) {
						return "$" + val;
					},
					offsetY: -20,
					style: {
						fontSize: '11px',
						colors: ["#304758"]
					}
				},
				xaxis: {
					categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					position: 'top',
					labels: {
						offsetY: -24,
					},
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					},
					crosshairs: {
						fill: {
							type: 'gradient',
							gradient: {
								colorFrom: '#D8E3F0',
								colorTo: '#BED1E6',
								stops: [0, 100],
								opacityFrom: 0.4,
								opacityTo: 0.5,
							}
						}
					},
					tooltip: {
						enabled: true,
						offsetY: -35,
					}
				},
				fill: {
					gradient: {
						shade: 'light',
						type: "horizontal",
						shadeIntensity: 0.25,
						gradientToColors: undefined,
						inverseColors: true,
						opacityFrom: 1,
						opacityTo: 1,
						stops: [50, 0, 100, 100]
					},
				},
				yaxis: {
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false,
					},
					labels: {
						show: false,
						formatter: function (val) {
							return "$" + val;
						}
					}
				},
				title: {
					text: 'Monthly Earnings ' + new Date().getFullYear(),
					floating: true,
					offsetY: 300,
					align: 'center',
					style: {
						color: '#444'
					}
				}
			},
			series: [{
				name: 'Monthly Earnings',
				data: this.props.monthly
			}],
		}
	}

	render() {
		return (
			<Chart id="earnings-chart" options={this.state.options} series={this.state.series} type="bar" width={'100%'} height={320} />
		)
	}
}

export default EarningsChart;