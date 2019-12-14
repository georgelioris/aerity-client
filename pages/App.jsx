import React, { useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import cuid from 'cuid';
import { setLoading, setError, setLocation, setwData } from '../lib/actions';
import { initState, formatUrl, formatQuery } from '../lib/helpers';
import { reducer } from '../lib/reducer';
import fetchData from '../lib/fetchData';
import sampleRes from '../sampleRes';

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (!Cookies.get('appId')) {
      Cookies.set('appId', cuid());
    }
    navigator.geolocation.getCurrentPosition(pos =>
      dispatch(
        setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude })
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

  function mochData() {
    dispatch(setwData(sampleRes));
  }

  // State logging
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="App">
      <h1>Aerity</h1>
      <button type="submit" onClick={operation}>
        Fetch
      </button>

      {state.isError.status && <p>{state.isError.message}</p>}
      {state.isLoading && <div>Loading</div>}
      {state.wData && <h4>{Math.round(state.wData.currently.temperature)}</h4>}
    </div>
  );
}
export default App;
