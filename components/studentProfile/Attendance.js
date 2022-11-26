import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import Day from './Day';

const Attendance = ({session_id, onfetch}) => {
  const [days, setDays] = useState([]);
  const [add, setAdd] = useState(true);
  // const [retrieve, setRetrieve] = useState(false);

	const attendance = () => {
    console.log("fetching");
    setAdd(false);
		Axios.get("/api/session/day/read", {params: {key:0, tag:session_id}}).then((response) => {
      const data = response.data.sort((a, b) => (new Date(a.attendance_day) - new Date(b.attendance_day)))
			setDays(data);
      // console.log(days)
      setAdd(true);
      onfetch(data);
		});
	};
	/*UseEffect calls allStudents on page Mount only*/
	

  useEffect(() => {
    console.log("Here")
    // setAdd(false);
    // console.log("Now Here")
		attendance();
    // setAdd(true);
    // setAdd(true);
	}, []);

  return (
    <div>
      {days.map(d => 
      (
        <Day key={d.id} id={d.id} date={d.attendance_day} status={d.status} type={d.type} reason_missed={d.reason_missed} onadd={attendance}/>
      ))}
      {add && <Day session_id={session_id} onadd={attendance}/>}
    </div>
  )
}

export default Attendance
