import { ReportsTable } from "./table"
import { AiFillSetting } from 'react-icons/ai'
import { FaFileExcel } from 'react-icons/fa'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import { BiPrinter } from 'react-icons/bi'
export const Report = () => {
    return <div className="" style={{ background: '#F5F5F5', height: '18vh', textContent: 'center' }}>
        <div className="p-3">
            <h2>Untitled Report</h2>
            <p>Data as of <span style={{ fontWeight: "500" }}>Feb 3,2023 12:22:15 AM</span></p>
        </div>
        <hr />
        <div>

        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingRight: '20px' }}>
            <div style={{ display: "", padding: '10px', paddingLeft: '20px' }}>
                <button style={{ background: "darkblue", height: "35px", borderRadius: "6px", color: "white" }}>Run Report</button> <button style={{ background: "lightgrey", height: "35px", borderRadius: "6px", border: 'none' }}><AiFillSetting size={21} style={{ marginBottom: "3px" }} /> Settings</button>
            </div>
            <div style={{display:"flex"}}>
                <button style={{ background: "darkblue", height: "35px", borderRadius: "6px", color: "white", marginTop: "10px" }}>Save</button>
                <div style={{marginTop:"13px", borderLeft:"1px solid grey",marginLeft:"10px",paddingLeft:'5px',marginBottom:"10px"}}>
                    <FaFileExcel size={30} />
                    <BsFileEarmarkPdf size={30} />
                    <BiPrinter size={30} />
                </div>

            </div>
        </div>
        <div style={{
            height: "calc(100vh - 220px)",
            border: '1px solid var(--gray-400, #C2C2C2)', mt: '8px', borderRadius: '4px',
            marginLeft: '20px',
            marginRight: "20px"
        }}>
            <div style={{ display: "flex", padding: '10px' }}>
                <h5>Filters</h5>
                <a href="#" style={{ textDecoration: "none", marginLeft: '10px' }}>Edit</a>
            </div>
            <div style={{ display: "", padding: '10px' }}>
                <button style={{ background: "grey", height: "30px", borderRadius: "6px", border: 'none' }}>Expand</button> <button style={{ background: "lightgrey", height: "30px", borderRadius: "6px", border: 'none' }}>Collapse</button>
            </div>
            <div>
                <ReportsTable />
            </div>
        </div>
    </div>
}