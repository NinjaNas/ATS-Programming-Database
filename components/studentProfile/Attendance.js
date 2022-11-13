import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import Day from './Day';

const Attendance = ({session_id}) => {
  const [days, setDays] = useState([]);


	const allTasks = () => {
		Axios.get("http://localhost:3000/api/session/day/read", {params: {key:0, tag:session_id}}).then((response) => {
			setDays(response.data);
		});
	};
	/*UseEffect calls allStudents on page Mount only*/
	useEffect(() => {
		allTasks();
	}, []);

  return (
    <div>
      {days.map(d => 
      (
        <Day date={d.attendance_day} status={d.status} type={d.type} reason_missed={d.reason_missed}/>
      ))}
    </div>
  )
}

export default Attendance
