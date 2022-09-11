import { Bar } from "react-chartjs-2";
import '../theme/reportItem.css'


type Props = {
    graphData: any;
}
function Graph({ graphData }: Props) {

    const amounts = []
    const occurrences = []
    for(let i = 0 ; i<graphData.amounts.length;i++)
    {
        amounts[i] = graphData.amounts[i].itemPrice
        occurrences[i] = graphData.occurances[i].id
    }


     const graphSettings = {
        responsive: true,
        barThickness: 43,
        borderWidth: 2,
        hoverBackgroundColor: '#5d6c83',

        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: graphData.itemName+' prices across various Stores',
            },
        },
    };

     const graphStats = {
         labels: graphData.stores,
        datasets: [
            {
                label: 'Price (R)',
                data: amounts,
                backgroundColor: '#27A592',
                width: 8,
            },
            {
                label: 'Occurrences',
                data: occurrences,
                backgroundColor: '#292592',
                width: 8,
                hidden: true,
            }
        ],
    };

    return (
        <Bar options={graphSettings} data={graphStats} />
    );
}

export default Graph;