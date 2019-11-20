import React from 'react';
import Table from './table';
import customData from './campaign.json'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.state = {
      live: {
        show: false,
        data: []
      },
      upComing: {
        show: true,
        data: []
      },
      past: {
        show: false,
        data: []
      },
    }
  }
  handleStateChange(value, id) {
    let upComingData = [];
    if (value.getTime() > new Date().getTime()) {
      upComingData = this.state.upComing.data.map((c) => {
        if (c.id == id) {
          c.createdOn = value.getTime();
        }
        return c;
      });
      this.setState({
        upComing: Object.assign({}, this.state.upComing, { data: upComingData })
      });  
    }
  }
  componentDidMount() {
    const liveEvent = []
    const pastEvent = []
    const upComing = [];
    customData.data.map((data) => {
      if (data.createdOn > new Date().getTime()) {
        upComing.push(data);
      }
      else if (data.createdOn < new Date().getTime()) {
        pastEvent.push(data);
      }
      else {
        liveEvent.push(data);
      }
    });
    this.setState({
      upComing: Object.assign({}, this.state.upComing, { data: upComing }),
      live: Object.assign({}, this.state.live, { data: liveEvent }),
      past: Object.assign({}, this.state.past, { data: pastEvent })
    });
  }
  upcomingClicked = () => {
    this.setState({
      upComing: Object.assign({}, this.state.upComing, { show: true }),
      live: Object.assign({}, this.state.live, { show: false }),
      past: Object.assign({}, this.state.past, { show: false })
    });
  }
  liveClicked = () => {
    this.setState({
      upComing: Object.assign({}, this.state.upComing, { show: false }),
      live: Object.assign({}, this.state.live, { show: true }),
      past: Object.assign({}, this.state.past, { show: false })
    });
  }
  pastClicked = () => {
    this.setState({
      upComing: Object.assign({}, this.state.upComing, { show: false }),
      live: Object.assign({}, this.state.live, { show: false }),
      past: Object.assign({}, this.state.past, { show: true })
    });
  }
  render() {
    let campaignData = [];
    const { upComing, past, live } = this.state;
    if (upComing.show) {
      campaignData = upComing.data;
    } else if (past.show) {
      campaignData = past.data;
    } else {
      campaignData = live.data;
    }
    return (
      <React.Fragment>
        <div class="mainpage">
          <div class="tabs">
            <a onClick={this.upcomingClicked}>Upcoming Campaigns</a>
            <a onClick={this.liveClicked}>Live Campaigns</a>
            <a onClick={this.pastClicked}>Past Campaigns</a>
          </div>
          <Table data={campaignData} handleStateChange={this.handleStateChange} />
        </div>
      </React.Fragment>
    )
  }
}
export default App;