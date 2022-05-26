import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const AddActivity = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        let body = {
            user_id: props.userID,
            title: e.target.title.value,
            body: e.target.body.value
        }

        fetch('http://localhost:3001/activities', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => {
            console.log(data);
            props.setActivities([]);
            e.target.title.value = "";
            e.target.body.value = "";
        })
    }

    return <div>
        <Paper className="card add" elevation={5}>
        <h1>Add Activity: </h1>
        <form id={"addActivity"} onSubmit={handleSubmit}>
            <div>
                <TextField 
                name="title" 
                id="title" 
                label="Title" 
                variant="outlined" />
            </div>
            <div>
                <TextField 
                name="body" 
                type="body" 
                id="body" 
                label="Description" 
                variant="outlined" />
            </div>
            <div>
                <Button className="btn add" type="submit" variant="contained">Submit</Button>
            </div>

        </form>
        </Paper>
    </div>
}

export default AddActivity;