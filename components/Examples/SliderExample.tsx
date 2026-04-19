import { CustomRangeSlider, CustomSlider } from '@/components/ui';
import { Screen } from '@/components/ui/Screen';
import TextComponent from '@/components/ui/TextComponent';
import { useTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function SliderExample() {
  const { colors } = useTheme();
  const [volume, setVolume] = useState(0.45);
  const [brightness, setBrightness] = useState(72);
  const [priceMin, setPriceMin] = useState(20);
  const [priceMax, setPriceMax] = useState(80);

  return (
    <Screen safeAreaEdges={['bottom']}>
      <TextComponent
        size='lg'
        weight='bold'>
        Sliders
      </TextComponent>

      <View style={{ gap: 8 }}>
        <TextComponent
          weight='medium'
          size='sm'
          color={colors.textSecondary}>
          Single (0–1, default theme colors)
        </TextComponent>
        <TextComponent
          size='sm'
          color={colors.text}>
          Volume: {Math.round(volume * 100)}%
        </TextComponent>
        <CustomSlider
          value={volume}
          onValueChange={setVolume}
          minimumValue={0}
          maximumValue={1}
        />
      </View>

      <View style={{ gap: 8 }}>
        <TextComponent
          weight='medium'
          size='sm'
          color={colors.textSecondary}>
          Single (0–100, custom accent, value label)
        </TextComponent>
        <CustomSlider
          value={brightness}
          onValueChange={setBrightness}
          minimumValue={0}
          maximumValue={100}
          showValue
          valueFormatter={(v) => `${Math.round(v)}%`}
          trackColor={colors.backgroundSecondary}
          thumbColor={colors.surface}
          progressColor={colors.warning}
        />
      </View>

      <View style={{ gap: 8 }}>
        <TextComponent
          weight='medium'
          size='sm'
          color={colors.textSecondary}>
          Range ($0–$100)
        </TextComponent>
        <CustomRangeSlider
          minValue={priceMin}
          maxValue={priceMax}
          onRangeChange={(min, max) => {
            setPriceMin(min);
            setPriceMax(max);
          }}
          minimumValue={0}
          maximumValue={100}
          showValue
          valueFormatter={(v) => `$${Math.round(v)}`}
        />
      </View>
    </Screen>
  );
}
