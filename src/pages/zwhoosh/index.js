import zwhoose from '../../assets/images/zwhoose.jpg';
const Zwhoosh = () => {
    return (
        <div className="container 100vh mt-0">
            <div style={{ border: "1px solid green", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid green" }}>
                    <img src={zwhoose} alt='zwhoose' width={120} />
                    <h3 style={{ fontSize: "25px", marginLeft: '10px', color: "white" }}>Zwhoose</h3>
                </div>
                <div className='mt-2 p-0' style={{ display: "flex", alignItems: "center", border: "1px solid green" }}>
                    <h3 style={{ fontSize: "16px", marginLeft: '10px', color: "violet", cursor: "pointer" }}>Generate Configs</h3>
                    <h3 style={{ fontSize: "16px", marginLeft: '10px', color: "violet", cursor: "pointer" }}>Monitor Componenets</h3>
                </div>
                <div className='mt-2 p-4' style={{ border: "1px solid green", background: "skyblue" }}>
                    <div style={{ border: "1px solid green"}} className='p-2'>
                        <h3 style={{ fontSize: "14px", color: "balck", cursor: "pointer" }}>Data source (for digital twin)</h3>
                        <div style={{ display: "flex" }}>
                            <input placeholder='data source name' style={{ height: '20px', fontSize: "12px" }} />
                            <select className='ms-2' style={{ width: '200px', height: "20px", fontSize: "12px" }}>
                                <option value="option1">choose data source type</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ border: "1px solid green"}} className='p-2 mt-2'>
                        <h3 style={{ fontSize: "14px", color: "balck", cursor: "pointer" }}>Analytics engine (for adapter)</h3>
                        <div style={{ display: "flex" }}>
                            <select className='' style={{ width: '100px', height: "20px", fontSize: "12px" }}>
                                {/* <option value="option1">choose data source type</option> */}
                            </select>
                            <input placeholder='device host' className='ms-2' style={{ height: '20px', fontSize: "12px" }} />
                            <input placeholder='device post' className='ms-2' style={{ height: '20px', fontSize: "12px" }} />
                            <select className='ms-2' style={{ width: '130px', height: "20px", fontSize: "12px" }}>
                                <option value="option1">choose auth type</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='mt-2 p-4' style={{ border: "1px solid green", background: "skyblue" }}>
                    <div style={{ border: "1px solid green"}} className='p-2 mt-2'>
                        <h3 style={{ fontSize: "14px", color: "balck", cursor: "pointer" }}>Data Source (DT)</h3>
                        <div style={{ display: "flex" }}>
                            <input placeholder='' className='' style={{ height: '20px', fontSize: "12px",width:'100%' }} />
                        </div>
                        <button className='mt-2' style={{padding:"2px",border:'none',color:'blue'}}>submit</button>
                    </div>
                </div>
                <div className='mt-2 p-4' style={{ border: "1px solid green", background: "skyblue" }}>
                    <div style={{ border: "1px solid green"}} className='p-2 mt-2'>
                        <h3 style={{ fontSize: "14px", color: "balck", cursor: "pointer" }}>Data Format (adapter)</h3>
                        <button className='mt-2' style={{padding:"2px",border:'none'}}>add variable</button>
                        <button className='mt-2' style={{padding:"2px",border:'none',color:'blue',display:'block'}}>submit</button>
                    </div>
                </div>
                <div className='mt-2 p-4' style={{ border: "1px solid green", background: "skyblue" }}>
                    <div style={{ border: "1px solid green"}} className='p-2 mt-2'>
                        <h3 style={{ fontSize: "14px", color: "balck", cursor: "pointer" }}>Actions</h3>
                        <button className='mt-2' style={{padding:"2px",border:'none'}}>add variable</button>
                        <button className='mt-2' style={{padding:"2px",border:'none',color:'blue',display:'block'}}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Zwhoosh;