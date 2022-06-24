import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const AddActivity = (props) => {

    const [value, setValue] = useState(
        new Date(),
    );

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            user_id: props.userID,
            title: e.target.title.value,
            body: e.target.body.value,
            due_date: `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }

        fetch('https://activity-planner-backend.herokuapp.com/activities', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => {
            props.setActivities([]);
            e.target.title.value = "";
            e.target.body.value = "";
        })
    }

    return <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper className="card add" elevation={5}>
                <h1>Add Activity: </h1>
                <form id={"addActivity"} onSubmit={handleSubmit}>
                    <div className="add activity input">
                        <TextField
                            name="title"
                            id="title"
                            label="Title"
                            variant="outlined" />
                    </div>
                    <div className="add activity input">
                        <TextField
                            name="body"
                            type="body"
                            id="body"
                            label="Description"
                            variant="outlined" />
                    </div>
                    <div className='date picker'>
                        <DesktopDatePicker
                            label="Select Date"
                            inputFormat="MM/dd/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div>
                        <Button className="btn add" type="submit" variant="contained">Submit</Button>
                    </div>

                </form>
            </Paper>
        </LocalizationProvider>
    </div>
}

export default AddActivity;