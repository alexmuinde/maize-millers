

import React, {useState} from "react";

var datetime = () => {
    const [date, setDate] = useState()

    return(
        <div>
            <input type='date' onChange={e => setDate(e.target.value)} placeholder="date"/>
            
        </div>
    )
}


export default datetime