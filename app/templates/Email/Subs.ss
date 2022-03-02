<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Templates</title>

    <!-- Font google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">

    <style>
        /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
        */

        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }

        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block;
        }

        body {
            line-height: 1;
        }

        ol,
        ul {
            list-style: none;
        }

        blockquote,
        q {
            quotes: none;
        }

        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
            content: '';
            content: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        /* End Css reset  */

        /* begin My CSS */
        body {
            background-color: whitesmoke;
            font-family: 'Lato', sans-serif;
            padding: 1rem;
            width: 540px;
            margin: auto;
        }

        header h1 {
            padding-top: 1rem;
            padding-bottom: 1rem;
            font-size: 24px;
            font-weight: 700;
        }

        .content .text-center {
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        .big-icon {
            width: 200px;
        }

        .content h2 {
            font-size: 30px;
            font-weight: 400;
        }

        .content h3 {
            font-size: 24px;
            font-weight: 300;
        }

        .content h3.heading {
            font-size: 20px;
            line-height: 2rem;
            font-weight: 400;
            margin-bottom: 1rem;
        }

        ul>li {
            margin-bottom: 10px;
        }

        .rounded-circle {
            width: 15px;
            height: 15px;
            /* background-color: white; */
            border-radius: 50%;
            padding: 10px 10px 10px;
            border: 1px solid #003344;
            margin-left: 8px;
            margin-right: 8px;
        }

        .rounded-circle img {
            fill: #003344;
            width: 15px;
        }

        h5.text-center {
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .text-center {
            text-align: center;
        }

        .color-green {
            color: #79b846;
        }

        .d-flex {
            display: flex;
        }

        .d-inline {
            display: inline-block;
        }

        .justify-content-between {
            justify-content: space-between;
        }

        .justify-content-center {
            justify-content: center;
        }

        .icon-item {
            width: 10px;
            color: #003344;
            vertical-align: middle;
            height: 100%;
        }

        .icon-text {
            font-size: 10px;
        }

        .bg-white {
            background-color: white;
        }

        .shadow {
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, .075);
        }

        .rounded {
            border-radius: 10px;
        }

        .p-1 {
            padding: 1rem;
        }

        .mt-3 {
            margin-top: 3rem;
        }

        .mt-2 {
            margin-top: 2rem;
        }

        .details p {
            margin: 1px;
        }

        .details {
            padding-left: 30px;
        }

        .btn-reply {
            cursor: pointer;
            padding: 10px 30px;
            border: 1px solid #79b846;
            background-color: white;
            color: #79b846;
            font-weight: 400;
            border-radius: 5px;
        }

        .btn-reply:hover {
            background-color: #79b846;
            color: white;
        }

        .w-100 {
            width: 100%;
        }

        .content {
            padding: 3rem 2rem;
        }
    </style>
</head>

<body>
    <!-- Header -->
    <header>
        <h1 class="color-green">Aristocratic</h1>
    </header>

    <!-- Content -->
    <div class="bg-white shadow rounded p-1 content">
        <div class="text-center">
            <img src="http://localhost{$Link}/images/email/party.svg" class="big-icon">
        </div>
        <!-- <h2 class="text-center">Halo Admin</h2> -->
        <h2 class="text-center">Your Email has been confirmed</h2>
        <h3 class="heading text-center">Yay, you're ready to receive an email every time there is a new post </h3>
        <div class="w-100 text-center mt-2">
            <button class="btn-reply">Back to Aristocratic.com</button>
        </div>
        <p style="font-weight: 700;margin-bottom: 1rem;">Have a question?</p>
        <p>You can contact me, you can contact me, link is available below</p>
    </div>

    <!-- Footer -->
    <footer class="mt-2">
        <h5 class="text-center">Visit Us</h5>
        <p style="margin-bottom: 1rem;">$SiteConfig.FooterContent</p>
        <div class="icon d-flex justify-content-center">
            <a href="$SiteConfig.getSocialById(1).Link">
                <div class="rounded-circle">
                    <img src="http://localhost{$Link}/images/email/facebook-f-brands.svg" alt="facebook" style="width: 10px;">
                </div>
            </a>
            <a href="$SiteConfig.getSocialById(2).Link">
                <div class="rounded-circle">
                    <img src="http://localhost{$Link}/images/email/twitter-brands.svg" alt="twitter">
                </div>
            </a>
            <a href="$SiteConfig.getSocialById(3).Link">
                <div class="rounded-circle">
                    <img src="http://localhost{$Link}/images/email/linkedin-in-brands.svg" alt="linkedin">
                </div>
            </a>
            <a href="$SiteConfig.getSocialById(4).Link">
                <div class="rounded-circle">
                    <img src="http://localhost{$Link}/images/email/google-plus-g-brands.svg" alt="googleplus" style="width: 18px;">
                </div>
            </a>
            <a href="$SiteConfig.getSocialById(5).Link">
                <div class="rounded-circle">
                    <img src="http://localhost{$Link}/images/email/earth-americas-solid.svg" alt="world">
                </div>
            </a>
        </div>
        <p class="mt-2 text-center">You received this email because you subscribe Aristocratic </p>
        <p class="text-center">you can <a href="">unsubscribe</a> here</p>

        <p class="mt-2 text-center" style="font-weight: 700;font-size: 12px;">COPYRIGHT 2022, DEVELOPED BY AKMAL LUTHFI
        </p>
    </footer>
</body>

</html>