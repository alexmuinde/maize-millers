
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function CreateReceipt(){
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        currentDate: '', description: '',
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

    const handleDate = (e) => {
        if(e.target.type !== `text`){
            setFormData({...formData, [e.target.id] : e.target.value});
            console.log(e.target.value);
        }
   }

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/receipt/receipt', {
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
            navigate(`/create-listing`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    return(
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Generate a Receipt</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
    
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-row gap-3 border p-3 rounded-lg">
                        <p>Current Date:</p>
                        <input type="date" onChange={handleDate} id="currentDate" required value={formData.currentDate}/>
                    </div>
                    <input type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required onChange={handleChange} value={formData.description}/>
                    <input type="text" placeholder="Payment Method" className="border p-3 rounded-lg" id="paymentMethod" required onChange={handleChange} value={formData.paymentMethod}/>
                    <input type="text" placeholder="Bank Reference Number" className="border p-3 rounded-lg" id="bankReferenceNumber" required onChange={handleChange} value={formData.bankReferenceNumber}/>
                    
                </div>
                <div className="flex flex-1 flex-col gap-4">
                    <input type="text" placeholder="VAT Amout" className="border p-3 rounded-lg" id="vatAmount" required onChange={handleChange} value={formData.vatAmount}/>
                    <input type="text" placeholder="Total Amount" className="border p-3 rounded-lg" id="totalAmount" required onChange={handleChange} value={formData.totalAmount}/>
                    <input type="text" placeholder="Amount" className="border p-3 rounded-lg" id="amount" required onChange={handleChange} value={formData.amount}/>
                    <input type="text" placeholder="VAT" className="border p-3 rounded-lg" id="vat" required onChange={handleChange} value={formData.vat}/>
                    
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-green-700 rounded-lg uppercase text-center   w-3/5 h-10">
                    <button disabled={loading} className="p-2  text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-90">{loading ? 'Creating...' : 'Create Receipt'}</button>
                    </div>
                    <div className="bg-green-700 rounded-lg uppercase text-center h-10 w-2/5">
                    <button disabled={loading} className="p-2  text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-90">{loading ? 'Creating...' : 'Print'}</button>
                    </div>
                    </div>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                    
                </div>
            </form>
        </main>
    )
}