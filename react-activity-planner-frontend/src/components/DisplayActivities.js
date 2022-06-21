import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
                // console.log(data)
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
                // console.log(data)
                props.setActivities([]);
            })
    }

    const handleFav = (e) => {
        console.log(e.currentTarget.getAttribute("data-activityid"));
        console.log(e.currentTarget.getAttribute("data-favorite"))
        console.log(e.currentTarget.getAttribute("data-favorite") === "false")
       
        fetch(`http://localhost:3001/favorites/${e.currentTarget.getAttribute("data-activityid")}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                favorite: e.currentTarget.getAttribute("data-favorite") === "false"
            })
        }).then(res => {
            console.log(res.status);
            return res.json();
        })
            .then(data =>{ 
                // console.log(data)
               props.setActivities([]);
            })
    }

    const getActivityColor = (date) => {

        if(!date){
            return ""
        }

        let today = new Date()
        let dueDate = new Date(date)

        let difference = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        console.log(difference);

        if(difference === -0 || difference <= -1){
            return "red"
        }else if(difference < 3){
            return "yellow"
        }else {
            return "blue"
        }
    }

    if (activities.length !== 0) {
        return <div>
            <h1>All Activities: </h1>
            {activities.map((activity, index) => {
                console.log(activity);
                
                return <Paper className={`card activity ${getActivityColor(activity.due_date)}`} key={index} data-activityid={activity.id} elevation={5}>
                    <div>
                        {activity.favorite === false ? 
                        <FavoriteBorderIcon data-activityid={activity.id} 
                        data-favorite={activity.favorite} 
                        onClick={handleFav}/> : 
                        <FavoriteIcon data-activityid={activity.id} 
                        data-favorite={activity.favorite} 
                        onClick={handleFav}/>}

                        {activity.due_date === null ? '' :
                        <p>{`due: ${activity.due_date}`}</p>}
                       
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