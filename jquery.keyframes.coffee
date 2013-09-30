$createKeyframeStyleTag = (params) ->
  $("<style>").attr( class: "keyframe-style", id:params.id, type:"text/css" )
  	.appendTo("head")

$.keyframe =
  browserCode: ->
    ua = navigator.userAgent
    unless ua.indexOf("Opera") is -1
      "-o-"
    else unless ua.indexOf("MSIE") is -1
      "-ms-"
    else unless ua.indexOf("WebKit") is -1
      "-webkit-"
    else
      ""

  isSupported: ->
    element = $('body').get 0
    animationSupport = false
    if element.style.animationName
      animationSupport = true
    else
      pfx = @browserCode().slice 1,-1
      if element.style[pfx + "AnimationName"]
        animationSupport = true
    
    return animationSupport
    
  generate: (frameData)->
    frameName = frameData.name or ""
    css = "@#{@browserCode()}keyframes #{frameName} {"
    for property of frameData
      unless property is "name"
        css += "#{property}{#{frameData[property]}}"
    css += "}"

    $frameStyle = $("style##{frameData.name}")
    if $frameStyle.length > 0
      $frameStyle.html css

      $elems = $("*").filter ->
        @style["#{$.keyframe.browserCode().slice(1,-1)}AnimationName"] is frameName
      $elems.each ->
      
        $el = $(@)
        options = $el.data "keyframeOptions"
        $el.resetKeyframe ->
          $el.playKeyframe options
    else
      $createKeyframeStyleTag(id:frameName).append css
    
  
  define: (frameData) ->
    if frameData.length
      for frame in frameData
        @generate frame
    else
      @generate frameData

browserType = $.keyframe.browserCode()
animationPlayState = "animation-play-state"
playStateRunning = "running"

$.fn.resetKeyframe = (callback) ->
  $el = $(@).css(browserType + animationPlayState, playStateRunning)
    .css(browserType + "animation", "none")
               
  setTimeout callback, 1 if callback

$.fn.pauseKeyframe = ->
  $el = $(@).css browserType + animationPlayState, "paused"

$.fn.resumeKeyframe = ->
  $(@).css browserType + animationPlayState, playStateRunning

$.fn.playKeyframe = (frameOptions, callback) ->
  if typeof frameOptions is 'string'
    frameOptSplit = frameOptions.trim().split(' ')
    frameOptions =
      name: frameOptSplit[0]
      duration: parseInt(frameOptSplit[1])
      timingFunction: frameOptSplit[2]
      delay: parseInt(frameOptSplit[3])
      repeat: frameOptSplit[4]
      complete: callback

  defaultsOptions =
    duration: 0
    timingFunction: "ease"
    delay: 0
    repeat: 1
    direction: "normal"
    fillMode: "forwards"
    complete: null

  frameOptions = $.extend defaultsOptions, frameOptions

  duration = frameOptions.duration
  delay = frameOptions.delay
  repeat = frameOptions.repeat
  animationcss = "#{frameOptions.name} #{duration}ms #{frameOptions.timingFunction} #{delay}ms #{repeat} #{frameOptions.direction} #{frameOptions.fillMode}"
  callback = frameOptions.complete
  animationkey = browserType + "animation"

  pfx = ["webkit", "moz", "MS", "o", ""]
  _prefixEvent = (element, type, callback) ->
  	p = 0
  	while p < pfx.length
      type = type.toLowerCase() unless pfx[p]
      evt = pfx[p] + type
      element.off(evt).on(evt, callback)
      p++

  return @each ->
  	$el = $(@).addClass("boostKeyframe")
    .css(browserType + animationPlayState, playStateRunning)
    .css(animationkey, animationcss)
    .data("keyframeOptions", frameOptions)

  	if callback
  		_prefixEvent $el, 'AnimationIteration', callback
  		_prefixEvent $el, 'AnimationEnd', callback

$createKeyframeStyleTag(id:"boost-keyframe").append " .boostKeyframe{#{browserType}transform:scale3d(1,1,1);}"
