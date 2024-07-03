import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SparkLineChart } from '@mui/x-charts';
import { ButtonGroup, Button, Typography } from '@mui/material';
import axios from 'axios';

const VisitorChart = () => {
    const [timeFrame, setTimeFrame] = useState('1Day');
    const [chartData, setChartData] = useState([]);
    const [totalVisits, setTotalVisits] = useState(0);
    const [totalVisitsAllTime, setTotalVisitsAllTime] = useState(0);

    const fetchData = async (frame) => {
        try {
            const response = await axios.get(`/api/visitor-count?timeFrame=${frame}`);
            const data = response.data.counts;
            setChartData(data);
            setTotalVisits(response.data.total_visits);
            setTotalVisitsAllTime(response.data.total_visits_all_time);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTimeFrameChange = (frame) => {
        setTimeFrame(frame);
        fetchData(frame);
    };

    useEffect(() => {
        fetchData(timeFrame);
        const interval = setInterval(() => fetchData(timeFrame), 30000);
        return () => clearInterval(interval);
    }, [timeFrame]);

    return (
        <Grid container direction="column" spacing={2} style={{ height: '100vh' }}>
            <Grid item>
                <Typography variant="h6">Total visits for the selected period: {totalVisits}</Typography>
                <Typography variant="h6">Total visits: {totalVisitsAllTime}</Typography>
            </Grid>
            <Grid item xs={6} style={{ height: '100%' }}>
                <SparkLineChart data={chartData} width={400} height={100} />
            </Grid>
            <Grid item>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => handleTimeFrameChange('1Day')}>1D</Button>
                    <Button onClick={() => handleTimeFrameChange('1Week')}>1W</Button>
                    <Button onClick={() => handleTimeFrameChange('1Month')}>1M</Button>
                    <Button onClick={() => handleTimeFrameChange('3Month')}>3M</Button>
                    <Button onClick={() => handleTimeFrameChange('1Y')}>1Y</Button>
                    <Button onClick={() => handleTimeFrameChange('Max')}>Max</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
};

export default VisitorChart;