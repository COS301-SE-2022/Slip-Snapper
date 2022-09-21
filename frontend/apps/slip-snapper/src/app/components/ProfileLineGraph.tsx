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

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const graphStats = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1,2,3,4,5],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [10,9,8,7,6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <Line className="graph" options={graphSettings} data={graphStats} height={250} />
    );
}

export default ProfileLineGraph;