
import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js"
import { useDispatch } from "react-redux"
import {Link} from 'react-router-dom'
import Report from "../../../api/models/report.model.js"


export default function Profile(){
    const fileRef = useRef(null)
    const {currentUser, loading, error} = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [showRecordsError, setShowRecordsError] = useState(false)
    const [userListings, setUserListings] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        if(file) {
            handleFileUpload(file)
        }
    }, [file])

    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state-changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / 
                snapshot.totalBytes) * 100
                setFilePerc(Math.round(progress))
            },
        
        (error) => {
            setFileUploadError(true)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL) => 
                setFormData({ ...formData, avatar: downloadURL})
            )
        }
        );
    }

    const handleChange =  (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success === false){
                dispatch(updateUserFailure(data.message))
                return
            }

            dispatch(updateUserSuccess(data))
            setUpdateSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleShowRecords = async () => {
        try {
            setShowRecordsError(false)
            const res = await fetch(`/api/user/listings/${currentUser._id}`)
            const data = await res.json()
            if(data.success === false){
                setShowRecordsError(true)
                return
            }
            setUserListings(data)
        } catch (error) {
            setShowRecordsError(true)
        }
    }
    return(
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
                <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 bg-gray-700"/>
                <p className="text-sm self-center">
                    {fileUploadError ? (
                        <span className="text-red-700">Error Image Upload</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePerc}`}</span>
                    ) : filePerc === 100 ? (
                        <span className="text-green-700">Image successfully uploaded</span>
                    ) : (
                        ''
                    )}
                </p>
                <input type='text' placeholder="username" className="border p-3 rounded-lg" id="username" defaultValue={currentUser.username} onChange={handleChange}/>
                <input type='email' placeholder="email" className="border p-3 rounded-lg" id="email" defaultValue={currentUser.email} onChange={handleChange}/>
                <input type='password' placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-90">{loading ? 'Loading...' : 'Update'}</button>
                <div className="flex flex-row gap-10 items-center">
                <div className="bg-green-700 rounded-lg uppercase text-center  p-3 w-1/2">
                <Link className=" text-white hover:opacity-60" to={'/report'}>Report</Link>
                </div>
                <div className="bg-green-700 rounded-lg uppercase text-center  p-3 w-1/2">
                <Link className="text-white hover:opacity-60" to={'/receipt'}>Receipt</Link>
                </div>
                
                </div>
            </form>
            <p className="text-red-700 mt-5">{error ? error : ''}</p>
            <p className="text-green-700 mt-5">{updateSuccess ? 'User Updated Successfully!': ''}</p>
            <button onClick={handleShowRecords} className="text-green-700 w-full">Show Reports</button>
            <p className="text-red-700 mt-5">{showRecordsError ? 'Error showing records' : ''}</p>
            {userListings && userListings.length > 0 && userListings.map((report) => (
                <div key={report._id} className="border rounded-lg p-3 flex justify-between items-center">
                    <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/report/${report._id}`}>
                        <p >{report.name}</p>
                    </Link>
                    <Link className="text-slate-700 font-semibold flex-1 hover:underline" to={`/report/${report._id}`}>
                        <p >{report.phoneNumber}</p>
                    </Link>
                    <button className="text-green-700 hover:underline uppercase">Edit</button>
                </div>
            ))}
        </div>
    )
}

/**
 * firebase storage
 * allow read;
      allow write : if
      request.resource.size <2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
 */

      //<Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90" to={'/create-listing'}>Create Listing</Link>