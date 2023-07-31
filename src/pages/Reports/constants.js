export const tableConstant = () => [
    {
        numeric: false,
        id: 'Employees Type',
        columnLabel: 'User Name',
        style: {
          textAlign: 'start',
          minWidth: '150px',
          paddingLeft:"5px"
        },
        render: (row) => {
          return (
            <span className="text-nowrap" style={{ marginLeft: '5px',display:"flex",justifyContent:"start" }}>
              {row.userName}
            </span>
          );
        }
      },
      {
        numeric: false,
        id: 'Employees Type',
        columnLabel: 'User Email',
        style: {
          textAlign: 'center',
          minWidth: '150px',
          paddingLeft:"5px"
        },
        render: (row) => {
          return (
            <span className="text-nowrap" style={{  }}>
              {row.userEmail}
            </span>
          );
        }
      },
      {
        numeric: false,
        id: 'Employees Type',
        columnLabel: 'Actual Houres (Selected Dates)',
        style: {
          textAlign: 'center',
          minWidth: '150px',
          paddingLeft:"5px"
        },
        render: (row) => {
          return (
            <span className="text-nowrap" style={{ }}>
              {row.ah}
            </span>
          );
        }
      },
      {
        numeric: false,
        id: 'Employees Type',
        columnLabel: 'Actual Cost (Selected Dates)',
        style: {
          textAlign: 'center',
          minWidth: '150px',
          paddingLeft:"5px"
        },
        render: (row) => {
          return (
            <span className="text-nowrap" style={{  }}>
              {row.acs}
            </span>
          );
        }
      },
      {
        numeric: false,
        id: 'Employees Type',
        columnLabel: 'Actual Cost (BC)',
        style: {
          textAlign: 'center',
          // minWidth: '150px',
          paddingLeft:"5px"
        },
        render: (row) => {
          return (
            <span className="text-nowrap" style={{  }}>
              {row.acb}
            </span>
          );
        }
      },
  ];