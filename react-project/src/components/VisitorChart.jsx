import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SparkLineChart } from '@mui/x-charts';
import { ButtonGroup, Button } from '@mui/material';
import axios from 'axios';

const VisitorChart = () =>
{
    const [timeFrame, setTimeFrame] = useState('1Day');
    const [chartData, setChartData] = useState([]);

    const handleTimeFrameChange = (frame) =>
    {
        setTimeFrame(frame);
        fetchData(frame);
    };

    const fetchData = async (frame) =>
    {
        try
        {
            const response = await axios.get(`/api/visitor-count?timeFrame=${frame}`);
            const data = response.data.counts;
            setChartData(data);
        } catch (error)
        {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() =>
    {
        fetchData('1Day');
    }, []);

    return (
        <Grid xs={6} style={{ height: '100%' }}>
            <SparkLineChart data={chartData} width={400} height={100} />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => handleTimeFrameChange('1Day')}>1D</Button>
                <Button onClick={() => handleTimeFrameChange('1Week')}>1W</Button>
                <Button onClick={() => handleTimeFrameChange('1Month')}>1M</Button>
                <Button onClick={() => handleTimeFrameChange('3Month')}>3M</Button>
                <Button onClick={() => handleTimeFrameChange('1Y')}>1Y</Button>
                <Button onClick={() => handleTimeFrameChange('Max')}>Max</Button>
            </ButtonGroup>
        </Grid>
    );
};

export default VisitorChart;