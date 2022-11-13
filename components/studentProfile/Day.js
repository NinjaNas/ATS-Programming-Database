import React from 'react'
import DateForm from '../forms/date'
import Dropdown from '../forms/dropdown'
import InputForm from '../forms/input'

const Day = ({date, status, type, reason_missed}) => {

  return (
    <div>
      <DateForm label="Date" passedValue={date}/>
      <Dropdown label="Type" passedValue={type} passedOptions={{1: "In Person", 2: "Virtual"}}/>
      <Dropdown label="Status" passedValue={status} passedOptions={{1: "Attended", 2: "Missed", 3: "Missed with excuse", 0: "Incomplete"}}/>
      <InputForm label="Reason Missed" passedValue={reason_missed}/>
    </div>
  )
}

export default Day
