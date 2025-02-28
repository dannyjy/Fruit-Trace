import HistoryCard from '@/components/ui/HistoryCard'
import { fruitData } from '@/components/data'
import { StyleSheet,  View, ScrollView } from 'react-native'
import React from 'react'
import ArrowName from '@/components/ui/Arrow&Name'
import { SafeAreaView } from 'react-native-safe-area-context'

const renderHistory = fruitData.map((item) => (
  <HistoryCard key={item.id} historyName={item.name} />
))

const history = () => {
  return (
    <SafeAreaView style={styles.main}>
      <ArrowName name="History"/>
      <ScrollView>
        <View style={{gap: 10,}}>
          {renderHistory}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default history




const styles = StyleSheet.create({
  main:{
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#0E0D0A',
  }
})