## Overview
This is a chat application that allows users to send other users messages via a TCP server with a small list of extra functionality.

## Getting Started
Run the command ```node index.js``` in the terminal at the root of your repository. In a seperate tab, connect to the terminal using the command ```nc localhost 3000```. You should recieve a message welcoming you to the chat.

## Usage
To send a message, type anything into the console and hit enter. Your message will be sent to everyone in the chat.

Users can change their names by writing the following command. ```@nickname <newNameHere>```

To send a direct, private, message that only the specified user can read, type the following command ```@dm <receiversName>```. 

To view a list of all users currently signed in the chat, simply type ```@list``` and you will see a list of users logged in. 

Author: Josiah Green

Version 1.0.0
