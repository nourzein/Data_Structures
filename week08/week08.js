# include "Adafruit_ADT7410.h"

// Create the ADT7410 temperature sensor object
Adafruit_ADT7410 tempsensor = Adafruit_ADT7410();
double tempvalue;

void setup()
{
  tempsensor.begin();
  // sensor takes 250 ms to get first readings
  delay(500);
  Particle.variable("tempsensor", &tempvalue, DOUBLE);
}

void loop()
{
  // Read and print out the temperature, then convert to *F
  float c = tempsensor.readTempC();
  //float f = (c * 9 / 5) + 32; 

  tempvalue = c; 
  delay(500);
}