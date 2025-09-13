import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TestResult } from '../types';

type Metric = 'Avg Solve Time (s)' | 'Avg Moves' | 'Success Rate (%)';

interface LeaderboardChartProps {
  data: TestResult[];
  metric: Metric;
}

interface AggregatedData {
  name: string;
  totalTests: number;
  totalSolveTime: number;
  totalMoves: number;
  solvedCount: number;
}

const LeaderboardChart: React.FC<LeaderboardChartProps> = ({ data, metric }) => {
  // Aggregate data for the chart
  const aggregateData = data.reduce((acc: { [key: string]: AggregatedData }, result) => {
    const model = result.model;
    if (!acc[model]) {
      acc[model] = { name: model, totalTests: 0, totalSolveTime: 0, totalMoves: 0, solvedCount: 0 };
    }
    acc[model].totalTests++;
    acc[model].totalSolveTime += result.solveTime;
    acc[model].totalMoves += result.moveCount;
    if (result.isSolved) {
      acc[model].solvedCount++;
    }
    return acc;
  }, {});

  const chartData = Object.values(aggregateData).map((modelData: AggregatedData) => {
    switch (metric) {
      case 'Avg Solve Time (s)':
        return {
          name: modelData.name,
          [metric]: parseFloat((modelData.totalSolveTime / modelData.totalTests / 1000).toFixed(2)),
        };
      case 'Avg Moves':
        return {
          name: modelData.name,
          [metric]: parseFloat((modelData.totalMoves / modelData.totalTests).toFixed(2)),
        };
      case 'Success Rate (%)':
        return {
          name: modelData.name,
          [metric]: parseFloat((modelData.solvedCount / modelData.totalTests * 100).toFixed(2)),
        };
      default:
        throw new Error(`Unsupported metric: ${metric}`);
    }
  });

  const barColors = {
    'Avg Solve Time (s)': '#8884d8',
    'Avg Moves': '#82ca9d',
    'Success Rate (%)': '#ffc658',
  };

  return (
    <div className="card" style={{ flex: 1, minWidth: '300px' }}>
      <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{metric}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="name" stroke="var(--secondary-text)" />
            <YAxis stroke="var(--secondary-text)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-color)' }} 
              labelStyle={{ color: 'var(--primary-text)' }}
            />
            <Bar dataKey={metric} fill={barColors[metric]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeaderboardChart;
