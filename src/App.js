import React, { useContext, useEffect, useState } from 'react';
import useDebonce from './context/use-debonce';
import useplanets from './context/useplanets';
import './App.css';

const magic = 500;
const number = 10;

function App() {
  const {
    planets,
    filterPlanets,
    setfilterPlanets,
    filters,
    setfilters,
    keyresult,
    setkeyresult } = useContext(useplanets);

  const [results, setresults] = useState();
  const { filterByNumericValues } = filters;
  const [filteractive, setfilteractive] = useState([]);
  const deb = useDebonce(filterPlanets.filterByName.name, magic);
  const filtro = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];
  useEffect(() => {
    const d = planets.filter((el) => el.name.toLowerCase()
      .includes(filterPlanets.filterByName.name));
    setresults(d);
    if (planets[0]) {
      setkeyresult(filtro.filter((el) => el));
    }
  }, [deb, filterPlanets.filterByName.name, planets]);

  const removeTot = () => {
    setresults(planets);
    setfilteractive([]);
  };

  const removeUni = (e) => {
    setresults(planets);
    if (filteractive.length === 1) {
      setfilteractive([]);
    }
    if (filteractive.length > 1) {
      setfilteractive(filteractive.filter((el) => el.filterByNumericValues !== e));
    }
    setkeyresult([...keyresult,
      filtro.filter((elem) => elem === 'population')]);
  };

  const removeFilter = () => {
    setkeyresult(keyresult.filter((elem) => elem !== 'population'));
  };

  const handleClick = () => {
    const comp = filterByNumericValues.comparison;
    const coluna = filterByNumericValues.column;
    const valor = filterByNumericValues.value;
    if (comp === 'igual a') {
      setfilteractive([...filteractive, { filterByNumericValues }]);
      setresults(results.filter((planet) => Number(planet[coluna]) === Number(valor)));
    }
    if (comp === 'maior que') {
      setfilteractive([...filteractive, { filterByNumericValues }]);
      setresults(results.filter((planet) => Number(planet[coluna]) > valor));
    }
    if (comp === 'menor que') {
      setfilteractive([...filteractive, { filterByNumericValues }]);
      setresults(results.filter((planet) => Number(planet[coluna]) < valor));
    } else if (coluna === 'population') {
      removeFilter();
    }
  };

  const { column, comparison, value } = filterByNumericValues;
  return (
    <div className="centraliza">
      <img className="foto" src="https://steamuserimages-a.akamaihd.net/ugc/271724616138974688/E88F0CDC58E1FF4E567870D2B26E8615DB3A4259/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" alt="cabeçalho" />
      <header className="headerFilter">
        <input
          type="text"
          placeholder="Filtro"
          data-testid="name-filter"
          onChange={ ({ target }) => setfilterPlanets({
            filterByName:
            { name: target.value },
          }) }
        />

        <select
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => {
            setfilters({
              filterByNumericValues: {
                ...filterByNumericValues,
                column: target.value,
              },
            });
          } }
        >
          {keyresult?.map((opt) => (
            <option value={ opt } key={ opt }>{opt}</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => {
            setfilters({
              filterByNumericValues: {
                ...filterByNumericValues,
                comparison: target.value,
              },
            });
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => {
            setfilters({
              filterByNumericValues: {
                ...filterByNumericValues,
                value: target.value,
              },
            });
          } }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClick }
        >
          enviar
        </button>
      </header>
      <div className="header">
        <div>
          {filteractive
            ? filteractive.map(({ filterByNumericValues: e }) => (
              <div
                data-testid="filter"
                key={ Math.floor(Math.random() * number) }
                className="filtro"
              >
                {`${e.column} ${e.comparison} ${e.value}`}
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => { removeUni(e); } }
                >
                  X

                </button>
              </div>

            )) : <div />}
        </div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeTot }
        >
          Remover todas filtragens

        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>

          </tr>
        </thead>
        <tbody>
          {
            results ? results.map((element) => (
              <tr key={ element.name }>
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.population}</td>
                <td>{element.films}</td>
                <td>{element.created}</td>
                <td>{element.edited}</td>
                <td>{element.url}</td>
              </tr>
            ))
              : <tr><td>Nada encontrado</td></tr>

          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
