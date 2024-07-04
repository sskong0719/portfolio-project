import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SparkLineChart } from '@mui/x-charts';
import { ButtonGroup, Button } from '@mui/material';
import axios from 'axios';
import './VisitorChart.css';

const VisitorChart = () =>
{
    const [timeFrame, setTimeFrame] = useState('1Day');
    const [chartData, setChartData] = useState([]);
    const [totalVisits, setTotalVisits] = useState(0);

    const fetchData = async (frame) =>
    {
        const token = localStorage.getItem('token');
        try
        {
            const response = await axios.get(`/api/visitor-count?timeFrame=${frame}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data.counts;
            setChartData(data);
            setTotalVisits(response.data.total_visits);
        } catch (error)
        {
            console.error('Error fetching data:', error);
        }
    };

    const handleTimeFrameChange = (frame) =>
    {
        setTimeFrame(frame);
        fetchData(frame);
    };

    useEffect(() =>
    {
        fetchData(timeFrame);
        const interval = setInterval(() => fetchData(timeFrame), 30000);
        return () => clearInterval(interval);
    }, [timeFrame]);

    const getPeriodLabel = (frame) =>
    {
        switch (frame)
        {
            case '1Day':
                return 'Today';
            case '1Week':
                return 'Past week';
            case '1Month':
                return 'Past month';
            case '3Month':
                return 'Past 3 months';
            case '1Y':
                return 'Past year';
            case 'Max':
                return 'All time';
            default:
                return '------';
        }
    };

    return (
        <Grid>
            <label className='period-label'>
                {getPeriodLabel(timeFrame)}: {totalVisits}
            </label>
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
