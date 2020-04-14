
import * as React from 'react';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Grid, Column, ColumnMenu } from './../components/Grid';
import { employees } from './../resources/employees';
import { employeeImages } from './../resources/employeeImages';

const FullNameCell = (props) => {
    const customerPhotoStyle = {
        display: 'inline-block',
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundSize: '32px 35px',
        backgroundPosition: 'center center',
        verticalAlign: 'middle',
        lineHeight: '32px',
        boxShadow: 'inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2)',
        marginLeft: '5px',
        backgroundImage: employeeImages[props.dataItem.img_id + props.dataItem.gender]
    };

    const customerName = {
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '32px',
        paddingLeft: '10px'
    };

    return (
        <td>
            <div style={customerPhotoStyle} />
            <div style={customerName}>{ props.dataItem.full_name }</div>
        </td>
    );
};

const Dashboard = () => {
    const [data, setData] = React.useState(employees.map(dataItem => Object.assign({ selected: false }, dataItem)));

    return (
        <div id="Dashboard" className="main-content">
            <div className="card-container">
                <h3 className="card-title">Team Efficiency</h3>
                <div className="card-buttons">
                    <ButtonGroup>
                    <Button togglable={true} defaultChecked={true}>
                        Trend
                    </Button>
                    <Button togglable={true}>
                        Volume
                    </Button>
                    </ButtonGroup>
                </div>
                <div className="card-ranges">
                    <DateRangePicker />
                </div>
                <div className="card-component">CHART HERE:</div>
            </div>
            <div className="card-container">
                <h3 className="card-title">Team Members</h3>
                <div className="card-buttons">
                    <ButtonGroup>
                        <Button togglable={true} defaultChecked={true}>
                            My Team
                        </Button>
                        <Button togglable={true}>
                            All Teams
                        </Button>
                    </ButtonGroup>
                </div>
                <span></span>
                <div className="card-component">
                    <Grid data={data} style={{ height: 440, maxWidth: 1300 }} onDataChange={data => setData(data)}>
                        <Column title={'Employee'}>
                            <Column field={'full_name'} title={'Contact Name'} columnMenu={ColumnMenu} width={220} cell={FullNameCell} />
                            <Column field={'job_title'} title={'Job Title'} columnMenu={ColumnMenu} width={220} />
                            <Column field={'country'} title={'Country'} columnMenu={ColumnMenu} width={100} />
                            <Column field={'is_online'} title={'Status'} columnMenu={ColumnMenu} width={100} />
                        </Column>
                        <Column title={'Performance'}>
                            <Column field={'rating'} title={'Rating'} columnMenu={ColumnMenu} width={110} />
                            <Column field={'target'} title={'Engagement'} columnMenu={ColumnMenu} width={230} />
                            <Column field={'budget'} title={'Budget'} columnMenu={ColumnMenu} width={100} />
                        </Column>
                        <Column title={'Contacts'}>
                            <Column field={'phone'} title={'Phone'} columnMenu={ColumnMenu} width={130} />
                            <Column field={'address'} title={'Address'} columnMenu={ColumnMenu} width={200} />
                        </Column>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

