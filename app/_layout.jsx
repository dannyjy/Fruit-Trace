import { createStackNavigator } from '@react-navigation/stack';
import History from './history';
import Index from './index'
import Camera from './camera';
import Upload from './upload';
import Edible from './Edible';
import Results from './Results';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen
        name="index"
        component={Index}
        options={{ title: 'index' , headerShown:false }}
      />
      <Stack.Screen
        name="camera"
        component={Camera}
        options={{ title: 'Upload', headerShown:false  }}
      />
      <Stack.Screen
        name="upload"
        component={Upload}
        options={{ title: 'Upload', headerShown:false  }}
      />
      <Stack.Screen
        name="edible"
        component={Edible}
        options={{ title: 'Edible', headerShown:false  }}
      />
      <Stack.Screen
        name="results"
        component={Results}
        options={{ title: 'Results', headerShown:false  }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ title: 'Results', headerShown:false  }}
      />
    </Stack.Navigator>
  );
}