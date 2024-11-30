import TimeField from '@/components/TimeField'
import React from 'react'

function HomeScreen() {
  return (
    <div className='flex flex-col bg-primary-color mx-24 my-28 px-10 py-12 rounded-[40px]'>
        <p className='font-bold text-xl text-light-grey mb-8'>Ahh Just Fck It!</p>
        
        <div className='flex flex-row justify-between'>
            <p className='font-bold text-7xl leading-[1.3] text-drak-grey'>Sync the World,<br />Skip the Math.</p>
            
            <div className="inline-flex flex-col items-center mr-40">
                <TimeField />

                <span className="material-symbols-outlined my-4 h-10 w-10 text-5xl">swap_vert</span>
                
                <TimeField />
            </div>
        </div>
    </div>
  )
}

export default HomeScreen