import { Grid } from '@mui/joy'
import AssetCard from './asset-card'

const AssetGrid = () => {
  const idList= new Array(46).fill(0)

  const genPath = (id: number) => {
    return '/samples/yukiyanagi_' + id.toString().padStart(3, '0') + '.mp3'
  }

  const assets = idList.map( (_, index) => {
    return (
      <Grid key={index.toString()} >
        <AssetCard key={index.toString()} title={(index + 1).toString().padStart(3, '0')} path={genPath(index + 1)}/>
      </Grid>
    )
  })

  return (
    <Grid container spacing={2} sx={{marginTop: '64px'}} width='fit-content' alignItems='center' justifyContent='center'>
      {assets}
    </Grid>
  )
}

export default AssetGrid