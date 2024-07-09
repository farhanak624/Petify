import React, {useEffect} from 'react'
import ApexCharts from 'apexcharts';
import DropDown from '../../Admin/Dashboard/DropDown';

const AreaChart = ({months, bookedData, cancelledData}) => {
  useEffect(() => {
    var options = {
        series: [{
        name: 'Booked',
        data: bookedData,
        color : 'rgba(245, 137, 90, 1)'
        },{
          name: 'Cancelled',
          data: cancelledData,
          color : 'rgba(238, 81, 88, 1)'
          }],
        plotOptions: {
            area: {
                fillTo: 'origin',
            },},                
      chart: {
            sparkline: {
              enabled: false,
            },
            height: "256",
            width: "98%",
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
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      
      xaxis: {
            show: true,
            categories: months,
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
              },
        tooltip: {
        enabled : true
      },
      stroke: {
        lineCap: 'round',
        dashArray: 0,
        curve: 'smooth',
        colors: ["rgba(255, 205, 183, 1)"],
        width: [3], // Set the desired width in pixels
        },
        legend: {
        show: false,
        },
        grid: {
        show: true,
        strokeDashArray: 5,
        },
        
      legend: {
        show : true,
        position : 'top',
       
        floating: false,
        itemMargin : {
        horizontal: 5,
        vertical: 1
        },
      onItemHover: {
          highlightDataSeries: true
      },
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
  }, [months, bookedData, cancelledData]);
  return (
    <div>
    <div id="chart" className="px-2.5 w-full pt-2 h-full shadow-md rounded-xl relative" style={{border : '0.3px solid rgba(0, 0, 0, 0.04)'}}>
      
    </div>
  </div>
  )
}

export default AreaChart
