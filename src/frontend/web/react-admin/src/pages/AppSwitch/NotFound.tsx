import React from "react";
import {Link} from "react-router-dom";

const NotFound = ()=>{

    return(
        <div className='w-full h-full no-scrollbar align-items-center justify-center justify-content-center'>
            <div className="no-scrollbar rounded-sm mx-[15%] my-[5.5%] align-items-center justify-center justify-content-center border border-stroke bg-white shadow-xl shadow-graydark dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center h-full">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-17.5 px-26 text-center">
                            <h1 className="mb-6 px-7.5 font-semibold text-black dark:text-white">
                                OUPPS!!! Page Not Found
                            </h1>

                            <div >
                                <Link
                                to="/"
                                className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
                                >
                                <div className="flex w-full flex-1 items-center justify-center mb-6 px-7.5 font-semibold text-black dark:text-white">
                                    <h2>
                                         Go back to the Home
                                    </h2>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    );
};

export default NotFound;