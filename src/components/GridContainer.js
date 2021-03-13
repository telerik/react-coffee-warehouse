import React from 'react'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid'
import { Sparkline } from '@progress/kendo-react-charts'
import { gridData } from '../data/appData'

const processData = (data) => {
  data.forEach((item) => {
    item.PriceHistory = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
    return item
  })
  //debugger
  return data
}

const SparkLineChartCell = (props) => <td><Sparkline data={props.dataItem.PriceHistory}/></td>

export const GridContainer = () => (
  <div>
    <Grid style={{ height: '300px' }} data={processData(gridData)}>
      <Column field="ProductID" title="ID" width="40px" />
      <Column field="ProductName" title="Name" width="160px" />
      <Column field="Category.CategoryName" title="Category Name" width="160px" />
      <Column field="UnitPrice" title="Price" width="60px" />
      <Column field="UnitsInStock" title="Stock" width="60px" />
      <Column field="PriceHistory" width="130px" cell={SparkLineChartCell} title="Price history" />
      <Column field="Discontinued" width="130px"
        cell={(props) => (
          <td>
            <input className="k-checkbox" type="checkbox" disabled defaultChecked={props.dataItem[props.field]} />
            <label className="k-checkbox-label"></label>
          </td>
        )} />
    </Grid>
  </div>
)