const inquirer = require('inquirer');
const consola = require('consola')

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit'
}

enum MessageVariant {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

type InquirerAnswers = {
  action: Action
};

interface User {
  name: string;
  age: number;
}

const startApp = async () => {


  class Message {
    private content: string;

    constructor(content: string){
      this.content = content
    }

    show(){
      console.log(this.content)
    }
    capitalize(){
      this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    }
    toUpperCase(){
      this.content = this.content.toUpperCase();
    }
    toLowerCase(){
      this.content = this.content.toLowerCase();
    }
    static showColorized(variant: MessageVariant, text: string){
      switch(variant){
        case MessageVariant.Success:
          consola.success(text);
          break;
        case MessageVariant.Info:
          consola.info(text);
          break;
        case MessageVariant.Error:
          consola.error(text);
          break;
      }
    }
  }

  class UsersData {
    data: User[] = []

    showAll(){
      if(this.data.length === 0){
        Message.showColorized(MessageVariant.Info, 'No data...');
      } else {
        console.log('\u{2139} Users data')
        console.table(this.data)
      }
    }
  }

inquirer.prompt([{
  name: 'action',
  type: 'input',
  message: 'How can I help you?',
}]).then((answers: InquirerAnswers) => {
  console.log("Chosen action: " + answers.action);
  startApp();
  if (answers.action === "quit")
    return;
});
}

startApp();