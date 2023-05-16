function Sidebar() {
    return (
        <aside id="default-sidebar" className="top-0 left-0 z-40 w-64 h-screen   " aria-label="Sidebar">
            <div className="h-full p-5 overflow-y-auto bg-white border-r border-r-[#ebebeb] ">
                <ul className="space-y-2 font-medium">
                    <h1 className="text-black text-2xl mt-5 mb-16">Recaudadores.io </h1>
                    <div className="space-y-10">
                        <li>
                            <a href="#" className="flex items-center p-2 py-3 text-gray-900 rounded-lg bg-slate-200 w-2/3 ">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                <span className="ml-3  text-black">Overview</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg  ">
                                <svg aria-hidden="true" className="w-6 h-6 transition duration-75  group-hover:text-gray-900 " fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                <span className="ml-3  text-gray-400 font-normal">Users</span>
                            </a>
                        </li>
                    </div>


                </ul>
            </div>
        </aside>
    )
}

export default Sidebar