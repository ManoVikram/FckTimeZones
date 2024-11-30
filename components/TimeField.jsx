import React from 'react'

function TimeField() {
  return (
    <div className="flex flex-row bg-white w-[432px] h-16 py-4 px-5 rounded-xl justify-between">
      <input type="text" name='from-time' placeholder='00:00 AM/PM' className='focus:outline-none text-2xl mr-5' />

      <div className="flex flex-row">
        <div className='h-auto w-[1.5px] self-stretch bg-gradient-to-tr from-transparent via-black to-transparent opacity-60' />

        <button className='inline-flex items-center px-4 py-2 text-dark-grey text-2xl'>
          UTC
          <div className="inline-flex justify-center ml-2 border border-dark-grey rounded-md">
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default TimeField