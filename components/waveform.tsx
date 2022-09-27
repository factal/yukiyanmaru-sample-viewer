import { useEffect, useRef, useState } from 'react'
import {} from 'wavesurfer.js'
import WaveSurfer from 'wavesurfer.js'
import { IconButton } from '@mui/joy'
import { Pause, PlayArrow } from '@mui/icons-material'
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor'

const Waveform = ({ audio }:  { audio: string }) => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const waveSurferRef = useRef<WaveSurfer>()

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect( () => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 4,
      //barHeight: 10,
    })
    waveSurfer.load(audio)
    waveSurfer.on('ready', ()=> {
      waveSurferRef.current = waveSurfer
    })

    waveSurfer.on('finish', () => {
      setIsPlaying(false)
      waveSurferRef.current?.cursor?.hideCursor()
    })

    return () => {
      waveSurfer.destroy()
    }
  }, [audio])

  return (
    <div style={{display: 'flex', width: '100%'}}>
      <IconButton
        variant='plain'
        onClick={() => {
          waveSurferRef.current?.playPause()
          // @ts-ignore
          setIsPlaying(waveSurferRef.current.isPlaying())
        }}
        sx={{ width: 40, height: 40, margin: 'auto' }}
      >
        { isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      
      <div ref={containerRef} style={{width: '100%'}} />
    </div>
  )
}

export default Waveform