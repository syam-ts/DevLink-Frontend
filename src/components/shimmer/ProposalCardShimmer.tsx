 

export const ProposalCardShimmer = () => {

   
 
    
  return (
        
            <div>
            <div className='w-2/3 border border-gray-100 shadow-xl rounded-xl h-[250px] mx-auto my-12 p-3 animate-pulse'>
      <div className='h-16 w-16'>
        <div className='w-12 h-12 rounded-full bg-gray-300'></div>
      </div>
      <div className='grid gap-2 px-3'>
        <div>
          <div className='h-5 w-1/2 bg-gray-300 rounded'></div>
          <div className='h-3 w-full bg-gray-200 rounded mt-2'></div>
        </div>
        <div className='flex gap-5'>
          <div className='h-4 w-1/4 bg-gray-300 rounded'></div>
          <div className='h-4 w-1/4 bg-gray-300 rounded'></div>
        </div>
        <div>
          <div className='h-3 w-3/4 bg-gray-200 rounded'></div>
        </div>
      </div>
      <div className='flex justify-end pr-12 gap-5'>
        <div>
          <div className='rounded-md border py-2 px-12 bg-gray-300'></div>
        </div>
        <div>
          <div className='rounded-md py-2 px-12 bg-gray-400'></div>
        </div>
      </div>
    </div>
    
        </div> 
  )
}

