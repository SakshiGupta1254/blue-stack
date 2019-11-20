import React from 'react';
import first from './images/first.png';
import file from './images/file.png';
import Price from './price';
import stat from './images/statistics-report.png';
import CalendarComponent from './calendarComponent';

class Table extends React.Component {
   constructor(props) {
      super(props);
   }
   displayDate = (date) => {
      var event = new Date(date);
      var options = { month: 'short', year: 'numeric', day: 'numeric' };
      var frame;
      if (new Date(date) >= new Date()) {
         var Difference_In_Time = new Date(date).getTime() - new Date().getTime();
         frame = "Days Ahead";
      }
      else {
         var Difference_In_Time = new Date().getTime() - new Date(date).getTime();
         frame = " Days Ago";
      }
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return `${event.toLocaleDateString('en-EN', options)} ${parseInt(Difference_In_Days)}  ${frame}`;
   }
   render() {
      const { data } = this.props;
      return (
         <div>
            <table>
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Campaign</th>
                     <th>View</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     data.map((item, index) => {
                        return <tr key={index}>
                           <td>{this.displayDate(item.createdOn)}</td>
                           <td><img src={first} />{item.name}</td>
                           <td><Price value={item.price} /></td>
                           <td><img src={file} />CSV</td>
                           <td><img src={stat} />Report</td>
                           <td><CalendarComponent item={item} handleStateChange={this.props.handleStateChange} /></td>
                        </tr>
                     })
                  }
               </tbody>
            </table>
         </div>
      );
   }
}
export default Table;