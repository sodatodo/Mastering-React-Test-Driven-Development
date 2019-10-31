import React from 'react';

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) =>
      acc.concat([startTime + (i * increment)])
    );
}
const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return Array(7)
    .fill([midnight])
    .reduce((acc, _, i) => acc.concat([midnight + (i * increment)]))
}
const toTimeValue = timestamp => 
  new Date(timestamp).toTimeString().substring(0, 5);

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt
}) => {
  const timeSlots = dailyTimeSlots(
    salonOpensAt,
    salonClosesAt
  )
  return (
    <table id="time-slots" >
      <thead>
        <tr>
          <th />
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const AppointmentForm = ({ 
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today
}) => {
  // console.log('service', service)
  return (
    <form 
      id="appointment" 
    >
      <select 
        name="service"
        id="service"
        value={service}
        // onChange={handleServiceChange}
        readOnly
      >
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <TimeSlotTable
        salonClosesAt={salonClosesAt}
        salonOpensAt={salonOpensAt}
        today={today}
      />
    </form>
  )
}

AppointmentForm.defaultProps = {
  salonOpensAt: 9,
  salonClosesAt: 19,
  selectableServices : [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
}