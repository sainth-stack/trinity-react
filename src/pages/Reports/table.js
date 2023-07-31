import TableV2 from "../../components/TableV2"
import { tableConstant } from "./constants"
export const ReportsTable = () => {
    return (
        <TableV2
            // Icon1={<Uncheck />}
            // Icon2={<Checked />}
            // Icon3={<Selectcheck />}
            // sortIcon={<SortIcon />}
            cols={tableConstant()}
            // onRowClick={(row) => handleClick(row)}
            data={data}
            // selected={selected}
            // setSelected={setSelected}
            rowsPerPage={10}
            page={0}
            rowStyle={{
                color: 'black',
                height: '10px'
            }}
            headStyle={{
                background: '#F8FAFC',
                textAlign: 'center',
                // textTransform: 'uppercase',
                '& .MuiTableSortLabel-root.Mui-active': {
                    color: '#4D515A'
                },
                color: '#4D515A',
                height: '42px',
                padding: '0px',
                // border: 'none',
                fontWeight: 600,
                lineHeight: '22px',
                fontSize: '11px',
                fontFamily: "Poppins",
                textAlign: 'start',
                "& .MuiTableCell-root": {
                    borderLeft: "1px solid rgba(224, 224, 224, 1)"
                }
            }}
            bodyStyle={{
                height: '44px',
                cursor: 'pointer',
                // '&:hover': {
                //     backgroundColor: '#E0E9FA',
                //     boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.1)'
                // },
                boxShadow: 'inset 0px -1px 0px #F5F5F5',
                '& .MuiTableCell-root.MuiTableCell-body': {
                    padding: '0px',
                    fontFamily: 'Poppins',
                    // border: 'none',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '16px'
                },
                '&:nth-of-type(odd)': {
                    backgroundColor: '#FAFAFA',
                },
                // hide last border
                "& .MuiTableCell-root": {
                    borderLeft: "1px solid rgba(224, 224, 224, 1)"
                }
            }}
            tableContainerStyles={{
                maxHeight: `calc(100vh - 330px)`,
                boxShadow: 'none !important',
            }}
        />
    )
}
export const data = Array(100).fill({
    userName: "Anderson, Richard",
    userEmail: "anderson@gmail.com",
    ah: "2,944.00",
    acs: "$191,360.00",
    acb: "$191,360.00"
},)