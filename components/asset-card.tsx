import { Card, Typography } from '@mui/joy'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import useSound from 'use-sound'

const DynamicWaveform = dynamic(() => import('./waveform'), { ssr: false })

type AssetCardProps = {
  title: string
  path: string
  transcript?: string
}

const AssetCard = (props: AssetCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const [play, { stop }] = useSound(
    props.path,
    { volume: 0.75,
      onend: () => setIsPlaying(false)
    }
  )

  const handlePlay = () => {
    if (isPlaying) {
      stop()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }

  return (
    <Card variant='outlined' sx={{ minWidth: 320 }}>
      <Typography level='h2' sx={{ fontSize: 'md', mb: 1 }}>
        {props.title}
      </Typography>

      <div style={{height: '128px'}}>
        <DynamicWaveform audio={props.path} />
      </div>
    </Card>
  )
}

export default AssetCard