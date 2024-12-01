"use client"

import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import TimeField from '@/components/TimeField'

function HomeScreen() {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC")
  const [allTimezones, setAllTimezones] = useState([])

  async function getAllTimezones() {
    const timezones = moment.tz.names()
    const rawTimezoneAbbreviations = timezones.map((timezone) => {
      let abbreviation = moment.tz(timezone).zoneAbbr()

      if (abbreviation.startsWith("+") || abbreviation.startsWith("-")) {
        if (abbreviation.length <= 3) {
          abbreviation = abbreviation + ":00"
        } else {
          abbreviation = abbreviation.substring(0, 3) + ":" + abbreviation.substring(3)
        }

        abbreviation = "UTC".concat(abbreviation)
      }

      return abbreviation
    })

    const allTimezoneAbbreviations = new Set(rawTimezoneAbbreviations)
    const timezoneAbbreviations = [...allTimezoneAbbreviations]

    setAllTimezones(timezoneAbbreviations.sort())
  }

  function onTimezoneSelected(timezone) {
    setSelectedTimezone(timezone)
  }

  useEffect(() => {
    getAllTimezones()
  }, [])

  return (
    <div className='flex flex-col bg-primary-color mx-24 my-28 px-10 py-12 rounded-[40px]'>
      <p className='font-bold text-xl text-light-grey mb-8'>Ahh Just Fck It!</p>

      <div className='flex flex-row justify-between'>
        <p className='font-bold text-7xl leading-[1.3] text-drak-grey'>Sync the World,<br />Skip the Math.</p>

        <div className="inline-flex flex-col items-center mr-40">
          <TimeField allTimezones={allTimezones} selectedTimezone={selectedTimezone} time="" onTimezoneSelected={onTimezoneSelected} />

          <span className="material-symbols-outlined my-4 h-10 w-10 text-5xl">swap_vert</span>

          <TimeField allTimezones={allTimezones} selectedTimezone={selectedTimezone} time="" onTimezoneSelected={onTimezoneSelected} />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen