
import React from 'react';
import * as PropTypes from 'prop-types';

import { Grid as KendoGrid, GridColumn, GridColumnMenuSort, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';

export const Column = GridColumn;

export const ColumnMenu = (props) => {
    return (
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter {...props} />
        </div>
    );
}

export const Grid = (props) => {
    const { data, onDataChange, ...others } = props;

    const [take, setTake] = React.useState(10);
    const [skip, setSkip] = React.useState(0);
    const [sort, setSort] = React.useState([]);
    const [group, setGroup] = React.useState([]);
    const lastSelectedIndexRef = React.useRef(0);

    const dataState = {
        take,
        skip,
        sort,
        group
    };

    const onDataStateChange = React.useCallback(
        (event) => {
            setTake(event.data.take);
            setSkip(event.data.skip);
            setSort(event.data.sort);
            setGroup(event.data.group)
        },
        [setTake, setSkip, setSort, setGroup]
    );

    const onSelectionChange = React.useCallback(
        (event) => {
            let last = lastSelectedIndexRef.current;
            const updatedData = data.map(dataItem => {
                return {...dataItem};
            });
            const current = data.findIndex(dataItem => dataItem === event.dataItem);

            if (!event.nativeEvent.shiftKey) {
                lastSelectedIndexRef.current = last = current;
            }

            if (!event.nativeEvent.ctrlKey) {
                updatedData.forEach(item => (item.selected = false));
            }
            const select = !event.dataItem.selected;
            for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
                updatedData[i].selected = select;
            }

            onDataChange(updatedData);
        },
        [data, onDataChange]
    );

    const onHeaderSelectionChange = React.useCallback(
        (event) => {
            const checked = event.syntheticEvent.target.checked;
            const updatedData = data.map(item=>{
                return {
                    ...item,
                    selected: checked
                };
            });

            onDataChange(updatedData);
        },
        [data, onDataChange]
    );

    return (
        <KendoGrid
            {...dataState}
            {...others}
            rowHeight={40}
            pageable
            sortable
            groupable
            selectedField={'selected'}

            data={process(data, dataState)}
            onDataStateChange={onDataStateChange}

            onSelectionChange={onSelectionChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
        >
            <Column
                field={'selected'}
                width={50}
                title={' '}
                headerSelectionValue={
                    data.findIndex(dataItem => dataItem.selected === false) === -1
                }
            />
            {props.children}
        </KendoGrid>
    );
};

Grid.displayName = 'Grid';
Grid.propTypes = {
    data: PropTypes.array,
    onDataChange: PropTypes.func,
    style: PropTypes.object
};
