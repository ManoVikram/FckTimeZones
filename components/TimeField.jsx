"use client"

import React, { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import moment from 'moment-timezone'

function TimeField() {
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
    <div className="flex flex-row bg-white h-16 py-4 px-5 rounded-xl justify-between">
      <input type="text" name='from-time' placeholder='00:00 AM/PM' className='focus:outline-none text-2xl mr-5' />

      <div className="flex flex-row">
        <div className='h-auto w-[1.5px] self-stretch bg-gradient-to-tr from-transparent via-black to-transparent opacity-60' />

        <DropdownMenu>
          <DropdownMenuTrigger className='inline-flex items-center px-4 text-dark-grey text-2xl outline-none'>
            {selectedTimezone}
            <div className="inline-flex justify-center ml-2 border border-dark-grey rounded-md">
              <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="max-h-64 max-w-max overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {allTimezones.map((timezone) => (
              <DropdownMenuItem key={timezone} onClick={() => onTimezoneSelected(timezone)}>
                {timezone}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TimeField