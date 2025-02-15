import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { JobProposalModal } from "../shadcn/modal/JobProposalModal";
import axios from "axios";
import useUserVerified from "../../hooks/userUserVerified";


interface JobPost {
  _id: string
  title: string
  amount: number
  clientId: string
  estimateTime: string
  description: string
  estimateTimeinHours: number
  keyResponsibilities: string[]
  requiredSkills: string[]
  location: string
  expertLevel: string
  maxProposals: number
  proposalCount: number
  projectType: string
  paymentType: string
  isPayment: boolean
  status: string
  createdAt: string
}


interface FormData {
  bidAmount: number
  bidDeadline: number
  description: string
}



const MonoJobPost = () => {

  const [jobPost, setJobPost]: any = useState<JobPost>({
    _id: "",
    title: "",
    amount: 0,
    clientId: "",
    estimateTime: "",
    description: "",
    estimateTimeinHours: 0,
    keyResponsibilities: [],
    requiredSkills: [],
    location: "",
    expertLevel: "",
    maxProposals: 0,
    proposalCount: 0,
    projectType: "",
    paymentType: "",
    isPayment: false,
    status: "",
    createdAt: ""
  });

  const [formData, setFormData] = useState<FormData>({
    bidAmount: 0,
    bidDeadline: 0,
    description: ""
  });
  const { jobPostId, type } = useParams();

  const userVerified = useUserVerified();
  console.log('The user : ', userVerified)

  useEffect(() => {
    try {

      (async () => {
        let response: any;
        if (type === 'user') {
          response = await axios.get(`/user/job/view/${jobPostId}`);
        } else {
          setJobPost(response?.jobPost);
        }
      })();
    } catch (err: any) {
      console.error('ERROR: ', err.message);
    }
  }, []);


  // updating formdata -------
  useEffect(() => {

    setFormData({
      bidAmount: jobPost?.amount,
      bidDeadline: jobPost?.estimateTimeinHours,
      description: ""
    })
  }, [jobPost]);




  return (
    <>
      <div className='h-screen mx-auto w-2/3 py-28 comfortaa-regular'>
        <section>
          <span className='text-2xl'>{jobPost?.title}</span>
          <div className='flex gap-20 py-4 text-xs'>
            <span>Posted {jobPost?.estimateTimeinHours} hours ago</span>
            <div className='flex '>
              <img className='w-5 h-5 mx-2' src='https://cdn-icons-png.flaticon.com/128/927/927667.png' />
              <span>{jobPost?.location}</span>
            </div>
          </div>
        </section>

        {/* Desctipion section */}
        <section className='py-6'>
          <span className='text-sm'>
            {jobPost?.description}
          </span>
        </section>

        <section>
          <div className='py-10 flex flex-wrap w-2/3 gap-x-64 gap-y-20 '>
            <div className='text-xs'>
              <div className='flex gap-3 pb-2'>
                <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/5579/5579107.png' alt='price-image' />
                <span> ₹{jobPost?.amount}.00 </span>
              </div>
              <span className='px-4'> {jobPost?.paymentType} Price </span>
            </div>

            <div className='text-xs'>
              <div className='flex gap-3 pb-2'>
                <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/1491/1491165.png' alt='price-image' />
                <span> Estimate Time </span>
              </div>
              <span className='px-4'> {jobPost?.estimateTimeinHours}/hr </span>
            </div>

            <div className='text-xs'>
              <div className='flex gap-3 pb-2'>
                <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/1491/1491165.png' alt='price-image' />
                <span> Expertise </span>
              </div>
              <span className='px-4'> {jobPost?.expertLevel} </span>
            </div>

            <div className='text-xs'>
              <div className='flex gap-3 pb-2'>
                <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/927/927667.png' alt='price-image' />
                <span> Location </span>
              </div>
              <span className='px-4'> {jobPost?.location} </span>
            </div>

            <div className='text-xs'>
              <div className='flex gap-3 pb-2'>
                <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/5530/5530083.png' alt='price-image' />
                <span> {jobPost?.projectType} </span>
              </div>
              <span className='px-4'> Project Type </span>
            </div>

            <div className='text-xs'>
              <div className='flex gap-3 pb-2'>
                <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/18510/18510347.png' alt='price-image' />
                <span> Teah Stack </span>
              </div>
              <span className='px-4'> {jobPost?.domain || '.........'}  </span>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section className='pt-10'>
          <span >Skills and Expertise</span>
          <div className='flex gap-4'>
            {
              jobPost?.requiredSkills?.map((skill: string) => (

                <span className="rounded-full border border-transparent my-4 py-2 px-8  text-center text-sm transition-all text-slate-900  bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                  {skill}
                </span>
              ))
            }

          </div>
          <div className='text-xs mt-3'>
            {jobPost?.keyResponsiblities}
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
              <span>{jobPost?.proposalCount} of 10</span>
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
            <span>{jobPost?.aboutClient?.location}</span>
            <span>₹{jobPost?.aboutClient?.totalSpend}.00 total spend</span>
            <span>{jobPost?.aboutClient?.totalHours} hours</span>
            <span>{jobPost?.aboutClient?.domain}</span>
            <span>Large Company({jobPost?.aboutClient?.numberOfEmployees} people)</span>
          </div>
          <div className='pt-4'>
            <span className='text-sm'>{jobPost?.aboutClient?.companyName} Inc.</span>
          </div>
        </section>

        {/* job apply section */}
        <section className='mt-10'>

          <hr />
          <p className='text-sm'> Intrested </p>
          {
            userVerified && (
              <button className="" type="button">
                <JobProposalModal jobPostId={jobPost?._id}
                  formData={formData} setFormData={setFormData} />
              </button>
            )
          }

          {
            userVerified && (
              <button className="rounded-xl bg-[#0000ff] py-3 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                Save for later
              </button>
            )
          }

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