import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Input } from '@progress/kendo-react-inputs'
import { Button } from '@progress/kendo-react-buttons'
import { savePDF } from '@progress/kendo-react-pdf'
import { Ripple } from '@progress/kendo-react-ripple'
import { DonutChartContainer } from '../components/DonutChartContainer'
import { BarChartContainer } from '../components/BarChartContainer'
import { GridContainer } from '../components/GridContainer'
import { PanelBarContainer } from '../components/PanelBarContainer'

//import '@progress/kendo-theme-material/dist/all.css'
import 'bootstrap-4-grid/css/grid.min.css'
import '../styles/optml-black.css'
//import '../styles/optml-default-black.css'

const Sales = () => {

  const [showDialog, setShowDialog] = useState(false)
  // const state = {
  //   showDialog: false
  // }

  let appContainer = React.createRef()
    
  const handlePDFExport = () => {
    savePDF(ReactDOM.findDOMNode(appContainer), { paperSize: 'auto' })
  }

  const handleShare = () => {
    // this.setState({
    //   showDialog: !state.showDialog
    // }, () => console.log(this.state))
    setShowDialog(!showDialog)
  }

  return (
    <Ripple>
      <div className="bootstrap-wrapper">
        <div className="app-container container" ref={(el) => appContainer = el}>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h1>Sales | Q4 2020</h1>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 buttons-right">
              <Button primary={true} onClick={handleShare}>Share</Button>
              <Button onClick={handlePDFExport}>Export to PDF</Button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <PanelBarContainer />
            </div>
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                  <DonutChartContainer />
                </div>
                <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                  <div className="percentage-container">
                    <span className="percentage-number">94</span>
                    <span className="percentage-sign">%</span>
                    <p>CUSTOMER SATISFACTION</p>
                  </div>
                  <div className="percentage-container">
                    <span className="percentage-number">89</span>
                    <span className="percentage-sign">%</span>
                    <p>TARGET SALES</p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <BarChartContainer />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <GridContainer />
                </div>
              </div>
            </div>
          </div>
          {showDialog &&
            <Dialog title={"Share this report"} onClose={handleShare}>
              <p>Please enter the email address/es of the recipient/s.</p>
              <Input placeholder="example@progress.com" />
              <DialogActionsBar>
                <Button primary={true} onClick={handleShare}>Share</Button>
                <Button onClick={handleShare}>Cancel</Button>
              </DialogActionsBar>
            </Dialog>
          }
        </div>
      </div>
    </Ripple>
  )
}

export default Sales