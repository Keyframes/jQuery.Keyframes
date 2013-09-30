(function() {
  $(window).ready(function() {
    $('.cloud').playKeyframe('clouds 50000 linear 0 infinite normal forwards');
    $('.balloon').playKeyframe('balloon 50000 ease 0 infinite normal forwards');
    return $('.sun').playKeyframe('sun 50000 linear 0 infinite normal forwards');
  });

}).call(this);
