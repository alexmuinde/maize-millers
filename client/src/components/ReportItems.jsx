import { Link } from "react-router-dom";

export default function ReportItems({reports}){
    return(
        <div className="border rounded-lg p-3 flex gap-3 justify-between items-center">
            <Link className="truncate text-slate-700 font-semibold flex-1 hover:underline" to={`/update-listing/${reports._id}`}><p>{reports.name}</p></Link>
            <Link className="truncate text-slate-700 font-semibold flex-1 hover:underline" to={`/update-listing/${reports._id}`}><p>{reports.phoneNumber}</p></Link>
            <Link className="truncate text-slate-700 font-semibold flex-1 hover:underline" to={`/update-listing/${reports._id}`}><p>{reports.commodity}</p></Link>
            <Link className="truncate text-slate-700 font-semibold flex-1 hover:underline" to={`/update-listing/${reports._id}`}><p>{reports.source}</p></Link>
            
        </div>
    )
}