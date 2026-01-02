import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FittingSemishortButton from '../components/buttons/semishort_button/FittingSemishortButton';

export default function HomeScreen() {
  // 버튼의 활성 상태를 관리하는 State (처음엔 true로 활성화)
  const [isShortActive, setIsShortActive] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FittingSemishortButton
          isActive={isShortActive} // state 값 연결
          onPress={() => {
            console.log('클릭됨! 이제 비활성화됩니다.');
            setIsShortActive(false); // 💡 클릭 시 false로 변경하여 버튼을 비활성화함
          }}
        />

        {/* 테스트용: 버튼을 다시 활성화시키는 리셋 버튼 (선택사항) */}
        {!isShortActive && (
          <FittingSemishortButton
            label="리셋"
            isActive={true}
            onPress={() => setIsShortActive(true)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row', // 가로로 배치
    gap: 10, // 버튼 사이 간격 (RN 0.71 이상)
    alignItems: 'center', // 세로 정렬 중앙
  },
});
