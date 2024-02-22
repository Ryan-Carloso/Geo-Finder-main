// Styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background:
  {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: "black", 
    opacity: 10,
  },
   
  buttonTextback: {
    fontSize: 15,
    color: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonback: {
    alignItems: 'center',
    justifyContent: 'center',    
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    backgroundColor: '#323232',  
  },
  markerText: {
    opacity: 100,
    color: "white",
  },
  footerImage: {
    marginBottom: 1,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -1, 
  },
  
  marker: {
    alignContent: "center",
    alignItems: "center",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    marginTop: 50,
    backgroundColor: '#3F3F3F',
    color: "black",
    borderRadius: 50,
  },
  
  markeryou: {
    alignContent: "center",
    alignItems: "center",
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    marginTop: 50,
    backgroundColor: 'blue',
    color: "white",
    borderRadius: 25,
    borderWidth: 1,
    opacity: 0.9  
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    height: '50%',
    width: 250,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  button: {
    alignContent: "center",
    alignItems: "center",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '70%',
    marginTop: 50,
    backgroundColor: 'lightblue',
  },
  input: {
    alignContent: "center",
    alignItems: "center",
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  inputxt: {
    alignContent: "center",
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 5
  },
  inputxt1: {
    alignContent: "center",
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});
