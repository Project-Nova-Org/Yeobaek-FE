import { StyleSheet } from 'react-native';

export const LongButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  buttonBase: {
    width: 327,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
  },

  // 활성화 상태 (클릭 가능)
  activeButton: {
    backgroundColor: '#1B2A41',
  },
  activeText: {
    color: '#FFFFFF',
  },

  // 비활성화 상태 (클릭 불가능)
  disabledButton: {
    backgroundColor: '#C8CCD3',
  },
  disabledText: {
    color: '#A9AFB8',
  },
});
