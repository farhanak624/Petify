import React,{useEffect} from 'react'
import ApexCharts from 'apexcharts';

const Barchart = ({visitors}) => {
    console.log({visitors})
    useEffect(() => {
       
        var options = {
          series: [{
          data: visitors?.data,
        }],
          chart: {
          type: 'bar',
          height: 300,
          width : 550
        },
        colors: [function({ value, seriesIndex, w }) {
            if (value <100) {
                return 'rgba(245, 137, 90, 0.6)'
            }else if (value<=200) {
                return 'rgba(245, 137, 90, 0.7)'
            }else if (value>200) {
                return 'rgba(245, 137, 90, 0.8)'
            } else if (value >=300) {
                return 'rgba(245, 137, 90, 0.9)'
            }else if (value >=400) {
                return 'rgba(245, 137, 90, 1)'
            }
          }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 2,
            borderRadiusApplication: 'end',
            dataLabels: {
              position: 'top',
            },
            columnWidth : '35%',
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        
        legend: {
          position : 'top',
          horizontalAlign: 'right',
        },
        xaxis: {
          categories: visitors?.doc,
        },
        yaxis: {
          tickAmount: 5,
        },
        };

  
      let chart = new ApexCharts(
        document.getElementById("labels-chart"),
        options
      );
      chart.render();
  
      // Cleanup function to destroy the chart instance when component unmounts
      return () => {
        chart.destroy();
      };
    }, [visitors]);
  return (
    <div>
      <div id="labels-chart" className="px-2.5 w-full shadow-lg rounded-xl mx-auto" style={{border : '0.3px solid rgba(0, 0, 0, 0.04)'}}></div>
    </div>
  )
}

export default Barchart
