import { ThemedText } from '@/components/ThemedText';
import { Box } from '@/components/Box';
import { Slot } from 'expo-router';

const _layout = () => {
  return (
    <Box style={{flex: 1}}>
        <Slot />
    </Box>
  )
}

export default _layout;
