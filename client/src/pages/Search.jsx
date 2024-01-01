
import { useEffect, useState } from "react"
import ReportItems from "../components/ReportItems"

export default function Search(){
    const [loading, setLoading] = useState(false)
    const [reports, setReports] = useState([])

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        

        const fetchReports = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/report/get?${searchQuery}`)
            const data = await res.json()
            setReports(data)
            setLoading(false)
        }
        fetchReports()
    }, [location.search])
    
    return(
        <main className="p-4 max-w-4xl mx-auto items-center">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">Report Results: </h1>
                <div className="flex flex-col gap-4">
                    {!loading && reports.length === 0 && (
                        <p className="text-xl text-red-700">No Report Found!</p>
                    )}
                    {loading && (
                        <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
                    )}
                    {!loading && reports && reports.map((reports) => (
                         <ReportItems key={reports._id} reports={reports}/>
                    ))}
                </div>
            </div>
        </main>
    )
}