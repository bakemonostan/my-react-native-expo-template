import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormField, PressableComponent } from '@/components/ui';
import { Screen } from '@/components/ui/Screen';
import TextComponent from '@/components/ui/TextComponent';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function VerifyOtpScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { error: showError } = useToast();
  const pendingOtpEmail = useAuthStore((s) => s.pendingOtpEmail);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!pendingOtpEmail) {
      router.replace('/(auth)/forgot-password');
    }
  }, [pendingOtpEmail, router]);

  const onSubmit = () => {
    const ok = verifyOtp(code);
    if (!ok) {
      showError('Invalid code', 'Enter at least 6 digits (mock verification).');
      return;
    }
    router.replace('/(app)/(tabs)');
  };

  if (!pendingOtpEmail) {
    return null;
  }

  return (
    <Screen
      header={<AuthHeader title='Verify code' />}
      safeAreaEdges={['top', 'bottom']}
      withDefaultPadding>
      <View style={styles.container}>
        <TextComponent
          size='sm'
          color={colors.textSecondary}
          style={{ lineHeight: 20 }}>
          Code sent to {pendingOtpEmail}. Template accepts any 6+ digit code.
        </TextComponent>
        <FormField
          label='One-time code'
          placeholder='123456'
          value={code}
          onChangeText={setCode}
          keyboardType='number-pad'
        />
        <PressableComponent
          buttonText='Verify and continue'
          onPress={onSubmit}
        />
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
