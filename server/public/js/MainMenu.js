
const COLOR_PRIMARY = 0x00FF00;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    preload() {
        this.load.image('user', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/person.png');
        // this.load.image('password', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/key.png');
      
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });        
    }

    create() {

        var self = this;
        var print = this.add.text(0, 0, '');
        // loginDialog
        var mainMenuDialog = CreateMainMenuDialog(this, {
            x: 400,
            y: 300,
            title: 'Feathery Flight',
            username: 'nickname',
            // password: '123',
            // login
        })
            .on('createLobby', function (username) {
                console.log(username);
                self.nickname = username=='nickname' ? 'player' : username;
                self.scene.start('hostLobby');
            })
            .on('joinLobby', function (username) {
                console.log(username);
                self.nickname = username=='nickname' ? 'player' : username;
            
                self.scene.start('joinLobbyInput');
            })
            //.drawBounds(this.add.graphics(), 0xff0000);
            .popUp(500);
      
        
    }

    update() { }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var CreateMainMenuDialog = function (scene, config, onSubmit) {
    var username = GetValue(config, 'username', '');
    // var password = GetValue(config, 'password', '');
    var title = GetValue(config, 'title', 'Welcome');
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
    var titleField = scene.add.text(0, 0, title);
    var userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.add.image(0, 0, 'user'),
        text: scene.rexUI.add.BBCodeText(0, 0, username, { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
        space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10, }
    })
        .setInteractive()
        .on('pointerdown', function () {
            var config = {
                onTextChanged: function(textObject, text) {
                    username = text;
                    textObject.text = text;
                }
            }
            scene.rexUI.edit(userNameField.getElement('text'), config);
        });

    var loginButton = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, 'Create Lobby'),
        space: { top: 8, bottom: 8, left: 8, right: 8 }
    })
        .setInteractive()
        .on('pointerdown', function () {
            loginDialog.emit('createLobby', username);
        });

    var joinLobbyButton = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, 'Join Lobby'),
        space: { top: 8, bottom: 8, left: 8, right: 8 }
    })
        .setInteractive()
        .on('pointerdown', function () {
            loginDialog.emit('joinLobby', username);
        });


    var loginDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(titleField, 0, 'center', { top: 10, bottom: 10, left: 10, right: 10 }, false)
        .add(userNameField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
        // .add(passwordField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
        .add(loginButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
        .add(joinLobbyButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
        .layout();
    return loginDialog;
};
// var markPassword = function (password) {
//     return new Array(password.length + 1).join('•');
// };

    

