<% if $Result %>
    <h3 style="text-align:end;padding-right:20px">Showing $Result.PageLength result ($Result.TotalItems total)</h3>
    <h6 style="text-align:end;padding-right:20px">Show from $Result.FirstItem - $Result.LastItem</h6>
    <% if $Category %>
        <h6 style="text-align:end;padding-right:20px">Filter by $Category</h6>
    <% end_if %>
    <% loop $Result %>
        <div class="card my-card mb-3">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="$Thumbnail.Link" class="h-100 img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <a href="$Link" class="fs-5 card-title m-0 text-reset text-decoration-none fw-bold">$Title</a>
                        <p class="card-text m-0">
                            <small class="text-muted"><i class="fa-solid fa-tags me-2"></i>$CategoriesList</small>
                        </p>
                        <p class="card-text">
                            <small class="text-muted"><i class="fa-solid fa-circle-info me-2"></i>Created By $Writer at $Date.Nice</small>
                        </p>
                    <p class="card-text">$Content.LimitWordCount(20,'...')</p>
                    </div>
                </div>
            </div>
        </div>
        <% end_loop %>
<% else %>
    <h3 class="h-75 d-flex align-items-center justify-content-center">-- No result --</h3>
<% end_if %>

<%-- Begin Pagination --%>
<% if $Result.MoreThanOnePage %>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item <% if $Result.FirstPage %>disabled<% end_if %>">
                <a class="page-link" href="$Result.PrevLink">Previous</a>
            </li>

            <% loop $Result.PaginationSummary %>
                <% if $Link %>
                    <li class="page-item <% if $CurrentBool %>active<% end_if %>">
                        <a class="page-link" href="$Link">$PageNum</a>
                    <li>                        
                <% else %>
                    <li class="page-item">
                        <a class="page-link" href="#">...</a>
                    </li>
                <% end_if %>
            <% end_loop %>

            <li class="page-item <% if $Result.LastPage %>disabled<% end_if %>">
                <a class="page-link" href="$Result.NextLink">Next</a>
            </li>
        </ul>
    </nav>
<% end_if %>
<%-- End Pagination --%>