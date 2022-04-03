# Product environment setup

1. Install Windows 10
    - disable automaticaly update (1. run: services.msc 2. Disabled from the Startup type dropdown menu)
    - disable notificatioin
    - disable screen and disk sleep

    - https://docs.microsoft.com/en-us/windows/configuration/kiosk-shelllauncher
    - https://docs.microsoft.com/en-us/answers/questions/249751windows-10-kiosk-scripting-registry-change-for-she.html
2. Add app to startup

    - Install the application 
    ```shell
    C:\Users\artisreit_kiosk\AppData\Local\Programs\300main_kiosk_app\300main_kiosk_app.exe
    ```
    - Copy the shortcut of the app to this dir (artisreit_kiosk is the username of login user)
    ```shell
    C:\Users\artisreit_kiosk\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
    ```
    - Set environment variable to specify the page to display
    ```shell
    APP kiosk_left.index
    #or
    APP kiosk_right.index
    #or
    APP kiosk_center.index
    ```

3. Set skiping Login screen

    - Open Start Menu and search for netplwiz and hit Enter.
    - In the window that opens, uncheck the option that says “Users must enter a username and password to use this computer”
    - Now, enter and repeat your password and click OK
    - Restart your computer. You’ll notice that you’ll be signed in automatically, without the need to enter your password

4. install Syncthing
    - https://github.com/canton7/SyncTrayzor/releases/tag/v1.1.29


5. nginx + winsw

6. ssh, ftp

7. ssh -oPort=6001 artisreit_kiosk@localhost

8. restart everyday at 12:59:59 PM
 
9. setup frp

# Development 

1. Set up development environment in windows system

    ```shell
    git clone https://github.com/chet-cloud/300main_kiosk_app.git
    cd 300main_kiosk_app
    npm install 
    ```

2. Preview or development the app
    ```shell
    # Set environment variable to specify the page to display
    $Env:APP = "kiosk_left.html" # if in Windows PowerShell
    npm start  
    ```

3. Genarate the app installer
    ```shell
    npm run package-win  # find the exe installer in ./dist and install the app in windows for the first time
    ```

4. Publish app (https://github.com/iffy/electron-updater-example)
    - Publish to github
    ```shell
    # 1. update version number, "version": "0.8.4" -> "version": "0.8.5", then:

    # 2. update the package to github release page
    # export GH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    # or $Env:GH_TOKEN = "xxxxxxxxxxxxxxxx"
    npm run publish-win # will create pre-publish tag

    # 3. update pre-publish to publish in github release page, the running application will update automatically
    ```

