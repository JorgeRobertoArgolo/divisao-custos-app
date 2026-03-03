import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/Input";
import { schema } from "./schema";
import { Text, View } from "react-native";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthButton } from '@/components/AuthButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PublicStackParamsList } from '@/routes/PublicRoutes';
import { UserRegisterRequestDTO } from '@/interfaces/auth/request/user-register-request-dto';

export const RegisterForm = () => {
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<UserRegisterRequestDTO>({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();
    
    return (
        <SafeAreaView className="bg-gray-700 flex-1" edges={['top']}>
            <AuthHeader />

            <View className="flex-1">
                
                <Text className="font-inter color-gray-100 text-center mt-10 mb-8 text-lg-label font-semibold">
                    Crie sua conta
                </Text>
                
                <View className="gap-3">
                    <Input 
                        control={control}
                        name="fullName"
                        placeholder="Seu nome completo"
                        leftIconName="person-outline"
                    />  
                    
                    <Input 
                        control={control}
                        name="email"
                        placeholder="mail@example.com"
                        leftIconName="mail-outline"
                    />  

                    <Input 
                        control={control}
                        name="password"
                        placeholder="Sua senha"
                        leftIconName="lock-outline"
                        secureTextEntry
                    />
                </View>

                <AuthButton className='my-8'>
                    Cadastrar
                </AuthButton>

                <View className='border-t-gray-600 border-t w-auto mx-8' />
                
                <Text className='text-center justify-center color-gray-200 font-inter text-sm mt-8 mb-4'>
                    Já tem cadastro ?
                </Text>

                <AuthButton className='mb-10' type='secondary' onPress={() => navigation.navigate('Login')}>
                    Entrar na Conta
                </AuthButton>
            </View> 
        </SafeAreaView> 
    );
} 