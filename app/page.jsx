"use client"

import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import TimeField from '@/components/TimeField'

function HomeScreen() {
  const [selectedFromTimezone, setSelectedFromTimezone] = useState("IST")
  const [selectedToTimezone, setSelectedToTimezone] = useState("UTC")
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [allTimezones, setAllTimezones] = useState([])

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
        offset: offset,
        timezone: timezone
      }
    })

    const uniqueTimezones = Array.from(
      new Map(
        timezoneData.map((data) => [data.abbreviation, data])
      ).values()
    )

    console.log(uniqueTimezones.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation)));

    setAllTimezones(uniqueTimezones.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation)))
  }

  function onFromTimezoneSelected(timezoneAbbreviation) {
    const selectedTimezoneData = allTimezones.find((timezone) => timezone.abbreviation === timezoneAbbreviation)

    if (selectedTimezoneData) {
      setSelectedFromTimezone(timezoneAbbreviation)
    }
  }
  
  function onToTimezoneSelected(timezoneAbbreviation) {
    const selectedTimezoneData = allTimezones.find((timezone) => timezone.abbreviation === timezoneAbbreviation)

    if (selectedTimezoneData) {
      setSelectedToTimezone(timezoneAbbreviation)
    }
  }

  function getCurrentTime() {
    var now = moment()
    const currentFromTime = now.format("h:mm A")

    setFromTime(currentFromTime)
  }

  useEffect(() => {
    getAllTimezones()
    getCurrentTime()
  }, [])

  useEffect(() => {
    function convertTime() {
      const fromTimezone = allTimezones.find((timezone) => timezone.abbreviation === selectedFromTimezone)
      const toTimezone = allTimezones.find((timezone) => timezone.abbreviation === selectedToTimezone)
  
      if (fromTimezone && toTimezone && fromTime) {
        const inputTime = moment.tz(fromTime, "h:mm A", fromTimezone.timezone)
        const convertedTime = inputTime.clone().tz(toTimezone.timezone)
  
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
          <TimeField allTimezones={allTimezones} selectedTimezone={selectedFromTimezone} time={fromTime} onTimezoneSelected={onFromTimezoneSelected} />

          <span className="material-symbols-outlined my-4 h-10 w-10 text-5xl">swap_vert</span>

          <TimeField allTimezones={allTimezones} selectedTimezone={selectedToTimezone} time={toTime} onTimezoneSelected={onToTimezoneSelected} isReadOnly />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen