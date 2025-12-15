#include <Arduino.h>
#line 1 "C:\\Users\\HP\\Downloads\\sketch_oct27a\\sketch_oct27a.ino"
#include <Servo.h>

Servo servo;

int rainPin = A0;  // pin rainsensor
int rainValue;     //analog dari sensor

#line 8 "C:\\Users\\HP\\Downloads\\sketch_oct27a\\sketch_oct27a.ino"
void setup();
#line 13 "C:\\Users\\HP\\Downloads\\sketch_oct27a\\sketch_oct27a.ino"
void loop();
#line 8 "C:\\Users\\HP\\Downloads\\sketch_oct27a\\sketch_oct27a.ino"
void setup() {
  servo.attach(12);          // servo di pin 12
  Serial.begin(9600);
}

void loop() {
  rainValue = analogRead(rainPin);  // baca sensor
  Serial.print("Nilai Hujan: ");
  Serial.println(rainValue);

  if (rainValue < 500) {  
    servo.write(90);       
    Serial.println("terangg");
  }
   else {               
    servo.write(0);      
    Serial.println("udannnnnn");
  }

  delay(500);
}


//SERVO = Biru:5v,Putih:GND,kuning:sig
//RAIN  = coklat:A0,merah:3,3v,orange:gnd

