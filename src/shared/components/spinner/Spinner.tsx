import { Loader } from '@mantine/core'

interface SpinnerProps {
  size?: number
  speed?: number
  color?: string
}

export default function Spinner({ size, color, speed = 300 }: SpinnerProps) {
  return <Loader speed={speed} size={size} color={color} />
}
