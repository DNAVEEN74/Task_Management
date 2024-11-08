import { Search, Filter, ChevronDown } from 'lucide-react';

export default function SearchBar (): JSX.Element {

    return (
        <>
            <div className="flex justify-between bg-[#ECEDEE] w-full h-20 content-center rounded-2xl px-5 py-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="bg-white w-[308px] h-11 px-2.5 py-3 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] " >
                    <div className='flex w-[284px] h-5 gap-2 items-center' >
                        <Search className='w-5 h-5' />
                        <input type="text" placeholder='Search Project' className='w-64 h-6 font-medium text-sm leading-[18px] color-[#5A5A5A] ' />
                    </div>
                </div>
                <div className='w-[107px] h-[39px] rounded-[5px] border border-[#625F6D] bg-white flex justify-center items-center gap-2' >
                    <Filter className='w-4 h-4' />
                    <p className='w-[39px] h-[19px] font-medium leading-[19.36px] text-base color-[#797979] ' >Filter</p>
                    <ChevronDown className='w-4 h-4' />
                </div>
            </div>
        </>
    )
}