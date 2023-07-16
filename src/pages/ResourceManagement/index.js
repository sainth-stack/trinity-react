import './styles.css'
import { FiSearch } from 'react-icons/fi'
import StackChart from './StackChart';
export const ResourceManagement = () => {
    function Heading(props) {
        return (
            <div className="d-flex justify-content-between align-items-center p-2">
                <h6>{props.title}</h6>
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
        <>
            <div className="p-2 d-flex" style={{
                justifyContent: 'space-between'
            }} >
                {/* <TitleHeader name="Resource Management" /> */}
                <h1 className="top-header">Resource Management</h1>
                <div style={{ width: '80%' }}>
                    <span className="search"><FiSearch /></span>
                    <input type="text" style={{
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
            <div className={`col-md-8 m-0 p-0`} >
                <div className={`gradient-color card shadow rounded m-1 p-1 graphCardHeight`}>
                <Heading title="Resource Allocation" data={[]} employees={[]} />
                    <StackChart data={[]} labels={['Remaining', 'Achieved']} />
                </div>
            </div>
        </>
    )
}