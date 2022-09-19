import { Bar } from "react-chartjs-2";

type Props = {
    graphData: any;
}
function ProfileBarGraph({ graphData }: Props) {

    const graphSettings = {
        responsive: true,
        barThickness: 43,
        borderWidth: 1,
        borderRadius: 10,

        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const graphStats = {
   
        datasets: [
            {
                label: 'Expenditure (R)',
                data: graphData,
                backgroundColor: "rgb(39, 165, 146, 0.8)",
                width: 8,
                hoverBackgroundColor: "rgb(47, 198, 176, 0.8)",
            }
        ],
    };
    return (
        <Bar className="graph" options={graphSettings} data={graphStats} />
    );
}

export default ProfileBarGraph;