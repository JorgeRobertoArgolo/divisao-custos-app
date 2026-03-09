import { Atividades } from '@/screens/Atividades';
import { Despesas } from '@/screens/Despesas';
import { Participantes } from '@/screens/Participantes';
import { Resumo } from '@/screens/Resumo';
import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

export type AtividadeStackParamsList = {
    AtividadesList: undefined;
    Despesas: { activityId: string, activityTitle: string };  
}
const AtividadeStack = createStackNavigator<AtividadeStackParamsList>();

const AtividadesStackRoutes = () => {
    return (
        <AtividadeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AtividadeStack.Screen name='AtividadesList' component={Atividades}/>
            <AtividadeStack.Screen name='Despesas' component={Despesas}/>
        </AtividadeStack.Navigator>
    );
}

export type PrivateBottomTabsParamsList = {
    AtividadesTab: undefined;
    Resumo: undefined;
    Participantes: undefined;
}

const PrivateBottomTabs = createBottomTabNavigator<PrivateBottomTabsParamsList>();

export const PrivateRoutes = () => {

    return (
        <PrivateBottomTabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.gray[700],
                    borderTopWidth: 1,
                    borderTopColor: colors.gray[800],
                    elevation: 0,
                    paddingVertical: 20,
                    paddingHorizontal: 24,
                    marginBottom: 24,
                },
                tabBarActiveTintColor: colors['green-base'],
                tabBarInactiveTintColor: colors.gray[400],

                tabBarLabelStyle: {
                    fontFamily: 'Inter',
                    fontSize: 14,
                    fontWeight: '500',
                    paddingTop: 3,
                },
                tabBarItemStyle: {
                    paddingTop: 4,
                },
            }}    
            initialRouteName='AtividadesTab'
        >
            <PrivateBottomTabs.Screen 
                name='AtividadesTab'
                component={AtividadesStackRoutes}
                options={{
                    tabBarLabel: 'Atividades',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='list' size={24} color={color}/>
                    )
                }}
            />

            <PrivateBottomTabs.Screen 
                name='Resumo'
                component={Resumo}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='insert-chart-outlined' size={24} color={color}/>
                    )
                }}
            />

            <PrivateBottomTabs.Screen 
                name='Participantes'
                component={Participantes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='people-outline' size={24} color={color}/>
                    )
                }}
            />

        </PrivateBottomTabs.Navigator>
    )
}
