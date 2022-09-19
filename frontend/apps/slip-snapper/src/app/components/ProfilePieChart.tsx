import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
type Props = {
    graphData: any;
}
function ProfileBarGraph({ graphData }: Props) {
    const data = {
        labels: ['Electronics', 'Fashion', 'Food', 'Healthcare', 'Hobby', 'Household','Other','Vehicle'],
        datasets: [
            {
                label: '# of Votes',
                data: [graphData[0].Electronics, graphData[0].Fashion, graphData[0].Food, graphData[0].Healthcare, graphData[0].Hobby
                    , graphData[0].Household, graphData[0].Other, graphData[0].Vehicle],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Pie data={data} />
    );
}

export default ProfileBarGraph;