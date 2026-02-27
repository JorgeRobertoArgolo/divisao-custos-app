import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/Input";
import { schema } from "./schema";
import { Text, View } from "react-native";
import { AuthHeader } from "@/components/AuthHeader";

export interface FormLoginParams {
    email: string;
    password: string;
}

export const LoginForm = () => {
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<FormLoginParams>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
    });
    
    return (
        <SafeAreaView className="bg-gray-700 flex-1" edges={['top']}>
            <AuthHeader />

            <View className="flex-1">
                
                <Text className="font-inter color-gray-100 text-center mt-10 mb-8 text-lg-label font-semibold">
                    Entre no app
                </Text>
                
                <View className="gap-3">
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

            </View> 
        </SafeAreaView> 
    );
} 