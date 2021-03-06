import React, {
  Clipboard,
  AsyncStorage,
  Alert,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

var Router = require('./Router.js');
var getName = require('./nameGen.js');

class SettingsScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomId:   '',
    };
  }

  async componentDidMount() {
    let username = await AsyncStorage.getItem('username');
    let roomId = await AsyncStorage.getItem('roomId');
    this.setState({
      username: username,
      roomId:   roomId,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.usernameInfo}>
          <Text style={styles.basicText}>You are currently {this.state.username}.</Text>
          <TouchableHighlight
            underlayColor={'#0055b2'}
            style={styles.button}
            onPress={()=>{
              let newName = getName();
              AsyncStorage.setItem("username", newName);
              this.setState({username: newName});
            }}>
            <View>
              <Text style={styles.buttonText}>Reroll Username</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.roomInfo}>
          <Text style={styles.basicText}>
            Ready for a new building?
          </Text>
          <TouchableHighlight
            underlayColor={'#0055b2'}
            style={styles.button}
            onPress={()=>{
              Alert.alert(
                'Are you sure?',
                'Once you leave this room, you\'ll need the access code to rejoin again.',
                [
                  {text: 'Cancel', onPress: () => {}},
                  {text: 'I\'m sure!', onPress: () => {
                    AsyncStorage.removeItem('roomId');
                    let route = Router.JoinRoomScene();
                    this.props.navigator.replaceAtIndex(route, 0);
                    this.props.navigator.popToTop();
                  }}
                ]
              );
            }}>
            <View>
              <Text style={styles.buttonText}>Leave Building</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.copyGroup}>
          <Text style={styles.basicText}>
            Copy Room to Clipboard
          </Text>
          <TouchableHighlight
            underlayColor={'#0055b2'}
            style={styles.button}
            onPress={()=> {
              Clipboard.setString(this.state.roomId)
              alert("Copied to 🍆"); 
            }}>
            <View>
              <Text style={styles.buttonText}>Copy "{this.state.roomId}"</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  usernameInfo: {
    alignItems: 'center',
  },
  roomInfo: {
    paddingTop: 30,
    alignItems: 'center',
  },
  copyGroup: {
    paddingTop: 30,
    alignItems: 'center',
  },
  basicText: {
    textAlign: 'center',
    fontSize: 15,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007aff',
    paddingTop: 7,
    paddingRight: 14,
    paddingBottom: 7,
    paddingLeft: 14,
    borderRadius: 7,
    margin: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

module.exports = SettingsScene;
