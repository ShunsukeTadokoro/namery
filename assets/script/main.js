var NAMERO = NAMERO || {};

NAMERO.AjaxJsonManager = function($formElem) {
  this.$formElem = $formElem;
  this.$submitBtn = this.$formElem.find('#jsi-send');
  this.$inputElem = this.$formElem.find('input[type="text"]');
  this.$resultArea = $('#result');

  this.init();
};

NAMERO.AjaxJsonManager.prototype = {
  init: function() {
    this.bindEvent();
  },

  bindEvent: function() {
    var _self = this;

    this.$submitBtn.on('click', function(e) {
      e.preventDefault();
      _self.shoeExample();
    });
  },

  shoeExample: function() {
    var thesaurusJson = this.fetchThesaurus(this.$inputElem.val());
  },

  fetchThesaurus: function(keyword) {
    var _self = this;
    $.ajax({
      url: "http://words.bighugelabs.com/api/2/cb575a516abc31bc91c9d311bb5aeab3/"+keyword+"/json",
      dataType: "json",
      type: "GET",
      success: function(json) {
        _self.passThesaurusToGithub(json);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  },
  passThesaurusToGithub: function (json) {
    this.$resultArea.find("li").remove();
    var verb = json.verb;
    var verBsyn = verb.syn;
    for(var verbItem in verBsyn) {
      console.log(verBsyn[verbItem]);
      this.$resultArea.append('<li>' + verBsyn[verbItem] + '</li>');
    }
  }
};

$(function() {
  new NAMERO.AjaxJsonManager($('#jsi-search-form'));
});
