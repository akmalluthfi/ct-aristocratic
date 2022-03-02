<!-- Navbar Content Begin -->
<nav class="navbar navbar-expand-lg navbar-light bg-light py-0">
    <div class="container justify-content-between">
        <a class="navbar-brand fw-bolder color-blue fs-4" href="#">Aristocratic</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav fw-bold text-uppercase fs-sm col-5 justify-content-evenly">
                <% loop Menu(1) %>
                    <a style="width:fit-content" class="px-0 py-3 nav-link <% if $isCurrent %>nav-active<% end_if %>" href="$Link">$MenuTitle</a>
                <% end_loop %>
            </div>
            <div class="text-uppercase text-white bg-green fw-bold fs-sm text-center p-special" href="#">Get a
                Quote</div>
        </div>
    </div>
</nav>
<!-- Navbar Content End -->