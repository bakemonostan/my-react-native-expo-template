import { PressableComponent, TextInputComponent } from '@/components/ui';
import TextComponent from '@/components/ui/TextComponent';
import { Screen } from '@/components/ui/Screen';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      withDefaultPadding={false}
      footer={
        <PressableComponent
          buttonText='Save'
          onPress={() => {}}
        />
      }>
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent
          size='xl'
          weight='bold'
          color={colors.text}>
          Welcome
        </TextComponent>
        <TextComponent
          size='base'
          color={colors.text}>
          This is your starting screen. Replace this content with your app's
          home view.
        </TextComponent>
        <TextComponent
          size='sm'
          color={colors.textSecondary}>
          Browse the Components tab to explore the available UI primitives.
        </TextComponent>
        <TextInputComponent
          placeholder='Enter your name'
          value={name}
          onChangeText={setName}
        />
      </View>
    </Screen>
  );
}
