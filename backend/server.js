import express, { json } from 'express'
import cors from 'cors'

import { estimateTime, estimateSpecificTime, getRepos } from './estimateTime.js'
import { getSummary } from '../ai/agentUtils.ts'

const app = express()
app.use(cors())
app.use(json())

const PORT = 8080

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`))

app.get('/repos', async (req, res) => {
    try {
        const {
            username,
        } = req.query

        const publicRepos = await getRepos(username)

        return res.status(200).json({ publicRepos })
    } catch(error) {
        console.error(error)
    }
})

app.get('/estimate-time', async (req, res) => {
  try {
    const { username } = req.query

    if (!username) {
      return res.status(400).json({ error: 'Username is required' })
    }

    const time = await estimateTime(username)

    return res.status(200).json({ message: `Estimation done for ${username}`, time: time })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/estimate-specific-time', async (req, res) => {
  try {
    const { username, repoName } = req.query

    if (!username) {
      return res.status(400).json({ error: 'Username is required' })
    }

    if (!repoName) {
      return res.status(400).json({ error: 'Repo name is required' })
    }

    const { data, time } = await estimateSpecificTime(username, repoName)

    return res.status(200).json({ data: data, time: time })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/agent-summary', async (req, res) => {
  try {
    const { data, estimatedTime } = req.body

    if (!data) {
      return res.status(400).json({ error: 'Data is required' })
    }

    if (!estimatedTime) {
      return res.status(400).json({ error: 'Estimated time is required' })
    }

    const summary = await getSummary(data, estimatedTime)

    return res.status(200).json({ summary })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message })
  }
})
