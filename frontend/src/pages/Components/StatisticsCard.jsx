import { Box, Grid, GridItem, Heading, useColorModeValue } from '@chakra-ui/react';
import { format, parseISO, eachDayOfInterval, startOfWeek, eachWeekOfInterval } from 'date-fns';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsCard = ({ allTasks }) => {
  const calculateDailyStats = (tasks) => {
    const dailyCounts = {};

    tasks.forEach((task) => {
      const date = format(parseISO(task.createdAt), 'dd/MM/yyyy');
      if (!dailyCounts[date]) {
        dailyCounts[date] = 0;
      }
      dailyCounts[date]++;
    });

    const dates = eachDayOfInterval({
      start: parseISO(tasks[tasks.length - 1].createdAt),
      end: parseISO(tasks[0].createdAt),
    });

    return dates.map((date) => {
      const formattedDate = format(date, 'dd/MM/yyyy');
      return {
        date: formattedDate,
        count: dailyCounts[formattedDate] || 0,
      };
    });
  };

  const calculateWeeklyStats = (tasks) => {
    const weeklyCounts = {};

    tasks.forEach((task) => {
      const weekStart = format(startOfWeek(parseISO(task.createdAt)), 'dd/MM/yyyy');
      if (!weeklyCounts[weekStart]) {
        weeklyCounts[weekStart] = 0;
      }
      weeklyCounts[weekStart]++;
    });

    const weeks = eachWeekOfInterval({
      start: parseISO(tasks[tasks.length - 1].createdAt),
      end: parseISO(tasks[0].createdAt),
    });

    return weeks.map((week) => {
      const formattedWeek = format(week, 'dd/MM/yyyy');
      return {
        week: formattedWeek,
        count: weeklyCounts[formattedWeek] || 0,
      };
    });
  };

  const dailyStats = calculateDailyStats(allTasks);
  const weeklyStats = calculateWeeklyStats(allTasks);

  const dailyData = {
    labels: dailyStats.map(stat => stat.date),
    datasets: [
      {
        label: 'Tarefas Concluídas Diariamente',
        data: dailyStats.map(stat => stat.count),
        backgroundColor: [
          'rgba(75,192,192,0.2)',
          'rgba(75,192,192,1)',
          'rgba(255,206,86,0.2)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,0.2)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,0.2)',
          'rgba(153,102,255,1)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(75,192,192,1)',
          'rgba(255,206,86,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
          'rgba(153,102,255,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const weeklyData = {
    labels: weeklyStats.map(stat => stat.week),
    datasets: [
      {
        label: 'Tarefas Concluídas Semanalmente',
        data: weeklyStats.map(stat => stat.count),
        backgroundColor: [
          'rgba(153,102,255,0.2)',
          'rgba(153,102,255,1)',
          'rgba(255,159,64,0.2)',
          'rgba(255,159,64,1)',
          'rgba(255,99,132,0.2)',
          'rgba(255,99,132,1)',
          'rgba(54,162,235,0.2)',
          'rgba(54,162,235,1)',
        ],
        borderColor: [
          'rgba(153,102,255,1)',
          'rgba(153,102,255,1)',
          'rgba(255,159,64,1)',
          'rgba(255,159,64,1)',
          'rgba(255,99,132,1)',
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(54,162,235,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}>
      <Heading fontSize={'xl'} mb={4}>Estatísticas de Tarefas</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Heading textAlign={'center'} fontSize={'lg'} mb={2}>Diárias</Heading>
          <Box ml='107.5' h="400" w="400">
            <Pie data={dailyData} />
          </Box>
        </GridItem>
        <GridItem>
          <Heading textAlign={'center'} fontSize={'lg'} mb={2}>Semanais</Heading>
          <Box ml='107.5' h="400" w="400">
            <Pie data={weeklyData} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StatisticsCard;