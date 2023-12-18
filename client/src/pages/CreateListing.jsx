
import { Link } from "react-router-dom"


export default function CreateListing(){
    
    
    return(
        <div className="p-3 max-w-4xl mx-auto mt-80">
            <div className="flex flex-col sm:flex-row gap-4 ">
                <div className="flex flex-col gap-4 flex-1">
                    <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90" to={'/report'}>Create Report</Link>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90" to={'/receipt'}>Generate Receipt</Link>
                </div>
            </div>
        
        </div>
    )
}