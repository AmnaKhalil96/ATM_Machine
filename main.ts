#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//Initialize user balance and pin code
let myBalance = 10000; //Dollar
let pinCode = 9636;

//Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(chalk.redBright`\n  \t\t <<<================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>>          ${chalk.bgBlackBright.bold('  Welcome To \"SAM\" - ATM Machine')}               <<<=========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(chalk.redBright`\t\t <<<================================================>>>`));



// Function to run the calculator
async function runATM() {
    let runATM = true;
    while (runATM) {


let pinAnswer = await inquirer.prompt(

    {
        name: "pin",
        message: chalk.green ("Enter your pin:"),
        type: "number"
    }

);

if (pinAnswer.pin === pinCode){
    console.log(chalk.magenta("\nCorrect pin code!!!\n"));
   

   let operationAns = await inquirer.prompt(
        [
            {
                name: "operation",
                message: chalk.yellow("please select option"),
                type: "list",
                choices: ["withdraw", "check balance", "Exit"]
            }
        ]
    );

 //Check if the user wants to exit
 if (operationAns.operation === "Exit") {
    console.log(chalk.magentaBright("Exiting the ATM Machine. Thank you for using it!"));
    return; // Exit the function
}

console.log(operationAns);

    if (operationAns.operation === "withdraw"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: 'list',
                message: chalk.yellowBright("Select a withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastcashAns = await inquirer.prompt(
                [
                    {
                        name: "fastCash",
                        type: "list",
                        message: chalk.grey("Select Amount:"),
                        choices: [1000, 2000, 3000, 5000, 10000, 15000, 20000]
                    }
                ]
            )
            if(fastcashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
             }
             else{
                myBalance -= fastcashAns.fastCash
                console.log(chalk.green(`${fastcashAns.fastCash} withdraw Successfully`));
                console.log(chalk.yellowBright(`Your Remaining Balance is: ${myBalance}`));
                
             }

        }


       else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt(
                [
                    {
                        name: "amount",
                        message: chalk.grey("enter your amount"),
                        type: "number"
                    }
                ]
            );
            
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
            myBalance -= amountAns.amount;
            console.log(chalk.green(`${amountAns.amount} Withdraw Successfully`));
            console.log(chalk.yellow(`Your remaining balance is: ${myBalance}`));
            }
        }

} else if (operationAns.operation === "check balance"){
    console.log(chalk.green(`Your balance is: ${myBalance}`));
}
}

else{
    console.log(chalk.red("Incorrect pin code, Try Again!"));
}

const {confirm} =await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message: chalk.magentaBright("Do you want to run ATM machine again?"),
    default: false,
  });
  
     runATM = confirm;
    }
  console.log(chalk.yellow("\n\t******************************************************\t"));

  console.log(chalk.greenBright("\n\tThank you for using the SAM ATM Machine!\t"));
  
  }
runATM()

