import React from "react"
import { Accordian } from "../ResourceManagement/accordian";
import PieChart from "../../components/PieChart";
import StackChart from "../../components/StackChart";
import { BsCloudCheckFill } from 'react-icons/bs'
import { AiFillFolder } from 'react-icons/ai'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { FaTasks } from 'react-icons/fa'
import { BiSolidGroup } from 'react-icons/bi'
function Heading(props) {
    return (
        <div className="d-flex justify-content-between align-items-center p-2">
            <div className="d-flex">
                {props.startIcon && props.startIcon} <h5 className="ms-3" style={{ marginTop: '-1px' }} >{props.title}</h5>
            </div>
            {props.endIcon ? props.endIcon : <div className="dropdown actionDropdown">
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
            </div>}
        </div>
    );
}
export const Projects = () => {
    return (
        <div className="p-2">
            <div className="p-3 pb-1 pt-4 ps-3 d-flex" style={{
                justifyContent: 'space-between'
            }} >
                {/* <TitleHeader name="Resource Management" /> */}
                <h1 className="top-header">Projects</h1>
                <div style={{ width: '90%' }}>
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
            <div className={`gradient-color card shadow rounded m-1 mt-2 p-1 graphCardHeight border-0`}>
                <Heading title="Key Performance Indicators" data={[]} employees={[]} startIcon={<BsCloudCheckFill size={24} />} />
                <hr />
                <div style={{ display: 'flex', justifyContent: "space-around", marginBottom: '10px' }}>
                    <div>
                        <p style={{ fontFamily: 'Poppins' }}>Billable Revenue</p>
                        <h2 style={{ fontWeight: 500, lineHeight: '21px' }}>$ 721.29k</h2>
                    </div>
                    <div>
                        <p className="ms-4" style={{ fontFamily: 'Poppins' }}>Cost</p>
                        <h2 style={{ fontWeight: 500, lineHeight: '21px' }}>$ 500</h2>
                    </div>
                    <div>
                        <p className="ms-5" style={{ fontFamily: 'Poppins' }}>Profit</p>
                        <h2 style={{ fontWeight: 500, lineHeight: '21px' }}>$ 720.79k</h2>
                    </div>
                    <div>
                        <p className="ms-3" style={{ fontFamily: 'Poppins' }}>Margin</p>
                        <h2 style={{ fontWeight: 500, lineHeight: '21px' }}>99.93%</h2>
                    </div>
                </div>
            </div>
            <div className="d-flex w-100">
                <div className={`gradient-color w-100 card shadow rounded m-1 mt-2 p-1 graphCardHeight border-0`}>
                    <Heading title="Projects" data={[]} employees={[]} startIcon={<AiFillFolder size={24} />} endIcon={<AiFillQuestionCircle size={22} />} />
                    <hr />
                    <Accordian num1={"21"} heading={"Over Hours Budget"} num2="3" sub="Over End Date" />
                    <hr />
                    <h5>{"Stages"}</h5>
                    <div className="mt-3" style={{ width: '400px', height: '400px' }}>
                        <PieChart />
                    </div>
                </div>
                <div className={`gradient-color w-100 card shadow rounded m-1 mt-2 p-1 graphCardHeight border-0`}>
                    <Heading title="Tasks" data={[]} employees={[]} startIcon={<FaTasks size={24} />} endIcon={<AiFillQuestionCircle size={22} />} />
                    <hr />
                    <Accordian num1={"86"} heading={"Over Hours Estimate"} num2="1" sub="Over End Date" />
                    <hr />
                    <h5>169 Active Tasks</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10%' }}>
                        <div style={{ display: "flex" }}>
                            <p style={{ background: 'red', height: '15px', width: "15px", marginTop: '5px' }}></p>
                            <p className="ms-2">Over Estimation or End Date</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ background: 'green', height: '15px', width: "15px", marginTop: '5px' }}></p>
                            <p className="ms-2">Under Estimation</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ background: 'blue', height: '15px', width: "15px", marginTop: '5px' }}></p>
                            <p className="ms-2">On Track</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div style={{ borderRadius: "50px 0px 0px 50px", color: 'white', width: '200px', height: '50px', background: 'red', display: "flex", textAlign: 'center', justifyContent: 'center' }}>
                            <span style={{ textAlign: 'center', marginTop: "10px" }}>
                                87
                            </span>
                        </div>
                        <div style={{ borderRadius: "0px 50px 50px 0px", color: 'white', width: '200px', height: '50px', background: 'blue', display: "flex", textAlign: 'center', justifyContent: 'center' }}>
                            <span style={{ textAlign: 'center', marginTop: "10px" }}>
                                82
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`gradient-color w-100 card shadow rounded m-1 mt-2 p-1 graphCardHeight border-0`}>
                    <Heading title="Resources" data={[]} employees={[]} startIcon={<BiSolidGroup size={24} />} endIcon={<AiFillQuestionCircle size={22} />} />
                    <hr />
                    <Accordian num1={"1"} heading={"Proposed Requests Awaiting Approval"} num2="3" sub="Draft Requests To Submit" />
                    <hr />
                    <h5>Resource Fullfullment</h5>
                    <div className="mt-3">
                        <StackChart />
                    </div>
                </div>
            </div>
        </div>
    )
}