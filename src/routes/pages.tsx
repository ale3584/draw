import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet, * as helmet from 'react-helmet'
import { uniqueId, memoize } from 'lodash'

import CLGS from 'pages/cl/gs'
import Last16 from 'pages/cl/last16'
import ELGS from 'pages/el/gs'

import { fetchPots, parseGS } from 'utils/fetch-parse-pots'
import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'
import currentSeason from 'utils/currentSeason'
import delay from 'utils/delay'
import { GSTeam } from 'utils/team'

import Overlay from 'components/Overlay'

interface Props {
  tournament: string,
  stage: string,
  season: number,
  dummyKey: string,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  key: string,
  pots: GSTeam[][] | null,
  waiting: boolean,
  error: string | null,
  // tournament: string,
  // stage: string,
  season: number, // for error handling (so that we know the previous season)
}

class Pages extends React.PureComponent<Props, State> {
  state = {
    key: uniqueId(),
    pots: null,
    waiting: false,
    error: null,
    season: currentSeason,
  }

  unlisten: (() => void) | undefined

  componentDidMount() {
    const {
      tournament,
      stage,
      season,
    } = this.getMatchParams()
    this.fetchData(tournament, stage, season ? +season : currentSeason)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    const {
      tournament,
      stage,
      season,
      dummyKey,
    } = nextProps
    if (props.season !== season || props.stage !== stage || props.tournament !== tournament) {
      this.fetchData(tournament, stage, season)
    } else if (props.dummyKey !== dummyKey) {
      this.setState({
        key: dummyKey,
      })
    }
  }

  getMatchParams() {
    const { params } = this.props.match
    return {
      ...params,
      season: params.season ? +params.season : currentSeason,
    }
  }

  async fetchData(tournament: string, stage: string, season: number) {
    this.setState({
      waiting: true,
    })
    try {
      const pots = await this.getPots(tournament, stage, season)
      await this.prefetchImages(pots)
      this.setState({
        pots,
        waiting: false,
        error: null,
        key: uniqueId(),
        tournament,
        stage,
        season,
      })
    } catch (err) {
      this.onFetchError(err)
    }
  }

  async onFetchError(err) {
    this.setState({
      waiting: false,
      error: 'Could not fetch data',
    })
    await delay(1000)
    console.error(err)
    const { tournament, stage } = this.getMatchParams()
    const { pots, season } = this.state
    const newSeason = pots && season !== currentSeason ? season : undefined
    this.props.onSeasonChange(tournament, stage, newSeason)
    this.setState({
      error: null,
    })
  }

  getPots = memoize(async (tournament: string, stage: string, season: number) => {
    const data = await fetchPots(tournament, season)
    return parseGS(data)
  }, (tournament, stage, season) => `${tournament}-${stage}-${season}`)

  prefetchImages(pots: GSTeam[][]) {
    const promises: Promise<void>[] = []
    for (const pot of pots) {
      const urls = pot.map(team => getCountryFlagUrl(team.country))
      promises.push(...urls.map(prefetchImage))
    }
    return Promise.all(promises)
  }

  getOverlay = (props) => (
    <Overlay
      {...props}
      noAnimation={!this.state.pots}
    />
  )

  getPopup() {
    const { error, waiting } = this.state
    const WrappedOverlay = this.getOverlay
    if (!navigator.onLine) {
      return <WrappedOverlay>you're offline</WrappedOverlay>
    }
    if (error) {
      return <WrappedOverlay>{error}</WrappedOverlay>
    }
    if (waiting) {
      return <WrappedOverlay>wait...</WrappedOverlay>
    }
    return null
  }

  render() {
    const { pots, key } = this.state
    return (
      <div>
        {this.getPopup()}
        {pots &&
          <Switch>
            <Route path="/cl/gs">
              <div>
                <Helmet>
                  <title>CL draw simulator</title>
                  <meta name="theme-color" content="#00336a" />
                </Helmet>
                <CLGS
                  pots={pots}
                  key={key}
                />
              </div>
            </Route>
            <Route path="/cl/last16">
              <div>
                <Helmet>
                  <title>CL draw simulator</title>
                  <meta name="theme-color" content="#00336a" />
                </Helmet>
                <Last16
                  pots={pots}
                  key={key}
                />
              </div>
            </Route>
            <Route path="/el/gs">
              <div>
                <Helmet>
                  <title>EL draw simulator</title>
                  <meta name="theme-color" content="#f68e00" />
                </Helmet>
                <ELGS
                  pots={pots}
                  key={key}
                />
              </div>
            </Route>
          </Switch>
        }
      </div>
    )
  }
}

export default Pages