<!-- Jumbotron Begin -->
<div class="hero-img"
    style="background: linear-gradient(rgba(0, 51, 68, 0.788), rgba(0, 51, 68, 0.6)), url('$Banner.Link');">
    <div class="container h-100">
        <div class="h-100 d-flex align-items-center">
            <div class="col-12 col-md-6 text-white">
                <h2 class="fw-max">$SubTitle</h2>
                <p>$Content</p>
                <a href="#about-us" class="mt-4 me-3 text-uppercase rounded-none btn text-white bg-green fw-bold py-2 px-4 fs-sm border-2-green">Learn More</a>
                <a href="<% with $Page(contact-us) %>$Link<% end_with %>" class="mt-4 text-uppercase rounded-none btn text-white bg-green fw-bold py-2 px-4 fs-sm border-2-green">Contact Us</a>
            </div>
        </div>
    </div>
</div>
<!-- Jumbotron End -->

<!-- About Us Begin -->
<div class="container py-5" id="about-us">
    <div class="row pb-5">
        <% loop $getAbout %>
        <div class="col-md-6 col-12 mb-3">
            <h3 class="text-uppercase fw-max color-blue mb-5">$SubTitle</h3>
            <p>$Content</p>
            <a href="$Link" class="d-flex align-items-center justify-content-center my-4 mx-2 rounded-none btn text-white bg-green fw-bold fs-sm border-2-green" style="width: 145px;height: 45px;">Read More<i class="ms-3 fas fa-long-arrow-alt-right"></i></a>
        </div>
        <div class="col-md-6 col-12 mb-3">
            <div class="iframe">
                <div class="container-iframe">
                    $Iframe.RAW
                    <div class="iframe-overlay" title="$SubTitle"></div>
                </div>
            </div>
        </div>
        <% end_loop %>
    </div>
</div>
<!-- About Us End -->

<!-- Service Begin -->
<div style="background-color: whitesmoke;">
    <div class="container pt-5">
        <h3 class="text-center fw-max color-blue text-uppercase py-4">Aristocratic Services</h3>
        <div class="row justify-content-center justify-content-md-between">
            <!-- 01 -->
            <% loop $getServices %>
            <div class="bg-white col-12 col-md-6 col-lg-4 row my-4 p-3 service-card">
                <div class="col-4" style="width: 74px;">
                    <div class="icon bg-green rounded" style="height: 50px;">
                        $Icon.RAW
                    </div>
                </div>
                <div class="col-8">
                    <h6 class="h-100 d-flex align-items-center fw-max color-blue text-uppercase">$Title</h6>
                </div>
                <div class="col-12 mt-3">
                    <p>$Content.LimitWordCount(25,'...')</p>
                </div>
                <div class="col-12 mb-4">
                    <div class="content-hover">
                        <a class="text-decoration-none fs-6 fw-bold color-blue" href="$Link">READ MORE</a>
                        <i class="fas fa-angle-double-right ms-2"></i>
                    </div>
                </div>
            </div>
            <% end_loop %>
        </div>
        <div class="d-flex justify-content-center pt-4 pb-5">
            <button type="button" class="rounded-none btn text-white bg-green fw-bold py-2 px-4 fs-sm border-2-green" style="height: 50px;width: 200px;">View All Service</button>
        </div>
    </div>
</div>
<!-- Service End -->
