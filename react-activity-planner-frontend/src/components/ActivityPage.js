import DisplayActivities from "./DisplayActivities";
import AddActivity from './AddActivity';
import { useState } from 'react';

const ActivityPage = (props) => {

    const [activities, setActivities] = useState([]);
    console.log(activities);

    const userID = props.userID;

    return <div>
        <DisplayActivities activities={activities} setActivities={setActivities} userID={userID}/>
        <AddActivity activities={activities} setActivities={setActivities} userID={userID}/>
    </div>
}

export default ActivityPage;