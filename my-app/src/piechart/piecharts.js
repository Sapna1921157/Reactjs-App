import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import './piechart.css'; // Your CSS file

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                console.log(response.data, "Fetched data");

                // Assuming response.data is an array of objects with species_name and species_count
                const labels = response.data.map(item => item.species_name);
                const counts = response.data.map(item => item.species_count);
                console.log('Labels:', labels);
console.log('Counts:', counts);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                            ],
                            borderColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container">
            <h2>User Distribution by Name</h2>
            <Pie data={chartData} options={{ responsive: true }} />
        </div>
    );
};

export default PieChart;
