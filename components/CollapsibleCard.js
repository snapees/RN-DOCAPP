/* eslint-disable prettier/prettier */
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';

const screenWidth = Dimensions.get('window').width;

export default function CollapsibleCard({
  children,
  imageUrl,
  caseId,
  name,
  surgery,
  duration,
}) {
  // console.log(`Patient data: ${JSON.stringify(name)}`);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <View style={isExpanded ? styles.expandedCard : styles.collapsedCard}>
        <TouchableOpacity onPress={handleExpansion} style={styles.header}>
          {isExpanded ? (
            <Icon name="chevron-up" size={20} color="black" />
          ) : (
            <Icon name="chevron-down" size={20} color="black" />
          )}
        </TouchableOpacity>
        {isExpanded ? (
          <View style={styles.content}>
            {imageUrl ? (
              <Image source={{uri: imageUrl}} style={styles.image} />
            ) : (
              <Text>No Image Available</Text>
            )}
            <View style={styles.info}>
              <Text style={styles.details}>Case Id: {caseId}</Text>
              <Text style={styles.details}>Name: {name}</Text>
              <Text style={styles.details}>Surgery: {surgery}</Text>
              <Text style={styles.details}>Duration: {duration}</Text>

              {/* {isExpanded && (
                <View>
                  <Text style={styles.details}>Name: {name}</Text>
                  <Text style={styles.details}>Surgery: {surgery}</Text>
                  <Text style={styles.details}>Duration: {duration}</Text>
                </View>
              )} */}
            </View>
          </View>
        ) : (
          <View style={styles.collapsedContent}>
            {imageUrl ? (
              <Image source={{uri: imageUrl}} style={styles.collapsedImage} />
            ) : (
              <Text>No Image Available</Text>
            )}
            <View style={styles.collapsedInfo}>
              <Text style={styles.details}>Case Id: {caseId}</Text>
              <Text style={styles.details}>Name: {name}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#f2f2f2',
    flexDirection: 'column',
  },
  expandedCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    elevation: 5,
    width: screenWidth - 20,
  },
  collapsedCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    elevation: 5,
    width: screenWidth - 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  expandBtn: {
    fontSize: 18,
    color: 'green',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  collapsedContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 20,
    marginRight: 15,
  },
  collapsedImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 20,
  },
  collapsedInfo: {
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  info: {
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  details: {
    fontSize: 18,
    color: '#000',
  },
});
