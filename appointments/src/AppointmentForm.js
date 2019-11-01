import React from 'react';

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => 
      acc.concat([startTime + (i * increment)])
    )
const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
}

const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  // return Array(7)
  //   .fill([midnight])
  //   .reduce((acc, _, i) => acc.concat([midnight + (i * increment)]))
  return timeIncrements(7, midnight, increment);
}
const toTimeValue = timestamp => 
  new Date(timestamp).toTimeString().substring(0, 5);

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots
}) => {
  const mergeDateAndTime = (date, timeSlot) => {
    const time = new Date(timeSlot);
    return new Date(date).setHours(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds()
    )
  }
  const timeSlots = dailyTimeSlots(
    salonOpensAt,
    salonClosesAt
  )
  const dates = weeklyDateValues(today);
  const toShortDate = timestamp => {
    const [day,,dayOfMonth] = new Date(timestamp)
      .toDateString()
      .split(' ');
    return `${day} ${dayOfMonth}`;
  }
  return (
    <table id="time-slots" >
      <thead>
        <tr>
          <th />
          {dates.map(d => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map(date => (
              <td key={date}>
                {availableTimeSlots.some(availableTimeSlot => 
                  availableTimeSlot.startsAt === mergeDateAndTime(date, timeSlot)
                  )? <input type="radio" /> : null}
                {/* <input type="radio" /> */}
              </td>
            ))}
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
  today,
  availableTimeSlots
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
        availableTimeSlots={availableTimeSlots}
      />
    </form>
  )
}

AppointmentForm.defaultProps = {
  availableTimeSlots: [],
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
  selectableServices : [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
}