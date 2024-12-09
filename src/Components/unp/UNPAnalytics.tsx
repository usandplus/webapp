import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2'; // Importing Line chart
import { Bar } from 'react-chartjs-2'; // Importing Bar chart
import { database } from './../../firebase/firebaseConfig'; // Adjust import based on your Firebase setup
import { ref, onValue } from 'firebase/database'; // Importing from Realtime Database

// Registering Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

// Define interfaces for the engagement data
interface EngagementData {
  id: string;
  date: string; // Assuming date is a string in 'YYYY-MM-DD' format
  engagementScore: number; // Example metric
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
}

const UNPAnalytics: React.FC = () => {
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('daily'); // Options: 'daily', 'weekly', 'monthly'
  const [filteredData, setFilteredData] = useState<EngagementData[]>([]);

  useEffect(() => {
    // Example dummy data for initial testing
    const dummyData: EngagementData[] = [
      { id: '1', date: '2024-10-01', engagementScore: 75 },
      { id: '2', date: '2024-10-02', engagementScore: 50 },
      { id: '3', date: '2024-10-03', engagementScore: 80 },
      { id: '4', date: '2024-10-04', engagementScore: 60 },
      { id: '5', date: '2024-10-05', engagementScore: 90 },
    ];
    setEngagementData(dummyData);

    // Uncomment the following lines to fetch real-time data from Firebase
    // const engagementRef = ref(database, 'engagement'); // Adjust path based on your database structure
    // onValue(engagementRef, (snapshot) => {
    //   const data = snapshot.val();
    //   const parsedData = data ? Object.keys(data).map(key => ({
    //     ...data[key],
    //     id: key,
    //   })) : [];
    //   setEngagementData(parsedData);
    // });
  }, []);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, groupBy, engagementData]);

  const filterData = () => {
    let filtered = engagementData;

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
    }

    setFilteredData(filtered);
  };

  const getChartData = (): ChartData => {
    // Group data by the selected method
    const groupedData: { [key: string]: number } = {};

    filteredData.forEach((item) => {
      let label: string;
      if (groupBy === 'daily') {
        label = item.date; // Use the exact date for daily
      } else if (groupBy === 'weekly') {
        const date = new Date(item.date);
        const weekStart = new Date(date.setDate(date.getDate() - date.getDay())).toISOString().split('T')[0]; // Get the start of the week
        label = weekStart;
      } else if (groupBy === 'monthly') {
        const date = new Date(item.date);
        label = date.toISOString().split('T')[0].slice(0, 7); // Format as YYYY-MM
      } else {
        label = item.date; // Fallback
      }

      if (!groupedData[label]) {
        groupedData[label] = 0;
      }
      groupedData[label] += item.engagementScore; // Aggregate the engagement score
    });

    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    return {
      labels,
      datasets: [
        {
          label: 'Engagement Score',
          data: values,
          fill: false,
          backgroundColor: '#D1CFFF',
          borderColor: '#D1CFFF',
        },
      ],
    };
  };

  return (
    <Container>
      <h3>Estadisticas</h3>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formStartDate">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formEndDate">
            <Form.Label>Fecha final</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formGroupBy">
            <Form.Label>Agrupar por</Form.Label>
            <Form.Control
              as="select"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="daily">Dia</option>
              <option value="weekly">Semana</option>
              <option value="monthly">Mes</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <div>
        <h4>Estadistico 1</h4>
        <Line data={getChartData()} />
      </div>

      {/* Additional Charts can be added here */}
      <div>
        <h4>Estadistico 2</h4>
        <Bar data={getChartData()} />
      </div>
      <div>
        <h4>Estadistico 2</h4>
        <Bar data={getChartData()} />
      </div>
      <div>
        <h4>Estadistico 2</h4>
        <Bar data={getChartData()} />
      </div>
    </Container>
  );
};

export default UNPAnalytics;
