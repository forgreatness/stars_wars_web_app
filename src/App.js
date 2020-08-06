import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import './App.css';
import PeopleData from './data/people.json';
import PlanetsData from './data/planets.json';
import FilmsData from './data/films.json';


function Home() {
  return (
    <div id="home-content">
    </div>
  );
}

function People() {
  const { url, path } = useRouteMatch();
  const peopleLinks = [];
  const peopleRoutesMatcher = [];

  for (var person of Object.keys(PeopleData)) {
    peopleLinks.push(
      <li key={person}>
        <NavLink to={PeopleData[person].url}>{PeopleData[person].name}</NavLink>
      </li>
    );

    peopleRoutesMatcher.push(
      <Route path={PeopleData[person].url}>
        <Person info={PeopleData[person]}/>
      </Route>
    )
  }

  return (
    <React.Fragment>
      <div class="sidenav">
        <ul>
          {peopleLinks}
        </ul>
      </div>
      <div class="main">
        <Switch>
          {[
            ...peopleRoutesMatcher,
            <Route exact path={url}>
              <p>Select one of the character on the side navigation to learn more about their background.</p>
            </Route>,
            <Route path="*">
              <div>404 - Page Not Found</div>
            </Route>
          ]}
        </Switch>
      </div>
    </React.Fragment>
  );
}

function Person(props) {
  const person = props.info;
  const filmsPresent = [];

  person.films.forEach(film => {
    filmsPresent.push(
      <li><Link to={film}>{film}</Link></li>
    );
  });

  return (
    <React.Fragment>
      <h2>{person.name}</h2>
      <span><b>Height: </b>{person.height}</span> <br />
      <span><b>Mass: </b>{person.mass}</span> <br />
      <span><b>Hair Color: </b>{person.hair_color}</span> <br />
      <span><b>Skin Color: </b>{person.skin_color}</span> <br />
      <span><b>Eye Color:  </b>{person.eye_color}</span> <br />
      <span><b>Birth Year: </b>{person.birth_year}</span> <br />
      <span><b>Gender: </b>{person.gender}</span> <br />
      <span><b>Home World: </b><Link to={person.homeworld}>{person.homeworld}</Link></span> <br />
      <b>Films:</b>
      <ul>
        {filmsPresent}
      </ul>
    </React.Fragment>
  );
}


function Planets() {
  const { url, path } = useRouteMatch();
  const planetLinks = [];
  const planetRoutesMatcher = [];

  for (var planet of Object.keys(PlanetsData)) {
    planetLinks.push(
      <li key={planet}>
        <NavLink to={PlanetsData[planet].url}>{PlanetsData[planet].name}</NavLink>
      </li>
    )

    planetRoutesMatcher.push(
      <Route path={PlanetsData[planet].url}>
        <Planet info={PlanetsData[planet]} />
      </Route>
    )
  }

  return (
    <React.Fragment>
      <div class="sidenav">
        <ul>
          {planetLinks}
        </ul>
      </div>
      <div class="main">
        <Switch>
          {
            [
              ...planetRoutesMatcher,
              <Route exact path={url}>
                <p>Select a planet from the side navigation to explore its location.</p>
              </Route>,
              <Route path="*">
                <div>
                  404 - Page Not Found
                </div>
              </Route>
            ]
          }
        </Switch>
      </div>
    </React.Fragment>
  );
}

function Planet(props) {
  const planet = props.info;
  const planetResidents = [];
  const filmsPresent = [];

  planet.residents.forEach(resident => {
    planetResidents.push(
      <li>
        <Link to={resident}>{resident}</Link>
      </li>
    );
  });

  planet.films.forEach(film => {
    filmsPresent.push(
      <li>
        <Link to={film}>{film}</Link>
      </li>
    );
  });

  return (
    <React.Fragment>
      <h2>{planet.name}</h2>
      <span><b>Rotation Period: </b>{planet.rotation_period}</span> <br />
      <span><b>Orbital Period: </b>{planet.orbital_period}</span> <br />
      <span><b>Diameter: </b>{planet.diameter}</span> <br />
      <span><b>Climate: </b>{planet.climate}</span> <br />
      <span><b>Gravity: </b>{planet.gravity}</span> <br />
      <span><b>Terrain: </b>{planet.terrain}</span> <br />
      <span><b>Surface Water: </b>{planet.surface_water}</span> <br />
      <span><b>Population: </b>{planet.population}</span> <br />
      <b>Residents: </b>
      <ul>
        {planetResidents}
      </ul>
      <b>Films: </b>
      <ul>
        {filmsPresent}
      </ul>
    </React.Fragment>
  );
}

function Films() {
  const { url, path } = useRouteMatch();
  const filmLinks = [];
  const filmRoutesMatcher = [];

  for (var film of Object.keys(FilmsData)) {
    filmLinks.push(
      <li key={film}>
        <NavLink to={FilmsData[film].url}>{FilmsData[film].title}</NavLink>
      </li>
    )

    filmRoutesMatcher.push(
      <Route path={FilmsData[film].url}>
        <Film info={FilmsData[film]} />
      </Route>
    );
  }

  return (
    <React.Fragment>
      <div class="sidenav">
        <ul>
          {filmLinks}
        </ul>
      </div>
      <div class="main">
        <Switch>
          {
            [
              ...filmRoutesMatcher,
              <Route exact path={url}>
                <p>Select a film from the side navigation to learn about its details.</p>
              </Route>,
              <Route path="*">
                <div>
                  404 - Page Not Found
                </div>
              </Route>
            ]
          }
        </Switch>
      </div>
    </React.Fragment>
  );
}

function Film(props) {
  const film = props.info;
  const people = [];
  const planets = [];

  film.characters.forEach(character => {
    people.push(
      <li>
        <Link to={character}>{character}</Link>
      </li>
    );
  });

  film.planets.forEach(planet => {
    planets.push(
      <li>
        <Link to={planet}>{planet}</Link>
      </li>
    );
  });

  return (
    <React.Fragment>
      <h2>{film.title}</h2>
      <span><b>Episode ID: </b>{film.episode_id}</span> <br />
      <span><b>Opening Crawl: </b>{film.opening_crawl}</span> <br />
      <span><b>Director: </b>{film.director}</span> <br />
      <span><b>Producer: </b>{film.producer}</span> <br />
      <span><b>Release Date: </b>{film.release_date}</span> <br />
      <b>Characters: </b>
      <ul>
        {people}
      </ul>
      <b>Planets: </b>
      <ul>
        {planets}
      </ul>
    </React.Fragment>
  );
}

function App() {
  return (
    [
      <header>
        <h1><Link exact to="/">Star Wars</Link></h1>
        <nav id="main-nav">
          <ul>
            <li>
              <NavLink to="/people">People</NavLink>
            </li>
            <li>
              <NavLink to="/planets">Planets</NavLink>
            </li>
            <li>
              <NavLink to="/films">Films</NavLink>
            </li>
          </ul>
        </nav>
      </header>,
      <Switch>
        <Route path="/people">
          <People />
        </Route>
        <Route path="/planets">
          <Planets />
        </Route>
        <Route path="/films">
          <Films />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    ]
  );
}

export default App;
