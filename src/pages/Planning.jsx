
import * as React from 'react';
import { Scheduler } from './../components/Scheduler';
import { orders, ordersModelFields } from './../resources/orders';
import { teams } from './../resources/teams';

const Planning = () => {
    return (
        <div id="Planning" className="main-content">
            <div className="card-container grid">
                <h3 className="card-title">Team Calendar</h3>
                <span></span>
                <span></span>
                <div className="card-component">
                    <Scheduler
                        data={orders}
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

