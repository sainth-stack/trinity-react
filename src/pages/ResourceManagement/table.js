import TableV2 from "../../components/TableV2"
import { tableConstant } from "./constants"
export const ResourceAvailability = () => {
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
                color: 'black'
            }}
            headStyle={{
                background: '#F8FAFC',
                textAlign: 'center',
                // textTransform: 'uppercase',
                '& .MuiTableSortLabel-root.Mui-active': {
                    color: '#4D515A'
                },
                color: '#4D515A',
                height: '20px',
                padding: '10px 4px',
                border: 'none',
                fontWeight: 600,
                lineHeight: '22px',
                fontSize: '11px',
                fontFamily:"Poppins",
                textAlign:'start',
            }}
            bodyStyle={{
                height: '20px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#E0E9FA',
                    boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.1)'
                },
                boxShadow: 'inset 0px -1px 0px #F5F5F5',
                '& .MuiTableCell-root.MuiTableCell-body': {
                    padding: '0px',
                    fontFamily: 'Poppins',
                    border: 'none',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '16px'
                }
            }}
            tableContainerStyles={{
                maxHeight: `calc(100vh - 400px)`,
                boxShadow: 'none !important',
                '& .MuiTableRow-root.Mui-selected': {
                    backgroundColor: 'rgba(224, 233, 250, 0.70)',
                    boxShadow: '0px -1px 0px 0px #F5F5F5 inset',
                    '&:hover': {
                        background: '#E0E9FA'
                    },
                    '& .MuiTableCell-root': {
                        color: '#175CE5',
                        svg: {
                            color: '#CC1F1F'
                        }
                    }
                }
            }}
        />
    )
}
export const data = [
    {
        type:'Employee Type',
        tot:3,
        feb: '320 h',
        mar:'360 h',
        apr:'320 h',
        may: '368 h',
        jun:'336 h'
    },
    {
        type:'Contractor',
        tot:10,
        feb: '1320 h',
        mar:'2160 h',
        apr:'1320 h',
        may: '1168 h',
        jun:'1036 h'
    },
    {
        type:'Full-Time',
        tot:30,
        feb: '5201 h',
        mar:'6160.30 h',
        apr:'3320 h',
        may: '7168 h',
        jun:'8036 h'
    },
    {
        type:'Internship',
        tot:10,
        feb: '1320 h',
        mar:'2160 h',
        apr:'1320 h',
        may: '1168 h',
        jun:'1036 h'
    },
    {
        type:'Part-Time',
        tot:40,
        feb: '5201 h',
        mar:'6160.30 h',
        apr:'3320 h',
        may: '7168 h',
        jun:'8036 h'
    },
]