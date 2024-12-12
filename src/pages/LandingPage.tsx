 
import {Input} from '../components/shadcn/Input'
 

const LandingPage = () =>  {
  return (
    <div>
        <section className='text-center pt-12'>
            <span className='text-3xl font-serif'>Hiring The Best , Make Us Proud And Joy</span>
        </section>

        <section className='flex mx-auto w-[900px] my-20 p-12 border border-black rounded-3xl'>
            <img src='public/landingpage_left.png' alt='profile-image'/>
            <div className=''>
                <div>
                    <span>We connect people to</span> 
                </div>
                <span>bring projects to life</span>
            </div>
            <button>
               <Input type='email' placeholder='search' />
            </button>
            <img src='public/landingpage_right.png' alt='profile-image'/>
        </section>
    </div>
  )
}

export default LandingPage