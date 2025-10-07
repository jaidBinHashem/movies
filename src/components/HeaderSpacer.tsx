import React, { memo } from 'react';
import { View } from 'react-native';

interface HeaderSpacerProps {
  height: number;
}

const HeaderSpacer = memo<HeaderSpacerProps>(({ height }) => (
  <View style={{ height }} />
));

HeaderSpacer.displayName = 'HeaderSpacer';

export default HeaderSpacer;
