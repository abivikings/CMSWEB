/* eslint-disable lines-around-comment */
// ** MUI Import
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Component Imports
import AnalyticsProject from 'src/views/dashboards/analytics/AnalyticsProject'
import AnalyticsOrderVisits from 'src/views/dashboards/analytics/AnalyticsOrderVisits'
import AnalyticsTotalEarning from 'src/views/dashboards/analytics/AnalyticsTotalEarning'
import AnalyticsSourceVisits from 'src/views/dashboards/analytics/AnalyticsSourceVisits'
import AnalyticsEarningReports from 'src/views/dashboards/analytics/AnalyticsEarningReports'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import AnalyticsSalesByCountries from 'src/views/dashboards/analytics/AnalyticsSalesByCountries'
import AnalyticsMonthlyCampaignState from 'src/views/dashboards/analytics/AnalyticsMonthlyCampaignState'
import AnalyticsWebsiteAnalyticsSlider from 'src/views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'
import { Card } from '@mui/material'
import { maxWidth } from '@mui/system'

import LinearProgress from '@mui/material/LinearProgress'
import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Fab from '@mui/material/Fab'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getcamplist } from '../../../api'

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-container': {
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const data = [
  {
    stats: '230k',
    title: 'Sales',
    color: 'primary',
    icon: 'tabler:chart-pie-2'
  },
  {
    color: 'info',
    stats: '8.549k',
    title: 'Customers',
    icon: 'tabler:users'
  },
  {
    color: 'error',
    stats: '1.423k',
    title: 'Products',
    icon: 'tabler:shopping-cart'
  },
  {
    stats: '$9745',
    color: 'success',
    title: 'Revenue',
    icon: 'tabler:currency-dollar'
  }
]

