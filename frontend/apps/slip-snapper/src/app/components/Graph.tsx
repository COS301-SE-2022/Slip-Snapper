import { Bar } from "react-chartjs-2";

type Props = {
    graphData: any;
}
function Graph({ graphData }: Props) {

    const amounts = []
    const frequency = []
    for(let i = 0 ; i<graphData.amounts.length;i++)
    {
        amounts[i] = graphData.amounts[i].itemPrice
        frequency[i] = graphData.occurances[i].id
    }


     const graphSettings = {
        responsive: true,
        barThickness: 43,
        borderWidth: 1,
        borderRadius: 10,
        
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: graphData.itemName+' prices across various stores',
            },
        },
    };

     const graphStats = {
         labels: graphData.stores,
        datasets: [
            {
                label: 'Price (R)',
                data: amounts,
                backgroundColor: "rgb(39, 165, 146, 0.8)",
                width: 8,
                hoverBackgroundColor: "rgb(47, 198, 176, 0.8)",
            },
            {
                label: 'Frequency',
                data: frequency,
                backgroundColor: 'rgb(156, 39, 176, 0.8)',
                width: 8,
                hoverBackgroundColor: "rgb(187, 54, 211, 0.8)",
                hidden: true,
            }
        ],
    };

    return (
        <Bar className="graph" options={graphSettings} data={graphStats} />
    );
}

export default Graph;