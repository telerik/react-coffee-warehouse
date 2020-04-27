
import React from 'react';
import * as PropTypes from 'prop-types';

import {
    Scheduler as KendoScheduler,
    DayView,
    WeekView,
    WorkWeekView,
    MonthView,
} from '@progress/kendo-react-scheduler';

export const Scheduler = (props) => {
    const {
        data, modelFields, resources
    } = props;

    const defaultDate = new Date("2020-04-27T00:00:00Z");

    return (
        <KendoScheduler
            data={data}
            modelFields={modelFields}
            resources={resources}
            timezone={'Etc/UTC'}
            defaultDate={defaultDate}
            defaultView={window.innerWidth < 768 ? "day" : "work-week"}
        >
            <DayView />
            <WorkWeekView />
            <WeekView />
            <MonthView />
        </KendoScheduler>
    );
};

Scheduler.displayName = 'Scheduler';
Scheduler.propTypes = {
    data: PropTypes.array
};
