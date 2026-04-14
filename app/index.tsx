import PressableComponent from '@/components/ui/PressableComponent';
import TextComponent from '@/components/ui/TextComponent';
import { Screen } from '@/components/ui/Screen';
import { PresetStyles } from '@/theme/presets';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();
  return (
    <Screen
      withDefaultPadding={false}
      style={PresetStyles.screenContainer}>
      <View
        style={{
          gap: 10,
          justifyContent: 'center',
          flex: 1,
        }}>
        <TextComponent size='lg'>
          Edit app/index.tsx to edit this screen.
        </TextComponent>
        <PressableComponent
          onPress={() => router.push('/Modal')}
          buttonText='Show Modal'
        />
        <PressableComponent
          variant='secondary'
          onPress={() => router.push('/(tabs)')}
          buttonText='Go to Tabs screen'
        />
      </View>
    </Screen>
  );
}
