import React, {useEffect} from 'react'
import ApexCharts from 'apexcharts';

const LineChart = ({bookingStats}) => {
    useEffect(() => {
        var options = {
            series: [{
            name: 'series1',
            data: bookingStats?.data,

            }],
            plotOptions: {
                area: {
                    fillTo: 'origin',
                },},                
          chart: {
                sparkline: {
                  enabled: false,
                },
                height: "450",
                width: "100%",
                type: "area",
                fontFamily: "Inter, sans-serif",
                dropShadow: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 0.5,
                type: "vertical",
                stops: [0, 100],
                colorStops: [{
                    offset: 0,
                    color: "#FFCDB7",
                    opacity: 1
                }, {
                    offset: 100,
                    color: "rgba(255, 205, 183, 1)",
                    opacity: 0.3
      }],}},
          
          xaxis: {
                show: true,
                categories: bookingStats?.doc,
                labels: {
                  show: true,
                  style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: "text-xs m-2 font-normal fill-gray-500 dark:fill-gray-400",
                  },
                },
                axisBorder: {
                  show: true,
                },
                axisTicks: {
                  show: true,
                },
              },
              yaxis: {
                    show: true,
                    labels: {
                      show: true,
                      style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                      },
                      
                    },
                    tickAmount: 5,
                  },
            tooltip: {
            enabled : true,
          },
          stroke: {
            lineCap: 'round',
            dashArray: 0,
            curve: 'smooth',
            colors: ["rgba(255, 205, 183, 1)"],
            width: [2], // Set the desired width in pixels
            },
            legend: {
            show: false,
            },
            grid: {
            show: true,
            strokeDashArray: 5,
            },
            
        }
  
        
      
    
        let chart = new ApexCharts(
          document.getElementById("chart"),
          options
        );
        chart.render();
    
        // Cleanup function to destroy the chart instance when component unmounts
        return () => {
          chart.destroy();
        };
      }, [bookingStats]);
  return (
    <div>
      <div id="chart" className="px-2.5 w-full"></div>
    </div>
  )
}

export default LineChart
