import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useplanets from './useplanets';

function Provider({ children }) {
  const [planets, setplanets] = useState([]);
  const [filterPlanets, setfilterPlanets] = useState({ filterByName: { name: '' } });
  const [results, setresults] = useState();
  const [loading, setloading] = useState(true);
  const [keyresult, setkeyresult] = useState();
  const [filters, setfilters] = useState({
    filterByNumericValues:
      { column: 'population', comparison: 'maior que', value: 0 },
  });

  const contextValue = {
    planets,
    filterPlanets,
    setfilterPlanets,
    setplanets,
    filters,
    setfilters,
    results,
    setresults,
    keyresult,
    setkeyresult,
    loading,
    setloading,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const fet = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((data) => data.json());
      setplanets(fet.results);
    };
    fetchApi();
  }, []);

  return (
    <useplanets.Provider value={ contextValue }>
      {children}
    </useplanets.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Provider;
