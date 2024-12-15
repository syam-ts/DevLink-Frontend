 
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/common/Footer'
import {Input} from '../../components/shadcn/Input' 
 

const LandingPage = () =>  {

    const navigate = useNavigate()

    const toRolePage = () => {
        navigate('/role')
    }

  return (
    <div>
           <nav className="bg-white shadow-md"> 
                <div className="flex flex-1 sm:items-stretch sm:justify-between py-3 ml-12">
                    <div className="flex shrink-0 items-start">
                       <img className="h-8 w-auto" src="../../public/devLink_logo.png" alt="DevLink"/>
                    </div>
                 <div className=" sm:ml-6 sm:block ">
                    <div className="flex space-x-24 pr-5">
                        <a href="#" className="p-2 text-sm comfortaa-regular text-gray-950">Home</a>
                        <a href="#" className="p-2 text-sm comfortaa-regular text-gray-950">About</a>
                        <a href="#" className="p-2 text-sm comfortaa-regular text-gray-950">Contact</a>
                        <a href="#" className="p-2 text-sm comfortaa-regular text-gray-950">Projects</a>
                     </div>
                    </div>
                </div>  
         </nav>  


        <section className='text-center pt-12 my-6'>
            <span className='text-3xl font-serif'>Hiring The Best , Make Us Proud And Joy</span>
        </section>

        <section className='flex justify-between py-12 mx-auto w-[1100px] my-20 border border-black rounded-xl'>
            <div className='pl-12'>
               <img src='public/landingpage_left.png' alt='profile-image'/>
            </div>
            <div className=' '>
            <div className='pt-44'>
                <div>
                    <span className='font-mono text-xl'>We connect people to</span> 
                </div>
                <span className='font-mono text-xl'>bring projects to life</span>
            </div>
         
                <div className=''>
                    <button className='pt-4'>
                    <Input type='email' placeholder='search' />
                    </button>
                </div>
            </div>
 
            <div className='pr-12'>
               <img src='public/landingpage_right.png' alt='profile-image'/>
            </div>
        </section>

        <section className='text-center pt-12 my-6'>
            <span className='text-3xl font-serif'>Unlimited Oppurtunities...</span>
        </section>

        <section className='flex mt-20'>
                <div className='ml-80'>
                  <img src='public/lasdingpage_option.png' alt='join-image' />
                </div>
                <div>
                    <img src='public/ladnigpage_last-img.png' alt='join-image' />
                </div>
        </section>

        <section className='flex p-20 mt-28'>
            <div className='ml-44'>
                <img src='public/landingpage_bigimage.png' alt='professional image' />
            </div>

            <div className='text-center mx-auto mt-44'>
                 <span className='font-bold text-4xl'>Bussiness Elavators and</span>
                    <div>
                      <span className='font-bold text-4xl'>Carrer Crafters</span>
                    </div>
                 <span className='pt-12 grid text-2xl'>
                    Our being able to do what we like best, <br />
                     every pleasure is to be welcomed and every<br />
                      pain avoided but in certain circumstances and <br />
                      owing to the claims of duty or the obligations.
                    </span>
                    <button onClick={toRolePage} className='bg-blue-700 w-44 rounded-2xl text-white font-bold hover:bg-green-500 h-12 mt-12'>
                        Get Started
                    </button>
            </div>
        </section> 
          <Footer />
    </div>
  )
}

export default LandingPage