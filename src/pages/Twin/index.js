import { LineChart } from "./LineCHart";
import StackChart from "./StackChart"
export const Twin = () => {
    function Heading(props) {
        return (
            <div className="d-flex justify-content-between align-items-center p-2">
                {props.icon && props.icon} <h5>{props.title}</h5>
                {props.title === "OKR Progress" && <button
                    className="text-left justify-content-start bg-green text-light"
                    style={{ borderRadius: "4px", textTransform: "uppercase" }}
                // onClick={() => {
                //     props.setOrderModalShow3(true)
                // }}
                >
                    Add OKR
                </button>}
                <div className="dropdown actionDropdown">
                    <button
                        className="btn btn-light dropdown-hide align-items-center"
                        id="dropdownMenuButton"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fa fa-ellipsis-h pe-auto" />
                    </button>
                    <div
                        className="dropdown-menu dropdown-menu-right text-left "
                        aria-labelledby="dropdownMenuButton"
                    >
                        <button
                            className="dropdown-item text-capitalize text-left justify-content-start"
                        // onClick={() => {
                        //     downloadSheet2()
                        // }}
                        >
                            Export as Excel
                        </button>

                    </div>
                </div>
            </div>
        );
    }
   const labels1=['January', 'February', 'March', 'April']
   const data1 = {
        labels:labels1,
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 30, 40, 15],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [15, 20, 10, 17],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [10, 9, 10, 17],
                borderColor: 'lightblue',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [12, 2, 20, 33],
                borderColor: 'lightgreen',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const labels2=['January', 'February', 'March', 'April']
    const data2 = {
         labels:labels2,
         datasets: [
             {
                 label: 'Dataset 1',
                 data: [50, 0, 25, 45],
                 borderColor: 'rgb(255, 99, 132)',
                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
             },
             {
                 label: 'Dataset 2',
                 data: [5, 10, 20, 19],
                 borderColor: 'rgb(53, 162, 235)',
                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
             },
         ],
     };

     const labels3=['January', 'February', 'March', 'April']
     const data3 = {
          labels:labels3,
          datasets: [
              {
                  label: 'Dataset 1',
                  data: [20, 10, 15, 35],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                  label: 'Dataset 2',
                  data: [15, 60, 30, 10],
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
          ],
      };

      const labels4=['January', 'February', 'March', 'April']
      const data4 = {
           labels:labels4,
           datasets: [
               {
                   label: 'Dataset 1',
                   data: [20, 10, 15, 35],
                   borderColor: 'lightblue',
                   backgroundColor: 'rgba(255, 99, 132, 0.5)',
               },
               {
                   label: 'Dataset 2',
                   data: [15, 60, 30, 10],
                   borderColor: 'lightgreen',
                   backgroundColor: 'rgba(53, 162, 235, 0.5)',
               },
           ],
       };
    return (
        <div className="ms-4 me-4">
            <div className="row mt-3">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <Heading title="Overall Cultivation Temperature and Humidity" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data1}/>
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 `}>
                    <Heading title="Plants and material harvested" data={[]} employees={[]} />
                    <hr />
                    <StackChart data={[]} xtitle="Total Plants" ytitle="Grams Harvested" labels={['Remaining', 'Achieved']} />
                </div>
            </div>
            <div className="row mt-3">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <Heading title="Cannabinoid Contents" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data2} labels={['Remaining', 'Achieved']} />
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 `}>
                    <Heading title="Light spectrum Evaluation" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data3} labels={['Remaining', 'Achieved']} />
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <Heading title="Plant Health via optical input" data={[]} employees={[]} />
                    <hr />
                    <StackChart data={[]} xtitle="Plant Health" ytitle="Optical Input" labels={['Remaining', 'Achieved']} />
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 `}>
                    <Heading title="Plant moisture Contents" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data4} labels={['Remaining', 'Achieved']} />
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className={`col-6 gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <Heading title="Bud Visual appearance by score" data={[]} employees={[]} />
                    <hr />
                    <StackChart data={[]} xtitle="Avg Score" ytitle="Harvest Date" labels={['Remaining', 'Achieved']} />
                </div>
            </div>
        </div>
    )
}