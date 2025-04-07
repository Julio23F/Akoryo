import { ThemedText } from '@/components/ThemedText';
import { Box } from '@/components/Box';
import { ActivityIndicator, StyleSheet } from 'react-native';

const StartPage = () => {
    return (
      <Box style={styles.container}>
        <ActivityIndicator size="large" color="gray"/>
      </Box>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default StartPage;