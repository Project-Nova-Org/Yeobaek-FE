import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonBase: {
    width: 110,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // 그림자가 버튼 밖으로 나가지 않게 함
  },

  // 내부 그림자 효과
  innerShadow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000033',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },

  // '아니오' 버튼 색상 변화
  noDefault: {
    backgroundColor: '#707070', // 평상시
  },
  noPressed: {
    backgroundColor: '#B0B0B0', // 눌렀을 때
  },

  // '예' 버튼 색상 변화
  yesDefault: {
    backgroundColor: '#1B2A41', // 평상시
  },
  yesPressed: {
    backgroundColor: '#5B7397', // 눌렀을 때
  },
});
