<div class="bg-whitesmoke">
    <div class="container py-5">
        <%-- Navigation breadcrumb --%>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb p-3">
                <li class="breadcrumb-item fs-3" aria-current="page">$Breadcrumbs</li>
            </ol>
        </nav>

        <%-- Content --%>
        <div class="card mb-3">
            <img src="$Thumbnail.Link" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">$Title</h5>
                <p class="card-text m-0"><small class="text-muted"><i class="fa-solid fa-tags me-2"></i>$CategoriesList</small></p>
                <p class="card-text"><small class="text-muted"><i class="fa-solid fa-circle-info me-2"></i></i>Created By $Writer at $Date.Nice</small></p>
                <p class="card-text">$Content</p>
            </div>
        </div>

        <%-- Releated Post --%>
        <% if $ReleatedPosts %>
            <h1 class="text-center mx-auto my-5 pb-3 comments-title" style="border-bottom: 5px double silver; width:26%;">Releated Posts</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <% loop $ReleatedPosts %>
                    <div class="col">
                        <div class="card h-100">
                            <%-- <img src="$Thumbnail.Link" class="card-img-top" alt="..."> --%>
                            $Thumbnail.Fill(354, 200)
                            <div class="card-body">
                                <h5 class="card-title">$Title</h5>
                                <p class="card-text m-0"><small class="text-muted"><i class="fa-solid fa-tags me-2"></i>$CategoriesList</small></p>
                                <p class="card-text"><small class="text-muted"><i class="fa-solid fa-circle-info me-2"></i></i>Created By $Writer at $Date.Nice</small></p>
                                <p class="card-text">$Content.LimitWordCount(20,'...')</p>
                            </div>
                        </div>
                    </div>
                <% end_loop %>
            </div>
        <% end_if %>

        <%-- Comment --%>
        <h1 class="text-center mx-auto my-5 pb-3 comments-title" style="border-bottom: 5px double silver; width:18%;">Comments</h1>
        <div id="comments" data-url="{$Link}getComments?id={$ID}">
            <% loop $Comments %>
                <%-- <div class="card mb-3">
                    <div class="row">
                        <div class="pt-3 ps-4" style="width: fit-content;">
                            <img src="../../images/profile-default.jpg" class="rounded-circle" height="50px" alt="...">
                        </div>
                        <div class="card-body col-5 ps-0 pe-5 pb-4">
                            <h5 class="card-title">$Name</h5>
                                <h6 class="card-subtitle mb-2 text-muted">$Created.Long</h6>
                            <hr class="mt-0">
                            <p class="card-text">$Comment</p>
                        </div>
                    </div>
                </div> --%>
            <% end_loop %>
        </div>
        <%-- End Comment --%>

        <%-- Form Comment --%>
        <div class="row my-5">
            <div class="col-12">
                <h5 class="card-title">Leave a reply</h5>
                <h6 class="card-subtitle mb-2 text-muted">Required fields are marked*</h6>
            </div>

            <%-- Class visually-hidden untuk hidden --%>
            <div class="col-12 my-3 d-flex justify-content-center" id="sign-in">
                <div>
                    <h6>Please Sign In to comment</h6>
                    <%-- Cara 2 : Modifikasi button --%>
                    <div id="my-signin2"></div>
                    <%-- Cara 1 --%>
                    <%-- <div class="g-signin2" data-onsuccess="onSignIn"></div> --%>
                </div>
            </div>
            
            <form action="{$Link}handleComment" method="post" class="row my-4" id ="form-comment">
            </form>
        </div>
    </div>
</div>

<%-- <script>
    function onSignIn(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);

        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log("Name: " + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
</script> --%>

