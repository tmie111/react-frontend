import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

const DisplayActivities = (props) => {
    const activities = props.activities;
    
    if (activities.length === 0) {
        fetch(`https://activity-planner-backend.herokuapp.com/activities/${props.userID}`)
            .then(res => res.json())
            .then(data => {
                if (data.length !== 0) {
                    props.setActivities(data);
                }
            })
    }

    const handleComplete = (e) => {

        fetch(`https://activity-planner-backend.herokuapp.com/activities/${e.currentTarget.getAttribute("data-activityid")}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                completed: e.currentTarget.getAttribute("data-completed") === "false"
            })
        }).then(res => {
            console.log(res.status);
            return res.json();
        })
            .then(data =>{ 
                props.setActivities([]);
            })

       
            
      
    }

    const handleDelete = (e) => {

        fetch(`https://activity-planner-backend.herokuapp.com/activities/${e.target.dataset.activityid}`, {
            method: 'DELETE',
        }).then(res => {
            return res.json();
        })
            .then(data => {
                props.setActivities([]);
            })
    }

    const handleFav = (e) => {

        fetch(`https://activity-planner-backend.herokuapp.com/favorites/${e.currentTarget.getAttribute("data-activityid")}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                favorite: e.currentTarget.getAttribute("data-favorite") === "false"
            })
        }).then(res => {
            return res.json();
        })
            .then(data =>{ 
               props.setActivities([]);
            })
    }

    const getActivityColor = (date, completed) => {

        if(!date){
            return ""
        }

        if(completed === true){
            return ""
        }

        let today = new Date()
        let dueDate = new Date(date)

        let difference = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      
        if(difference === -0 || difference <= -1){
            return "red"
        }else if(difference < 3){
            return "yellow"
        }else {
            return ""
        }
    }

    if (activities.length !== 0) {
        return <div>
            <h1>All Activities: </h1>
            {activities.map((activity, index) => {
                return <Paper className={`card activity ${getActivityColor(activity.due_date, activity.completed)}`} key={index} data-activityid={activity.id} elevation={5}>
                    <div>
                        {activity.favorite === false ? 
                        <FavoriteBorderIcon data-activityid={activity.id} 
                        data-favorite={activity.favorite} 
                        onClick={handleFav}/> : 
                        <FavoriteIcon data-activityid={activity.id} 
                        data-favorite={activity.favorite} 
                        onClick={handleFav}/>}

                        {activity.due_date === null ? '' :
                        <p>{`${activity.due_date}`}</p>}
                       
                        <h2 className="card title">{activity.title}</h2>
                        <p className="card body">{activity.body}</p>
                        <Button className={`btn completed ${getActivityColor(activity.due_date, activity.completed)}`} data-activityid={activity.id}  data-completed={activity.completed} onClick={handleComplete}>
                            {activity.completed === true ? "Completed" : "Mark Complete"}
                        </Button>
                        <Button className={`btn delete ${getActivityColor(activity.due_date, activity.completed)}`} data-activityid={activity.id} onClick={handleDelete}>Delete</Button>
                    </div>
                </Paper>
            })}
        </div>
    }

}

export default DisplayActivities; 