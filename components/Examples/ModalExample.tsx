import ModalComponent from '@/components/ui/ModalComponent';
import PressableComponent from '@/components/ui/PressableComponent';
import { Screen } from '@/components/ui/Screen';
import TextComponent from '@/components/ui/TextComponent';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function ModalExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Screen>
      <TextComponent
        size='lg'
        weight='bold'>
        Modal Component
      </TextComponent>

      <PressableComponent
        variant='primary'
        buttonText='Open Modal'
        onPress={() => setIsVisible(true)}
      />

      <ModalComponent
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        title='Example Modal'>
        <View style={{ gap: 16 }}>
          <TextComponent>
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
