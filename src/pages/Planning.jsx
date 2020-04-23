
import * as React from 'react';

import { useLocalization } from '@progress/kendo-react-intl';
import { Card, CardHeader, Avatar, CardTitle, CardSubtitle } from '@progress/kendo-react-layout';

import { Scheduler } from './../components/Scheduler';

import { employees } from './../resources/employees';
import { images } from './../resources/images';
import { orders, ordersModelFields } from './../resources/orders';
import { teams } from './../resources/teams';

const orderEmployees = employees.filter(employee => employee.jobTitle === 'Sales Representative');
const initialFilterState = {};

orderEmployees.forEach(employee => {
    initialFilterState[employee.id] = true;
});

const Planning = () => {
    const localizationService = useLocalization();
    const [filterState, setFilterState] = React.useState(initialFilterState);

    const onEmployeeClick = React.useCallback(
        (employeeId) => {
            setFilterState({
                ...filterState,
                [employeeId]: !filterState[employeeId]
            });
        },
        [filterState, setFilterState]
    );

    const photoStyle = {
        display: 'inline-block',
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundSize: '32px 35px',
        backgroundPosition: 'center center',
        verticalAlign: 'middle',
        lineHeight: '32px',
        boxShadow: 'inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2)',
        marginLeft: '5px'
    };

    return (
        <div id="Planning" className="planning-page main-content">
            <div className="card-container grid">
                <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar')}</h3>
                {
                    orderEmployees.map(employee => {
                        return (
                            employee.id === "2757a92d-5eed-4215-818f-fdf15b6b27d0"
                            || employee.id === "c8389213-a2cd-4bb8-ba99-9c29e9b70881"
                            || employee.id === "7b991e13-bef7-4f19-bd18-d5aa9d263cba"
                            || employee.id === "d26bcf84-a8b4-471c-a582-2de64d7e7715" ? null :
                            <div key={employee.id} onClick={() => onEmployeeClick(employee.id)} style={!filterState[employee.id] ? {opacity: .5} : {}}>
                                <Card style={{ borderWidth: 0, cursor: 'pointer'}}>
                                    <CardHeader className="k-hbox" >
                                        <Avatar type='image' shape='circle'>
                                            <img alt="" style={{backgroundImage: images[employee.imgId + employee.gender], ...photoStyle }}/>
                                        </Avatar>
                                        <div>
                                            <CardTitle >{employee.fullName}</CardTitle>
                                            <CardSubtitle>{employee.jobTitle}</CardSubtitle>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        );
                    })
                }
                <div className="card-component" style={{ maxWidth: window.innerWidth - 20, margin: '0 auto' }} >
                    <Scheduler
                        data={orders.filter(order => filterState[order.employeeID])}
                        modelFields={ordersModelFields}
                        resources={[
                            {
                                name: 'Teams',
                                data: teams,
                                field: 'teamID',
                                valueField: 'teamID',
                                textField: 'teamName',
                                colorField: 'teamColor'
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Planning;

