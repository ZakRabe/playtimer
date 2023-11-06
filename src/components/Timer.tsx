import { useEffect, useState, useRef } from "react";
import {
  Center,
  Text,
  VStack,
  HStack,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { IncomingTimerProps } from "../types/app-types";
import "../global.css";

const TimerComp = ({
  name,
  initialTime,
  game,
  terminateTimer,
}: IncomingTimerProps) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const [isPaused, setIsPaused] = useState(false);
  const [timeAtPause, setTimeAtPause] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const gamesBackgroundsAndBorderObj = {
    lorcana: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/Lorcana.png')",
      borderColor: "#ff9900",
    },
    mtg: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/mtg.png')",
      borderColor: "#FF6666",
    },
    bss: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/bss.png')",
      borderColor: "#FF6666",
    },
    fab: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/fab.png')",
      borderColor: "#FF6666",
    },
    pokemon: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/pokemon.png')",
      borderColor: "#FF6666",
    },
    digimon: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/digimon.png')",
      borderColor: "#FF6666",
    },
    shadowverse: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/Shadowverse.png')",
      borderColor: "#FF6666",
    },
    dragonball: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/dragonball.png')",
      borderColor: "#FF6666",
    },
    onePiece: {
      backgroundImage:
        "url('https://playtimer-images.s3.us-east-2.amazonaws.com/onepiece.png')",
      borderColor: "#FF6666",
    },
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      // hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    // let { total, hours, minutes, seconds } = getTimeRemaining(e)

    // if (total <= 0) {
    //   clearInterval(Ref.current)
    //   setTimer('X')
    //   setIsExpired(true)
    // } else if (total < 60000) {
    //   setTimer(seconds > 9 ? seconds : '0' + seconds)
    // } else {
    //   setTimer(
    //     (hours > 9 ? hours : '0' + hours) +
    //       ':' +
    //       (minutes > 9 ? minutes : '0' + minutes)
    //   )
    // }

    if (total <= 0) {
      clearInterval(Ref.current);
      setTimer("00");
      setIsExpired(true);
    } else if (total < 60000) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
    } else {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (deadline) => {
    if (!timeAtPause) {
      setTimer(initialTime);
    } else {
      setTimer(timeAtPause);
    }

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    Ref.current = id;
  };

  // const getDeadTime = (timeString) => {
  //   let deadline = new Date()
  //   if (typeof timeString === 'number') {
  //     deadline.setSeconds(deadline.getSeconds() + timeString)
  //   } else {
  //     const arrayFromTimeString = timeString.split(':')
  //     const hours = parseInt(arrayFromTimeString[0])
  //     const minutes = parseInt(arrayFromTimeString[1])
  //     deadline.setMinutes(deadline.getMinutes() + minutes)
  //     deadline.setHours(deadline.getHours() + hours)
  //   }

  //   return deadline
  // }

  const getDeadTime = (time: number | string) => {
    let deadline = new Date();
    if (typeof time === "number") {
      deadline.setSeconds(deadline.getSeconds() + time);
    } else {
      const arrayFromTime = time.split(":");
      const minutes = parseInt(arrayFromTime[0]);
      const seconds = parseInt(arrayFromTime[1]);
      deadline.setMinutes(deadline.getMinutes() + minutes);
      deadline.setSeconds(deadline.getSeconds() + seconds);
      // deadline.setHours(deadline.getHours() + hours)
    }

    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime(initialTime));
    setIsExpired(false);
  };

  const onClickPause = () => {
    setTimeAtPause(timer);
    clearInterval(Ref.current);
    setIsPaused(!isPaused);
  };

  const onClickResume = () => {
    clearTimer(getDeadTime(timeAtPause));
    setIsPaused(!isPaused);
  };

  const renderControls = () => {
    return isExpired ? (
      <Button colorScheme="orange" w="100%" onClick={onClickReset}>
        Reset
      </Button>
    ) : !isPaused ? (
      <>
        <HStack spacing={8} border="1px red solid" w="100%">
          <Button colorScheme="orange" w="100%" onClick={onClickReset}>
            Reset
          </Button>
          <Button w="100%" colorScheme="yellow" onClick={onClickPause}>
            Pause
          </Button>
        </HStack>
      </>
    ) : (
      <>
        <HStack spacing={8} w="100%" border="solid red 1px">
          <Button colorScheme="orange" w="100%" onClick={onClickReset}>
            Reset
          </Button>
          <Button colorScheme="green" w="100%" onClick={onClickResume}>
            Start
          </Button>
        </HStack>
      </>
    );
  };

  // const renderTimer = (game: string) => {
  //   return isExpired === true ? null : (
  //     <Center bg="tomato" h="100%" rounded="md">
  //       <VStack width="55%">
  //         <Text fontSize="2xl">{name}</Text>
  //         <h2 className="timer-time">{timer}</h2>
  //         {renderControls()}
  //         <Button onClick={terminateTimer} />
  //       </VStack>
  //     </Center>
  //   );
  // };

  const renderTimer = (game: string) => {
    switch (game) {
      case "lorcana":
        return (
          <Box
            h="100%"
            backgroundImage="url('https://playtimer-images.s3.us-east-2.amazonaws.com/Lorcana.png')"
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="16"
            border={isExpired ? "4px solid #787878" : "4px solid #ff9900"}
          >
            <Box
              display="flex"
              flexDirection="column"
              backdropFilter={isExpired ? "grayscale(100)" : "none"}
              w="100%"
              h="100%"
              name="boxForGrayScale"
            >
              <Box
                name="boxForCancelTimer"
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="right"
                p={2}
              >
                <Button
                  onClick={terminateTimer}
                  size="md"
                  h="3rem"
                  w="3rem"
                  borderRadius="200px"
                  colorScheme="red"
                >
                  <CloseIcon />
                </Button>
              </Box>
              <Center h="100%" border="1px red solid">
                <VStack width="80%" my="auto">
                  <p className="timer-name">{name}</p>
                  <h2 className="timer-time">{timer}</h2>
                  {renderControls()}
                </VStack>
              </Center>
            </Box>
          </Box>
        );
    }
  };

  useEffect(() => {
    clearTimer(getDeadTime(initialTime));
  }, []);

  return <>{renderTimer(game)}</>;
};

export default TimerComp;
