import ModalComponent from '@/components/ui/ModalComponent';
import PressableComponent from '@/components/ui/PressableComponent';
import { Screen } from '@/components/ui/Screen';
import TextComponent from '@/components/ui/TextComponent';
import { useTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function ModalExample() {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent
          size='lg'
          weight='bold'
          color={colors.text}>
          Modal Component
        </TextComponent>

        <PressableComponent
          variant='primary'
          buttonText='Open Modal'
          onPress={() => setIsVisible(true)}
        />
      </View>

      <ModalComponent
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        title='Example Modal'>
        <View style={{ gap: 16 }}>
          <TextComponent color={colors.text}>
            This is a modal example with a title and content.
          </TextComponent>
          <PressableComponent
            variant='secondary'
            buttonText='Close'
            onPress={() => setIsVisible(false)}
          />
        </View>
      </ModalComponent>
    </Screen>
  );
}
