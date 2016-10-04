/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
File: webdows/cmd.js
*/
new explorer.window()
.title('Command Prompt')
.resize(500, 300)
.icon('webdows/resources/icons/scre.ico')
.center()
.callback(function() {
    var win = this;
    var body = this.body;
    body.css({'background-color':'#000','color':'white'});
    body.html('<div>Below Average Webdows [Version 0.0.00001]<br>(c) 2015 Below Average. All Rights Reserved.<br><br></div><span>$></span><input>');
    body.find('span').attr('style', 'height:20px;width:20px;');
    body.find('input').css({'font-family':'NotoSans','font-size':'16px','height':'20px','width':'calc(100% - 20px)','border':'none','box-shadow':'none','background-color':'black','color':'white'});
    var history = [];
    body.find('input').keydown(function(event) {
        var dis = $(event.target);
        if(event.which == 38) { 
            event.preventDefault();
            history.unshift(history.pop());
            dis.val(history[0]);
        }
        if(event.which == 40) {
            event.preventDefault();
            history.push(history.shift());
            dis.val(history[0]);
        }
        if(event.which == 13) {
            event.preventDefault();
            var command = dis.val();
            history.push(command);
            body.children('div').append('<div>$>'+command+'</div>');
            if(command == 'cls') {
                body.find('div').html('');
            } else if(command == 'exit') {
                win.close();
            } else {
                try {
                    var ret = eval(command);
                    system.loader(command);
                } catch(error) {
                    body.children('div').append('<div style="color:red;">'+error+'</div>');
                } 
            }
            if(typeof ret !== 'undefined') {
                body.children('div').append('<div style="color:gray;">'+ret+'</div>');
            }
            body.scrollTop(body[0].scrollHeight);
            dis.val('');
        }
    });
    body.click(function() {
        body.find('input').focus();
    });
});