import { StyleSheet } from 'react-native';

export const alertStyles = StyleSheet.create({
  absolutePosition: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertContainer: {
    width: 260,
    height: 142,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  messageText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },

  buttonWrapper: {
    position: 'absolute',
    bottom: -3,
    left: 14,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
