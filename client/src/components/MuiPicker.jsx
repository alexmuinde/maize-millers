
import {Stack, TextField} from '@mui/material'
import {DatePicker} from '@mui/lab'
import { useState } from 'react'

export const MuiPicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    return(
        <Stack spacing={3} sx={{width: '250px'}}>
            <DatePicker label='Date Sample Received' renderInput={(params) => <TextField {...params}/>} value={selectedDate} onChange={(newValue) => {setSelectedDate(newValue)}}/>
        </Stack>
    )
} 