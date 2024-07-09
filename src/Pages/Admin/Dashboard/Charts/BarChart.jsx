import React,{useEffect, useState} from 'react'
import ApexCharts from 'apexcharts';
import axios from 'axios';
import { clinicRequest } from '../../../../Api/AdminApi';

const BarChart = () => {
  const [data,setData] = useState([])
  useEffect(()=>{
    getData();
  },[])
  async function getData(){
    try {
      const res = await clinicRequest();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(() => {
      const clinicRequest = data?.clinicRequests?.filter(i => i.acceptedClinic !== undefined)
      .map(i => i.acceptedClinic)
       
          var options = {
            series: [{
              name : 'Accept',
            data: clinicRequest,
            color : 'rgba(245, 137, 90, 1)'
          }, {
            name : 'Reject',
            data: data?.clinicRequests?.filter(i => i.rejectedClinic !== undefined)
            .map(i => i.rejectedClinic),
            color : 'rgba(110, 129, 255, 1)'
          }],
            chart: {
            type: 'bar',
            height: 230,
            
            toolbar:{
              show : false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 2,
              borderRadiusApplication: 'end',
              dataLabels: {
                position: 'top',
              },
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
            show: false,
            width: 0,
            colors: ['#fff']
          },
          tooltip: {
            shared: true,
            intersect: false
          },
          title: {
            text: 'clinics Request',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238'
            },
            
        },
          legend: {
            position : 'top',
            horizontalAlign: 'right',
            floating: false,
            itemMargin : {
            horizontal: 5,
            vertical: 1
            },
          onItemHover: {
              highlightDataSeries: true
          },
          },
          xaxis: {
            categories: data?.months,
          },
          yaxis:{
            tickAmount: 5,
          }
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
      }, [data]);
  return (
      <>
     
      <div id="labels-chart" className="px-2.5 w-full " ></div>
      </>
    
  )
}

export default BarChart
