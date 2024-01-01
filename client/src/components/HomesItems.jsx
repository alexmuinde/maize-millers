

export default function HomesItems({reports}){
    return(
        <div className="border rounded-lg p-3 flex gap-3 justify-between items-center">
            <div className="truncate text-slate-700 font-semibold flex-1 hover:opacity-50"><p>{reports.name}</p></div>
            <div className="truncate text-slate-700 font-semibold flex-1 hover:opacity-50"><p>{reports.phoneNumber}</p></div>
            <div className="truncate text-slate-700 font-semibold flex-1 hover:opacity-50"><p>{reports.commodity}</p></div>
            <div className="truncate text-slate-700 font-semibold flex-1 hover:opacity-50"><p>{reports.source}</p></div>
            
        </div>
    )
}