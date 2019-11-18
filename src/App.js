import React from 'react';
import Table from './table';
import customData from './campaign.json'
import './App.css';
import { exportDefaultSpecifier } from '@babel/types';
class App extends React.Component  {
constructor(props) {
super(props);
this.handleStateChange=this.handleStateChange.bind(this);
this.state = { 
data:[],
live: {
showLiveData: false,
data:[]
},
UpComing:{
showUpcomingData:true,
data:[]
},
past:{
showPastData:false,
data:[]
},  
}
}
handleStateChange(value){
debugger;
this.setState({
UpComing:  Object.assign({},this.state.UpComing.data,{createdOn:value})});
}
componentDidMount(){
let liveEvent=[]; let pastEvent=[];let Upcoming=[];
customData.data.map((data) =>{ if(data.createdOn > new Date().getTime()){Upcoming.push(data);}
else if(data.createdOn < new Date().getTime()){pastEvent.push(data);}
else{liveEvent.push(data);}
});
console.log(liveEvent,pastEvent,Upcoming);
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{data:Upcoming}),
live:  Object.assign({},this.state.live,{data:liveEvent}),
past:  Object.assign({},this.state.past,{data:pastEvent})
});
}
upcomingClicked = () => {  
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{showUpcomingData:true}),
live:  Object.assign({},this.state.live,{showLiveData:false}),
past:  Object.assign({},this.state.past,{showPastData:false})
});
}
liveClicked = () => {  
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{showUpcomingData:false}),
live:  Object.assign({},this.state.live,{showLiveData:true}),
past:  Object.assign({},this.state.past,{showPastData:false})
});
}
pastClicked = () => {       
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{showUpcomingData:false}),
live:  Object.assign({},this.state.live,{showLiveData:false}),
past:  Object.assign({},this.state.past,{showPastData:true})
});
}
render()
{console.log(this.state.UpComing);console.log(this.state.past);return (
<div>
   {
   <React.Fragment>
      <div class="mainpage">
         <div class="tabs">
            <a onClick={this.upcomingClicked}>Upcoming Campaigns</a>
            <a onClick={this.liveClicked}>Live Campaigns</a>
            <a onClick={this.pastClicked}>Past Campaigns</a>
         </div>
         <div>
            {this.state.UpComing.showUpcomingData && (this.state.UpComing.data.map(data =>
            <Table name={data.name} key={data.id} handleStateChange = {this.handleStateChange} price={data.price} date={data.createdOn}/>
            ))}
         </div>
         <div>
            {this.state.past.showPastData && (this.state.past.data.map(data =>
            <Table key={data.id} name={data.name} price={data.price} date={data.createdOn}/>
            ))}
         </div>
         <div>
            {this.state.live.showLiveData && (this.state.live.data.map(data =>
            <Table key={data.id} name={data.name} date={data.createdOn}/>
            ))}
         </div>
      </div>
   </React.Fragment>
   }
</div>
)
}
}
export default App;