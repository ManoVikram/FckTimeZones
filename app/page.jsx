"use client"

import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import TimeField from '@/components/TimeField'

function HomeScreen() {
  const [allTimezones, setAllTimezones] = useState([])
  const [selectedFromTimezone, setSelectedFromTimezone] = useState("IST (UTC+05:30) - Asia/Kolkata")
  const [selectedToTimezone, setSelectedToTimezone] = useState("UTC (UTC+00:00) - Zulu")
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")

  async function getAllTimezones() {
    const timezones = moment.tz.names()
    const timezoneData = timezones.map((timezone) => {
      let abbreviation = moment.tz(timezone).zoneAbbr()
      const offsetInMinutes = moment.tz(timezone).utcOffset()
      const offset = `${offsetInMinutes >= 0 ? "+" : "-"}${Math.floor(Math.abs(offsetInMinutes / 60)).toString().padStart(2, "0")}:${Math.abs(offsetInMinutes % 60).toString().padStart(2, "0")}`

      if (abbreviation.startsWith("+") || abbreviation.startsWith("-")) {
        abbreviation = `UTC${offset}`
      }

      return {
        abbreviation: abbreviation,
        displayName: `${abbreviation} (UTC${offset}) - ${timezone}`,
        offset: offset,
        timezone: timezone
      }
    })

    const uniqueTimezones = Array.from(
      new Map(
        timezoneData.map((data) => [`${data.abbreviation}_${data.offset}`, data])
      ).values()
    )
    const sortedTimezones = uniqueTimezones.sort((a, b) => a.displayName.localeCompare(b.displayName))

    setAllTimezones(sortedTimezones)
  }

  function onFromTimezoneSelected(selectedTimezone) {
    const selectedTimezoneData = allTimezones.find((timezone) => timezone.timezone === selectedTimezone)

    if (selectedTimezoneData) {
      setSelectedFromTimezone(selectedTimezoneData.displayName)
    }
  }

  function onToTimezoneSelected(selectedTimezone) {
    const selectedTimezoneData = allTimezones.find((timezone) => timezone.timezone === selectedTimezone)

    if (selectedTimezoneData) {
      setSelectedToTimezone(selectedTimezoneData.displayName)
    }
  }

  function getCurrentTime() {
    var now = moment()
    const currentFromTime = now.format("h:mm A")

    setFromTime(currentFromTime)
  }

  function swapTimezones() {
    const fromTimezone = selectedFromTimezone
    const toTimezone = selectedToTimezone
    const time1 = fromTime
    const time2 = toTime

    setSelectedFromTimezone(toTimezone)
    setSelectedToTimezone(fromTimezone)

    setFromTime(time2)
    setToTime(time1)
  }

  useEffect(() => {
    getAllTimezones()
    getCurrentTime()
  }, [])

  useEffect(() => {
    function convertTime() {
      const fromTimezone = allTimezones.find((timezone) => timezone.displayName === selectedFromTimezone)
      const toTimezone = allTimezones.find((timezone) => timezone.displayName === selectedToTimezone)

      if (fromTimezone && toTimezone && fromTime) {
        const inputTime = moment.tz(fromTime, "h:mm A", fromTimezone.timezone)
        console.log(inputTime);

        const convertedTime = moment(inputTime).tz(toTimezone.timezone)

        setToTime(convertedTime.format("h:mm A"))
      }
    }

    convertTime()
  }, [allTimezones, fromTime, selectedFromTimezone, selectedToTimezone])

  return (
    <div className='flex flex-col bg-primary-color mx-24 my-28 px-10 py-12 rounded-[40px]'>
      <p className='font-bold text-xl text-light-grey mb-8'>Ahh Just Fck It!</p>

      <div className='flex flex-row justify-between'>
        <p className='font-bold text-7xl leading-[1.3] text-drak-grey'>Sync the World,<br />Skip the Math.</p>

        <div className="inline-flex flex-col items-center mr-40">
          <TimeField allTimezones={allTimezones} selectedTimezone={selectedFromTimezone} time={fromTime} onTimezoneSelected={onFromTimezoneSelected} onTimeChange={onTimeChange} />

          <button type="button" onClick={swapTimezones}>
            <span className="material-symbols-outlined my-4 h-10 w-10 text-5xl">swap_vert</span>
          </button>

          <TimeField allTimezones={allTimezones} selectedTimezone={selectedToTimezone} time={toTime} onTimezoneSelected={onToTimezoneSelected} isReadOnly />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen