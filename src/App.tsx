import "./global.css";
import NewTimerModal from "./components/NewTimerModal";
import TimerComp from "./components/Timer";
import { Grid, Box } from "@chakra-ui/react";
import { Timer } from "./types/app-types";
import { useState } from "react";

const App = () => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const removeTimerFromState = (timerIndex: number) => {
    const newTimers = timers.filter((timer, index) => index !== timerIndex);
    setTimers(newTimers);
  };

  return (
    <Box
      h="100vh"
      w="auto"
      bgGradient="linear(to-br, #0f0c29, #302b63, #24243e, #cc5333)"
      backdropFilter="blur(10px)"
    >
      <NewTimerModal
        onModalComplete={(newTimerObj: Timer) => {
          setTimers([...timers, newTimerObj]);
        }}
      />
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={10}
        height="100%"
        mx={10}
        py={8}
        px={4}
      >
        {timers.map((timer, i) => (
          <TimerComp
            key={i}
            name={timer.title}
            initialTime={timer.initialTime}
            game={timer.game}
            terminateTimer={() => removeTimerFromState(i)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default App;
