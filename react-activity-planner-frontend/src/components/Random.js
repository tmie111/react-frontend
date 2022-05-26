import Paper from '@mui/material/Paper';
import { useState } from 'react';

const Random = () => {

    const [activities, setActivities] = useState('');

    const handleRandom = () => {
        fetch(`http://www.boredapi.com/api/activity?type=recreational`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setActivities(data);
            });
    }

    return <div>
        <h1>Bored?</h1>
        {activities.map((activity) => {
            return <Paper className="card random" elevation={5}>
                <div key={activity.id}>
                    <h2 className="card title">{activity.title}</h2>
                    <p className="card body">{activity.body}</p>
                </div>
            </Paper>
        })}
        <button onClick={handleRandom}>Generate Random</button>
    </div>
}

export default Random;