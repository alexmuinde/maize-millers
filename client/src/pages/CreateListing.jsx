

export default function CreateListing(){
    return(
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" required/>
                    <input type="text" placeholder="Source" className="border p-3 rounded-lg" id="source" required/>
                    <input type="text" placeholder="Commodity" className="border p-3 rounded-lg" id="commodity" required/>
                    <input type="text" placeholder="Phone Number" className="border p-3 rounded-lg" id="phoneNumber" required/>
                    <input type="text" placeholder="Sample Reference Number" className="border p-3 rounded-lg" id="sampleReferenceNumber" required/>
                    <input type="text" placeholder="Date Sample Received" className="border p-3 rounded-lg" id="dateSampleReceived" required/>
                    <input type="text" placeholder="Date Sample Analyzed" className="border p-3 rounded-lg" id="dateSampleAnalyzed" required/>
                    <input type="text" placeholder="Method Of Test" className="border p-3 rounded-lg" id="methodOfTest" required/>
                    <input type="text" placeholder="Reference Standard" className="border p-3 rounded-lg" id="referenceStandard" required/>
                    <input type="text" placeholder="Parameter" className="border p-3 rounded-lg" id="parameter" required/>
                    <input type="text" placeholder="Results" className="border p-3 rounded-lg" id="results" required/>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Maximum Limit" className="border p-3 rounded-lg" id="maximumLimit" required/>
                    <input type="text" placeholder="Remarks" className="border p-3 rounded-lg" id="remarks" required/>
                    <input type="text" placeholder="Current Date" className="border p-3 rounded-lg" id="currentDate" required/>
                    <input type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required/>
                    <input type="text" placeholder="Payment Method" className="border p-3 rounded-lg" id="paymentMethod" required/>
                    <input type="text" placeholder="Bank Reference Number" className="border p-3 rounded-lg" id="bankReferenceNumber" required/>
                    <input type="text" placeholder="Amount" className="border p-3 rounded-lg" id="amount" required/>
                    <input type="text" placeholder="VAT" className="border p-3 rounded-lg" id="vat" required/>
                    <input type="text" placeholder="VAT Amount" className="border p-3 rounded-lg" id="vatAmout" required/>
                    <input type="text" placeholder="Total Amount" className="border p-3 rounded-lg" id="totalAmount" required/>
                    <input type="text" placeholder="Created By" className="border p-3 rounded-lg" id="userRef" required/>
                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-90">Create Listing</button>
                </div>
            </form>
        </main>
    )
}