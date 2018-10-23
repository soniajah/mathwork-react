import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button } from 'react-native';
// import Sound from 'react-native-sound';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      question: 'question',
      score: 0,
      questionsCount: 0,
      questionsAnswer: 0,
      answer: 0,
      buttons: [0, 0, 0, 0]
    }
  };

  componentDidMount (){
    this.createQuestion()
    AsyncStorage.getItem('score').then((value) => {
      if(value != null){
        var intvalue = JSON.parse(value)
        if (!isNaN(intvalue)) {
          this.setState({ score: JSON.parse(value) })
        }
      }
    })
    AsyncStorage.getItem('questionsCount').then((value) => {
      if(value != null){
        var intvalue = JSON.parse(value)
        if (!isNaN(intvalue)) {
          this.setState({ questionsCount: JSON.parse(value) })
        }
      }
    })      
  }

  onClick(name){
    var questionsCount = this.state.questionsCount + 1
    var score = this.state.score

    AsyncStorage.setItem('score', JSON.stringify(score));
    AsyncStorage.setItem('questionsCount', JSON.stringify(questionsCount));

    this.setState({questionsCount: questionsCount}) 
    if(name == this.state.questionsAnswer.toString()){
      this.setState({
        score: score + 1        
      })     
    }
    this.createQuestion()  
  }

  createQuestion(){
    var firstNumber = Math.floor(Math.random() * 100) + 1
    var secondNumber = Math.floor(Math.random() * 100) + 1
    var question = firstNumber + '+' + secondNumber
    var answer = firstNumber + secondNumber 
  
    var randomAnswers = []
    randomAnswers[0] = answer
    for(let i=1; i< 4; i++){
      var firstNumber = Math.floor(Math.random() * 100) + 1
      var secondNumber = Math.floor(Math.random() * 100) + 1
      var newResult = firstNumber + secondNumber
      randomAnswers[i] = newResult
    }
    const shuffledAnswers = this.shuffleArray(randomAnswers);
    this.setState({
      question: question,
      questionsAnswer: answer,
      buttons: shuffledAnswers
    })     
  }

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  render() {
    var self = this   

    return (
      <View style={styles.container}>
      <Text style={{margin: 10, fontWeight: 'bold'}}>Score : {self.state.score}/ {self.state.questionsCount}</Text>      
        <Text>{this.state.question} = {this.state.questionsAnswer} </Text>
        <View >{this.state.buttons.map(function(name, index){
                      return (<View style={styles.buttonStyleView} key={index}>
                          <Button 
                          title={name.toString()} 
                          onPress={() => self.onClick(name)} 
                          key={ index } 
                          buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            // width: 500,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                          }}/>
                        </View>);
                    })}
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyleView: {
    width: 200,
    paddingTop: 10,
  }
});
