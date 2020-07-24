/**
 * Custom Modal with alert or confirm
 *
 * @param  {String} selector   "id, class, tag" selector
 * 
 * @return {Object}            selector in js
 */

(function(window) {

    window.el = function(selector) {
        return document.querySelector(selector);
    };

})(window);

/**
 * Custom Modal with alert or confirm
 *
 * @param  {String} type        Choose "alert" or= "confirm"
 * @param  {String} message     Message in modal box
 * 
 * @return {Boolean}            When choose "confirm", have return value true / false
 */

function Modal(type, message) {
    self = this;
    self.type = type;
    self.message = message;
    self.result = false;

    self.init();
    (self.type === "alert") ? self.alert() : self.confirm();
}

Modal.prototype.init = function() {
    self.render();
    self.bodyScrollDisable();
    self.bind();
    self.disabledDeemed();
};

Modal.prototype.render = function() {
    var label = {},
        markup = {},
        message  = self.message,
        template = '';

    label = { okay: "확인", cancel: "취소" };
    markup = {
        deem: '<div id="deemed" class="deemed"></div>',
        message: '<p>' + message + '</p>',
        button: {
            okay: '<button type="button" id="btnModalOkay" class="btn-modal action">' + label.okay + '</button>',
            cancel: '<button type="button" id="btnModalCancel" class="btn-modal">' + label.cancel + '</button'
        }
    };

    template += markup.deem;
    template += '<div id="modal" class="modal" tabindex="-1" role="dialog">';
    template += ' <div class="modal-content">';
    template += markup.message;
    template += ' </div>';
    template += ' <div class="modal-bottom">';            
    template += (self.type === "alert") ? markup.button.okay : markup.button.okay + "\n" + markup.button.cancel;
    template += '</div>';
    template += '</div>';
    document.body.innerHTML = template;
};

Modal.prototype.bind = function() {

    el("#modal button").addEventListener("click", function(event) {
        var id = event.target.id;
        
        if (self.type === "confirm") {
            self.result = (id === "btnModalOkay") ? true : false;

            if (id === "btnModalOkay" || id === "btnModalCancel") 
                self.close();
            }
        }
    );
};

Modal.prototype.alert = function() {
    console.log(self.message);
};

Modal.prototype.confirm = function() {
    console.log(self.message);
    self.result = true;
    return self.result;
};

Modal.prototype.disabledDeemed = function() {
    el("#deemed").addEventListener("click", function(event) {
        event.preventDefault();
    });
};

Modal.prototype.close = function() {
    el(".deemed").style.display = 'none';
    el(".modal").style.display = 'none';
    self.bodyScrollEnable();
};

Modal.prototype.bodyScrollDisable = function() {
    document.body.style.overflow = 'hidden';
};

Modal.prototype.bodyScrollEnable = function() {
    document.body.style.overflow = 'auto';
};