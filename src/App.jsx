import React, { useEffect, useReducer } from 'react';
import { Main, Grommet, Box } from 'grommet';
import Cookies from 'js-cookie';
import cuid from 'cuid';
import Nav from './components/nav';
import Spinner from './components/spinner';
import Summary from './components/summary';
import MyTheme from './lib/MyTheme.json';
import { setLoading, setError, setLocation, setwData } from './lib/actions';
import { initState, formatUrl, formatQuery, isExpired } from './lib/helpers';
import reducer from './lib/reducer';
import fetchData from './lib/fetchData';
// import mockFetch from './lib/mockFetch';
// import sampleRes from './sampleRes';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    async function operation() {
      const appId = Cookies.get('appId');
      dispatch(setError({ status: false }));
      dispatch(setLoading(true));

      const localData = JSON.parse(localStorage.getItem('cached'));
      if (state.geoLoc && localData && isExpired(localData.ts)) {
        const url = formatUrl(formatQuery(state.geoLoc));
        try {
          const result = await fetchData(url, { params: { APPID: appId } });
          // const result = await mockFetch(sampleRes);
          dispatch(setwData(result));
          const cachedState = {
            geoLoc: state.geoLoc,
            data: JSON.stringify(result),
            ts: Date.now()
          };
          // console.log('fetching new data');
          localStorage.setItem('cached', JSON.stringify(cachedState));
        } catch (error) {
          dispatch(setError({ status: true, message: 'Connection Error' }));
          // console.error(error);
        } finally {
          dispatch(setLoading(false));
        }
      } else if (!state.geoLoc) {
        dispatch(setError({ status: true, message: 'Location Error' }));
        dispatch(setLoading(false));
      } else if (localData && !isExpired(localData.ts)) {
        dispatch(setwData(JSON.parse(localData.data)));
        dispatch(setError({ status: false }));
        dispatch(setLoading(false));
        // console.log('using cache');
      }
    }
    if (!Cookies.get('appId')) {
      Cookies.set('appId', cuid());
    }
    operation();
  }, [state.geoLoc]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos =>
      dispatch(
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      )
    );
  }, []);

  // State logging
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return (
    <Grommet theme={MyTheme}>
      <Nav />
      <Main margin={{ top: 'large' }} animation="fadeIn">
        <Box
          align="center"
          style={{
            color: 'white',
            width: '60vw'
          }}
          alignSelf="center"
        >
          {state.isError.status && <p>{state.isError.message}</p>}
          {state.wData && <Summary wData={state.wData} />}
          {state.isLoading && <Spinner />}
        </Box>
      </Main>
      <style>
        {`
          body {
            margin: 0 auto;
            background: #2e294e;
            overflow-x: hidden;
            user-select: none;
          }
        `}
      </style>
    </Grommet>
  );
}
export default App;
