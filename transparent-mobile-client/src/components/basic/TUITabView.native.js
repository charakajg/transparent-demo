import * as React from 'react';
import PropTypes from 'prop-types';

import { BottomNavigation, Text } from 'react-native-paper';

const TUITabView = ({tabs}) => {
  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState(tabs.map((elem, index)=>({key: 'k'+index,title:elem.title})));
  const renderScene = BottomNavigation.SceneMap(tabs.reduce((map,elem,index)=>{map['k'+index]=()=>elem.content(setIndex);return map;},{}));

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

TUITabView.propTypes = {
    tabs: PropTypes.array.isRequired
}

export default TUITabView;
