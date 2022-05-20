<%-- Contact Begin --%>
<div class="container pb-5">
    <!-- Title -->
    <div class="row py-5 brd-double-bottom">
        <div class="col-12 text-center">
            <h4 class="fw-bolder color-green">Aristocratic</h4>
        </div>
        <div class="col-12 text-center">
            <h1 class="fw-bolder color-blue">CONTACT US</h1>
        </div>
        <div class="col-12 text-center">
            <i class="fas fa-star"></i>
            <i class="fas fa-star" style="font-size: 1.5em;"></i>
            <i class="fas fa-star"></i>
        </div>
    </div>
    <!-- Content -->
    <div class="row pt-5">
        <div class="col-lg-6">
            <!-- Maps -->
            <div class="container p-3 h-100">
                $Map.RAW
            </div>
        </div>
        <div class="col-lg-6 border border-1 rounded py-3">
            <form id="formSubmit" class="row g-3" method="POST" action="{$Link}sendForm">
                <div class="col-md-6">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name">
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email">
                </div>
                <div class="col-12">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="phone" name="phone">
                </div>
                <div class=" col-12 mb-3">
                    <label for="message" class="form-label">Your Message</label>
                    <textarea class="form-control" id="message" rows="3" name="message"></textarea>
                </div>
                <div class="col-12">
                    <div class="g-recaptcha" data-sitekey="6LccpwIeAAAAAAL0_hzQmXA45Ma65WT2RWPgqd2Z"></div>
                </div>
                <div class="col-12">
                    <button type="submit" name="btn-contact" id="btn-contact" class="bg-green btn bassic-btn rounded-pill">Send Message</button>
                </div>
            </form>
        </div>
    </div>
</div>
<%-- Contact End --%>

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<%-- Google Platform for login --%>
<script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>