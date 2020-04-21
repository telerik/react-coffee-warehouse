
import * as React from 'react';

import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import {
    Sparkline,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartArea
} from '@progress/kendo-react-charts';
import {
    useInternationalization
} from '@progress/kendo-react-intl';

import { Grid, Column, ColumnMenu } from './../components/Grid';
import { Chart } from './../components/Chart';
import { employees } from './../resources/employees';
import { orders } from './../resources/orders';
import { images } from './../resources/images';

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
        backgroundImage: images[props.dataItem.img_id + props.dataItem.gender]
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

const FlagCell = (props) => {
    return (
        <td style={{textAlign: 'center'}}>
            <img
                src={images[props.dataItem.country]}
                style={{width: 30}}
                alt={props.dataItem.country}
            />
        </td>
    );
};

const RatingCell = (props) => {
    const MAX_STARS = 5;
    const rating = props.dataItem.rating;

    return (
        <td>
            {
                [...new Array(MAX_STARS)].map((_, idx) => {
                    const isActive = rating <= idx;
                    return (
                        <span
                            className={!isActive ? 'k-icon k-i-star' : 'k-icon k-i-star-outline'}
                            style={!isActive ? {color: '#ffa600'} : undefined}
                        />
                    );
                })
            }
        </td>
    );
};

const OnlineCell = (props) => {
    const badgeStyle = {
        display: 'inline-block',
        padding: '.25em .4em',
        fontSize: '75%',
        fontWeight: 700,
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        borderRadius: '.25rem'
    };

    const onlineBadgeStyle = {
        ...badgeStyle,
        color: '#fff',
        backgroundColor: '#28a745'
    };

    const offlineBadgeStyle = {
        ...badgeStyle,
        color: '#fff',
        backgroundColor: '#dc3545'
    };
    return (
        <td style={{textAlign: 'center'}}>
            {
                props.dataItem.is_online === true ?
                    <span style={onlineBadgeStyle}>Online</span> :
                    <span style={offlineBadgeStyle}>Offline</span>
            }
        </td>
    );
};

const EngagementCell = (props) => {
    return (
        <td>
            <Sparkline
                type={'bar'}
                data={props.dataItem.target}
            >
                <ChartArea opacity={0} width={200} />
                <ChartValueAxis visible={false} >
                    <ChartValueAxisItem min={0} max={130} />
                </ChartValueAxis>
            </Sparkline>
        </td>
    );
};

const CurrencyCell = (props) => {
    const redBoldStyle = {
        color: '#d9534f',
        fontWeight: 600
    };

    const intlService = useInternationalization();

    return (
        <td>
             <span style={props.dataItem.budget < 0 ? redBoldStyle : undefined}>{ intlService.formatNumber(props.dataItem.budget, 'c') }</span>
        </td>
    );
};

const Dashboard = () => {
    const [data, setData] = React.useState(employees.map(dataItem => Object.assign({ selected: false }, dataItem)));
    const [isTrend, setIsTrend] = React.useState(true);
    const [isMyTeam, setIsMyTeam] = React.useState(true);

    const trendOnClick = React.useCallback(
        () => setIsTrend(true),
        [setIsTrend]
    );
    const volumeOnClick = React.useCallback(
        () => setIsTrend(false),
        [setIsTrend]
    );
    const myTeamOnClick = React.useCallback(
        () => setIsMyTeam(true),
        [setIsMyTeam]
    );
    const allTeamOnClick = React.useCallback(
        () => setIsMyTeam(false),
        [setIsMyTeam]
    );

    // TODO: get my team from global state

    return (
        <div id="Dashboard" className="main-content">
            <div className="card-container grid">
                <h3 className="card-title">Team Efficiency</h3>
                <div className="card-buttons">
                    <ButtonGroup>
                        <Button togglable={true} selected={isTrend} onClick={trendOnClick}>
                            Trend
                        </Button>
                        <Button togglable={true} selected={!isTrend} onClick={volumeOnClick}>
                            Volume
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="card-ranges">
                    <DateRangePicker />
                </div>
                <div className="card-component">
                    <Chart
                        data={orders}
                        filterStart={new Date('2018-07-01T21:00:00.000Z')}
                        filterEnd={new Date('2018-10-01T21:00:00.000Z')}
                        groupByField={'TeamID'}
                        seriesCategoryField={'OrderDate'}
                        seriesField={'OrderTotal'}
                        seriesType={isTrend ? 'line' : 'column'}
                    />
                </div>
            </div>
            <div className="card-container grid">
                <h3 className="card-title">Team Members</h3>
                <div className="card-buttons">
                    <ButtonGroup>
                        <Button togglable={true} selected={isMyTeam} onClick={myTeamOnClick}>
                            My Team
                        </Button>
                        <Button togglable={true} selected={!isMyTeam} onClick={allTeamOnClick}>
                            All Teams
                        </Button>
                    </ButtonGroup>
                </div>
                <span></span>
                <div className="card-component">
                    <Grid data={data} style={{ height: 480, maxWidth: window.innerWidth - 20, margin: '0 auto' }} onDataChange={data => setData(data)}>
                        <Column title={'Employee'}>
                            <Column field={'full_name'} title={'Contact Name'} columnMenu={ColumnMenu} width={230} cell={FullNameCell} />
                            <Column field={'job_title'} title={'Job Title'} columnMenu={ColumnMenu} width={230} />
                            <Column field={'country'} title={'Country'} columnMenu={ColumnMenu} width={100} cell={FlagCell} />
                            <Column field={'is_online'} title={'Status'} columnMenu={ColumnMenu} width={100} cell={OnlineCell} />
                        </Column>
                        <Column title={'Performance'}>
                            <Column field={'rating'} title={'Rating'} columnMenu={ColumnMenu} width={110} cell={RatingCell} />
                            <Column field={'target'} title={'Engagement'} columnMenu={ColumnMenu} width={200} cell={EngagementCell} />
                            <Column field={'budget'} title={'Budget'} columnMenu={ColumnMenu} width={100} cell={CurrencyCell} />
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

