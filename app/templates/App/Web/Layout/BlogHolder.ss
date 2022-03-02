<div class="bg-whitesmoke">
    <div class="container py-5">
        <div class="row">
            <%-- Begin Content --%>
            <div class="col-12 col-lg-8">
                <%-- Search --%>
                <form action="$Link" id="form-search">
                    <div class="input-group flex-nowrap mb-3">
                        <span class="input-group-text" id="addon-wrapping"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Post title ..." aria-label="Username"
                            aria-describedby="addon-wrapping" name="keyword" id="keyword" />
                    </div>
                </form>
                <div class="main-content">
                    <% include App/Web/BlogResult %>
                </div>
            </div>
            <%-- End Content --%>
            <%-- Begin Sidebar --%>
            <div class="col-12 col-lg-4 bg-white rounded-3">
                <%-- Categories --%>
                <div class="categories">
                    <h3 class="mx-auto display-6 pb-3 my-5"
                        style="border-bottom: 5px double silver;width: fit-content;">
                        Categories
                    </h3>
                    <ul class="list-group list-group-flush">
                        <%-- list-active --%>
                        <% loop $Categories %>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <a href="$Link" class="text-decoration-none text-black category">$Name</a>
                            <span class="badge bg-blue rounded-pill">$Posts.Count</span>
                        </li>
                        <% end_loop %>
                    </ul>
                </div>
                <%-- Subscribe --%>
                <div class="subs p-2 my-5">
                    <i class="text-center fa-regular fa-envelope-open w-100 mb-4 color-green"
                        style="font-size: 80px"></i>
                    <h4 class="text-center fw-bold">Subscribe To Our Newsletter</h4>
                    <p class="text-center text-black-50">Join our subscribers list to get the latest news, updates and
                        special offers
                        delivered in your inbox</p>
                    <form action="{$Link}handleSubs" method="post" id="formSubs">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Enter your email" name="email-subs" id="email-subs" aria-label="Enter your email" aria-describedby="btn-subs" required>
                            <button class="btn btn-outline-green" type="submit" id="btn-subs">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            <%-- End Sidebar --%>
        </div>
    </div>
</div>
