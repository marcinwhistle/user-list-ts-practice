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

    add(newUser: User){
      if (typeof newUser.age !== 'number' || newUser.age <= 0 || newUser.name.trim().length === 0){
        Message.showColorized(MessageVariant.Error, 'Wrong data!');
      } else {
        this.data.push(newUser);
        Message.showColorized(MessageVariant.Success, 'User has been successfully added')
      }
    }

    remove(userName: string){
      const index = this.data.findIndex((user) => user.name === userName);

      if (index !== -1) {
        this.data.splice(index, 1);
        Message.showColorized(MessageVariant.Success, 'User deleted!')
      } else {
        Message.showColorized(MessageVariant.Error, 'User not found...')
      }
    }
  }

  const users = new UsersData();
  console.log("\n");
  console.info("???? Welcome to the UsersApp!");
  console.log("====================================");
  Message.showColorized(MessageVariant.Info, "Available actions");
  console.log("\n");
  console.log("list – show all users");
  console.log("add – add new user to the list");
  console.log("remove – remove user from the list");
  console.log("quit – quit the app");
  console.log("\n");

  const startApp = () => {
    inquirer.prompt([{
      name: 'action',
      type: 'input',
      message: 'How can I help you?',
    }]).then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter age',
          }]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }]);
          users.remove(name.name);
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, "Bye bye!");
          return;
      }

      startApp();
    });
  }
