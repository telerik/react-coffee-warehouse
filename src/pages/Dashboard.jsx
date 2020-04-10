
import * as React from 'react';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';

const Dashboard = () => {
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
                <div className="card-component">GRID HERE:</div>
            </div>
        </div>
    );
}

export default Dashboard;

