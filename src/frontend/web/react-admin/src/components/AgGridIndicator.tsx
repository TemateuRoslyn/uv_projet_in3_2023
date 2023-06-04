
export  const AgGridIndicator = () => {
    return (
        <div
            id="preloader"
            className="z-999999 flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75"
        >
        <div
            className="lg:h-40 lg:w-40 xl:h-40 xl:w-40 md:h-30 md:w-30 sm:h-50 sm:w-50 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
        ></div>
        </div>
    )
}