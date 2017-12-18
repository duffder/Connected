import React, {Component} from 'react';
import ReactNative, { ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { icon } from 'react-native-elements';
import styles from '../styles';
import { CardSection, Card} from './common/index';

const {
    AsyncStorage,
    ActivityIndicator,
    Alert,
    Button,
    Image,
    Picker,
    Text,
    TextInput,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableHighlight
  } = ReactNative;

  //Esentially you can load and you can set data in AsyncStorage
  //IT's simply a way to store information in react-native.
  // Below examples get's a value from a key called "myKey"
//This principle can be applied to any situation, where you have a specific key in order to
// retrieve a certain value. I.e. Longitude or latitude.
  //AsyncStorage.getItem("myKey").then((value) =>){

  //Our application recieves a json object, it's kinda like going gson to json.
  //We want our user as a string so we can access the information in the object.
  //JSON.stringify(user);

//});

class Profile extends Component{

constructor(props){
    super(props);
    this.state = {
        name: '',
        email: '', 
        password: '',
        phone: '',
        sex: '' ,
        longitude: '',
        uid:'',
        latitude: '',
        type: 'Guide',
        loading: false,

    }
    //Reference to the profiles node, where we have all our userids.
    //That way we have access to this reference at all times
    this.proRef = firebase.database().ref().child('profiles');

};

componentDidMount(){
    //Save currentuser as variable "user"
    let user = firebase.auth().currentUser;

    //Load data when we start
    this.listenForProfile(this.proRef.child(user.uid));

  
    
    //Setting local variables email and uid to variables stored in the firebase memory.
        this.setState({email: user.email, uid: user.token, name: user.name});

}

//Listen for profile, get parsed proref, which starts from the profiles node.
listenForProfile(proRef) {

    //firebase.database().ref().child('profiles').on('value, (snap))'
    //Point of below is to recieve data!
    //Listener receives snapshot with data at time of event, the data is retrieved with val() method
    proRef.on('value', (snap) => {

        this.setState({
            loading: false,
            name: snap.val().name,
            phone: snap.val().phone,
            sex: snap.val().sex,
            uid: snap.key
        });
        
    });

}

//This method will update a profile when called.
//listenForProfile can be seen as the read, updateProfile is the write.
updateProfile() {

    //When this method is called, we want it to display loading circle until done.
    this.setState({loading: true});

    //Again, we reference the profiles node and then go to child of specific userid
    //then call update, so we can update the node.
    this.proRef.child(this.state.uid).update({
        //the variables we wish to update:
        name: this.state.name,
        sex: this.state.sex,
        phone: this.state.phone

    }) //we insert a promise, which is code that will be exectued no matter what
    .then(() => {

        //we want to make sure it stops loading, when we get to this point.
        this.setState({loading:false});

        //we save the new user information as a variable that we can use in storage
var user = {
name: this.state.name,
sex: this.state.sex,
phone: this.state.phone,
uid: this.state.uid

};

//This is the last step, where we re-authenticate the user.
firebase.auth().currentUser.getIdToken().then(function(idToken){
    user.token = idToken;
    //We save the user in our storage, use json stringify because we got json object which is
    //incomptaible with storage
    AsyncStorage.setItem('user', JSON.stringify(user));
    alert("User stored" + user)
    Alert.alert("Updated");

})

//Catch any errors in our .then promise
.catch((err) => {
this.setState({error: 'Fail' + err, loading: false});
});

 })

 //Catch any erros in the method 
    .catch((err) => {
        this.setState({
            error: 'Update failed' + err,
            loading: false
        });
  
  
    });

  }
  
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button 

    onPress={this.updateProfile.bind(this)} title="Update Profile"
    color="white"
    />;
  }

  render() {
    return(
      <KeyboardAvoidingView style={   { backgroundColor: '#3498db',
      flex: 1}} behavior='padding'>
        <View style={{backgroundColor: "#3498db"}}>

          <TitledInput
            label='Email Address'
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            value={this.state.email}
          />

          <TitledInput
            label='Name'
            onChangeText={(name) => this.setState({name})}
            placeholder='Name'
            value={this.state.name}
          />
     
     <TitledInput
            label='Phone'
            onChangeText={(phone) => this.setState({phone})}
            placeholder='Phone'
            value={this.state.phone}
          />
        
        <TitledInput
            label='User or Guide'
            onChangeText={(type) => this.setState({type})}
            placeholder='User or Guide'
            value={this.state.type}
          />
        
    

        <Card style={{borderWidth: 0}}>
        <Text style={styles.labelStyle}>{'Sex'.toUpperCase()}</Text>
    
          <Picker 
          style={pickerStyles.onePicker}
          itemStyle={pickerStyles.onePickerItem}
            selectedValue={this.state.sex}
            onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})
            }>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
            </Card>
    
     


          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </KeyboardAvoidingView>

    )
  }
}

const pickerStyles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
      },
      picker: {
        width: 200,
        backgroundColor: '#3498db',
        borderColor: 'black',
        borderWidth: 1,
      },
      pickerItem: {
        color: 'white'
      },
      onePicker: {
        width: 150,
        height: 140,
        paddingLeft: 80,
        backgroundColor: '#3498db',
        justifyContent: 'center'
      },
      onePickerItem: {
        height: 44,
        color: 'white'
      },
      twoPickers: {
        width: 200,
        height: 88,
        backgroundColor: '#3498db',
        borderColor: 'black',
        borderWidth: 1,
      },
      twoPickerItems: {
        height: 88,
        color: 'white'
      }

})

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
      <View style={containerStyle}>
          <Text style={labelStyle}>{label.toUpperCase()}</Text>
          <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          editable={true}
          returnKeyType='next'
        />
      </View>
  );
};


module.exports = Profile;
