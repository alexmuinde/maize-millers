import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function CreateListing(){
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '', source: '', commodity: '', phoneNumber: '', sampleReferenceNumber: '', dateSampleReceived: '', dateSampleAnalyzed: '',
        methodOfTest: '', referenceStandard: '', parameter: '', results: '', maximumLimit: '', remarks: '', currentDate: '', description: '',
        paymentMethod: '', bankReferenceNumber: '', amount: '', vat: '', vatAmount: '', totalAmount: '', userRef: ''
        
    })

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    

    console.log(formData)

    const handleChange = (e) => {
        if(e.target.type === 'number' || e.target.type === 'text'){
            setFormData({...formData, [e.target.id] : e.target.value})
        }
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({...formData, userRef: currentUser._id})
            })

            const data = await res.json()
            setLoading(false)
            if(data.success === false){
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    return(
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" required onChange={handleChange} value={formData.name}/>
                    <input type="text" placeholder="Source" className="border p-3 rounded-lg" id="source" required onChange={handleChange} value={formData.source}/>
                    <input type="text" placeholder="Commodity" className="border p-3 rounded-lg" id="commodity" required onChange={handleChange} value={formData.commodity}/>
                    <input type="text" placeholder="Phone Number" className="border p-3 rounded-lg" id="phoneNumber" required onChange={handleChange} value={formData.phoneNumber}/>
                    <input type="text" placeholder="Sample Reference Number" className="border p-3 rounded-lg" id="sampleReferenceNumber" required onChange={handleChange} value={formData.sampleReferenceNumber}/>
                    <input type="text" placeholder="Date Sample Received" className="border p-3 rounded-lg" id="dateSampleReceived" required onChange={handleChange} value={formData.dateSampleReceived}/>
                    <input type="text" placeholder="Date Sample Analyzed" className="border p-3 rounded-lg" id="dateSampleAnalyzed" required onChange={handleChange} value={formData.sampleReferenceAnalyzed}/>
                    <input type="text" placeholder="Method Of Test" className="border p-3 rounded-lg" id="methodOfTest" required onChange={handleChange} value={formData.methodOfTest }/>
                    <input type="text" placeholder="Reference Standard" className="border p-3 rounded-lg" id="referenceStandard" required onChange={handleChange} value={formData.referenceStandard}/>
                    <input type="text" placeholder="Parameter" className="border p-3 rounded-lg" id="parameter" required onChange={handleChange} value={formData.parameter}/>
                    <input type="text" placeholder="Results" className="border p-3 rounded-lg" id="results" required onChange={handleChange} value={formData.results}/>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Maximum Limit" className="border p-3 rounded-lg" id="maximumLimit" required onChange={handleChange} value={formData.maximumLimit}/>
                    <input type="text" placeholder="Remarks" className="border p-3 rounded-lg" id="remarks" required onChange={handleChange} value={formData.remarks}/>
                    <input type="text" placeholder="Current Date" className="border p-3 rounded-lg" id="currentDate" required onChange={handleChange} value={formData.currentDate}/>
                    <input type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required onChange={handleChange} value={formData.description}/>
                    <input type="text" placeholder="Payment Method" className="border p-3 rounded-lg" id="paymentMethod" required onChange={handleChange} value={formData.paymentMethod}/>
                    <input type="text" placeholder="Bank Reference Number" className="border p-3 rounded-lg" id="bankReferenceNumber" required onChange={handleChange} value={formData.bankReferenceNumber}/>
                    <input type="text" placeholder="Amount" className="border p-3 rounded-lg" id="amount" required onChange={handleChange} value={formData.amount}/>
                    <input type="text" placeholder="VAT" className="border p-3 rounded-lg" id="vat" required onChange={handleChange} value={formData.vat}/>
                    <input type="text" placeholder="VAT Amout" className="border p-3 rounded-lg" id="vatAmount" required onChange={handleChange} value={formData.vatAmount}/>
                    
                    <input type="text" placeholder="Total Amount" className="border p-3 rounded-lg" id="totalAmount" required onChange={handleChange} value={formData.totalAmount}/>
                    
                    <button disabled={loading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-90">{loading ? 'Creating...' : 'Create Listing'}</button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                    
                </div>
            </form>
        </main>
    )
}