import HistoryCard from '@/components/ui/historyCard'
import { fruitData } from '@/components/data'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ArrowName from '@/components/ui/Arrow&Name'

const history = () => {
  return (
    <View style={styles.main}>
      <ArrowName name="History"/>
      <ScrollView>
        <View style={{gap: 10,}}>
          {renderHistory}
        </View>
      </ScrollView>
    </View>
  )
}

export default history


const renderHistory = fruitData.map((item) => (
    <HistoryCard key={item.id} historyName={item.name} />
))

const styles = StyleSheet.create({
  main:{
    flex: 1,
    padding: 15,
    backgroundColor: '#0E0D0A',
  }
})