 

function MonoJobPost() {
  return (
    <>
        <div className='h-screen mx-auto w-2/3 py-28 comfortaa-regular'>
          <section>
             <span className='text-2xl'>Expert Consultant Needed for AI-Driven Real Estate Mobile Application</span>
             <div className='flex gap-20 py-4 text-xs'>
              <span>Posted 15 hours ago</span>
              <div className='flex '>
                <img className='w-5 h-5 mx-2' src='https://cdn-icons-png.flaticon.com/128/927/927667.png' /> 
                <span>Bangalore</span>
                </div>
             </div>
          </section>

 {/* Desctipion section */}
          <section className='py-6'>
            <span className='text-sm'>
            We’re looking for an experienced consultant to help develop an AI-driven mobile app
             for the real estate market. If you have a strong background in AI technologies,
              mobile app development, and real estate, we’d love to collaborate with you! You
              r role will involve working with our development team to define the app’s vision,
               advising on AI features like predictive analytics, and integrating key data sources.
                Strong communication skills and proven experience in real estate are essential. This is a remote 
                freelance position with flexible duration and competitive pay.
            </span>
          </section>    

          <section>
            <div className='py-10 flex flex-wrap w-2/3 gap-x-64 gap-y-20 '>
              <div className='text-xs'>
                <div className='flex gap-3 pb-2'>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/5579/5579107.png' alt='price-image' />
                  <span> ₹400.00 </span>
                </div>
                <span className='px-4'> Fixed Price </span>
              </div>
              <div className='text-xs'>
                <div className='flex gap-3 pb-2'>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/5579/5579107.png' alt='price-image' />
                  <span> ₹300.00 </span>
                </div>
                <span className='px-4'> Hourly </span>
              </div>

              <div className='text-xs'>
                <div className='flex gap-3 pb-2'>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/1491/1491165.png' alt='price-image' />
                  <span> Expertise </span>
                </div>
                <span className='px-4'> Beginner </span>
              </div>
            

              <div className='text-xs'>
                <div className='flex gap-3 pb-2'>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/927/927667.png' alt='price-image' />
                  <span> Location </span>
                </div>
                <span className='px-4'> Bangalore </span>
              </div>
     
              <div className='text-xs'>
                <div className='flex gap-3 pb-2'>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/5530/5530083.png' alt='price-image' />
                  <span> Ongoing Project </span>
                </div>
                <span className='px-4'> Project Type </span>
              </div>
     
              <div className='text-xs'>
                <div className='flex gap-3 pb-2'>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/18510/18510347.png' alt='price-image' />
                  <span> Teah Stacck </span>
                </div>
                <span className='px-4'> Cloud Engineering </span>
              </div>
         </div>
          </section>      


   {/* Skills section */}
          <section className='pt-10'>
            <span >Skills and Expertise</span>
            <div className='flex gap-4'>
                <span className="rounded-full border border-transparent my-4 py-2 px-8  text-center text-sm transition-all text-slate-900  bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                  React.js
                </span>
                <span className="rounded-full border border-transparent my-4 py-2 px-8  text-center text-sm transition-all text-slate-900  bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                  Angular.js
                </span>
                <span className="rounded-full border border-transparent my-4 py-2 px-8  text-center text-sm transition-all text-slate-900  bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                  AWS
                </span>
           
            </div>
            <div className='text-xs mt-3'>
                  The field provides the context for the commit, communicating the intent of the change that was made. It tries to answer the question “what did the commit do?”
                 The field is an enumerated type that can be defined differently on each specific project. However there are some conventions, for example the @commitlint/config-conventional based on the Angular Convention, which defines the following types:

            </div>
            </section> 

            <section className='pt-10'>
              <span>Activity on this job</span>
              <div className='text-xs flex gap-10 pt-3'>
                <div className='flex gap-3'> 
                  <span>
                    Proposals:
                  </span>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/10995/10995709.png' alt='question-image' />
                  <span>5 of 10</span>
                </div>
                <div className='flex gap-3'> 
                  <span>
                    Boosted Proposals:
                  </span>
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/10995/10995709.png' alt='question-image' />
                  <span>3</span>
                </div>
              </div>
            </section>

     {/* About Client */}
            <section className='pt-10'>
              <span>About The Client</span>
              <p className='text-xs'>Member since may 23 2024</p>
              <div className='flex gap-10 text-xs '>
                <span>Bangalore</span>
                <span>₹41000.00 toal spend</span>
                <span>40 hours</span>
                <span>Cloud Based System</span>
                <span>Large Company(2000 people)</span>
              </div>
              <div className='pt-4'>
                <span className='text-sm'>Nutreinous Inc.</span>
              </div>
            </section>

      {/* Similar Jobs */}
      <section className='my-20 '>
        <div>
          <span className='text-2xl'>Related Job Posts</span>
        </div>
      </section>
        </div>
    </>
  )
}

export default MonoJobPost