import './styles.css'
import { FiSearch } from 'react-icons/fi'
import StackChart from './StackChart';
import { BubbleChartE } from './bubbleChart';
import { Accordian } from './accordian';
import { LuUserPlus } from 'react-icons/lu'
import { ResourceAvailability } from './table';
export const ResourceManagement = () => {
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
    return (
        <div>
            <div className="p-3 pb-1 pt-4 ps-3 d-flex" style={{
                justifyContent: 'space-between'
            }} >
                {/* <TitleHeader name="Resource Management" /> */}
                <h1 className="top-header">Resource Management</h1>
                <div style={{ width: '80%' }}>
                    <input type="text" className='search-input' style={{
                        width: '100%', height: '38px', borderRadius: '6px',
                        backgroundColor: 'lightgrey',
                        padding: '13.999px 250.001px 13.941px 33.999px',
                        gap: '5.94px',
                        // border: '1px solid var(--stroke, #E2E8F0)',
                        border: 'none',
                        boxShadow: '1.999999761581421px 3.999999523162842px 9.999999046325684px 0px rgba(180, 191, 205, 0.12)'
                    }}
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className='row p-4 pt-3'>
                <div className={`col-md-8 m-0 p-0`} >
                    <div className={`gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 `}>
                        <Heading title="Resource Allocation" data={[]} employees={[]} />
                        <hr />
                        <StackChart data={[]} labels={['Remaining', 'Achieved']} />
                    </div>
                    {/* <div className='col-md-8 availability ml-0 mr-0 p-0'> */}
                    <div className={`gradient-color card shadow rounded m-1 mt-2 p-1 graphCardHeight border-0`}>
                        <Heading title="Resource Availability" data={[]} employees={[]} />
                        <hr />
                        {/* <BubbleChartE /> */}
                        <ResourceAvailability />
                    </div>
                    {/* </div> */}
                </div>
                <div className={`col-md-4 m-0 p-0`}>
                    <div className={`gradient-color card shadow rounded m-1 p-1 me-0 pe-0 graphCardHeight border-0`}>
                        <Heading title="Resource Requests" data={[]} employees={[]} />
                        <Accordian />
                    </div>
                    <div className={`gradient-color card shadow rounded m-1 p-1 me-0 pe-0 graphCardHeight border-0`}>
                        <Heading title="Skills" data={[]} employees={[]} />
                        <hr style={{ padding: 0 }} />
                        <BubbleChartE />
                    </div>
                </div>
            </div>
        </div>
    )
}