import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import Axios from 'axios';

const Dashboard = () => {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);
    const Chart = () => {
        let empSal = [];
        let empAge = [];
        Axios.get("http://dummy.restapiexample.com/api/v1/employees").then((res) => {
            console.log(res);
            for (const r of res.data.data) {
                empSal.push(parseInt(r.employee_salary));
                empAge.push(parseInt(r.employee_age));
            }
            empAge.sort();
            setChartData({
                labels: empAge,
                datasets: [{
                    label: '# of Votes',
                    data: empSal,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderWidth: 4
                }]
            });
        }).catch((err) => {
            console.log(err);
        })
        console.log(empSal, empAge);

        // setChartData({
        //     labels: empAge,
        //     datasets: [{
        //         label: '# of Votes',
        //         data: empSal,
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.2)'
        //         ],
        //         borderWidth: 4
        //     }]
        // });
    }
    useEffect(() => {
        Chart();
    }, []);

    return (
        <div className="App">
            <h1>Bar Chart</h1>
            <div>
                <Line
                    height="50"
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: "THICCNESS SCALE", display: true },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    )
}
export default Dashboard;