import { StyleSheet } from 'react-native';

export const semishortButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonBase: {
    width: 76,
    height: 27,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: -0.5,
  },

  // 활성화 상태
  activeButton: {
    backgroundColor: '#1B2A41',
  },
  activeText: {
    color: '#FFFFFF',
  },

  // 비활성화 상태
  disabledButton: {
    backgroundColor: '#C8CCD3',
  },
  disabledText: {
    color: '#A9AFB8',
  },
});
