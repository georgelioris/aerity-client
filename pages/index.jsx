import React, { useEffect, useReducer, useRef } from 'react';
import { Button, Main, Grommet, Box } from 'grommet';
import { Refresh } from 'grommet-icons';
import Cookies from 'js-cookie';
import cuid from 'cuid';
import Nav from '../components/nav';
import Spinner from '../components/spinner';
import Summary from '../components/summary';
import MyTheme from '../lib/MyTheme.json';
import { setLoading, setError, setLocation, setwData } from '../lib/actions';
import { initState, formatUrl, formatQuery } from '../lib/helpers';
import reducer from '../lib/reducer';
import fetchData from '../lib/fetchData';
import mockFetch from '../lib/mockFetch';
import sampleRes from '../sampleRes';

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!Cookies.get('appId')) {
      Cookies.set('appId', cuid());
    }
    navigator.geolocation.getCurrentPosition(pos =>
      dispatch(
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      )
    );
  }, []);
  async function operation() {
    const appId = Cookies.get('appId');
    dispatch(setError({ status: false }));
    dispatch(setLoading(true));
    if (state.geoLoc) {
      const url = formatUrl(formatQuery(state.geoLoc));
      try {
        const result = await fetchData(url, { params: { APPID: appId } });
        dispatch(setwData(result));
      } catch (error) {
        dispatch(setError({ status: true, message: 'Connection Error' }));
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else if (!state.geoLoc) {
      dispatch(setError({ status: true, message: 'Location Error' }));
      dispatch(setLoading(false));
    }
  }

  async function mockOperation() {
    dispatch(setError({ status: false }));
    dispatch(setLoading(true));
    if (state.geoLoc) {
      try {
        const result = await mockFetch(sampleRes);
        dispatch(setwData(result));
      } catch (error) {
        dispatch(setError({ status: true, message: 'Connection Error' }));
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else if (!state.geoLoc) {
      dispatch(setError({ status: true, message: 'Location Error' }));
      dispatch(setLoading(false));
    }
  }

  // State logging
  useEffect(() => {
    console.log(state);
  }, [state]);

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
          {!state.isLoading ? (
            <Button
              ref={buttonRef}
              id="fetch"
              color="accent-1"
              icon={<Refresh />}
              hoverIndicator
              alignSelf="center"
              primary
              onClick={() => {
                operation();
                buttonRef.current.blur();
              }}
            />
          ) : (
            <Spinner />
          )}
        </Box>
      </Main>
      <style global jsx>
        {`
          body {
            margin: 0 auto;
            background: #2e294e;
            overflow-x: hidden;
          }
        `}
      </style>
    </Grommet>
  );
}
export default App;
