const express = require('express')
const app = express()
const rowdy = require('rowdy-logger') //for rowdy-logger
const routesReport = rowdy.begin(app)//for rowdy-logger
app.use(express.json())//allow for use of req.body
app.use(require('cors')())
 
//listen on port 3001
const port = process.env.PORT || 3001
app.listen(port, () => {
 console.log('the server is listening!')
   routesReport.print()
})
/* --------------------------------- routes --------------------------------- */
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

const workoutRoutes = require('./routes/workoutRoutes')
app.use('/workouts', workoutRoutes)

const nutritionRoutes = require('./routes/nutritionRoutes')
app.use('/nutrition', nutritionRoutes)

const achievementRoutes = require('./routes/achievementRoutes')
app.use('/achievements', achievementRoutes)