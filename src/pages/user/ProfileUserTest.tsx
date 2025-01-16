import { MDBCol, MDBContainer, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../../components/nextUi/modals/editProfileUserModal'
import apiInstance from '../../api/axiosInstance'
import BoostPopover from '../../components/nextUi/popover/BoostAcc-Pop';
import { ProfileShimmer } from '../../components/shimmer/ProfileShimmer'



const ProfileUser = () => {


    const navigate = useNavigate();
    //  const isUser = useSelector((state: any) => state?.user?.isUser);

    const [user, setUser]: any = useState({});

    const userId = useSelector((state: any) => state?.user?.currentUser?.user?._id)



    useEffect(() => {
        const getUserData = async () => {

            try {

                const response = await apiInstance.axiosInstanceUser.get(`http://localhost:3000/user/profile/view/${userId}`, {
                    withCredentials: true
                });

                console.log('The response ', response.data?.data)

                setUser(response.data.data?.user);
            } catch (err: any) {
                if (err.response.data.message == 'No token provided') {
                    navigate('/user/login')
                }
            }
        }

        getUserData();
    }, []);



    return (
        <>
            {
                Object.entries(user).length === 0 ? (
                    <ProfileShimmer />
                ) : (
                    <div className="gradient-custom-2 " >
                        <MDBContainer className="py-5 h-100  ">
                            <div className="  ">
                                <MDBCol  >
                                    <MDBCard>
                                        <section>
                                            <div className="text-white d-flex flex-row " style={{ backgroundColor: '#334155', height: '250px' }}>
                                                <div className="ms-4 mt-40 d-flex flex-column" style={{ width: '150px' }}>
                                                    <img src={user?.profilePicture}
                                                        alt="Generic placeholder image" className="mt-4 mb-2 object-fll img-thumbnail" style={{ width: '150px', height: '150px', zIndex: '1' }} />
                                                </div>
                                                <div className="ms-3 my-auto flex w-full justify-between" >
                                                    <div>
                                                        <div className='flex'>
                                                        <MDBTypography tag="h5" className='text-red-600'>
                                                            {user?.name}
                                                           
                                                            </MDBTypography>
                                                                { user?.isBoosted ? (
                                                                        <span className=' cursor-pointer bg-[#334155] py-2 mx-2'>
                                                                            <img className='h-4 w-4' src='https://cdn-icons-png.freepik.com/256/13950/13950107.png?semt=ais_hybrid' />
                                                                        </span>
                                                                    ) : (
                                                                        <span className=' cursor-pointer bg-[#334155]'>
                                                                            <BoostPopover userId={user?._id} />
                                                                        </span>
                                                                    )
                                                                }
                                                             
                                                        </div>
                                                        <div className='text-sm grid left-0 comfortaa-regular'>
                                                            <span>{user?.location}, india</span>
                                                            <span>{user?.email}</span>
                                                            <span>{user?.mobile}</span>
                                                            <span>view profile(git)</span>
                                                            <span>Rating * * * * *</span>
                                                        </div>

                                                    </div>
                                                  <div className='grid'>
                                                  <div className='flex gap-4 mr-5'>
                                                        <button className="rounded-md h-7 bg-cyan-500 py-1 px-3 text-center text-sm font-mono text-white focus:bg-white focus:shadow-none active:bg-slate-700 hover:bg-white hover:text-black active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                                                            Invite
                                                        </button> 
                                                        <span><img className='w-6 h-6 text-white' src='https://cdn-icons-png.flaticon.com/128/11504/11504867.png' /> </span>
                                                        <span><img className='w-6 h-6 text-white' src='https://cdn-icons-png.flaticon.com/128/13424/13424066.png' /> </span>
                                                    </div>
                                                    <div className='ml-36'>
                                                      
                                                            <Link className='no-underline  text-sm font-mono text-white' to='/user/profile/edit'>
                                                        <img className='h-5 w-5' src='https://cdn-icons-png.flaticon.com/128/10099/10099927.png' />
                                                        
                                                            </Link>
                                                       
                                                    </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                                <div className="d-flex justify-content-end text-center py-1">
                                                    <div>
                                                        <MDBCardText className="mb-1 h5">253</MDBCardText>
                                                        <MDBCardText className="small text-muted mb-0">Total Jobs</MDBCardText>
                                                    </div>
                                                    <div className="px-3">
                                                        <MDBCardText className="mb-1 h5">1026</MDBCardText>
                                                        <MDBCardText className="small text-muted mb-0">Total Hours</MDBCardText>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <MDBCardBody className="text-black p-4">

                                            {/* About section */}
                                            <section>
                                                <div className="mb-5">
                                                    <p className="lead fw-normal mb-1">About</p>
                                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                        <MDBCardText className="font-italic mb-1 text-center text-lg"> Domain: Full Stack web developer </MDBCardText>
                                                        <MDBCardText className="font-italic mb-0">
                                                            More on descriptoin :::  {user?.description}
                                                        </MDBCardText>

                                                    </div>
                                                </div>
                                            </section>


                                            <section>
                                                <div className="mb-5">
                                                    <p className="lead fw-normal mb-1">Why Hire Me</p>
                                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                        <MDBCardText className="font-italic mb-1">
                                                            <div className='grid'>
                                                                <ul>
                                                                    <li> * 100% Job Success rate </li>
                                                                    <li> * Diverse Portfolio: E-commerce, Business Websites, Custom Solutions, Scalable APIs - I've done it all .</li>
                                                                    <li> * 90+ Clients Across Various Platforms </li>
                                                                    <li> * 4+ years of experience </li>
                                                                </ul>
                                                            </div>

                                                        </MDBCardText>
                                                        <span className='text-lg'>Skills:</span>
                                                        <MDBCardText className="font-italic mb-1">
                                                            React Js, Next Js, Typescript, MUI Components, Ant design Components, React Native, jQuery,
                                                            Bootstrap, tailwind css, HTML5/CSS3, UI/UX, Media Queries, Sass, Wordpress , Gsap,
                                                        </MDBCardText>

                                                        <MDBCardText className="font-italic mb-1 py-3">
                                                            Experince: 2+ year expeorience
                                                            Expoerince descripton: experient in * mobile dev and * web and *gaming
                                                        </MDBCardText>

                                                        <MDBCardText className="font-italic mb-1">
                                                            Education:  IIT mumbai
                                                            experient in * mobile dev and * web and *gaming
                                                        </MDBCardText>

                                                    </div>
                                                </div>
                                            </section>


                                            {/* Work history */}
                                            <section>
                                                <div className="mb-5 mx-auto">
                                                    <p className="lead fw-normal mb-1">Work History</p>
                                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>

                                                        <div className='flex text-center mx-96 '>
                                                            <span className='text-lg'>Completed Jobs(30):</span>
                                                            <span className='text-lg pl-8'>in Progress(24):</span>
                                                        </div>


                                                        <ul className="bg-[#efefef] shadow overflow-hidden w-[900px] sm:rounded-md mt-16 mx-auto " >

                                                            <li>
                                                                <div className="py-4 sm:px-12">
                                                                    <div className="flex items-center justify-between">
                                                                        <h3 className="text-lg leading-6 font-medium text-gray-900">'job[1]?.description'</h3>
                                                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">'job[1]?.status'</p>
                                                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">'job[1]?.paymentType'</a>
                                                                    </div>
                                                                    <div className="mt-2 grid items-center justify-between">
                                                                        <p className="text-sm font-medium text-gray-500">'job[1]?.title'</p>
                                                                        <p className="text-sm font-medium text-gray-500">'job[1]?.keyResponsiblities'</p>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                        </ul>


                                                    </div>
                                                </div>
                                            </section>
 
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </div>
                        </MDBContainer>
                    </div>
                )
            }
        </>

    )
};



export default ProfileUser;