import { Atividades } from '@/screens/Atividades';
import { Participantes } from '@/screens/Participantes';
import { Resumo } from '@/screens/Resumo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type PrivateBottomTabsParamsList = {
    Atividades: undefined;
    Resumo: undefined;
    Participantes: undefined;
}

export const PrivateRoutes = () => {
    const PrivateBottomTabs = createBottomTabNavigator<PrivateBottomTabsParamsList>();

    return (
        <PrivateBottomTabs.Navigator
            screenOptions={{
                headerShown: true
            }}    
            initialRouteName='Atividades'
        >
            <PrivateBottomTabs.Screen 
                name='Atividades'
                component={Atividades}
            />

            <PrivateBottomTabs.Screen 
                name='Resumo'
                component={Resumo}
            />

            <PrivateBottomTabs.Screen 
                name='Participantes'
                component={Participantes}
            />

        </PrivateBottomTabs.Navigator>
    )
}