title = "jquery.keyframes"
comment = "jQuery-Keyframes generates and plays CSS3 keyframes quickly and easily allowing you to concentrate on the content of your project whilst cutting down code."
githubLink = "https://github.com/Ianus/jQuery-Keyframes"
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
      $.keyframe.add({
        name: "rotation",
        "from": $.keyframe.browserCode()+"transform:rotate(0deg)",
        "to": $.keyframe.browserCode()+"transform:rotate(360deg)",
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
  $("#page-title").text(title)
  $("#page-comment").html(comment)
  $("#forkme-banner").attr "href", githubLink
  )
