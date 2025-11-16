import Image from "next/image";
import { FileUp, PlusIcon, SearchIcon, Upload } from "lucide-react";

function Header() {
  return (
    <div
      className=" text-black grid grid-cols-[1fr_minmax(0,42rem)_1fr] items-center px-4 py-4"
      style={{ fontFamily: "Instrument" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl uppercase font-extralight tracking-tighter text-zinc-700 font-mono">
          <Image src="/im1.png" alt="logo" width={80} height={80} />
        </span>
      </div>
      <div className="justify-self-center w-full">
        <div className="relative w-full max-w-2xl flex items-center">
          <SearchIcon className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks"
            className="w-full h-10 pl-9 pr-12 text-xs rounded-xl bg-transparent border border-gray-100 focus:outline-none"
          />

          <div className="absolute z-50 right-2 flex items-center space-x-1">
            <button className="w-6 h-6 flex cursor-pointer hover:bg-gray-100 transition-all duration-300  items-center justify-center text-[10px] border border-gray-200 rounded-md text-gray-400 font-mono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-gray-400"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" />
              </svg>
            </button>
            <button className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300 text-[12px] border border-gray-200 rounded-md text-gray-400 font-mono font-semibold">
              K
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-self-end">
        <button className="h-8 px-3 flex gap-1.5 items-center justify-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-xs rounded-lg text-black bg-gray-200 ">
          <FileUp className="w-4 h-4 text-black" />
          Upload
        </button>
        <button className="h-8 px-3 flex gap-1.5 items-center justify-center cursor-pointer  hover:scale-105 transition-all duration-300 text-xs rounded-lg text-white bg-black ">
          <PlusIcon className="w-4 h-4 text-white" />
          Add
        </button>
        {/* <button className="border flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300 border-gray-200 rounded-xl p-1">
          <Image src="/logo.png" alt="logo" width={25} height={25} />
        </button> */}
      </div>
    </div>
  );
}

export default Header;
