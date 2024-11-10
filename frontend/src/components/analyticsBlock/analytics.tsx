import { TriangleAlert, Clock4, BriefcaseBusiness } from 'lucide-react';

type AnalyticCardProps = {
    logo:string;
    color:string;
    title:string;
    count:string;
}

const iconMapping: Record<string, React.ComponentType> = {
    TriangleAlert,
    Clock4,
    BriefcaseBusiness,
};

export default function AnalyticCard ({ logo, color, title, count }: AnalyticCardProps): JSX.Element {
    const IconComponent = iconMapping[logo];

    return (
        <div className='bg-[#ECEDEE] rounded-[14px] gap-4 h-[196px] w-[268px] shadow-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pt-[18px] pl-[18px] pr-[83px] pb-[24px] ' >
            <div className='w-[124px] h-[139px] flex flex-col gap-[10px] '>
                <div className='rounded-full w-[46px] h-[46px] flex justify-center pt-[10px]' style={{backgroundColor:`${color}`, color:'white'}} >
                    {IconComponent ? <IconComponent /> : null} 
                </div>
                <h4 className='font-medium text-sm text-[#797979] font-sans leading-5' >{title}</h4>
                <p className='font-medium text-3xl text-[#060606] leading-10 font-sans' >{count}</p>
            </div>
        </div>
    )
}