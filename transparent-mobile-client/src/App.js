import React from 'react';

import MainScreen from './views/MainScreen';

import { Provider as PaperProvider } from 'react-native-paper';
import eventManager from './shared/eventManager';
import { EVENTS } from './shared/constants';

import authModelCreator from './models/authModelCreator';
import petModelCreator from './models/petModelCreator';

const authModel = authModelCreator({eventManager});
const petModel = petModelCreator({eventManager, authModel})

export default class App extends React.Component {

  componentWillMount() {
    eventManager.setListener(EVENTS.AUTH_MODEL_UPDATE_EVENT, (authModel) => {
      this.setState({ authModel })
      petModel.refresh();
    });
    eventManager.setListener(EVENTS.PET_MODEL_UPDATE_EVENT, (petModel) => this.setState({ petModel }));

    this.setState({ authModel })
    this.setState({ petModel })

    authModel.refresh();
  }

  componentWillUnmount() {
    eventManager.unsetListener(EVENTS.AUTH_MODEL_UPDATE_EVENT);
    eventManager.unsetListener(EVENTS.PET_MODEL_UPDATE_EVENT);
  }

  render() {
    return (
      <PaperProvider>
        <MainScreen authModel={this.state.authModel} petModel={this.state.petModel} />
      </PaperProvider>
    );
  }
};