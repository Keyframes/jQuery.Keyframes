title = "jQuery.keyframes"
comment = """
<p><a href="https://github.com/Ianus/jQuery.Keyframes">jQuery.Keyframes</a> is forked from <a href="https://github.com/krazyjakee/">@krazyjakee</a>'s <a href="https://github.com/krazyjakee/jQuery-Keyframes/">jQuery-Keyframes</a></p>
<p><a href="https://github.com/Ianus/jQuery.Keyframes">jQuery.Keyframes</a> like <a href="https://github.com/krazyjakee/jQuery-Keyframes/">jQuery-Keyframes</a> generates and plays CSS3 keyframes quickly and easily allowing you to concentrate on the content of your project whilst cutting down code.</p>
<p><a href="https://github.com/Ianus/jQuery.Keyframes">jQuery.Keyframes</a> introduces</p>
<ul>
<li>some changes in the API </li>
<li>$.keyframe.isSupported() to detect CSS animation support</li>
<li>10% smaller minified version (2.256 kb vs 2.453 kb)</li>
<li>support for keyframe redefinition: if you redifine an existing keyframe, running animation will reflect those changes</li>
</ul>
"""
githubLink = "https://github.com/Ianus/jQuery.Keyframes"
downloadSuffix = "/archive/master.zip"
sourceCode = """
<html>
  <head>
    <style>
          #square{
            width: 100px;
            height: 100px;
            background: blue;
            margin: auto;
          }
    </style>
  </head>
  <body>
    <div id="counter"></div>
    <div id="square"></div>
  </body>
  <!-- Include jQuery -->
  <script src="js/jquery-1.10.2.min.js"></script>
  <script src="js/jquery.keyframes.js"></script>
  <script>
      // declare a new keyframe animation
      $.keyframe.define({
        name: "rotation",
        from: $.keyframe.browserCode()+"transform:rotate(0deg)",
        to: $.keyframe.browserCode()+"transform:rotate(360deg)",
      });
      var rotationCount = 0;
      // Play the keyframe
      $("#square").playKeyframe({
        name: "rotation",
        duration: 1000,
        repeat: "infinite",
        complete: function(){
          rotationCount++;
          $("#counter").text("Rotations completed: " + rotationCount);
        }
      });
  </script>
</html>
"""

tagsToReplace =
  "&": "&amp;"
  "<": "&lt;"
  ">": "&gt;"

replaceTag = (tag) ->
  tagsToReplace[tag] or tag

safe_tags_replace = (str) ->
  str.replace /[&<>]/g, replaceTag

$(->
  safe = safe_tags_replace(sourceCode)
  $("pre > code").html(safe)
  # set title
  $("#page-title .anchor").text(title)
  $("#page-comment").html(comment)
  $("#forkme-banner, #page-title .anchor").attr "href", githubLink
  $("#download").attr "href", githubLink + downloadSuffix
  )
