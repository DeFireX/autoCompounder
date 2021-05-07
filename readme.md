# Installation
1. Install Node.js ([nodejs.org](https://nodejs.org/en/download/))

    We recommend to use Ubuntu and install nodejs via package manager.
     
    **Node.js v12.x**:
    
    ```sh
    # Using Ubuntu
    curl -fsSL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Using Debian, as root
    curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
    apt-get install -y nodejs
    ```
2. Run npm install in project directory
    ```sh
    npm i
    ```
3. Create .env file (nano ./.env) and add required information
    ```
    USER_ADDRESS=
    USER_PK=
    WITH_PROFIT_ONLY=1
    ```
    USER_ADDRESS is a wallet address like 0xc8F595E2084DB484f8A80109101D58625223b7C9
    
    USER_PK is a private key for USER_ADDRESS, private key is required to automated sending transactions
    
    WITH_PROFIT_ONLY indicates that we send trx only when user has a profit

    Make sure you have some BNB on your USER_ADDRESS balance (not less than 0.03 BNB).
    
    **Don't use you main wallet, just create empty one and send some BNB.**
4. Run the script, check it runs properly without any errors
    ```sh
    node ./index.js
    ```
5. Install pm2 process manager
    ```sh
    npm i pm2 -g
    ```
6. Add script to pm2 to loop the process
    ```sh
    pm2 start ./index.js --name DefireXAutoCompounder
    ```
    You may check the logs via
    ```sh
    pm2 logs
    ```
   
    Stop the script
    ```sh
    pm2 stop DefireXAutoCompounder
    ```
    or
   
    ```sh
    pm2 stop 0
    ```
7. Enable to restart script on server reboot
    ```sh
    pm2 save
    pm2 startup
    ```
