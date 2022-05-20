<!-- Jumbotron Begin -->
<%-- $ElementalArea --%>
<!-- Jumbotron End -->

<!-- About Us Begin -->
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

<%-- Button Live Chat --%>
<div class="chat-main">
  <div class="chat close" style="display: none">
    <div class="chat-header rounded-top p-3">
      Please fill out the form below to start chatting with the next
      available agent.
    </div>
    <div class="chat-content bg-white border border-top-0 p-4 rounded-bottom">
      <form class="start-chat" action="">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            name="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" rows="3" name="message" required></textarea>
        </div>
        <button class="btn btn-outline-info w-100" type="submit">
          <i class="fa-solid fa-paper-plane fa-lg"></i>
        </button>
      </form>
    </div>
  </div>

  <button
    class="btn ms-auto rounded-circle my-3 d-block p-0 border border-dark bg-white"
    id="btn-start-chat"
    >
    <div
      class="d-flex justify-content-center align-items-center position-relative"
      style="width: 50px; height: 50px"
    >
      <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style="margin-left:-20px;margin-top:5px;"></span>
      <i class="fa-regular fa-comment-dots fa-xl"></i>
    </div>
  </button>
</div>