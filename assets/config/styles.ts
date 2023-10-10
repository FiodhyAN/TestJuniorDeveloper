import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#000',
    },
    container: {
      padding: 30,
    },
    header: {
      marginBottom: 30,
    },
    headerIcon: {
      marginBottom: 20,
    },
    textHeader: {
      fontSize: 25,
      color: '#fff',
      fontWeight: 'bold',
    },
    subText: {
      color: '#999',
      fontSize: 12,
      marginBottom: 10,
    },
    input: {
      backgroundColor: 'transparent',
      borderColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      color: '#fff',
      height: 50,
      padding: 10,
      width: '100%',
      marginBottom: 20,
    },
    dropDownPicker: {
      backgroundColor: 'transparent',
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      width: '100%',
    },
    dropDownContainer: {
      backgroundColor: '#000',
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      width: '100%',
    },
    dropDownItem: {
      borderColor: '#fff',
      borderBottomWidth: 1,
      padding: 10,
    },
    searchContainer: {
      backgroundColor: '#000',
      borderColor: '#fff',
      width: '100%',
      height: 50,
    },
    button: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });