import "./App.css";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ExplorePlaces,
  FavPlaces,
  PlaceDetails,
  ReviewPage,
  AddReviewPage,
  AddStatePage,
  AddPlacePage,
} from "./screens/index.js";
import NavBar from "./components/navigation/NavBar.jsx";
import Places from "./components/place/Places.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/explore-places">
            <ExplorePlaces />
          </Route>
          <Route exact path="/favourite-places">
            <FavPlaces />
          </Route>
          <Route exact path={`/explore-places/:name`}>
            <Places />
          </Route>
          <Route exact path={`/explore-places/:name/:id`}>
            <PlaceDetails />
          </Route>
          <Route exact path={`/reviews/:name/:id`}>
            <ReviewPage />
          </Route>
          <Route exact path={`/:statename/:placeid/:username/review/add`}>
            <AddReviewPage />
          </Route>
          <Route exact path={`/admin/addstate`}>
            <AddStatePage />
          </Route>
          <Route exact path={`/admin/addplace`}>
            <AddPlacePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
