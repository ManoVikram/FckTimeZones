import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function TimeField({ allTimezones, selectedTimezone, time, onTimezoneSelected, isReadOnly }) {
  return (
    <div className="flex flex-row bg-white h-16 py-4 px-5 rounded-xl justify-between">
      <input type="text" name='from-time' placeholder='00:00 AM/PM' defaultValue={time} className='focus:outline-none text-2xl mr-5' readOnly={isReadOnly} />

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
              <DropdownMenuItem key={timezone.timezone} onClick={() => onTimezoneSelected(timezone.timezone)}>
                {timezone.displayName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TimeField