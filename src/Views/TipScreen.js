import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import tips from '../assets/dataTips/dataTips.json';
import {useFocusEffect} from '@react-navigation/native';
import icon from '../assets/icons/information.png';

const TipScreen = () => {
  const [randomTips, setRandomTips] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);

  const {
    container,
    screenTitle,
    listContainer,
    cardContainer,
    card,
    iconStyles,
    iconImage,
    cardContent,
    row,
    cardImage,
    title,
    content,
    selectedTipContainer,
    selectedTipImage,
    selectedTipTitle,
    selectedTipContent,
    backButton,
    backButtonLabel,
  } = styles;

  useFocusEffect(
    React.useCallback(() => {
      fetchRandomTips();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const fetchRandomTips = () => {
    const unorderedTips = [...tips.dataTips];

    while (randomTips.length < 4 && unorderedTips.length > 0) {
      const randomIndex = Math.floor(Math.random() * unorderedTips.length);
      const randomTip = unorderedTips.splice(randomIndex, 1)[0];
      randomTips.push(randomTip);
    }

    setRandomTips(randomTips);
    setSelectedTip(null);
  };

  const selectTip = tip => {
    setSelectedTip(tip);
  };

  const goBackToTips = () => {
    setSelectedTip(null);
  };

  const renderTipCard = ({item}) => (
    <TouchableOpacity onPress={() => selectTip(item)}>
      <View style={cardContainer}>
        <View style={card}>
          {item.image && <Image source={{uri: item.image}} style={cardImage} />}
          <View style={cardContent}>
            <View style={row}>
              <View style={iconStyles}>
                <Image source={icon} style={iconImage} />
              </View>
              <Text style={title}>{item.title}</Text>
            </View>
            <Text style={content}>{item.content}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={container}>
      <Text style={screenTitle}>Infórmate</Text>
      {!selectedTip ? (
        <FlatList
          data={randomTips}
          renderItem={renderTipCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={listContainer}
        />
      ) : (
        <ScrollView>
          <View style={selectedTipContainer}>
            {selectedTip.image && (
              <Image
                source={{uri: selectedTip.image}}
                style={selectedTipImage}
              />
            )}
            <Text style={selectedTipTitle}>{selectedTip.title}</Text>
            <Text style={selectedTipContent}>{selectedTip.content}</Text>
            <Text style={selectedTipContent}>{selectedTip.description}</Text>
            <TouchableOpacity onPress={goBackToTips} style={backButton}>
              <Text style={backButtonLabel}>Regresar a los Tips</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#484C52',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  iconStyles: {
    marginRight: 5,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTipContainer: {
    backgroundColor: '#EB7C9C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  selectedTipImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  selectedTipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  selectedTipContent: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonLabel: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TipScreen;
