
import React from 'react';

import {
    Chart as KendoChart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend
} from '@progress/kendo-react-charts';
import { groupBy, filterBy } from '@progress/kendo-data-query';

export const Chart = (props) => {
    const {data, groupByField, seriesCategoryField, seriesField, filterStart, filterEnd} = props;

    const filteredData = filterBy(data, {
        logic: "and",
        filters: [
            { field: "OrderDate", operator: "gt", value: filterStart },
            { field: "OrderDate", operator: "lt", value: filterEnd }
        ]
    });
    const groupedData = groupBy(filteredData, [{field: groupByField}]);

    return (
        <KendoChart style={{ height: 350 }}>
            <ChartSeries>
                {
                  groupedData.map(group => {
                    return (
                      <ChartSeriesItem
                          type={'column'}
                          field={seriesField}
                          categoryField={seriesCategoryField}
                          data={group.items}
                      />
                    );
                  })
                }
            </ChartSeries>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem baseUnit={'months'}>
                </ChartCategoryAxisItem>
            </ChartCategoryAxis>
        </KendoChart>
    );
};
