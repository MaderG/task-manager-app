import { Grid, GridItem, Spinner } from '@chakra-ui/react'
import { UserContext } from '../../context/UserContext'
import React from 'react'
import fetcher from '../../services/api'
import StatisticsCard from '../Components/StatisticsCard';
import ProfileCard from './ProfileCard';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const Profile = () => {
  const { data } = React.useContext(UserContext);
  const [tasks, setTasks] = React.useState([]);
  const [allTasks, setAllTasks] = React.useState([]);
  const [completedTasks, setCompletedTasks] = React.useState(0);
  const [lastTask, setLastTask] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetcher('/api/tasks');
      const tasksLength = response.allTasks.length;
      const allTasks = response.allTasks;
      const completed = response.allTasks.filter(task => task.completed === true).length;
      const lastCompletedTask = response.allTasks.filter(task => task.completed === true).slice(0)[0]?.title || 'Nenhuma tarefa concluída';

      setTasks(tasksLength);
      setAllTasks(allTasks);
      setCompletedTasks(completed);
      setLastTask(lastCompletedTask);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    console.log('fetching')
  }

  React.useEffect(() => {
    fetchTasks();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Grid minH={'calc(100vh - 60px)'} ml={'4rem'} templateColumns={'270px 1fr'}>
      <GridItem><ProfileCard data={data} tasks={tasks} completedTasks={completedTasks} lastTask={lastTask} onUpdate={fetchProfile} /></GridItem>
      <GridItem ml={'.5rem'}>{allTasks.length > 0 && <StatisticsCard allTasks={allTasks} />}</GridItem>
    </Grid>
  );
};

export default Profile;