const renderStats = () => {
  return data.map((sale, index) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const AdminDashboard = () => {
  const [progress, setProgress] = useState(0)
  const [campList, setcampList] = useState([])
  const [campSingle, setcampSingle] = useState({})

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10

        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    //getCampList()
    //setcampList(getcamplist)
    console.log('start effect')
    getcamplist()
      .then(response => {
        console.log(response)
        setcampList(response.data)
        setcampSingle(response.data[0])
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
    // fetch('http://localhost:8000/get_all_camp', {
    //   method: 'GET'
    //   // headers: {
    //   //   "X-RapidAPI-Key": "your-api-key",
    //   //   "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
    //   // },
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setcampList(data)
    //   })
    //   .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    //console.log('single camp', campSingle)
  })

  // async function GetCampList(){
  //   // const API_url = "https://localhost:7061/api/GetPointSummary";
  //   // const myHeaders = new Headers()
  //   // myHeaders.append('Content-Type', 'application/json')

  //   // // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

  //   // const params = new URLSearchParams([['UserAccountId', 107]]);
  //   // const res = await axios.get(API_url, { params })
  //   // const data = await res.data

  //   console.log("3rd data fetching start")
  //   const response = await fetch("http://localhost:8000/get_all_camp");
  //   const res = await response.json();
  //   if (res.status == 200) {
  //    // setSummaryPoint(data);
  //     console.log("3rd ", res);

  //     // setWeekData(Object.values(data).map((row, index) => ({
  //     //   id: row.Id, // You can use a different logic for generating unique IDs if needed
  //     //   ...row
  //     // }))
  //     //)
  //     // setProgramName(data.sessionname)
  //     // setWeekName(data.WeekName)
  //     // console.log("Name", ProgramName);
  //     //setSessionid(data.SessionId)
  //     //console.log("active session Id", Sessionid,data.SessionId)
  //     return { ok: true, res }
  //   } else {
  //     return { ok: false, err: res, res }
  //   }
  // }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose2 = () => {
    setAnchorEl(null)
  }

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          {/* <Grid item xs={12} lg={6}>
            <AnalyticsWebsiteAnalyticsSlider />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <AnalyticsOrderVisits />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <CardStatsWithAreaChart
              stats='97.5k'
              chartColor='success'
              avatarColor='success'
              title='Revenue Generated'
              avatarIcon='tabler:credit-card'
              chartSeries={[{ data: [6, 35, 25, 61, 32, 84, 70] }]}
            />
          </Grid> */}
          <Grid item xs={12} md={4}>
            {/* <EcommerceCongratulationsJohn /> */}
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant='h5' sx={{ mb: 0.5 }}>
                  Congratulations {campSingle.camp_name}! 🎉
                </Typography>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>Best camp of the month</Typography>
                <Typography variant='h4' sx={{ mb: 0.75, color: 'primary.main' }}>
                  $48.9k
                </Typography>
                <Button variant='contained'>View Sales</Button>
                <Illustration width={116} alt='congratulations john' src='/images/cards/congratulations-john.png' />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <EcommerceStatistics /> */}
            <Card>
              <CardHeader
                title='Statistics'
                sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
                action={
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    Updated 1 month ago
                  </Typography>
                }
              />
              <CardContent
                sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
              >
                <Grid container spacing={6}>
                  {/* {renderStats()} */}
                  <Grid item xs={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light' color='primary' sx={{ mr: 4, width: 42, height: 42 }}>
                        <Icon icon='tabler:chart-pie-2' fontSize='1.5rem' />
                      </CustomAvatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h5'>{campSingle.camp_domain}</Typography>
                        <Typography variant='body2'>domain</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light' color='primary' sx={{ mr: 4, width: 42, height: 42 }}>
                        <Icon icon='tabler:chart-pie-2' fontSize='1.5rem' />
                      </CustomAvatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h5'>{campSingle.students}</Typography>
                        <Typography variant='body2'>Student</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light' color='primary' sx={{ mr: 4, width: 42, height: 42 }}>
                        <Icon icon='tabler:chart-pie-2' fontSize='1.5rem' />
                      </CustomAvatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h5'>{campSingle.teachers}</Typography>
                        <Typography variant='body2'>Teacher</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light' color='primary' sx={{ mr: 4, width: 42, height: 42 }}>
                        <Icon icon='tabler:chart-pie-2' fontSize='1.5rem' />
                      </CustomAvatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h5'>{campSingle.parents}</Typography>
                        <Typography variant='body2'>Parents</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <StyledList disablePadding>
              {campList.map(camp => {
                return (
                  <div key={camp.id}>
                    {/* <h2>name: {employee.camp_name}</h2>
                    <h2>country: {employee.country}</h2>

                    <hr /> */}
                    <Card style={{ marginTop: '10px' }}>
                      <ListItem>
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={1}>
                            <center>
                              <ListItemAvatar>
                                <img src={`/images/cards/camp.jpg`} style={{ maxWidth: '70px', borderRadius: '5px' }} />
                                {/* <Icon icon='tabler:affiliate' fontSize='2.5rem' /> */}
                              </ListItemAvatar>
                            </center>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={3}
                            style={{
                              paddingLeft: '30px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}
                          >
                            <div>
                              <ListItemText primary={camp.camp_name} />
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Box
                                  sx={{
                                    mr: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& svg': { mr: 1, color: 'success.main' }
                                  }}
                                >
                                  <Icon icon='mdi:circle' fontSize='0.625rem' />
                                  <Typography variant='caption'>Live</Typography>
                                </Box>
                                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                  {camp.created_on}
                                </Typography>
                              </Box>
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={2}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}
                          >
                            <div>
                              <ListItemText primary={camp.camp_admin_name} />
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Box
                                  sx={{
                                    mr: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& svg': { mr: 1 }
                                  }}
                                >
                                  <Icon icon='clarity:email-line' fontSize='.8rem' />
                                  <Typography variant='caption'>{camp.camp_admin_email}</Typography>
                                </Box>
                              </Box>
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={2}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}
                          >
                            <div>
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <ListItemText primary='Total Student' />
                              </Box>
                              <Box
                                sx={{
                                  mr: 3,
                                  display: 'flex',
                                  alignItems: 'center',
                                  '& svg': { mr: 1, color: 'success.main' }
                                }}
                              >
                                <Icon icon='mdi:circle' fontSize='0.625rem' />
                                <Typography variant='caption' sx={{ fontSize: '.8rem' }}>
                                  {camp.students}
                                </Typography>
                              </Box>
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={2}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}
                          >
                            <div>
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <ListItemText primary='# Teacher' />
                              </Box>
                              <Box
                                sx={{
                                  mr: 3,
                                  display: 'flex',
                                  alignItems: 'center',
                                  '& svg': { mr: 1, color: 'success.main' }
                                }}
                              >
                                <Icon icon='mdi:circle' fontSize='0.625rem' />
                                <Typography variant='caption' sx={{ fontSize: '.8rem' }}>
                                  {camp.teachers}
                                </Typography>
                              </Box>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <ListItemSecondaryAction>
                              <div>
                                <Fab color='primary' aria-label='edit' size='small' sx={{ marginRight: '5px' }}>
                                  <Icon icon='carbon:folder-details-reference' />
                                </Fab>
                                <IconButton
                                  aria-label='more'
                                  aria-controls='long-menu'
                                  aria-haspopup='true'
                                  onClick={handleClick}
                                >
                                  <Icon icon='tabler:dots-vertical' />
                                </IconButton>
                                <Menu
                                  keepMounted
                                  id='long-menu'
                                  anchorEl={anchorEl}
                                  onClose={handleClose2}
                                  open={Boolean(anchorEl)}
                                >
                                  <MenuItem>
                                    <FormControlLabel
                                      control={<Switch defaultChecked color='success' />}
                                      label='Live'
                                    />
                                  </MenuItem>
                                  <MenuItem>
                                    <FormControlLabel control={<Switch color='success' />} label='Pause' />
                                  </MenuItem>
                                  <MenuItem>
                                    <FormControlLabel control={<Switch color='success' />} label='Finish' />
                                  </MenuItem>
                                  <MenuItem>
                                    <FormControlLabel control={<Switch color='success' />} label='Re   ject' />
                                  </MenuItem>
                                </Menu>
                              </div>
                            </ListItemSecondaryAction>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Card>
                  </div>
                )
              })}
            </StyledList>
          </Grid>
          <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
            <DialogTitle id='responsive-dialog-title'>Use Google's location service?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending anonymous location data to Google, even when
                no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}
AdminDashboard.acl = {
  action: 'read',
  subject: 'page-dashboard'
}

export default AdminDashboard
