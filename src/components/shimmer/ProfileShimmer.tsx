export const ProfileShimmer = () => {
  return (
    <div>
      <div className="animate-pulse max-w-[1350px] mx-auto mt-12">
        <div className="py-1 px-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-full h-60 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 "></div>
          </div>

          <div className="w-36 h-20 mx-3 bg-gradient-to-t rounded-b-md from-gray-700 via-gray-600 to-gray-500 "></div>

          <div className="py-6">
            <div className="h-12 mx-auto bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 w-1/4"></div>
            <div className="my-4">
              <div className="h-12 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-full"></div>
              <div className="h-7 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-full"></div>
              <div className="h-7 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-5/6"></div>
              <div className="h-7 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-4/6"></div>
              <div className="h-7 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-5/6"></div>
              <div className="h-7 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-3/6"></div>
              <div className="h-7 my-2 bg-gradient-to-t from-gray-500 via-gray-600 to-gray-500  w-2/6"></div>
            </div>
          </div>
          <div className="my-4">
            <div className="h-11 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500  w-full"></div>
            <div className="h-3 my-4 mx-auto bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer;
