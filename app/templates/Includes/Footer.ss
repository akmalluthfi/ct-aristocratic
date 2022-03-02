<!-- Footer Begin -->
<div style="background-color: #003344;" class="pt-5">
    <div class="container py-5">
        <div class="row">
            <!-- col-sm-12 col-md-6 col-lg-4 -->
            <div class="col-sm-12 col-md-4 col-lg-3 mb-5">
                <h3 class="mb-4 text-uppercase color-green fw-max">Aristocratic</h3>
                <% with $SiteConfig %>
                <p class="text-white">$FooterContent</p>
                <% end_with %>
                <div class="ms-auto icon-pack">
                    <% loop $SiteConfig.getSocial %>
                    <a class="me-2" href="$Link" target="_blank">$Icon.RAW</a>
                    <% end_loop %>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                <h3 class="mb-4 mt-1 fs-6 text-white text-uppercase fw-max" style="height: 34px;">Photo Gallery</h3>
                <div class="row justify-content-md-between">
                    <% loop $SiteConfig.getGallery %>
                    <div class="mb-3 col-4">
                        $Picture.Fill(74,74)
                    </div>
                    <% end_loop %>
                </div>
            </div>
            <div class="col-sm-12 col-md-3 mb-5 text-white mx-md-4">
                <h3 class="fs-6 text-uppercase fw-max mb-4 mt-1" style="height: 34px;">Services</h3>
                <ul class="list-unstyled">
                    <% loop $SiteConfig.getServicesName %>
                        <li class="mb-1 text-uppercase">$Title</li>
                    <% end_loop %>
                </ul>
            </div>
        </div>
    </div>
</div>
<div style="background-color: #002f3d;height: 50px;" class="text-white text-uppercase fw-bold fs-sm">
    <div class="h-100 container d-flex align-items-center">
        <p class="m-0">copyright {$Now.Year}, developed by
            <span class="color-green">Akmal Luthfi</span></p>
    </div>
</div>
<!-- Footer End -->
