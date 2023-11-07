import './global.css'
import NewTimerModal from './components/NewTimerModal'
import TimerComp from './components/Timer'
import { Grid, Box, Center, Text, Link, Image, VStack } from '@chakra-ui/react'
import { Timer } from './types/app-types'
import { useState } from 'react'

const App = () => {
  const [timers, setTimers] = useState<Timer[]>([])

  const removeTimerFromState = (timerIndex: number) => {
    const newTimers = timers.filter((_timer, index) => index !== timerIndex)
    setTimers(newTimers)
  }

  return (
    <Box h="100vh" w="auto" bgColor="#0A0442">
      <NewTimerModal
        onModalComplete={(newTimerObj: Timer) => {
          setTimers([...timers, newTimerObj])
        }}
      />

      {timers.length > 0 ? (
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={10}
          height="96%"
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
      ) : (
        <Center h="96%">
          <VStack>
            <Image src="public/playtimer_logo.png"></Image>
            <Text fontSize="5xl" color="whiteAlpha.700">
              Press the "+" icon below to get started.
            </Text>
          </VStack>
        </Center>
      )}

      <Center borderTop="1px solid rgba(196,241,249, 0.4)" mx={20}>
        <Text as="b" color="rgba(196,241,249, 0.4)" fontSize="xs" mt={2}>
          playtimer created by{' '}
          <Link href="https://anthonyjmedina.com/" textDecoration="underline">
            Anthony Medina
          </Link>
        </Text>
      </Center>
    </Box>
  )
}

export default App
