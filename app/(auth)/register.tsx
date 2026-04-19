import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormField, PressableComponent } from '@/components/ui';
import { Screen } from '@/components/ui/Screen';
import TextComponent from '@/components/ui/TextComponent';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/store/authStore';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!email.trim() || !password) return;
    register(email.trim(), password, name.trim());
    router.replace('/(app)/(tabs)');
  };

  return (
    <Screen
      header={<AuthHeader title='Create account' />}
      safeAreaEdges={['top', 'bottom']}
      withDefaultPadding>
      <View style={styles.container}>
        <TextComponent
          size='sm'
          color={colors.textSecondary}
          style={{ lineHeight: 20 }}>
          Mock registration creates a local session only — replace `register` in
          `store/authStore.ts`.
        </TextComponent>
        <FormField
          label='Name'
          placeholder='Your name'
          value={name}
          onChangeText={setName}
        />
        <FormField
          label='Email'
          placeholder='you@example.com'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <FormField
          label='Password'
          placeholder='••••••••'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PressableComponent
          buttonText='Create account'
          onPress={onSubmit}
        />
        <Link href='/(auth)/login'>
          <TextComponent
            size='sm'
            color={colors.primary}>
            Already have an account? Sign in
          </TextComponent>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingTop: 24,
  },
});
