





<div className="min-h-full w-full flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
        <div>
            <h2 className="font-semibold text-xl text-gray-600">Your Profile</h2>
            <p className="text-gray-500 text-xs mb-6">Edit all here.</p>

            <div className="bg-white  p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Personal Details</p>
                        <div className="flex items-center py-44 space-x-6">
                            <div className="shrink-0">

                                <img id='preview_img' onChange={handleChange} className="h-44 w-44 object-cover rounded-full" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxwtNwBZrujgVzK44NhBAi0ybAxnnCB8VgueUBMjv1XkEAephINAcGhzFNWukvZ0VbVA&usqp=CAU"} alt="Current profile photo" />

                            </div>
                            <label className="block" onChange={(event: any) => loadFile(event)}>
                                <input type="file" name='profilePicture'
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    //  onChange={(event: any) =>loadFile(event)}
                                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-2
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100
                    "/>
                            </label>
                        </div>

                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-1 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5">
                                <label>Name</label>
                                <input defaultValue={user?.name} onChange={handleChange} name="name" className="h-8 border mt-1 px-4 w-full " placeholder='change name' />
                            </div>

                            <div className="md:col-span-5">
                                <label>Age</label>
                                <input name="age" defaultValue={user?.age} type='number' className="h-8 border mt-1  px-4 w-full " placeholder="change age" />
                            </div>

                            <div className="md:col-span-5">
                                <label>Mobile</label>
                                <input defaultValue={user?.mobile} onChange={handleChange} name="mobile" type='number' className="h-8 border mt-1  px-4 w-full " placeholder="change mobile number" />
                            </div>

                            <div className="md:col-span-5">
                                <label>Description</label>
                                <input defaultValue={user?.description} onChange={handleChange} name="description" className="h-44 border mt-1  px-4 w-full " />
                            </div>

                            <div className="md:col-span-5">
                                <label>Location</label>
                                <input defaultValue={user?.location} onChange={handleChange} name="location" className="h-8 border mt-1  px-4 w-full " placeholder="change location" />
                            </div>


                            <div className="md:col-span-5">

                                {/* <input  onChange={handleChange} name="skills" className="h-8 border mt-1  px-4 w-full " placeholder="change skills" /> */}
                            </div>

                            <div className="md:col-span-5">
                                <label>Budget</label>

                                <input defaultValue={user?.budget} onChange={handleChange} name="budget" className="h-8 border mt-1  px-4 w-full " placeholder="change budget" />
                            </div>

                            <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 "> Submit </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 