
import * as React from 'react';

import { useLocalization } from '@progress/kendo-react-intl';

import { Scheduler } from './../components/Scheduler';

import { employees } from './../resources/employees';
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

    return (
        <div id="Planning" className="planning-page main-content">
            <div className="card-container grid">
                <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar')}</h3>
                <span>
                    {
                        orderEmployees.map(employee => {
                            return (
                                <div key={employee.id} onClick={() => onEmployeeClick(employee.id)}>
                                    {`${employee.fullName}: ${filterState[employee.id] ? 'ACTIVE' : 'INACTIVE'}`}
                                </div>
                            );
                        })
                    }
                </span>
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

