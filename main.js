
var mraa = require('mraa'); //require mraa
var LCD  = require ('jsupm_i2clcd');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var ledPin8 = new mraa.Gpio(8);
var ledPin9 = new mraa.Gpio(9);
var ledPin10 = new mraa.Gpio(10);

var lcdMessage=" ";
var myLCD = new LCD.Jhd1313m1(0, 0x3E, 0x62);

amazing();

function amazing(){
    

var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
var analogValue = analogPin0.read(); //read the value of the analog pin
    

ledPin8.dir(mraa.DIR_OUT); //set the gpio direction to output
ledPin9.dir(mraa.DIR_OUT);
ledPin10.dir(mraa.DIR_OUT);

if(analogValue >1000){
    ledPin8.write(0); //B
    ledPin9.write(128); // G
    ledPin10.write(0); //R
    myLCD.setColor(0,128,0);
    lcdMessage = "alot of Water!";
}else if(analogValue <1000 && analogValue >100){
    ledPin8.write(0); //B
    ledPin9.write(255); // G
    ledPin10.write(255); //R
    myLCD.setColor(255,255,0);
    lcdMessage = "Enough Water!";
}else if(analogValue <100){
    ledPin8.write(0); //B
    ledPin9.write(0); // G
    ledPin10.write(255); //R
    myLCD.setColor(255,0,0);
    lcdMessage = "Low on Water!";
}

myLCD.setCursor(0,0);
if (myLCD.read() == lcdMessage){
}else{
    myLCD.clear();
    myLCD.write(lcdMessage);
}
console.log(analogValue); //write the value of the analog pin to the console
setTimeout( amazing, 1000 );
}