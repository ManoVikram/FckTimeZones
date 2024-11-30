"use client"

import React, { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function TimeField() {
  async function fetchTimezones() {
    const response = await fetch("https://timeapi.io/api/timezone/availabletimezones")
    const data = await response.json()

    console.log(data);
  }

  useEffect(() => {
    fetchTimezones()
  }, [])


  return (
    <div className="flex flex-row bg-white h-16 py-4 px-5 rounded-xl justify-between">
      <input type="text" name='from-time' placeholder='00:00 AM/PM' className='focus:outline-none text-2xl mr-5' />

      <div className="flex flex-row">
        <div className='h-auto w-[1.5px] self-stretch bg-gradient-to-tr from-transparent via-black to-transparent opacity-60' />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className='inline-flex items-center px-4 text-dark-grey text-2xl'>
              UTC
              <div className="inline-flex justify-center ml-2 border border-dark-grey rounded-md">
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              Hello
            </DropdownMenuItem>
            <DropdownMenuItem>
              World
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TimeField