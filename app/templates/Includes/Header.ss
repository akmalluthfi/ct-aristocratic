<!-- Header Content Begin -->
<header class="bg-blue">
    <div class="container text-white py-2 d-flex justify-content-between">
        <div class="d-none d-md-block">
            <ul class="m-0 list-unstyled">
                <% loop $SiteConfig.getHeaderInfo %>
                    <li class="d-inline me-4 fs-sm">
                        $Icon.RAW
                        <span>$Content</span>
                    </li>
                <% end_loop %>
            </ul>
        </div>
        <div class="ms-auto icon-pack">
            <% loop $SiteConfig.getSocial %>
                <a class="ms-2" href="$Link" target="_blank">$Icon.RAW</a>
            <% end_loop %>
        </div>
    </div>
</header>
<!-- Header Content End -->