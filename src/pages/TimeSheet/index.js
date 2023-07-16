import './style.css'
import TitleHeader from '../../components/TitleHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
const baseURL = "http://localhost:5000/api/tasks"
let currentDate = new Date()  

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


export const TimeSheet = () => {
    const [data, setData] = useState([])
    const [cDate,setCDate] = useState(currentDate)
    const array = [1, 2, 3, 4, 5]
    const dataFormat = (data) => {
        const updateData = data.map((item) => {
            return {
                project: item.project,
                task: item.task,
                inDate: moment(Date.parse(item.inDate)).format("YYYY-MM-DD"),
                outDate: moment(Date.parse(item.outDate)).format("YYYY-MM-DD"),
                duration: item.duration
            }
        })
        return updateData
    }
    useEffect(() => {
        axios
            .get(baseURL)
            .then((response) => {
                setData(dataFormat(response.data.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const handleChange=(e)=>{
        console.log(e.target.value)
        setCDate(e.target.value)
    }
    return (
        <>
            <TitleHeader name="TimeSheet" />
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h4
                    style={{
                        fontSize: '1.4rem',
                        fontWeight: 500,
                        marginTop: '20px',
                        padding: '5px',
                        display: 'flex',
                        paddingLeft: '10px'
                    }}
                >
                    Week:
                    <input
                        type="date"
                        class="date"
                        name="date"
                        value={moment(cDate).format("YYYY-MM-DD")}
                        style={{ marginLeft: '10px' }}
                        onChange={(e)=>handleChange(e)}
                    />
                    <span style={{ marginLeft: '10px' }}>-</span>
                    <div class="display:'inline" style={{ marginLeft: '10px' }}>
                        {moment(addDays(cDate,5)).format("DD-MM-YYYY")}
                    </div>
                </h4>
                <div
                    style={{
                        marginRight: '0px',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: '10px',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingTop: '10px'
                    }}
                >
                    <input
                        id="submit-btn"
                        type="submit"
                        class="btn btn-primary flex-end"
                        style={{
                            marginRight: '0px',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                        value="Submit"
                    />
                </div>
            </div>
            <div style={{ padding: '10px' }}>
                {array.map((item,index) => {
                    return (
                        <div
                            class="border p-2 mb-2 mt-2 rounded shadow col-md-12 col-topic me-2"
                        >
                            <h5>{moment(addDays(cDate,index)).format("DD-MM-YYYY")}</h5>
                            <table class="table table-hovered bg-white">
                                <thead style={{ textAlign: "center" }}>
                                    <tr>
                                        <th width="200px" style={{ textAlign: "start", paddingLeft: '80px' }}>Project</th>
                                        <th width="200px" style={{ textAlign: "start", paddingLeft: '80px' }}>Task</th>
                                        <th width="200px">IN</th>
                                        <th width="200px">OUT</th>
                                        <th width="100px">DURATION</th>
                                    </tr>
                                </thead>
                                <tbody class="col-select">
                                    {data.map((item) => {
                                       if(item.inDate == moment(addDays(cDate,index)).format("YYYY-MM-DD")){
                                        return (
                                            <tr name="option_rows" style={{ textAlign: "center" }}>
                                                <td>
                                                    <div class="d-flex">
                                                        <input
                                                            type="text"
                                                            name="project"
                                                            style={{ width: '200px' }}
                                                            value={item.project}
                                                            onchange="handleChange(this.value)"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex">
                                                        <input
                                                            type="text"
                                                            name="task"
                                                            value={item.task}
                                                            style={{ width: '200px' }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="inDate"
                                                        value={item.inDate}
                                                        style={{ width: '200px' }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="outDate"
                                                        value={item.outDate}
                                                        style={{ width: '200px' }}
                                                    />
                                                </td>
                                                <td>{item.duration}</td>
                                            </tr>
                                        )
                                       }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </>
    )
}