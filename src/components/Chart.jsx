
import React from 'react';
import * as PropTypes from 'prop-types';

import {
    Chart as KendoChart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend
} from '@progress/kendo-react-charts';
import { groupBy, filterBy } from '@progress/kendo-data-query';

export const Chart = (props) => {
    const {
        data, groupByField, seriesCategoryField, seriesField,
        filterStart, filterEnd, seriesType, groupData, groupTextField
    } = props;

    const filteredData = filterBy(data, {
        logic: "and",
        filters: [
            { field: "orderDate", operator: "gt", value: filterStart },
            { field: "orderDate", operator: "lt", value: filterEnd }
        ]
    });
    const groupedData = groupBy(filteredData, [{ field: groupByField }]);
    return (
        <KendoChart style={{ height: 350 }}>
            <ChartLegend position="bottom" orientation="horizontal" background={'#f4f5f8'} />
            <ChartSeries>
                {
                    groupedData.map(group => {
                        const groupName = groupData.find(item => item[groupByField] === group.value)[groupTextField];
                        return (
                            <ChartSeriesItem
                                key={group.value}
                                name={groupName}
                                type={seriesType}
                                field={seriesField}
                                categoryField={seriesCategoryField}
                                tooltip={{ visible: true }}
                                data={group.items}
                            />
                        );
                    })
                }
            </ChartSeries>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    baseUnit={'months'}
                    labels={{
                        dateFormats: {
                            months: 'MMMM yy'
                        }
                    }}
                >
                </ChartCategoryAxisItem>
            </ChartCategoryAxis>
        </KendoChart>
    );
};

Chart.displayName = 'Chart';
Chart.propTypes = {
    data: PropTypes.array,
    groupByField: PropTypes.string,
    seriesCategoryField: PropTypes.string,
    seriesField: PropTypes.string,
    filterStart: PropTypes.object,
    filterEnd: PropTypes.object,
    seriesType: PropTypes.string,
    groupData: PropTypes.array,
    groupTextField: PropTypes.string,
};
