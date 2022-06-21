# defiant-loyalty-check
Checks which defiant members deserve different loyalty ranks to the ones they currently have.

### Running
To run the program, clone this repository to your local machine and make sure that node.js is installed.
In the cloned directory, open a console window and type "node main.js".

A config file will be created and should be modified to the desires of the user.

Here is the default config file.
```
"ranks": {
  "Member": 0,
  "Loyal": 4,
  "Elder": 8,
  "Veteran": 12,
  "Immortal": 24 
},
"TIME_UNIT_MS": 2629800000,
"guild": "Defiant"
```

The `ranks` value should contain the ranks players get through guild seniority, along with the number of months they need to be in the guild to receive said rank. The `ranks` value must be in ascending order of seniority.

The `TIME_UNIT_MS` value corresponds to the number of milliseconds for the time unit used in the rank values. The default value corresponds to 1 month.

The `guild` value is the name of the guild to be checked.
