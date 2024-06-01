# Computercraft side

The scripts used for programming the computers in the minecraft server. The server runs cc-tweaked-1.20.1-forge-1.109.6. It interfaces with a vault that is from the mod create-1.20.1-0.5.1. 



There are two scripts. That's because the storage area is split into two sides with each their own controller.



### The setup

The storage in split into two sides. Each has a row of 8 vaults, grouped in sets of 2. Not all vaults are used to store items that are worth tracking. The items chosen to track are all chosen because they are connected to a automatic farm running nearby. These farms being a sheep sheering farm, a chicken farm and a crop farm. Each side has a separate advanced computer with the display script running on startup. The computer is connected to the vaults via a modem and network cables.



### How it works

On startup the computer does a scan for all vaults connected to its network. It then preforms it's initial count by retrieving the inventory of each connected vault. For each inventory it retrieves it loops over each item and check if the item is an item that should be tracked. If it is it adds the number of items in this inventory slot its corresponding key in the list. It then populates the previous value with this initial count

It then starts periodically repeating this step, the only difference being that after the count it preforms a check. It loops over each item of the previous list and checks if there has been a change in numbers compared to the most recent count. If there is a difference it send an API request using the http API from cc tweaked to my webserver with a request to add or remove the difference between the old stock and the new stock. When this is done it stores the most recent count in the previous value and waits a couple of seconds before starting a new count.


