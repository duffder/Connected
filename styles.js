const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#edf2f9',
    justifyContent: 'center',
    height: '100%',
    padding: 50
  },
  listContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row',
    width: '100%'
  },
  navbarTitle: {
  
    flex: 2,
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  title: {
    color: '#444',
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    width: '100%',
    flex: 1,
    fontSize: 18,
    fontWeight: '200',
    height: 40
  },
  containerStyle: {
    height: 60,
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },

  cardStyle: {
    flex: 1
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  alignRight: {
    flex: 1
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },

  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  //Buttonstyles
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingTop: 50,
    paddingBottom: 50,
  },

  form: {
    backgroundColor: '#f2f2f2'
  },

  homepageText: {

    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
  
  
})
module.exports = styles;
module.exports.constants = constants;

