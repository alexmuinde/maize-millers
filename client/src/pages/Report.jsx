
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from "firebase/storage" 
import {app} from "../firebase"




export default function CreateListing(){
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '', source: '', commodity: '', phoneNumber: '', sampleReferenceNumber: '', dateSampleReceived: '', dateSampleAnalyzed: '', 
        methodOfTest: '', referenceStandard: '', parameter: '', results: '', maximumLimit: '', remarks: '', batchNo: '', userRef: '', imageUrls:[]
        
    })
    

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);
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
        
        // console.log(e.target.value);
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/report/report', {
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
            
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    
    
    const currentDate = new Date();
    const [files, setFiles] = useState([])

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError('Image upload failed (2 mb max per image)');
              setUploading(false);
            });
        } else {
          setImageUploadError('You can only upload 6 images per listing');
          setUploading(false);
        }
      };
    
      const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
      };
    

    return(
        <main className="p-3 max-w-4xl mx-auto">
            
            <h1 className="text-3xl font-semibold text-center my-7">Create a Report</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
               
              
               
            
            <div className="flex flex-1 flex-col gap-4">
            <input type="text" placeholder=" Customers Name" className="border p-3 rounded-lg" id="name" required onChange={handleChange} value={formData.name}/>
                    <input type="text" placeholder="Source" className="border p-3 rounded-lg" id="source" required onChange={handleChange} value={formData.source}/>
                    <input type="text" placeholder="Commodity" className="border p-3 rounded-lg" id="commodity" required onChange={handleChange} value={formData.commodity}/>
                    <input type="text" placeholder="Phone Number" className="border p-3 rounded-lg" id="phoneNumber" required onChange={handleChange} value={formData.phoneNumber}/>
                    <input type="text" placeholder="Sample Reference Number" className="border p-3 rounded-lg" id="sampleReferenceNumber" required onChange={handleChange} value={formData.sampleReferenceNumber}/>
                    <input type="text" placeholder="Method Of Test" className="border p-3 rounded-lg" id="methodOfTest" required onChange={handleChange} value={formData.methodOfTest }/>
                    <input type="text" placeholder="Parameter" className="border p-3 rounded-lg" id="parameter" required onChange={handleChange} value={formData.parameter}/>
                    <input type="text" placeholder="Results" className="border p-3 rounded-lg" id="results" required onChange={handleChange} value={formData.results}/>
                    
                    
            </div>
            <div className="flex flex-col gap-4 flex-1">
            <input type="text" placeholder="Maximum Limit" className="border p-3 rounded-lg" id="maximumLimit" required onChange={handleChange} value={formData.maximumLimit}/>
                    <input type="text" placeholder="Remarks" className="border p-3 rounded-lg" id="remarks" required onChange={handleChange} value={formData.remarks}/>
                    
            <input type="text" placeholder="Reference Standard" className="border p-3 rounded-lg" id="referenceStandard" required onChange={handleChange} value={formData.referenceStandard}/>
                    <input type="text" placeholder="Batch Number" className="border p-3 rounded-lg" id="batchNo" required onChange={handleChange} value={formData.batchNo}/>
                    <p className='font-semibold'>Images: 
                    <span className='font-normal text-gray-600 ml-2'>
                        max 6
                    </span>
                    </p>
                    <div className="flex gap-4">
                        <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id='images' accept="image/*" multiple/>
                        <button type="button" disabled={uploading} onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((urls, index) => (
              <div
                key={urls}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={urls}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
                    <div className="flex flex-row gap-3 border p-3 rounded-lg">
                        <p>Date Sample Received:</p>
                        <input type="date" onChange={handleDate} id="dateSampleReceived" required value={formData.dateSampleReceived}/>
                    </div>
                    <div className="flex flex-row gap-3 border p-3 rounded-lg">
                        <p>Date Sample Tested:</p>
                        <input type="date" onChange={handleDate} id="dateSampleAnalyzed" required value={formData.dateSampleAnalyzed}/>
                    </div>
                    
                    
                    
                    
                        
                    <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-green-700 rounded-lg uppercase text-center   w-3/5 h-10">
                    <button disabled={loading} className="p-2  text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-90">{loading ? 'Creating...' : 'Create Record'}</button>
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

//<input type="text" placeholder="Date Sample Received" className="border p-3 rounded-lg" id="dateSampleReceived" required onChange={handleChange} value={formData.dateSampleReceived}/>

//mongodb+srv://lostboy:lostboyalex@cluster0.e24udxa.mongodb.net/maize-miller?retryWrites=true&w=majority