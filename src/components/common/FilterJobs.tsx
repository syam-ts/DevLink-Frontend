

export const FilterJobs = ({ setFilter }) => {


  
  return (
    <div className='grid gap-3 arsenal-sc-regular my-44 px-4'>
      <div>
        <ul className='flex flex-wrap gap-2 text-lg'>
          <li className='cursor-pointer' onClick={() => setFilter('amount=500')} >Under 500</li>
          <li className='cursor-pointer' onClick={() => setFilter('amount=2000')}>500 - 2000</li>
          <li className='cursor-pointer' onClick={() => setFilter('amount=10000')}>2000 - 10000</li>
          <li className='cursor-pointer' onClick={() => setFilter('amount=50000')}>10000 - 50000</li>
          <li className='cursor-pointer' onClick={() => setFilter('amount=70000')}>50000 - 70000</li>
        </ul>
      </div>
      <div>
        <ul className='flex gap-3 text-lg'>
          <li className='cursor-pointer' onClick={() => setFilter('paymentType=hourly')}>hourly</li>
          <li className='cursor-pointer' onClick={() => setFilter('paymentType=fixed')}>Fixed</li>
        </ul>
      </div>
      <div>
        <ul className='flex flex-wrap gap-3 text-lg'>
          <li className='cursor-pointer' onClick={() => setFilter('expertLevel=beginner')}>Beginner</li>
          <li className='cursor-pointer' onClick={() => setFilter('expertLevel=intermediate')}>Intermediate</li>
          <li className='cursor-pointer' onClick={() => setFilter('expertLevel=advanced')}>Advanced</li>
        </ul>

      </div>
    </div>

  )
}
