$(document).ready(function () {
    // sessionStorage.clear();
    // Script for Flasher
    const flash = $('.flash').data('flash').split('|');

    if (flash.length === 3) {
        Swal.fire({
            icon: flash[0],
            title: flash[1],
            text: flash[2],
        });
    }

    // Modal Iframe
    $('#modal').iziModal({
        title: $('.iframe-overlay').attr('title'),
        iframe: true,
        iframeURL: $('.container-iframe iframe').attr('src'),
    });

    // const modalIframe = $('.iframe')
    $('.iframe-overlay').on('click', function (e) {
        e.preventDefault();
        $('#modal').iziModal('open');
    });

    // Search form
    var timer = null;
    $('#keyword').on('keyup', function (e) {
        e.preventDefault();
        let keyword = $(this).val();

        if (timer) clearTimeout(timer);

        timer = setTimeout(function () {
            let url = $('#form-search').attr('action');
            if (keyword) {
                url += '?keyword=' + keyword;
            }

            console.log(keyword);
            console.log(url);

            $.ajax(url)
                .done(function (response) {
                    $('.main-content').html(response);
                })
                .fail(function (xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: 'Error : ' + xhr.responseText,
                    });
                });
            timer = null;
        }, 200);
    });

    // filter categories
    $('.category').on('click', function (e) {
        e.preventDefault();

        let url = $(this).attr('href');

        $.ajax(url)
            .done(function (response) {
                $('.main-content').html(response);
            })
            .fail(function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: 'Error : ' + xhr.responseText,
                });
            });
    });

    // pagination
    if ($('.pagination').length) {
        $('.main-content').on('click', '.page-link', function (e) {
            e.preventDefault();
            let url = $(this).attr('href');

            $.ajax(url)
                .done(function (response) {
                    $('.main-content').html(response);
                    $('html, body').animate({
                        scrollTop: $('.bg-whitesmoke').offset().top,
                    });
                })
                .fail(function (xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: 'Error : ' + xhr.responseText,
                    });
                });
        });
    }

    // Comment form
    $('#form-comment').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#form-comment').attr('action'),
            data: {
                Name: $('#Name').val(),
                Email: $('#Email').val(),
                Comment: $('#Comment').val(),
                Image: $('#Image').val(),
            },
            method: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'thank you',
                        text: 'Your comment has been uploaded',
                    }).then((result) => {
                        showComment();
                        $('#Name').val('');
                        $('#Email').val('');
                        $('#Image').val('');
                        $('#Comment').val('');
                        $('html, body').animate({
                            scrollTop: $('.comments-title').offset().top,
                        });
                    });
                }
            },
            error: function (xhr) {
                console.log('ajax kirim comment gagal');
                console.log(xhr);
            },
        });
    });

    function showComment() {
        $('#comments').html('');
        $.ajax({
            url: $('#comments').data('url'),
            method: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.status === 200) {
                    $.each(response.comment, function (i, data) {
                        $('#comments').append(
                            `<div class="card mb-3">
                                <div class="row">
                                    <div class="pt-3 ps-4" style="width: fit-content;">
                                        <img src="` +
                                data.Image +
                                `" class="rounded-circle" height="50px" alt="...">
                                    </div>
                                    <div class="card-body col-5 ps-0 pe-5 pb-4">
                                        <h5 class="card-title">` +
                                data.Name +
                                `</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">` +
                                data.Created +
                                `</h6>
                                        <hr class="mt-0">
                                        <p class="card-text">` +
                                data.Comment +
                                `</p>
                                    </div>
                                </div>
                            </div>`
                        );
                    });
                }
            },
            error: function (response) {
                console.log('erro');
            },
        });
    }

    // Show Comment
    if ($('#comments').length) {
        showComment();
    }

    // cek apakah user login
    if (sessionStorage.getItem('user')) {
        isUser();
    }

    // email subscription
    $('#formSubs').submit(function (e) {
        e.preventDefault();
        // dapatkan email
        // ajax untuk menambahkan data ke database
        $.ajax({
            url: $(this).attr('action'),
            data: {
                email: $('#email-subs').val(),
            },
            method: 'post',
            dataType: 'json',
            success: function (data) {
                // cek apakah email berhasil dikirimkan
                if (data.emailStatus === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'congratulations',
                        text: 'I sent you an email, please check!',
                    });

                    $('#email-subs').val('');
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'congratulations',
                        text: 'thank you for subscribing',
                    });
                }
            },
            error: function (data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: 'I am sorry, please try again later or contact to us',
                });
            },
        });
        //kirimkan email ucapan terimakasih, dan selamat bergabung
        // jika berhasil swal fire succes
        // jika gagal swal fire gagal
    });
});
// End Document Ready

// Menangani user login
function isUser() {
    if (sessionStorage.getItem('user')) {
        // jika ada user yang login
        $('#sign-in').addClass('visually-hidden');
        // ambil data
        let user = JSON.parse(sessionStorage.getItem('user'));
        // console.log(user);
        // ajax
        $('#form-comment').append(
            `
            <input type="hidden" name="Name" id="Name" value="` +
                user.name +
                `">
            <input type="hidden" name="Email" id="Email" value="` +
                user.email +
                `">
            <input type="hidden" name="Image" id="Image" value="` +
                user.image +
                `">
            <div style="width: fit-content;">
                <img src="` +
                user.image +
                `" class="rounded-circle" height="50px" alt="...">
            </div>
            <div class="col-10 d-flex align-items-center ps-0">
                <h5 class="m-0">` +
                user.name +
                `</h5>
            </div>
            <div class="my-3">
                <textarea class="form-control" id="Comment" rows="6" placeholder="Comment*" name="Comment" required></textarea>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-outline-secondary w-100" id="btn-comment">Post Comment</button>
            </div>
        `
        );
    } else {
        // jika tidak ada user yang login
        $('#form-comment').html('');
        $('#sign-in').removeClass('visually-hidden');
    }
}

// fungsi untuk merender button sign-in with google
function renderButton() {
    gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: function (googleUser) {
            let profile = googleUser.getBasicProfile();

            let user = {
                name: profile.getName(),
                image: profile.getImageUrl(),
                email: profile.getEmail(),
            };
            // set session
            sessionStorage.setItem('user', JSON.stringify(user));
            // swal fire
            Swal.fire({
                icon: 'success',
                title: 'Thank you',
                text: 'success login with google account',
            });
            // jalankan function
            isUser();
        },
        onfailure: function (error) {
            // swal fire
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: error,
            });
        },
    });
}

// ? Fungsi ini akan dijalankan ketika berhasil
// function onSignIn(googleUser) {
//     var id_token = googleUser.getAuthResponse().id_token;
//     console.log(id_token);

//     var profile = googleUser.getBasicProfile();
//     console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log("Name: " + profile.getName());
//     console.log("Image URL: " + profile.getImageUrl());
//     console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
