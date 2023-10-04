export const options = {
    chart: {
        // height: '400px',
        // width:'100px',
        type: 'bar'
    },

    colors: [
        "#39c734",
        "#0000FF"
    ],
    plotOptions: {
        bar: {
            columnWidth: '5px',
            horizontal: false,
            borderRadius: 0,
            borderRadiusApplication: 'around',
            borderRadiusWhenStacked: 'last',
            columnWidth: '30%',
            barHeight: '40%',
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            hideZeroBarsWhenGrouped: false,
            isDumbbell: false,
            dumbbellColors: undefined,
            isFunnel: false,
            isFunnel3d: true,
            dataLabels: {
                position: 'top',
            }
        }
    },
    grid: {
        show: false
    },
    dataLabels: {
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        },
        offsetY: -20,
        formatter: function (val, opt) {
            const goals =
                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                    .goals
            return `${val}`
        }
    },
    // colors: colors
}
export const finalData5 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'MAC',
                y: 43,
                color: "#41B883",
            },
            {
                x: 'Double Tahoe',
                y: 26,
                color: "#00D8FF",
            },
            {
                x: 'Space Queen',
                y: 14,
                color: "#00D8FF",
            },
            {
                x: 'Racon',
                y: 17,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData6 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'MAC',
                y: 238,
                color: "#41B883",
            },
            {
                x: 'Double Tahoe',
                y: 243,
                color: "#00D8FF",
            },
            {
                x: 'Space Queen',
                y: 273,
                color: "#00D8FF",
            },
            {
                x: 'Racon',
                y: 234,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData7 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'MAC',
                y: 10234,
                color: "#41B883",
            },
            {
                x: 'Double Tahoe',
                y: 6318,
                color: "#00D8FF",
            },
            {
                x: 'Space Queen',
                y: 3822,
                color: "#00D8FF",
            },
            {
                x: 'Racon',
                y: 3978,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData8 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: "A",
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: "B",
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: "A",
                color: "#00D8FF",
            }
        ]
    }
]




export const finalData = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: 48,
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: 31,
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: 17,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData2 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: 249,
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: 213,
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: 250,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData3 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: 11952,
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: 6603,
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: 4250,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData4 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: "A",
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: "B",
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: "A",
                color: "#00D8FF",
            }
        ]
    }
]





export const bubbleOptions = {
    series: [{
        name: 'Blue Dream',
        data: [
            [249, 71.5]
        ]
    },
    {
        name: 'Soure Diesel',
        data: [
            [213, 68],
        ]
    },
    {
        name: 'Golden Goat',
        data: [
            [250, 65],
        ]
    },
    {
        name: 'MAC',
        data: [
            [238, 70],
        ]
    },
    {
        name: 'Double Tahoe',
        data: [
            [243, 69],
        ]
    },
    {
        name: 'Space Queen',
        data: [
            [273, 72],
        ]
    },
    {
        name: 'Recon',
        data: [
            [234, 61],
        ]
    },
    {
        name: 'Jilly Bean',
        data: [
            [301, 68],
        ]
    },
    {
        name: 'Cereal Milk',
        data: [
            [306, 40],
        ]
    },
    {
        name: 'Jah kush',
        data: [
            [235, 65],
        ]
    },
    ],
    options: {
        chart: {
            height: 350,
            type: 'scatter',
            zoom: {
                type: 'xy'
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
        },
        legend: {
            position: 'top',
        },
        xaxis: {
            title: {
                display: true,
                text: 'g/plant',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false,
            },
            tick:50
        },
        yaxis: {
            title: {
                display: true,
                text: 'Temperature',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false
            }
        }
    },
};

export const humidityOptions = {
    series: [{
        name: 'Blue Dream',
        data: [
            [249, 61.5]
        ]
    },
    {
        name: 'Soure Diesel',
        data: [
            [213, 58],
        ]
    },
    {
        name: 'Golden Goat',
        data: [
            [250, 45],
        ]
    },
    {
        name: 'MAC',
        data: [
            [238, 50],
        ]
    },
    {
        name: 'Double Tahoe',
        data: [
            [243, 59],
        ]
    },
    {
        name: 'Space Queen',
        data: [
            [273, 62],
        ]
    },
    {
        name: 'Recon',
        data: [
            [234, 51],
        ]
    },
    {
        name: 'Jilly Bean',
        data: [
            [301, 48],
        ]
    },
    {
        name: 'Cereal Milk',
        data: [
            [306, 40],
        ]
    },
    {
        name: 'Jah kush',
        data: [
            [235, 45],
        ]
    },
    ],
    options: {
        chart: {
            height: 350,
            type: 'scatter',
            zoom: {
                type: 'xy'
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
        },
        legend: {
            position: 'top',
        },
        xaxis: {
            title: {
                display: true,
                text: 'g/plant',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false,
            },
            tick:50
        },
        yaxis: {
            title: {
                display: true,
                text: 'Humidity',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false
            }
        }
    },
};




