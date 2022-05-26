import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

const DisplayActivities = (props) => {
    const activities = props.activities;


    if (activities.length === 0) {
        fetch(`http://localhost:3001/activities/${props.userID}`)
            .then(res => res.json())
            .then(data => {
                if (data.length !== 0) {
                    props.setActivities(data);
                }
            })
    }

    const handleComplete = (e) => {

        fetch(`http://localhost:3001/activities/${e.target.dataset.activityid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                completed: true
            })
        }).then(res => {
            console.log(res.status);
            return res.json();
        })
            .then(data =>{ 
                console.log(data)
                props.setActivities([]);
            })
            
      
    }

    const handleDelete = (e) => {

        fetch(`http://localhost:3001/activities/${e.target.dataset.activityid}`, {
            method: 'DELETE',
        }).then(res => {
            console.log(res.status);
            return res.json();
        })
            .then(data => {
                console.log(data)
                props.setActivities([]);
            })
    }

    if (activities.length !== 0) {
        return <div>
            <h1>All Activities: </h1>
            {activities.map((activity) => {
                return <Paper className="card activity" elevation={5}>
                    <div key={activity.id}>
                        <h2 className="card title">{activity.title}</h2>
                        <p className="card body">{activity.body}</p>
                        <Button className={"btn completed"} data-activityid={activity.id} onClick={handleComplete}>
                            {activity.completed === true ? "Completed" : "Mark Complete"}
                        </Button>
                        <Button className={"btn delete"} data-activityid={activity.id} onClick={handleDelete}>Delete</Button>
                    </div>
                </Paper>
            })}
        </div>
    }

}

export default DisplayActivities; 