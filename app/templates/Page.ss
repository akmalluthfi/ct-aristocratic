<!DOCTYPE html>
<html lang="en">

<head>
    $MetaTags
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-signin-client_id" content="887438697768-jotrqkhqegh4o6d0elnum79h5snicimp.apps.googleusercontent.com">

    <%-- Google Font --%>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
</head>

<body>

    <% include Header %>
    <% include Navbar %>

    $Layout

    <% include Footer %>


    <%-- session flasher --%>
    <div class="flash" id="flash" data-flash="$flash"></div>

    <!-- Modal structure -->
    <div id="modal" data-iziModal-fullscreen="true"  data-iziModal-icon="icon-home">
        <!-- Modal content -->
    </div>

    <!-- Font Awasome Kits -->
    <script src="https://kit.fontawesome.com/cdf3502273.js" crossorigin="anonymous"></script>
    <!-- RECAPTCHA Script -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <%-- Google Platform for login --%>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
</body>

</html>