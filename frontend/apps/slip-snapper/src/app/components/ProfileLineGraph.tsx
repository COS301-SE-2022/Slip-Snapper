import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Props = {
    graphData: any;
}
function ProfileLineGraph({ graphData }: Props) {
    const graphSettings = {
        responsive: true,
        color: 'white',

        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
        scales: {
            yAxes: {
                ticks: {
                    color: 'white',
                    fontSize: 12,
                }
            },
            xAxes: {
                ticks: {
                    color: 'white',
                    fontSize: 12,
                }
            },
        },
    };


    const graphStats = {
        labels: graphData[0].futureDateArray,
        datasets: [
            {
                label: 'Forecasted Expenditure (R)',
                data: graphData[0].averagesArray,
                borderColor: "rgb(39, 165, 146)",
                backgroundColor: "rgb(39, 165, 146)",
            },
            {
                label: 'Weekly Budget (R)',
                data: [graphData[1], graphData[1], graphData[1], graphData[1]],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132)',

            },
        ],
    };
    return (
        <Line className="graph" options={graphSettings} data={graphStats} height={250} />
    );
}

export default ProfileLineGraph;