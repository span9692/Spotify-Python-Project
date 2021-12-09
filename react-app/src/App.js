import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Splash from "./components/Splash/Splash";
import Dashboard from "./components/Dashboard/Dashboard";
import { authenticate } from "./store/session";
import SongList from "./components/Songs";
import PlayList from "./components/Playlist";
import CreatePlaylist from "./components/CreatePlaylist";
import Follows from "./components/Follows";
import Player from "./components/Player";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/songs" exact={true}>
          <Dashboard />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/playlist" exact={true}>
          <PlayList />
        </ProtectedRoute>
        <ProtectedRoute path="/addplaylist" exact={true}>
          <CreatePlaylist />
        </ProtectedRoute>
        <ProtectedRoute path="/playlist/:playlistId" exact={true}>
          <CreatePlaylist />
        </ProtectedRoute>
        <Route path="/home" exact={true}>
          <Splash />
        </Route>
        <ProtectedRoute path="/users/:id/dashboard" exact={true}>
          <Dashboard />
          <Follows />
        </ProtectedRoute>
      </Switch>
      <Player/>

    </BrowserRouter>
  );
}

export default App;
